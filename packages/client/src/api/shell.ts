import env from "../utils/env";
import { createUrl } from "../utils/shared";

const url = createUrl(env.API_URL, 3001, "/shell");

export let isConnected = false;

const shellSocket = new WebSocket(url);

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

shellSocket.onopen = () => {
    isConnected = true;
};

shellSocket.onclose = () => {
    isConnected = false;
};
