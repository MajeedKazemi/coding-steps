import { useContext, useState } from "react";

import { AuthContext } from "../context";
import { ISubmission } from "../types";
import { Example } from "./doc-example";

interface IProps {
    submission: ISubmission;
}

export const AdminSubmission = (props: IProps) => {
    const { context } = useContext(AuthContext);
    const [grade, setGrade] = useState("");

    const handleSubmitGrade = () => {
        if (grade === "pass" || grade === "fail") {
            fetch("http://localhost:3001/api/tasks/set-grade", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${context?.token}`,
                },
                body: JSON.stringify({
                    taskId: props.submission.taskId,
                    userId: props.submission.userId,
                    passed: grade === "pass",
                    submittedAt: props.submission.submittedAt,
                    checkedAt: new Date(),
                    index: props.submission.index,
                }),
            })
                .then(async (response) => {
                    const data = await response.json();

                    if (data.success) {
                        setGrade("");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        setGrade("");
    };

    return (
        <div>
            <Example
                title={`Task ${props.submission.taskId} : ${props.submission.taskTitle}`}
                code={props.submission.code}
            />

            <form
                onSubmit={(e) => {
                    handleSubmitGrade();
                    e.preventDefault();
                }}
            >
                <input
                    onChange={(e) => {
                        setGrade(e.target.value.toLowerCase());
                    }}
                ></input>
                <button>submit grade</button>
            </form>
        </div>
    );
};
