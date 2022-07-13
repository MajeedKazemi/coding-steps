import { useContext, useState } from "react";

import { apiAdminSetGrade, logError } from "../api/api";
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
            try {
                apiAdminSetGrade(
                    context?.token,
                    props.submission.taskId,
                    props.submission.userId,
                    grade === "pass",
                    props.submission.submittedAt,
                    props.submission.index
                )
                    .then(async (response) => {
                        const data = await response.json();

                        if (data.success) {
                            setGrade("");
                        }
                    })
                    .catch((error: any) => {
                        logError(error.toString());
                    });
            } catch (error: any) {
                logError(error.toString());
            }
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
