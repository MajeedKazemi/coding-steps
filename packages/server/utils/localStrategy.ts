// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";

// import { User } from "../models/user";

// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser((user: any, done: any) => {
//     done(null, user._id);
// });

// passport.deserializeUser((id, done) => {
//     User.findById(id, (err: any, user: any) => {
//         done(err, user);
//     });
// });
