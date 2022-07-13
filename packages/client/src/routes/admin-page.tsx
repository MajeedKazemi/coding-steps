import React, { useCallback, useContext, useEffect, useState } from "react";
import { apiAdminGetSubmissions, logError } from "../api/api";

import { AdminSubmission } from "../components/admin-submission";
import { Layout } from "../components/layout";
import { AuthContext } from "../context";
import { ISubmission } from "../types";

export const AdminPage = () => {
    const { context } = useContext(AuthContext);
    const [submissions, setSubmissions] = useState<Array<ISubmission>>([]);

    const fetchTasks = () => {
        try {
            apiAdminGetSubmissions(context?.token)
                .then(async (response) => {
                    const data = await response.json();

                    setSubmissions(data.submissions);
                })
                .catch((error: any) => {
                    logError(error.toString());
                });
        } catch (error: any) {
            logError(error.toString());
        }
    };

    useEffect(() => {
        fetchTasks();

        setInterval(() => {
            fetchTasks();
        }, 1000);
    }, []);

    return (
        <Layout>
            <h1>Admin Page</h1>
            <span>user role: {context?.user?.role}</span>
            <div>
                <h2>Grade the following submissions:</h2>
                {submissions?.map((s) => (
                    <AdminSubmission key={s.id} submission={s} />
                ))}
            </div>
        </Layout>
    );
};
