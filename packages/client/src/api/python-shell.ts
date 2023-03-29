import { io } from "socket.io-client";

import env from "../utils/env";
import { createUrl } from "../utils/shared";

export const connectSocket = (token: string) => {
    const socket = io(createUrl(env.API_URL, 3001, ""), {
        autoConnect: true,
        query: { token },
    });

    socket.on("connect", () => {
        console.log(`Connected to Socket.IO server with ID ${socket.id}`);
    });

    socket.on("disconnect", (reason: string) => {
        console.log(`Disconnected from Socket.IO server: ${reason}`);
    });

    socket.on("error", (err: Error) => {
        console.error(`Socket.IO error: ${err.message}`);
    });

    return socket;
};
