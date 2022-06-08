import * as rpc from "@codingame/monaco-jsonrpc";
import * as server from "@codingame/monaco-jsonrpc/lib/server";
import * as lsp from "vscode-languageserver";
import { Message } from "vscode-languageserver";

export function launch(socket: rpc.IWebSocket) {
    const reader = new rpc.WebSocketMessageReader(socket);
    const writer = new rpc.WebSocketMessageWriter(socket);

    // start the language server as an external process
    const socketConnection = server.createConnection(reader, writer, () =>
        socket.dispose()
    );

    // using https://github.com/python-lsp/python-lsp-server
    const serverConnection = server.createServerProcess(
        "JSON",
        "/Users/majeed/opt/anaconda3/bin/pylsp"
    );

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
