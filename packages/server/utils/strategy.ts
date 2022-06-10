import jwt from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import { User } from "../models/user";
import env from "./env";

// Local strategy with passport mongoose plugin User.authenticate() function
passport.use(new LocalStrategy(User.authenticate()));

// Required for our support for sessions in passport.
passport.serializeUser((user: any, done: any) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err: any, user: any) => {
        done(err, user);
    });
});

export const getToken = (user: any) => {
    return jwt.sign(user, env.JWT_SECRET, { expiresIn: env.SESSION_EXPIRY });
};

export const jwtPassport = passport.use(
    new JwtStrategy(
        {
            secretOrKey: env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        (jwt_payload, done) => {
            // Search the user with jwt.payload ID field
            User.findOne({ _id: jwt_payload._id }, (err: any, user: any) => {
                if (err) {
                    return done(err, false);
                } else if (user) {
                    // User exist
                    return done(null, user);
                } else {
                    // User doesn't exist
                    return done(null, false);
                }
            });
        }
    )
);

// Verify an incoming user with jwt strategy we just configured above
export const verifyUser = passport.authenticate("jwt", { session: false });

export const getRefreshToken = (user: any) => {
    const refreshToken = jwt.sign(user, env.REFRESH_TOKEN_SECRET, {
        expiresIn: eval(env.REFRESH_TOKEN_EXPIRY),
    });
    return refreshToken;
};
