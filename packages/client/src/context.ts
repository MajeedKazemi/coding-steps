import React from "react";

// TODO: change this to include some user data as well
export const UserContext = React.createContext({
    token: null,
    setToken: (token: any) => {},
});
