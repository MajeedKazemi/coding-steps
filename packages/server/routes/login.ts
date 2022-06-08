import * as bcrypt from "bcrypt";
import * as express from "express";

import { User } from "../models/user";

export const loginRouter = express.Router();

loginRouter.post("/register", async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ msg: "Please enter all fields." });
    }

    if (password.length < 6) {
        return res
            .status(400)
            .json({ msg: "Password must be at least 6 characters." });
    }

    const user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ msg: "User already exists." });
    }

    const newUser = new User({
        email,
        password,
        first_name,
        last_name,
    });

    bcrypt.hash(password, 7, async (err, hash) => {
        if (err)
            return res
                .status(500)
                .json({ msg: "error while saving the password" });

        newUser.password = hash;
        const savedUserRes = await newUser.save();

        if (savedUserRes) {
            return res.json({ msg: "User created successfully." });
        }
    });
});

loginRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields." });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ msg: "User does not exist." });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
        return res.status(400).json({ msg: "Invalid credential." });
    } else {
        return res.json({ msg: "Logged in successfully." });
    }
});
