import { useContext } from "react";

import { AuthContext } from "../context";
import { CodeViewer } from "./analysis-code-viewer";
import { Diff } from "./diff-component";

const participantIds: any = {
    "62e9ddd1922f3d51905f2069": "P1",
    "62e9de0d922f3d51905f2073": "P2",
    "62e9de55922f3d51905f2087": "P3",
    "62e9de30922f3d51905f207d": "P4",
    "62e9deb0922f3d51905f209b": "P5",
    "62e9de88922f3d51905f2091": "P6",
    "62eaba023555aae6d03b0b03": "P7",
    "62e9df0a922f3d51905f20af": "P8",
    "62e9deef922f3d51905f20a5": "P9",
    "62e9df2e922f3d51905f20b9": "P10",
    "62e9df68922f3d51905f20c3": "P11",
    "62e9df88922f3d51905f20cd": "P12",
    "62e9df9e922f3d51905f20d7": "P13",
    "62e9e02c922f3d51905f20eb": "P14",
    "62e9dfbb922f3d51905f20e1": "P15",
    "62eab714f284a969174a7816": "P16",
    "62e9e0a9922f3d51905f20ff": "P17",
    "62e9e08d922f3d51905f20f5": "P18",
    "62e9e0d1922f3d51905f2113": "P19",
    "62e9e107922f3d51905f2127": "P20",
    "62e9e125922f3d51905f2131": "P21",
    "62e9e15f922f3d51905f2145": "P22",
    "62e9e13e922f3d51905f213b": "P23",
    "62e9e19a922f3d51905f2159": "P24",
    "62e9e1c0922f3d51905f2163": "P25",
    "62e9e1f4922f3d51905f216d": "P26",
    "62e9e233922f3d51905f2181": "P27",
    "62e9ebb8922f3d51905f21a9": "P28",
    "62e9e280922f3d51905f219f": "P29",
    "62e9ebfb922f3d51905f21bd": "P30",
    "62e9ec48922f3d51905f21d1": "P31",
    "62e9ecb6922f3d51905f21ea": "P32",
    "62e9eccf922f3d51905f21f4": "P33",
    "62e9ddad922f3d51905f2064": "PB1",
    "62e9dded922f3d51905f206e": "PB2",
    "62e9de1f922f3d51905f2078": "PB3",
    "62e9de40922f3d51905f2082": "PB4",
    "62e9de76922f3d51905f208c": "PB5",
    "62e9dea2922f3d51905f2096": "PB6",
    "62e9decf922f3d51905f20a0": "PB7",
    "62e9defd922f3d51905f20aa": "PB8",
    "62e9df21922f3d51905f20b4": "PB9",
    "62e9df5a922f3d51905f20be": "PB10",
    "62e9df74922f3d51905f20c8": "PB11",
    "62e9df91922f3d51905f20d2": "PB12",
    "62e9dfb0922f3d51905f20dc": "PB13",
    "62e9dfcb922f3d51905f20e6": "PB14",
    "62e9e042922f3d51905f20f0": "PB15",
    "62e9e09c922f3d51905f20fa": "PB16",
    "62e9e0b5922f3d51905f2104": "PB17",
    "62ea8689f25c9527559f6a88": "PB18",
    "62e9e0c8922f3d51905f210e": "PB19",
    "62e9e0e3922f3d51905f2118": "PB20",
    "62e9e0fd922f3d51905f2122": "PB21",
    "62e9e112922f3d51905f212c": "PB22",
    "62e9e131922f3d51905f2136": "PB23",
    "62e9e16d922f3d51905f214a": "PB24",
    "62e9e1d4922f3d51905f2168": "PB25",
    "62e9e1ff922f3d51905f2172": "PB26",
    "62e9e23c922f3d51905f2186": "PB27",
    "62e9e277922f3d51905f219a": "PB28",
    "62ea8a1e7a6ae4c520b3f397": "PB29",
    "62e9ebcd922f3d51905f21ae": "PB30",
    "62e9ebed922f3d51905f21b8": "PB31",
    "62e9ec0a922f3d51905f21c2": "PB32",
    "62ea84afb8a0721e85c06217": "PB33",
    "62e9ec51922f3d51905f21d6": "PB34",
    "62e9eca8922f3d51905f21e5": "PB35",
    "62e9ece8922f3d51905f21f9": "PB36",
};

const getParticipantId = (userId: string) => {
    return participantIds[userId];
};

// const taskIds

const taskIds: any = {
    "1a": 1,
    "2a": 2,
    "3a": 3,
    "3ia": 4,
    "4a": 5,
    "5a": 6,
    "6a": 7,
    "7a": 8,
    "8a": 9,
    "8ia": 10,
    "9a": 11,
    "9ia": 12,
    "10a": 13,
    "11a": 14,
    "12a": 15,
    "13a": 16,
    "14a": 17,
    "15a": 18,
    "16a": 19,
    "16ia": 20,
    "17a": 21,
    "18a": 22,
    "19a": 23,
    "19ia": 24,
    "20a": 25,
    "20ia": 26,
    "21a": 27,
    "21ia": 28,
    "22a": 29,
    "23a": 30,
    "23ia": 31,
    "24a": 32,
    "24ia": 33,
    "25a": 34,
    "26a": 35,
    "26ia": 36,
    "27a": 37,
    "28a": 38,
    "29a": 39,
    "30a": 40,
    "31a": 41,
    "32a": 42,
    "33a": 43,
    "34a": 44,
    "35a": 45,
};

const getTaskId = (taskId: string) => {
    return taskIds[taskId];
};

interface IProps {
    authoring: [];
    modifying: [];
    taskId: string;
    userId: string;
    description: string;
}

export const AnalysisComponent = (props: IProps) => {
    const { context } = useContext(AuthContext);

    const renderPart = (item: any, i: number, type: string) => {
        const taskType = type === "authoring" ? "A" : "M";

        if (item["type"] == "codex") {
            const partialCopy = item["partial-copy"];
            const copiedEverything = item["copied-everything"];
            const message = copiedEverything
                ? "copied-everything"
                : partialCopy
                ? "partial-copy"
                : null;

            return (
                <div
                    className="analysis-part"
                    key={"analysis-part-" + i.toString() + "-" + type}
                >
                    <div className="analysis-header codex-color">
                        {"( " +
                            i +
                            " ) " +
                            ">>> CODEX <<<" +
                            " (" +
                            taskType +
                            ")"}
                    </div>
                    <p className="prompt-header">
                        prompt:{" "}
                        <span className="prompt-message">{item["prompt"]}</span>
                    </p>
                    <span className="analysis-point codex-color">
                        similarity: {item["similarity"]}
                    </span>
                    {message && (
                        <span className="analysis-point codex-color">
                            {message}
                        </span>
                    )}
                    <CodeViewer code={item["generated_code"]} />
                </div>
            );
        } else if (item["type"] == "run") {
            return (
                <div
                    className="analysis-part"
                    key={"analysis-part-" + i.toString() + "-" + type}
                >
                    <div className="analysis-header run-color">
                        {"( " +
                            i +
                            " ) " +
                            ">>> RUN <<<" +
                            " (" +
                            taskType +
                            ")"}
                    </div>

                    <CodeViewer code={item["code"]}></CodeViewer>

                    <div className="run-console">
                        <h2>console output:</h2>

                        {item["io"].map((item: any) => {
                            switch (item["type"]) {
                                case "in":
                                    return (
                                        <div className="run-color-in">
                                            {"<<--"} {item["text"]}
                                        </div>
                                    );

                                case "out":
                                    return (
                                        <div className="run-color-out">
                                            {"-->>"} {item["text"]}
                                        </div>
                                    );

                                case "err":
                                    return (
                                        <div className="run-color-err">
                                            {"<!!>"} {item["text"]}
                                        </div>
                                    );
                            }
                        })}
                    </div>
                </div>
            );
        } else if (item["type"] == "submit") {
            return (
                <div
                    className="analysis-part"
                    key={"analysis-part-" + i.toString() + "-" + type}
                >
                    <div className="analysis-header submit-color">
                        {"( " +
                            i +
                            " ) " +
                            ">>> SUBMIT <<<" +
                            " (" +
                            taskType +
                            ")"}
                    </div>
                    {item["feedback"] !== "" && (
                        <span className="analysis-point submit-color">
                            feedback: {item["feedback"]}
                        </span>
                    )}
                    <CodeViewer code={item["submitted_code"]}></CodeViewer>
                </div>
            );
        } else if (item["type"] == "edit" && item["editor"] == "user") {
            return (
                <div
                    className="analysis-part"
                    key={"analysis-part-" + i.toString() + "-" + type}
                >
                    <div className="analysis-header edit-color">
                        {"( " +
                            i +
                            " ) " +
                            ">>> EDIT <<<" +
                            " (" +
                            taskType +
                            ")"}
                    </div>
                    <span className="analysis-point edit-color">
                        key-strokes: {item["key_strokes"]}
                    </span>

                    <div className="code-viewer-side-by-side">
                        <div className="code-viewer-half">
                            <CodeViewer code={item["prev_code"]}></CodeViewer>
                        </div>

                        <div className="code-viewer-half">
                            <CodeViewer code={item["new_code"]}></CodeViewer>
                        </div>
                    </div>

                    <Diff old={item["prev_code"]} new={item["new_code"]}></Diff>
                </div>
            );
        } else if (item["type"] == "doc") {
            return (
                <div
                    className="analysis-part"
                    key={"analysis-part-" + i.toString() + "-" + type}
                >
                    <div className="analysis-header doc-color">
                        {"( " +
                            i +
                            " ) " +
                            ">>> DOCUMENTATION <<<" +
                            " (" +
                            taskType +
                            ")"}
                    </div>
                    <ul>
                        {item["sections"].map((it: any) => {
                            return <li key={it["section"]}>{it["section"]}</li>;
                        })}
                    </ul>
                </div>
            );
        }
    };

    return (
        <div className="analysis-component" key={props.taskId + props.userId}>
            <h1>
                task-id: {getTaskId(props.taskId)} -- user-id: {props.userId} --
                pid: {getParticipantId(props.userId)}
            </h1>
            <h2>Authoring Task:</h2>
            <p>
                <b>Task Description:</b> {props.description}
            </p>
            {props.authoring.map((it, i) => renderPart(it, i, "authoring"))}

            <h2>Modifying Task:</h2>
            {props.modifying.map((it, i) => renderPart(it, i, "modifying"))}
        </div>
    );
};
