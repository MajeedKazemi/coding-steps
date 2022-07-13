import * as server from "@codingame/monaco-jsonrpc/lib/server";
import * as rpc from "@codingame/monaco-jsonrpc";
import * as lsp from "vscode-languageserver";
import * as http from "http";
import * as net from "net";
import * as url from "url";
import * as ws from "ws";

import { Message } from "vscode-languageserver";
import env from "../utils/env";

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

            if (pathname === "/ws/intellisense") {
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

export function launch(socket: rpc.IWebSocket) {
    const reader = new rpc.WebSocketMessageReader(socket);
    const writer = new rpc.WebSocketMessageWriter(socket);

    // start the language server as an external process
    const socketConnection = server.createConnection(reader, writer, () =>
        socket.dispose()
    );

    // using https://github.com/python-lsp/python-lsp-server
    const serverConnection = server.createServerProcess("JSON", env.PYLSP_PATH);

    server.forward(socketConnection, serverConnection, (message) => {
        if (Message.isRequest(message)) {
            if (message.method === lsp.InitializeRequest.type.method) {
                const initializeParams = message.params as lsp.InitializeParams;
                initializeParams.processId = process.pid;
            }
        }

        return message;
    });
}
