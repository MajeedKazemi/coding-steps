import express from "express";

import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const codexRouter = express.Router();

codexRouter.post("/generate", verifyUser, async (req, res, next) => {
    const { description, type, context } = req.body;

    if (description !== undefined && type !== undefined) {
        const prompt = [
            `<|endoftext|># I start with a blank Python3 file. Each ### Command corresponds to a short Python code snippet.`,
            `# Command: say hello world\nprint("hello world")`,
            ``,
            `# Command: ask the user for their name\nname = input("What is your name? ")`,
            ``,
            `# Command: ask the user to enter a number\nnumber = int(input("Enter a number: "))`,
            ``,
            `# Command: generate a random number\nimport random\nnumber = random.randint(0, 100)`,
            ``,
            `# Command: check if the number is greater than 50\nif number > 50:\n    print("The number is greater than 50")`,
            ``,
            `# Command: check if roll is even\nif roll % 2 == 0:\n    print("The roll is even")`,
            ``,
            `# Context: ${context}`,
            `# Command: ${
                context ? "use the above code as context and " : ""
            } ${description.trim()}\n`,
        ].join("\n");

        const result = await openai.createCompletion({
            model: "code-davinci-002",
            prompt: prompt,
            temperature: 0.2,
            max_tokens: 500,
            stop: ["# Command:"],

            // TODO: increase n to 3 and allow learners to choose from multiple generated codes.
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const code = result.data.choices[0].text?.trim();

            res.json({
                code: code ? `# Prompt: ${description}\n` + code : "",
                success: true,
            });
        } else {
            res.json({
                success: false,
            });
        }
    }
});
