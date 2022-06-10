import { CookieOptions } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

import env from "./env";

export const COOKIE_OPTIONS: CookieOptions = {
    httpOnly: true,
    // Since localhost is not having https protocol,
    // secure cookies do not work correctly (in postman)
    secure: !env.dev,
    signed: true,
    maxAge: eval(env.REFRESH_TOKEN_EXPIRY) * 1000,
    sameSite: "none",
};

export const getToken = (user: any) => {
    return jwt.sign(user, env.JWT_SECRET, {
        expiresIn: eval(env.SESSION_EXPIRY),
    });
};

export const getRefreshToken = (user: any) => {
    const refreshToken = jwt.sign(user, env.REFRESH_TOKEN_SECRET, {
        expiresIn: eval(env.REFRESH_TOKEN_EXPIRY),
    });
    return refreshToken;
};

export const verifyUser = passport.authenticate("jwt", { session: false });
