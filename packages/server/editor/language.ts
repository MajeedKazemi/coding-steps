import * as rpc from "@codingame/monaco-jsonrpc";
import * as http from "http";
import * as net from "net";
import * as url from "url";
import * as ws from "ws";

import { launch } from "./json-server-launcher";

export function initLanguageService(server: http.Server) {
    const wss = new ws.Server({
        noServer: true,
        perMessageDeflate: false,
    });

    server.on(
        "upgrade",
        (request: http.IncomingMessage, socket: net.Socket, head: Buffer) => {
            const pathname = request.url
                ? url.parse(request.url).pathname
                : undefined;

            if (pathname === "/intellisense") {
                wss.handleUpgrade(request, socket, head, (webSocket) => {
                    const socket: rpc.IWebSocket = {
                        send: (content) =>
                            webSocket.send(content, (error) => {
                                if (error) {
                                    throw error;
                                }
                            }),
                        onMessage: (cb) => webSocket.on("message", cb),
                        onError: (cb) => webSocket.on("error", cb),
                        onClose: (cb) => webSocket.on("close", cb),
                        dispose: () => webSocket.close(),
                    };

                    // launch the language-server when the web socket is opened
                    if (webSocket.readyState === webSocket.OPEN) {
                        launch(socket);
                    } else {
                        webSocket.on("open", () => launch(socket));
                    }
                });
            }
        }
    );
}
