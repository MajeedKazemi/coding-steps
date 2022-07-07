import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context";
import { Loader } from "./loader";
import { NavigationBar } from "./navigation";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
    const { setContext } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch("http://localhost:3001/auth/refreshToken", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();

                    setContext({ token: data.token, user: data.user });
                    setLoading(false);
                } else {
                    setContext({ token: null, user: null });
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <NavigationBar loading={loading} />
            <div className="dummy"></div>
            {loading ? (
                <Loader />
            ) : (
                <div className="layout-content">{props.children}</div>
            )}
        </div>
    );
};
