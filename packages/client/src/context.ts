import React from "react";

import { User } from "./types";

// TODO: change this to include some user data as well

interface IAuthContext {
    token: string | null;
    setToken: (token: string | null) => void;
}

interface IUserContext {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const AuthContext = React.createContext<IAuthContext>({
    token: null,
    setToken: (token: string | null) => {},
});

export const UserContext = React.createContext<IUserContext>({
    user: null,
    setUser: (user: User | null) => {},
});
