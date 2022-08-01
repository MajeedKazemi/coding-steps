import React, { useContext, useEffect, useState } from "react";

import { apiAdminGetSubmissions, logError } from "../api/api";
import { AdminSubmission } from "../components/admin-submission";
import { Layout } from "../components/layout";
import { AuthContext } from "../context";
import { ISubmission } from "../types";

export const AdminPage = () => {
    const { context, setContext } = useContext(AuthContext);
    const [submissions, setSubmissions] = useState<Array<ISubmission>>([]);

    useEffect(() => {
        const id = setInterval(() => {
            apiAdminGetSubmissions(context?.token)
                .then(async (response) => {
                    const data = await response.json();

                    setSubmissions(data.submissions);
                })
                .catch((error: any) => {
                    logError(error.toString());
                });
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, [context?.token]);

    return (
        <Layout>
            <div className="admin-grading-container">
                <h2>Grade the following submissions:</h2>
                {submissions?.map((s) => (
                    <AdminSubmission key={s.id} submission={s} />
                ))}
            </div>
        </Layout>
    );
};
