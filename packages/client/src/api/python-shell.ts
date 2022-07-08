import env from "../utils/env";
import { createUrl } from "../utils/shared";

export let isConnected = false;
let shellSocket: WebSocket;

const connectPythonShellSocket = () => {
    const url = createUrl(env.API_URL, 3001, "/ws/shell");

    shellSocket = new WebSocket(url);

    shellSocket.onopen = () => {
        isConnected = true;
    };

    shellSocket.onclose = () => {
        console.log("python-shell socket closed. will retry in 1 second.");

        isConnected = false;

        setTimeout(() => {
            console.log("retrying to connect to python-shell socket...");

            connectPythonShellSocket();
        }, 1000);
    };
};

export function executeCode(code?: string) {
    shellSocket.send(JSON.stringify({ type: "run", code }));
}

export function sendShell(value: string) {
    shellSocket.send(
        JSON.stringify({
            type: "stdin",
            value,
        })
    );
}

export function onShellMessage(callback: (response: any) => void) {
    shellSocket.onmessage = (event) => {
        callback(JSON.parse(event.data));
    };
}

export function onShellOpen(callback: () => void) {
    shellSocket.onopen = () => {
        callback();
    };
}

export function onShellClose(callback: () => void) {
    shellSocket.onclose = () => {
        callback();
    };
}

connectPythonShellSocket();
