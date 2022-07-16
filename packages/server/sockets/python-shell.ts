import * as fs from "fs";
import * as http from "http";
import * as net from "net";
import { PythonShell } from "python-shell";
import { Transform } from "stream";
import * as url from "url";
import * as ws from "ws";

export function initPythonShell(server: http.Server) {
    var pyshell: PythonShell;

    const wss = new ws.Server({ noServer: true });

    wss.on("connection", (ws: ws) => {
        ws.on("message", (message: string) => {
            const data = JSON.parse(message);

            const code = `${CPU_LIMITER_CODE}\n${data.code}`;

            if (data.type === "run") {
                try {
                    fs.writeFileSync("main.py", code);
                } catch (err) {
                    console.error("fs: ", err);
                }

                pyshell = new PythonShell(
                    "main.py",
                    {},
                    new Transform({
                        transform(chunk, encoding, callback) {
                            callback(null, chunk.toString());
                        },
                    })
                );

                pyshell.on("error", (err: any) => {
                    console.error("error: ", err);
                });

                pyshell.on("close", () => {
                    ws.send(JSON.stringify({ type: "close" }));
                });

                pyshell.on("pythonError", (err: any) => {
                    let error = "";

                    if (err.traceback && err.traceback !== "") {
                        error = err.traceback;
                    } else {
                        error = err.message;
                    }

                    const lineNumber = error.match(/line (\d+)/);

                    if (lineNumber) {
                        error = error.replace(
                            lineNumber[1],
                            (parseInt(lineNumber[1]) - 10).toString()
                        );
                    }

                    error = error.replace(/File ".*", /, "");

                    ws.send(JSON.stringify({ type: "stderr", err: error }));
                });

                pyshell.on("message", (message) => {
                    ws.send(JSON.stringify({ type: "stdout", out: message }));
                });
            } else if (data.type === "stdin" && pyshell) {
                pyshell.send(data.value);
            } else if (data.type === "stop" && pyshell) {
                pyshell.kill();
            }
        });
    });

    server.on(
        "upgrade",
        (request: http.IncomingMessage, socket: net.Socket, head: Buffer) => {
            const pathname = request.url
                ? url.parse(request.url).pathname
                : undefined;

            if (pathname === "/ws/shell") {
                wss.handleUpgrade(request, socket, head, (webSocket) => {
                    wss.emit("connection", webSocket);
                });
            }
        }
    );
}

const CPU_LIMITER_CODE = [
    `import resource`,
    `import signal`,
    `def time_expired(n, stack):`,
    `   raise SystemExit("Program stopped: You probably have an infinite loop in your code that doesn't stop!")`,
    `def set_cpu_runtime():`,
    `    soft, hard = resource.getrlimit(resource.RLIMIT_CPU)`,
    `    resource.setrlimit(resource.RLIMIT_CPU, (3, hard))`,
    `    soft, hard = resource.getrlimit(resource.RLIMIT_CPU)`,
    `    signal.signal(signal.SIGXCPU, time_expired)`,
    `set_cpu_runtime()`,
].join("\n");
