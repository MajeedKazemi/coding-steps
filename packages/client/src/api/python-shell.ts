import env from "../utils/env";
import { createUrl } from "../utils/shared";

export let isConnected = false;
let webSocket: WebSocket;

export const initPythonShellSocket = () => {
    const url = createUrl(env.API_URL, 3001, "/ws/shell");

    webSocket = new WebSocket(url);

    webSocket.onopen = () => {
        isConnected = true;
    };

    webSocket.onclose = () => {
        isConnected = false;
    };

    webSocket.onerror = () => {
        isConnected = false;
        webSocket.close();
    };
};

export function executeCode(code?: string) {
    retryOpeningPythonShell();

    webSocket.send(JSON.stringify({ type: "run", code }));
}

export function stopShell() {
    retryOpeningPythonShell();

    webSocket.send(JSON.stringify({ type: "stop" }));
}

export function sendShell(value: string) {
    retryOpeningPythonShell();

    webSocket.send(
        JSON.stringify({
            type: "stdin",
            value,
        })
    );
}

export function onShellMessage(callback: (response: any) => void) {
    if (isConnected) {
        webSocket.onmessage = (event) => {
            callback(JSON.parse(event.data));
        };
    }
}

export function onShellOpen(callback: () => void) {
    webSocket.onopen = () => {
        isConnected = true;
        callback();
    };
}

export function onShellClose(callback: () => void) {
    webSocket.onclose = () => {
        isConnected = false;
        callback();
    };
}

export function stopPythonShell() {
    isConnected = false;
    webSocket.close();
}

function retryOpeningPythonShell() {
    if (!isConnected) {
        initPythonShellSocket();
    }
}
