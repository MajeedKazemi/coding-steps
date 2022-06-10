import express from "express";
import passport from "passport";

import { User } from "../models/user";
import { getToken, verifyUser } from "../utils/strategy";

export const loginRouter = express.Router();

loginRouter.post("/signup", (req, res, next) => {
    User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader("Content-Type", "application/json");
                res.json({ success: false, message: err });
            } else {
                passport.authenticate("local")(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({
                        success: true,
                        message: "registration successful",
                    });
                });
            }
        }
    );
});

loginRouter.post(
    "/login",
    passport.authenticate("local"),
    (req: any, res: any) => {
        var token = getToken({ _id: req.user._id });

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
            success: true,
            token: token,
            status: "You are successfully logged in!",
        });
    }
);

loginRouter.get("/logout", verifyUser, (req: any, res, next) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie("session-id");

        res.send({ success: true });
    } else {
        res.statusCode = 403;
        res.setHeader("Content-Type", "application/json");
        res.json({ success: false, message: "You are not logged in!" });
    }
});

loginRouter.get("/me", verifyUser, (req, res, next) => {
    res.json({ user: req.user });
});

// import express from "express";
// import passport from "passport";

// import { User } from "../models/user";
// import { getToken, verifyUser } from "../utils/strategy";

// export const loginRouter = express.Router();

// loginRouter.post("/signup", (req, res, next) => {
//     User.register(
//         new User({ username: req.body.username }),
//         req.body.password,
//         (err, user) => {
//             if (err) {
//                 res.statusCode = 500;
//                 res.setHeader("Content-Type", "application/json");
//                 res.json({ success: false, message: err });
//             } else {
//                 passport.authenticate("local")(req, res, () => {
//                     res.statusCode = 200;
//                     res.setHeader("Content-Type", "application/json");
//                     res.json({
//                         success: true,
//                         message: "registration successful",
//                     });
//                 });
//             }
//         }
//     );
// });

// loginRouter.post(
//     "/login",
//     passport.authenticate("local"),
//     (req: any, res: any) => {
//         var token = getToken({ _id: req.user._id });

//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json({
//             success: true,
//             token: token,
//             status: "You are successfully logged in!",
//         });
//     }
// );

// loginRouter.get("/logout", verifyUser, (req: any, res, next) => {
//     if (req.session) {
//         req.session.destroy();
//         res.clearCookie("session-id");

//         res.send({ success: true });
//     } else {
//         res.statusCode = 403;
//         res.setHeader("Content-Type", "application/json");
//         res.json({ success: false, message: "You are not logged in!" });
//     }
// });

// loginRouter.get("/me", verifyUser, (req, res, next) => {
//     res.json({ user: req.user });
// });
