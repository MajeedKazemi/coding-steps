import * as monaco from "monaco-editor";
import React, { useContext, useEffect, useRef, useState } from "react";

import { apiAdminFinalSubmissions, logError } from "../api/api";
import { Layout } from "../components/layout";
import { TaskGrader } from "../components/task-grader";
import { AuthContext } from "../context";

export const GraderPage = () => {
    const { context, setContext } = useContext(AuthContext);
    const [solution, setSolution] = useState<string>("");
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
        }>
    >([]);
    const [taskId, setTaskId] = useState("epa1");

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
                >
                    <option value="epa1">epa1</option>
                    <option value="epa2">epa2</option>
                    <option value="epa3">epa3</option>
                    <option value="epa4">epa4</option>
                    <option value="epa5">epa5</option>
                    <option value="epm1">epm1</option>
                    <option value="epm2">epm2</option>
                    <option value="epm3">epm3</option>
                    <option value="epm4">epm4</option>
                    <option value="epm5">epm5</option>
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
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};
