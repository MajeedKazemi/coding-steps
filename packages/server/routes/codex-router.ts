import express from "express";

import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const codexRouter = express.Router();

codexRouter.post("/generate", verifyUser, async (req, res, next) => {
    const { description, type } = req.body;

    if (description !== undefined && type !== undefined) {
        const prompt = `# python3\n# ${description}\n`;

        const result = await openai.createCompletion({
            model: "code-davinci-002",
            prompt: prompt,
            temperature: 0.05,
            max_tokens: 300,
            stop: ["#"],
            frequency_penalty: 0.2,
            presence_penalty: 0,
            best_of: 1,
            top_p: 1,
            // TODO: increase n to 3 and allow learners to choose from multiple generated codes.
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            res.json({
                code: result.data.choices[0].text?.trim(),
                success: true,
            });
        } else {
            res.json({
                success: false,
            });
        }
    }
});
