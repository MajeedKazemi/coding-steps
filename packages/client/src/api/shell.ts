import { createUrl } from "../utils/shared";

const url = createUrl("localhost", 3001, "/shell");

export let isConnected = false;

export const shellSocket = new WebSocket(url);

export function executeCode(code?: string) {
    shellSocket.send(JSON.stringify({ type: "run", code }));
}

export function sendValue(value: string) {
    shellSocket.send(
        JSON.stringify({
            type: "stdin",
            value,
        })
    );
}

shellSocket.onopen = () => {
    isConnected = true;
};

shellSocket.onclose = () => {
    isConnected = false;
};
