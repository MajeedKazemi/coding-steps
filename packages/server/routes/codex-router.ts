import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const codexRouter = express.Router();

codexRouter.post("/generate", verifyUser, async (req, res, next) => {
    const { description, type, context } = req.body;
    const userId = (req.user as IUser)._id;

    if (description !== undefined && type !== undefined) {
        const messages: Array<ChatCompletionRequestMessage> = [
            {
                role: "system",
                content:
                    "for each provided [intended-behavior] generate short python [code] snippets for the novice children that are learning programming for the first time.",
            },
            {
                role: "user",
                content: `[intended-behavior]: say hello world\n[code]:`,
            },
            {
                role: "assistant",
                content: `print("hello world")\n[end-code]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: ask the user for their name\n[code]:`,
            },
            {
                role: "assistant",
                content: `name = input("What is your name? ")\n[end-code]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: ask the user to enter a number\n[code]:`,
            },
            {
                role: "assistant",
                content: `number = int(input("Enter a number: "))\n[end-code]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: generate a random number\n[code]:`,
            },
            {
                role: "assistant",
                content: `import random\nnumber = random.randint(0, 100)\n[end-code]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: check if the number is greater than 50\n[code]:`,
            },
            {
                role: "assistant",
                content: `if number > 50:\n    print("The number is greater than 50")\n[end-code]`,
            },

            {
                role: "user",
                content: `[intended-behavior]: check if roll is even\n[code]:`,
            },
            {
                role: "assistant",
                content: `if roll % 2 == 0:\n    print("The roll is even")\n[end-code]`,
            },
        ];

        if (context && context.length > 0) {
            messages.push({
                role: "user",
                content: `[context-code]:\n${context}\n[intended-behavior]: use the above [context-code] as context and ${description}\n[code]:`,
            });
        } else {
            messages.push({
                role: "user",
                content: `[intended-behavior]: ${description}\n[code]:`,
            });
        }

        const result = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages,
            temperature: 0.1,
            max_tokens: 500,
            stop: ["# Command:"],
            user: userId,
        });

        if (result.data.choices && result.data.choices?.length > 0) {
            const code = result.data.choices[0].message?.content;

            res.json({
                code,
                success: true,
            });
        } else {
            res.json({
                success: false,
            });
        }
    }
});
