import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import { User } from "../models/user";

const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

// Used by the authenticated requests to deserialize the user,
// i.e., to fetch user details from the JWT.
passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        // Check against the DB only if necessary.
        // This can be avoided if you don't want to fetch user details in each request.
        User.findById(jwt_payload._id, (err: any, user: any) => {
            if (err) {
                return done(err, false);
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    })
);
