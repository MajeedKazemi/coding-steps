import * as monaco from "monaco-editor";
import React, { useContext, useEffect, useRef, useState } from "react";

import { apiAdminFinalSubmissions, apiGetAllTaskIds, logError } from "../api/api";
import { Layout } from "../components/layout";
import { TaskGrader } from "../components/task-grader";
import { AuthContext } from "../context";

export const GraderPage = () => {
    const { context, setContext } = useContext(AuthContext);
    const [solution, setSolution] = useState<string>("");
    const [allTaskIds, setAllTaskIds] = useState<string[]>([]);
    const solutionEl = useRef(null);
    const [description, setDescription] = useState<string>("");
    const [submissions, setSubmissions] = useState<
        Array<{
            id: string;
            taskId: string;
            userId: string;
            code: string;
            feedbacks: string[];
            graded: boolean;
            gradedGrade: number | undefined;
            notModified: boolean;
            receivedDirectHint: boolean;
        }>
    >([]);
    const [taskId, setTaskId] = useState("epa1");

    useEffect(() => {
        apiGetAllTaskIds(context?.token)
            .then(async (response) => {
                const data = await response.json();

                setAllTaskIds(data.allTaskIds);
            })
            .catch((error: any) => {
                logError(error.toString());
            });
    }, []);

    useEffect(() => {
        apiAdminFinalSubmissions(context?.token, taskId)
            .then(async (response) => {
                const data = await response.json();

                setSubmissions(data.submissions);
                setSolution(data.solution);
                setDescription(data.taskDescription);
            })
            .catch((error: any) => {
                logError(error.toString());
            });
    }, [taskId]);

    useEffect(() => {
        if (solutionEl.current) {
            monaco.editor.colorizeElement(solutionEl.current as HTMLElement, {
                theme: "vs",
                mimeType: "python",
                tabSize: 4,
            });
        }
    }, [solutionEl, solution]);

    return (
        <Layout>
            <div className="grader-page-container">
                <h2>Grade the following submissions:</h2>
                <span>
                    total graded: {submissions.filter((s) => s.graded).length} /{" "}
                    {submissions.length}
                </span>
                <br />
                <label>Choose a task:</label>
                <select
                    onChange={(e) => {
                        setTaskId(e.target.value);
                    }}
                    size={3}
                >
                    {allTaskIds.map((id) => (
                        <option key={id} value={id}>
                            {id}
                        </option>
                    ))}
                </select>

                <br />
                <b>
                    <span>Task Description: </span>
                </b>
                <span dangerouslySetInnerHTML={{ __html: description }}></span>
                <br />
                <div ref={solutionEl} className="admin-solution-code">
                    {solution}
                </div>
                <div className="grader-page-submissions">
                    {submissions.map((s) => (
                        <TaskGrader
                            key={s.id}
                            code={s.code}
                            feedbacks={s.feedbacks}
                            taskId={s.taskId}
                            userId={s.userId}
                            graded={s.graded}
                            gradedGrade={s.gradedGrade}
                            notModified={s.notModified}
                            receivedDirectHint={s.receivedDirectHint}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};
