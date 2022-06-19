import { useCallback, useContext, useEffect, useState } from "react";

import { AuthContext, UserContext } from "../context";
import { Loader } from "./loader";
import { NavigationBar } from "./navigation";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
    const { token, setToken } = useContext(AuthContext);
    const { setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const verifyUser = useCallback(() => {
        setLoading(true);
        fetch("http://localhost:3001/auth/refreshToken", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    setToken(data.token);
                    setLoading(false);
                    getUser();
                } else {
                    setToken(null);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    }, []);

    const getUser = () => {
        fetch("http://localhost:3001/auth/me", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    setUser({
                        username: "",
                        firstName: "",
                        lastName: "",
                    });
                }
            })
            .catch((error) => {
                console.log("/auth/me", error);
            });
    };

    useEffect(() => {
        verifyUser();
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
