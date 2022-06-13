import React from "react";

export const UserContext = React.createContext({
    token: null,
    setToken: (token: any) => {},
});
