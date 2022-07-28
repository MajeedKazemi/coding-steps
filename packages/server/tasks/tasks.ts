export enum TaskType {
    Authoring = "authoring",
    Modifying = "modifying",
    ShortAnswer = "shortAnswer",
    MultipleChoice = "multipleChoice",
}

export interface IUserTask {
    sequence: number;
    userId: string;
    taskId: string;
    userTaskId: string;
    startedAt: Date;
    finishedAt: Date;
    log: any;
    data: any;
    completed: boolean;
    submissions: Array<{ code: string; submittedAt: Date; checkedAt?: Date }>;
    beingGraded: boolean;
    passed: boolean;
}

class CodeCheckResult {
    passed: boolean;
    message?: string;

    constructor(passed: boolean, message: string) {
        this.passed = passed;
        this.message = message;
    }
}

export abstract class Task {
    id: string;
    description: string;

    type: TaskType;

    constructor(id: string, description: string, type: TaskType) {
        this.id = id;
        this.description = description;
        this.type = type;
    }
}

export class AuthoringTask extends Task {
    timeLimit: number;
    output: Array<Array<string>>;
    solution: string;

    constructor(
        id: string,
        description: string,
        output: Array<Array<string>>,
        solution: string,
        timeLimit: number
    ) {
        super(id, description, TaskType.Authoring);

        this.solution = solution;
        this.output = output;
        this.timeLimit = timeLimit;
    }

    checkCode(code: string): CodeCheckResult {
        if (code.length > 10) {
            return {
                passed: true,
            };
        } else {
            return {
                passed: false,
                message: "code is too short",
            };
        }
    }
}

export class ModifyingTask extends Task {
    starterCode: string;
    timeLimit: number;
    output: Array<Array<string>>;
    solution: string;

    constructor(
        id: string,
        description: string,
        starterCode: string,
        output: Array<Array<string>>,
        solution: string,
        timeLimit: number
    ) {
        super(id, description, TaskType.Modifying);

        this.solution = solution;
        this.output = output;
        this.timeLimit = timeLimit;
        this.starterCode = starterCode;
    }

    checkCode(code: string): CodeCheckResult {
        if (code.length > 10) {
            return {
                passed: true,
            };
        } else {
            return {
                passed: false,
                message: "code is too short",
            };
        }
    }
}

export class MultipleChoiceTask extends Task {
    choices: string[];

    constructor(id: string, description: string, choices: string[]) {
        super(id, description, TaskType.MultipleChoice);

        this.choices = choices;
    }
}

export class ShortAnswerTask extends Task {
    constructor(id: string, description: string) {
        super(id, description, TaskType.ShortAnswer);
    }
}

export const getNextTask = (completedTasks: IUserTask[]): Task => {
    // this should get a diff from the available tasks and the completed tasks
    // and then return the first one after

    // for (let i = 0; i < CodingTasks.length; i++) {
    //     if (!completedTasks.some((task) => task.taskId === CodingTasks[i].id)) {
    //         break;
    //     }
    // }

    // if the last task was an authoring task and they did it correctly, the starting code for it should be the final code that they submitted.
    if (completedTasks === undefined || completedTasks.length === 0)
        return CodingTasks[0];

    const lastCompletedTaskId =
        completedTasks[completedTasks.length - 1].taskId;
    const lastCompletedTaskIndex = CodingTasks.findIndex(
        (task) => task.id === lastCompletedTaskId
    );

    const nextTask = CodingTasks[lastCompletedTaskIndex + 1];

    const prevTask = completedTasks[completedTasks.length - 1];

    if (
        nextTask instanceof ModifyingTask &&
        getTaskFromTaskId(prevTask.taskId)?.type === TaskType.Authoring &&
        prevTask.passed
    ) {
        nextTask.starterCode =
            prevTask.submissions[prevTask.submissions.length - 1].code;
    }

    return nextTask;
};

export const CodingTasks = [
    // print string
    new AuthoringTask(
        "1a",
        "Write a program that will display the following message: <b>I'm Wall-E!</b>",
        [["output: <b>I'm Wall-E!</b>"]],
        [`print("I'm Wall-E!")`].join("\n"),
        60 * 3
    ),
    new ModifyingTask(
        "1b",
        "Modify the given program so it displays another message after the first one: <b>Beep Boop</b>",
        `print("I am a robot!")`,
        [["output: <b>Beep Boop</b>"]],
        [`print("I'm Wall-E!")`, `print("Beep Boop")`].join("\n"),
        60 * 2
    ),

    // print the value of a variable
    new AuthoringTask(
        "2a",
        "Write a program that will first create a variable called <i>name</i> and set its value to <b>Wall-E</b>. Then, display the value of the variable.",
        [["output: <b>Wall-E</b>"]],
        [`name = "Wall-E"`, `print(name)`].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "2b",
        "Modify the given program's variable name from <i>name</i> to <i>robot_name</i>.",
        [`name = "Wall-E"`, `print(name)`].join("\n"),
        [["output: <b>Wall-E</b>"]],
        [`robot_name = "Wall-E"`, `print(robot_name)`].join("\n"),
        60 * 2
    ),

    // join a string variable with a literal
    new AuthoringTask(
        "3a",
        "Write a program that creates a variable called <i>name</i> and sets its value to <b>Wall-E</b>. Then, display the message <b>My name is <i>name</i></b>.",
        [[`output: <b>My name is Wall-E</b>`]],
        [`name = "Wall-E"`, `print("My name is " + name)`].join("\n"),
        60 * 5
    ),
    new ModifyingTask(
        "3b",
        "Modify the given program so that it displays the following message: <b>Hi, <i>name</i>! Nice to meet you!</b>.",
        [`name = "Wall-E"`, `print("My name is " + name)`].join("\n"),
        [["output: <b>Hi, Wall-E! Nice to meet you!</b>"]],
        [`name = "Wall-E"`, `print("Hi, " + name + "! Nice to meet you!)`].join(
            "\n"
        ),
        60 * 2
    ),

    // get input from user -> store variable -> and add a string to it
    new AuthoringTask(
        "4a",
        "Write a program that asks the user for their name and then stores their name into a variable called <i>name</i>. Finally, display the message <b>Hello, <i>name</i>!</b>.",
        [
            [
                "output: <b>What's your name?</b>",
                "input: <b>Bob</b>",
                "output: <b>Hello, Bob!</b>",
            ],
            [
                "output: <b>What's your name?</b>",
                "input: <b>James</b>",
                "output: <b>Hello, James!</b>",
            ],
        ],
        [
            `name = input("What is your name? ")`,
            `print("Hello, " + name + "!")`,
        ].join("\n"),
        60 * 5
    ),
    new ModifyingTask(
        "4b",
        "Modify the following program so that it asks the user for their family name (storing into <i>family_name</i>) in addition to their given name and displays the message <b>Hello, <i>name</i> <i>family_name</i>!</b>.",
        [
            `name = input("What is your name? ")`,
            `print("Hello, " + name + "!")`,
        ].join("\n"),
        [
            [
                "output: <b>What's your name?</b>",
                "input: <b>Bob</b>",
                "output: <b>What's your family name?</b>",
                "input: <b>Dylan</b>",
                "output: <b>Hello, Bob Dylon!</b>",
            ],
            [
                "output: <b>What's your name?</b>",
                "input: <b>James</b>",
                "output: <b>What's your family name?</b>",
                "input: <b>Madison</b>",
                "output: <b>Hello, James Madison!</b>",
            ],
        ],
        [
            `name = input("What is your name? ")`,
            `family_name = input("What is your family name? ")`,
            `print("Hello, " + name + " " + family_name + "!")`,
        ].join("\n"),
        60 * 4
    ),

    // join two string variables
    new AuthoringTask(
        "5a",
        "Write a program that creates a variable called <i>food1</i> and set its value to <b>nuts</b>, and another variable called <i>food2</i> set to <b>bolts</b>. Then create a third variable called <i>robot_food</i> and set it to the value of <b><i>food1</i> and <i>food2</i></b>. Finally, display the message <b>I like <i>robot_food</i>.</b>. <br/>Note: pay attention to the space between and after the <b>and</b>.",
        [[`output: <b>I like nuts and bolts</b>`]],
        [
            `food1 = "nuts"`,
            `food2 = "bolts"`,
            `robot_food = food1 + " and " + food2`,
            `print("I like " + robot_food + ".")`,
        ].join("\n"),
        60 * 5
    ),
    new ModifyingTask(
        "5b",
        "Modify the following program so that it includes a third food (called <i>food3</i>) set to <b>screws</b>. Then modify <i>robot_food</i> to be the value of <b><i>food1</i>, <i>food2</i> and <i>food3</i></b>. Finally display the message <b>I like <i>robot_food</i>.</b>.",
        [
            `food1 = "nuts"`,
            `food2 = "bolts"`,
            `robot_food = food1 + " and " + food2`,
            `print("I like " + robot_food + ".")`,
        ].join("\n"),
        [[`output: <b>I like nuts, bolts and screws</b>`]],
        [
            `food1 = "nuts"`,
            `food2 = "bolts"`,
            `food3 = "screws"`,
            `robot_food = food1 + ", " + food2 + " and " + food3`,
            `print("I like " + robot_food + ".")`,
        ].join("\n"),
        60 * 2
    ),

    // numbers -> add -> print
    new AuthoringTask(
        "6a",
        "Write a program that sets a variable called <i>num1</i> to <b>10</b>, and another variable called <i>num2</i> to <b>20</b>. Then, add the values of <i>num1</i> and <i>num2</i> and store the result in a variable called <i>num3</i>. Finally, display the value of <i>num3</i>.",
        [["output: <b>30</b>"]],
        [`num1 = 10`, `num2 = 20`, `num3 = num1 + num2`, `print(num3)`].join(
            "\n"
        ),
        60 * 3
    ),
    new ModifyingTask(
        "6b",
        "Modify the following program so that it stores <i>num1</i> multiplied by <i>num2</i> into a new variable called <i>num4</i> and then display the value of <i>num3</i> and <i>num4</i> separately.",
        [`num1 = 10`, `num2 = 20`, `num3 = num1 + num2`, `print(num3)`].join(
            "\n"
        ),
        [["output: <b>200</b>"]],
        [
            `num1 = 10`,
            `num2 = 20`,
            `num3 = num1 + num2`,
            `num4 = num1 * num2`,
            `print(num3)`,
            `print(num4)`,
        ].join("\n"),
        60 * 2
    ),

    new MultipleChoiceTask(
        "mc1",
        `What is the output of the following Python code? <div class="code-block">${[
            `print("(1 + 7)")`,
        ].join("\n")}</div>`,
        [`8`, `(1 + 7)`, `(8)`, `1 + 7`, `I don't know.`]
    ),

    new MultipleChoiceTask(
        "mc2",
        `What is the output of the following Python code? <div class="code-block">${[
            `x = "10"`,
            `y = "-"`,
            `z = "5"`,
            `ans = x + y + z`,
            `print(ans)`,
        ].join("\n")}</div>`,
        [`5`, `10-5`, `"10"-"5"`, `"5"`, `I don't know.`]
    ),

    new MultipleChoiceTask(
        "mc3",
        `What is the output of the following Python code? <div class="code-block">${[
            `x = "x"`,
            `y = "y"`,
            `y = y + "y"`,
            `x = x + y`,
            `print(x + y)`,
        ].join("\n")}</div>`,
        [`xyy`, `xy`, `xyyyy`, `xyyxyy`, `I don't know.`]
    ),

    new MultipleChoiceTask(
        "mc4",
        `Which of the following python codes <u>cannot</u> be executed (and throws an error)?
        `,
        [
            `<div class="code-block">${`name = print("Hello, ") + input("what's your name?")`}</div>`,
            `<div class="code-block">${`name = print(input("what's your name?"))`}</div>`,
            `<div class="code-block">${`greetings = "Hello, " + input("what's your name?")`}</div>`,
            `<div class="code-block">${`name = input("what's your name?")`}</div>`,

            `I don't know.`,
        ]
    ),

    new MultipleChoiceTask(
        "mc5",
        `What is the right way to initialize a variable in Python?`,
        [
            `<div class="code-block">${`var num = 10`}</div>`,
            `<div class="code-block">${`num == 10`}</div>`,
            `<div class="code-block">${`let num = 10`}</div>`,
            `<div class="code-block">${`num = 10`}</div>`,

            `I don't know.`,
        ]
    ),

    new MultipleChoiceTask(
        "mc6",
        `What is the output of the following Python code? <div class="code-block">${[
            `var1 = "hfz"`,
            `var2 = "kvq"`,
            `var1 = "hfz" + var2`,
            `print(var2)`,
        ].join("\n")}</div>`,
        [`hfz`, `kvq`, `hfzkvq`, `kvqhfz`, `I don't know.`]
    ),

    // random number -> print
    new AuthoringTask(
        "7a",
        "Write a program that generates a random number between 1 and 10 and sets it to a variable called <i>num</i>. Then, display the value of <i>num</i>.",
        [["output: <b>3</b>"], ["output: <b>5</b>"], ["output: <b>7</b>"]],
        [`import random`, `num = random.randint(1, 10)`, `print(num)`].join(
            "\n"
        ),
        60 * 5
    ),
    new ModifyingTask(
        "7b",
        "Modify the following program so it generates a second random number between 50 and 100 and sets it to another variable named <i>num2</i>. Then, display the value of <i>num2</i> below the value of <i>num</i>.",
        [`import random`, `num = random.randint(1, 10)`, `print(num)`].join(
            "\n"
        ),
        [
            ["output: <b>91</b>", "output: <b>63</b>"],
            ["output: <b>75</b>", "output: <b>99</b>"],
            ["output: <b>81</b>", "output: <b>53</b>"],
        ],
        [
            `import random`,
            `num = random.randint(1, 10)`,
            `num2 = random.randint(50, 100)`,
            `print(num)`,
        ].join("\n"),
        60 * 4
    ),

    // random number -> print
    new AuthoringTask(
        "8a",
        "Write a program that generates a random number between 1 and 6 and sets it to a variable named <i>roll</i>. Then, create another variable called <i>message</i> and set it to the value of <b>You rolled: <i>roll</i></b>. Finally, display the value of <i>message</i>.",
        [
            ["output: <b>You rolled: 4</b>"],
            ["output: <b>You rolled: 2</b>"],
            ["output: <b>You rolled: 6</b>"],
        ],
        [
            `import random`,
            `roll = random.randint(1, 6)`,
            `message = "You rolled: " + str(roll)`,
            `print(message)`,
        ].join("\n"),
        60 * 6
    ),
    new ModifyingTask(
        "8b",
        "Modify the following program so that it generates a second random number between 1 and 6 and sets it to another variable named <i>roll2</i>. Then modify the message to be the value of <b>You rolled: <i>roll</i> and <i>roll2</i></b>. Finally, display the value of <i>message</i>.",
        [
            `import random`,
            `roll = random.randint(1, 6)`,
            `message = "You rolled: " + str(roll)`,
            `print(message)`,
        ].join("\n"),
        [
            ["output: <b>You rolled: 4 and 1</b>"],
            ["output: <b>You rolled: 2 and 5</b>"],
            ["output: <b>You rolled: 6 and 3</b>"],
        ],
        [
            `num1 = int(input("Enter a number: "))`,
            `num2 = int(input("Enter another number: "))`,
            `print(num1 + num2)`,
        ].join("\n"),
        60 * 4
    ),

    // random number -> print
    new AuthoringTask(
        "9a",
        "Write a program that asks the user for two numbers and then displays the sum of them.",
        [
            [
                "output: <b>Enter a number: </b>",
                "input: <b>20</b>",
                "output: <b>Enter another number: </b>",
                "input: <b>10</b>",
                "output: <b>30</b>",
            ],
            [
                "output: <b>Enter a number: </b>",
                "input: <b>73</b>",
                "output: <b>Enter another number: </b>",
                "input: <b>48</b>",
                "output: <b>121</b>",
            ],
        ],
        [
            `num1 = int(input("Enter a number: "))`,
            `num2 = int(input("Enter another number: "))`,
            `print(num1 + num2)`,
        ].join("\n"),
        60 * 6
    ),
    new ModifyingTask(
        "9b",
        "Modify the following program so that it displays the subtraction, multiplication, and division of the two numbers as well.",
        [
            `num1 = int(input("Enter a number: "))`,
            `num2 = int(input("Enter another number: "))`,
            `print(num1 + num2)`,
        ].join("\n"),
        [
            [
                "output: <b>Enter a number: </b>",
                "input: <b>20</b>",
                "output: <b>Enter another number: </b>",
                "input: <b>10</b>",
                "output: <b>30</b>",
                "output: <b>10</b>",
                "output: <b>200</b>",
                "output: <b>2</b>",
            ],
        ],
        [
            `num1 = int(input("Enter a number: "))`,
            `num2 = int(input("Enter another number: "))`,
            `print(num1 + num2)`,
            `print(num1 - num2)`,
            `print(num1 * num2)`,
            `print(num1 / num2)`,
        ].join("\n"),
        60 * 2
    ),

    new AuthoringTask(
        "10a",
        "Write a program that first, generates a random number between 1 and 6 and assigns it to a variable called <i>roll</i>. Then, display the message <b>rolled six</b> only if the number is equal to six.",
        [["output: <b>rolled six</b>"]],
        [
            `import random`,
            `roll = random.randint(1, 6)`,
            `if roll == 6:`,
            `    print("rolled six")`,
        ].join("\n"),
        60 * 5
    ),
    new ModifyingTask(
        "10b",
        "Modify the following program so that it generates a second random number between 1 and 6 and sets it to another variable named <i>roll2</i>. Then, display the message <b>rolled the same</b> only if both rolls were equal to each other.",
        [
            `import random`,
            `roll = random.randint(1, 6)`,
            `if roll == 6:`,
            `    print("rolled six")`,
        ].join("\n"),
        [["output: <b>rolled the same</b>"]],
        [
            `import random`,
            `roll = random.randint(1, 6)`,
            `roll2 = random.randint(1, 6)`,
            `if roll == roll2:`,
            `    print("rolled the same")`,
        ].join("\n"),
        60 * 3
    ),

    new AuthoringTask(
        "11a",
        "Write a program that first, generates two random numbers between 1 and 6 and then displays the message <b>both rolled six</b> only if both are equal to six.",
        [["output: <b>both rolled six</b>"]],
        [
            `import random`,
            `roll = random.randint(1, 6)`,
            `roll2 = random.randint(1, 6)`,
            `if roll == 6 and roll2 == 6:`,
            `    print("both rolled six")`,
        ].join("\n"),
        60 * 5
    ),
    new ModifyingTask(
        "11b",
        "Modify the following program so that it would generate a third random number between 1 and 6 and check if all three are equal to six, if yes then display the message all three dice rolled six.",
        [
            `import random`,
            `roll = random.randint(1, 6)`,
            `roll2 = random.randint(1, 6)`,
            `if roll == 6 and roll2 == 6:`,
            `    print("both rolled six")`,
        ].join("\n"),
        [["output: <b>All three dice rolled six</b>"]],
        [
            `import random`,
            `roll = random.randint(1, 6)`,
            `roll2 = random.randint(1, 6)`,
            `roll3 = random.randint(1, 6)`,
            `if roll == 6 and roll2 == 6 and roll3 == 6:`,
            `    print("all three dice rolled six")`,
        ].join("\n"),
        60 * 2
    ),

    new AuthoringTask(
        "12a",
        "Write a program that would ask the user to enter a number between 10 and 100. Then check if the number is greater than 75. If it is, display the message <b>Greater than 75</b>; otherwise, display the message <b>Less than 75</b>. Only one of these messages should be displayed.",
        [
            [
                "output: <b>enter a number between 10 and 100:</b>",
                "input: <b>43</b>",
                "output: <b>Less than 75</b>",
            ],
            [
                "output: <b>enter a number between 10 and 100:</b>",
                "input: <b>88</b>",
                "output: <b>Greater than 75</b>",
            ],
        ],
        [
            `num = int(input("enter a number between 10 and 100: "))`,
            `if num > 75:`,
            `    print("Greater than 75")`,
            `else:`,
            `    print("Less than 75")`,
        ].join("\n"),
        60 * 5
    ),
    new ModifyingTask(
        "12b",
        "Modify the following program so that it check if the input number is between 75 and 90. If it is, display the message <b>Between 75 and 90</b>; otherwise, display the message <b>Not between 75 and 90</b>. Only one of these messages should be displayed.",
        [
            `num = int(input("enter a number between 10 and 100: "))`,
            `if num > 75:`,
            `    print("Greater than 75")`,
            `else:`,
            `    print("Less than 75")`,
        ].join("\n"),
        [
            [
                "output: <b>enter a number between 10 and 100:</b>",
                "input: <b>80</b>",
                "output: <b>Between 75 and 90</b>",
            ],
            [
                "output: <b>enter a number between 10 and 100:</b>",
                "input: <b>60</b>",
                "output: <b>Not between 75 and 90</b>",
            ],
        ],
        [
            `num = int(input("enter a number between 10 and 100: "))`,
            `if num > 75 and num < 90:`,
            `    print("Between 75 and 90")`,
            `else:`,
            `    print("Not between 75 and 90")`,
        ].join("\n"),
        60 * 3
    ),

    new MultipleChoiceTask(
        "mc7",
        `Assuming we have the following code: <br/> <div class="code-block">${[
            `a = input("enter a number: ")`,
            `b = 10`,
            `c = "20"`,
        ].join(
            "\n"
        )}</div> <br/> How can we correctly compute the arithmetic sum of three numbers?`,
        [
            `<div class="code-block">${[`print(int(a) + int(b) + int(c))`].join(
                "\n"
            )}</div>`,

            `<div class="code-block">${[`print(str(a) + str(b) + str(c))`].join(
                "\n"
            )}</div>`,

            `<div class="code-block">${[`print(int(a) + str(b) + int(c))`].join(
                "\n"
            )}</div>`,

            `<div class="code-block">${[`print(a + b + int(c))`].join(
                "\n"
            )}</div>`,

            `I don't know.`,
        ]
    ),

    new MultipleChoiceTask(
        "mc8",
        `Assuming we have the following code, which of the following print statements is correct and does NOT throw an error? <br/> <div class="code-block">${[
            `v1 = "10"`,
            `v2 = 20`,
        ].join("\n")}</div>`,
        [
            `<div class="code-block">${[`print(v1 + v2)`].join("\n")}</div>`,

            `<div class="code-block">${[`print(int(v1) + v2)`].join(
                "\n"
            )}</div>`,

            `<div class="code-block">${[`print(str(v1) + int(v2))`].join(
                "\n"
            )}</div>`,

            `<div class="code-block">${[`print(int(v1) + str(v2))`].join(
                "\n"
            )}</div>`,

            `I don't know.`,
        ]
    ),

    new MultipleChoiceTask(
        "mc9",
        `Assuming we have the following code: <br/> <div class="code-block">${[
            `import random`,
            `num = input("enter a number between 10 and 100: ")`,
            `print("number is: " + num)`,
            ``,
            `if random.randint(1, num) == 10:`,
            `    print("nice")`,
        ].join(
            "\n"
        )}</div> <br/> However, this code has an issue. Which of the following will fix the code?`,
        [
            `<div class="code-block">${[
                `num = int(input("enter a number between 10 and 100: "))`,
            ].join("\n")}</div>`,

            `<div class="code-block">${[`print("number is: " + str(num))`].join(
                "\n"
            )}</div>`,

            `<div class="code-block">${[
                `if int(random.randint(1, num)) == 10:`,
            ].join("\n")}</div>`,

            `<div class="code-block">${[
                `if random.randint(1, int(num)) == 10:`,
            ].join("\n")}</div>`,

            `I don't know.`,
        ]
    ),

    new MultipleChoiceTask(
        "mc10",
        `From the following codes, which one is correct and does not throw an error?`,
        [
            `<div class="code-block">${[
                `x = input(int("enter a number: "))`,
            ].join("\n")}</div>`,

            `<div class="code-block">${[
                `x = int.input("enter a number: ")`,
            ].join("\n")}</div>`,

            `<div class="code-block">${[
                `x = int[(input("enter a number: ")]`,
            ].join("\n")}</div>`,

            `<div class="code-block">${[
                `x = int(input("enter a number: "))`,
            ].join("\n")}</div>`,

            `I don't know.`,
        ]
    ),

    new MultipleChoiceTask(
        "mc11",
        `Assuming we have the following code: <br/> <div class="code-block">${[
            `import random`,
            `rand = random.randint(1, 10)`,
        ].join(
            "\n"
        )}</div> <br/> Which of the following codes correctly checks if rand is equal to 5?`,
        [
            `<div class="code-block">${[
                `if rand = 5:`,
                `print("rand is equal to 5")`,
            ].join("\n")}</div>`,

            `<div class="code-block">${[
                `if rand = 5:`,
                `   print("rand is equal to 5")`,
            ].join("\n")}</div>`,

            `<div class="code-block">${[
                `if rand == 5:`,
                `   print("rand is equal to 5")`,
            ].join("\n")}</div>`,

            `<div class="code-block">${[
                `if rand == 5: print("rand is equal to 5")`,
            ].join("\n")}</div>`,

            `I don't know.`,
        ]
    ),

    new AuthoringTask(
        "13a",
        "Write a program that would ask the user to enter a number between 0 and 100 and set it to a variable called score. Create a variable called grade and set it to an empty message. Now check if the number is less than 50, then it should set the grade variable to the letter <b>C</b>, if between 50 and 75 set grade to <b>B</b>, and if greater than 75 set grade to <b>A</b>. Then display the message <b>Grade:</b> followed by the grade variable.",
        [
            [
                "output: <b>enter a number between 0 and 100:</b>",
                "input: <b>80</b>",
                "output: <b>Grade: A</b>",
            ],
            [
                "output: <b>enter a number between 0 and 100:</b>",
                "input: <b>60</b>",
                "output: <b>Grade: B</b>",
            ],
        ],
        [
            `score = int(input("enter a number between 0 and 100: "))`,
            `grade = ""`,
            `if score < 50:`,
            `    grade = "C"`,
            `elif score < 75:`,
            `    grade = "B"`,
            `else:`,
            `    grade = "A`,
        ].join("\n"),
        60 * 8
    ),
    new ModifyingTask(
        "13b",
        "Modify the following program so that if the score is less than 20 it would set grade to <b>F</b>, if between 20 and 40 set grade to <b>E</b>, if between 40 and 60 set grade to <b>D</b>, if between 60 and 80 set grade to <b>C</b>, if between 80 and 90 set grade to <b>B</b>, and finally if between 90 and 100 set grade to <b>A</b>.",
        [
            `score = int(input("enter a number between 0 and 100: "))`,
            `grade = ""`,
            `if score < 50:`,
            `    grade = "C"`,
            `elif score < 75:`,
            `    grade = "B"`,
            `else:`,
            `    grade = "A`,
        ].join("\n"),
        [
            [
                "output: <b>enter a number between 0 and 100:</b>",
                "input: <b>85</b>",
                "output: <b>Grade: B</b>",
            ],
            [
                "output: <b>enter a number between 0 and 100:</b>",
                "input: <b>65</b>",
                "output: <b>Grade: C</b>",
            ],
        ],
        [
            `score = int(input("enter a number between 0 and 100: "))`,
            `grade = ""`,
            `if score < 20:`,
            `    grade = "F"`,
            `elif score < 40:`,
            `    grade = "E"`,
            `elif score < 60:`,
            `    grade = "D"`,
            `elif score < 80:`,
            `    grade = "C"`,
            `elif score < 90:`,
            `    grade = "B"`,
            `else:`,
            `    grade = "A`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "14a",
        "Write a program that creates a variable called <i>coin</i>. Then use a random number generator (between 1 and 2) set the variable to either <b>heads</b> or <b>tails</b>. Then display the message <b>Coin:</b> followed by the value of coin.",
        [["output: <b>Coin: heads</b>"], ["output: <b>Coin: tails</b>"]],
        [
            `import random`,
            `coin = random.randint(1, 2)`,
            ``,
            `if coin == 1:`,
            `    coin = "heads"`,
            `else:`,
            `    coin = "tails"`,
            `print("Coin: " + coin)`,
        ].join("\n"),
        5 * 60
    ),

    new ModifyingTask(
        "14b",
        `Add a variable called dice and set it to a random number between 1 and 6. Display both the values inside <i>coin</i> and <i>dice</i>. Then finally, display the message <b>Bingo!</b> only if the user rolled a 6 with the dice AND received "heads" from the coin. Otherwise display the message <b>Try again!</b>`,
        [
            `import random`,
            `coin = random.randint(1, 2)`,
            ``,
            `if coin == 1:`,
            `    coin = "heads"`,
            `else:`,
            `    coin = "tails"`,
            `print("Coin: " + coin)`,
        ].join("\n"),
        [
            [
                "output: <b>Coin: heads</b>",
                "output: <b>Dice: 1</b>",
                "output: <b>Try again!</b>",
            ],
            [
                "output: <b>Coin: heads</b>",
                "output: <b>Dice: 6</b>",
                "output: <b>Bingo!</b>",
            ],
        ],
        [
            `import random`,
            `coin = random.randint(1, 2)`,
            `dice = random.randint(1, 6)`,
            ``,
            `if coin == 1:`,
            `    coin = "heads"`,
            `else:`,
            `    coin = "tails"`,
            `print("Coin: " + coin)`,
            `print("Dice: " + str(dice))`,
            `if dice == 6 and coin == "heads":`,
            `    print("Bingo!")`,
            `else:`,
            `    print("Try again!")`,
        ].join("\n"),
        60 * 5
    ),

    new AuthoringTask(
        "15a",
        "Write a program that would get two numbers from the user and then ask an operator (from one of the following choices: +, -, *, and /). Then it should check which operator the user has entered, and then perform the appropriate operation. For example if the user enters + then it should add the two numbers and display the result.",
        [
            [
                "output: <b>enter the first number:</b>",
                "input: <b>41</b>",
                "output: <b>enter the second number:</b>",
                "input: <b>58</b>",
                "output: <b>enter an operator</b>",
                "input: <b>+</b>",
                "output: <b>99</b>",
            ],
        ],
        [
            `num1 = int(input("enter the first number: "))`,
            `num2 = int(input("enter the second number: "))`,
            `operator = input("enter an operator: ")`,
            `if operator == "+":`,
            `    print(num1 + num2)`,
            `elif operator == "-":`,
            `    print(num1 - num2)`,
            `elif operator == "*":`,
            `    print(num1 * num2)`,
            `elif operator == "/":`,
            `    print(num1 / num2)`,
        ].join("\n"),
        60 * 8
    ),
    new ModifyingTask(
        "15b",
        "Modify the following code so that it would display an error message if the user doesn't enter one of the +, -, * and / operators. Furthermore, instead of asking the user to enter two numbers, modify the program so that it would generate two numbers between 1 and 1000, display them one by one, and then ask the user to enter an operator and then perform the appropriate operation.",
        [
            `num1 = int(input("enter the first number: "))`,
            `num2 = int(input("enter the second number: "))`,
            `operator = input("enter an operator: ")`,
            `if operator == "+":`,
            `    print(num1 + num2)`,
            `elif operator == "-":`,
            `    print(num1 - num2)`,
            `elif operator == "*":`,
            `    print(num1 * num2)`,
            `elif operator == "/":`,
            `    print(num1 / num2)`,
        ].join("\n"),
        [
            [
                "output: <b>first number: 21</b>",
                "output: <b>second number: 5</b>",
                "output: <b>enter an operator</b>",
                "input: <b>*</b>",
                "output: <b>105</b>",
            ],
        ],
        [
            `num1 = random.randint(1, 1000)`,
            `num2 = random.randint(1, 1000)`,
            `operator = input("enter an operator: ")`,
            `if operator == "+":`,
            `    print(num1 + num2)`,
            `elif operator == "-":`,
            `    print(num1 - num2)`,
            `elif operator == "*":`,
            `    print(num1 * num2)`,
            `elif operator == "/":`,
            `    print(num1 / num2)`,
        ].join("\n"),
        60 * 5
    ),

    new AuthoringTask(
        "16a",
        "Ask the user to enter a number. Check if it is even or odd. If it is odd, display the message <b>The number <i>num</i> is odd</b> otherwise display the message <b>The number <i>num</i> is even</b>. <br/> <b>Hint:</b> a number is even if the remainder of the division of the number by 2 is 0 (or in other words, it's divisble by two).",
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>41</b>",
                "output: <b>The number 41 is odd</b>",
            ],
            [
                "output: <b>enter a number:</b>",
                "input: <b>28</b>",
                "output: <b>The number 28 is even</b>",
            ],
        ],
        [
            `num = int(input("enter a number: "))`,
            `if num % 2 == 0:`,
            `    print("The number " + str(num) + " is even")`,
            `else:`,
            `    print("The number " + str(num) + " is odd")`,
        ].join("\n"),
        60 * 7
    ),

    new ModifyingTask(
        "16b",
        "Modify the program so that it gets another number called divisor and checks if the entered number is divisible by the divisor. If it is, display the message <b>The number <i>num</i> is divisible by <i>divisor</i></b> otherwise display the message <b>The number <i>num</i> is not divisible by <i>divisor</i></b>.",
        [
            `num = int(input("enter a number: "))`,
            `if num % 2 == 0:`,
            `    print(num / 2)`,
            `else:`,
            `    print(num)`,
        ].join("\n"),
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>42</b>",
                "output: <b>enter the divisor:</b>",
                "input: <b>7</b>",
                "output: <b>The number 42 is divisible by 7</b>",
            ],
        ],
        [
            `num = int(input("enter a number: "))`,
            `divisor = int(input("enter the divisor: "))`,
            `if num % divisor == 0:`,
            `    print("The number " + str(num) + " is divisible by " + str(divisor))`,
            `else:`,
            `    print("The number " + str(num) + " is not divisible by " + str(divisor))`,
        ].join("\n"),
        60 * 5
    ),

    new AuthoringTask(
        "17a",
        "display <b>Hello</b> 10 times using a loop.",
        [
            [
                "output: <b>Hello</b>",
                "output: <b>Hello</b>",
                "output: <b>Hello</b>",
                "...",
                "output: <b>Hello</b>",
            ],
        ],
        [`for i in range(3):`, `    print("Hello")`].join("\n"),
        60 * 6
    ),
    new ModifyingTask(
        "17b",
        "Modify the code so that it would instead repeat the following program for 5 times: ask the user for their name, display <b>Hello, <i>name</i></b>. At the end, display the message <b>program finished</b> only once.",
        [`for i in range(2):`, `    print("hello world")`].join("\n"),
        [
            [
                "output: <b>enter your name:</b>",
                "input: <b>joe</b>",
                "output: <b>Hello, joe</b>",
                "...",
                "output: <b>enter your name:</b>",
                "input: <b>dan</b>",
                "output: <b>Hello, dan</b>",
                "output: <b>program finished</b>",
            ],
        ],
        [
            `for i in range(5):`,
            `    name = input("enter your name: ")`,
            `    print("Hello, " + name)`,
            `print("program finished")`,
        ].join("\n"),
        60 * 6
    ),

    new AuthoringTask(
        "18a",
        "Set a variable to 0 and then create a loop that would add the number 5 to the variable for 25 times and display the variable as it increases.",
        [
            [
                "output: <b>5</b>",
                "output: <b>10</b>",
                "output: <b>15</b>",
                "...",
                "output: <b>125</b>",
            ],
        ],
        [
            `num = 0`,
            `for i in range(25):`,
            `    num += 5`,
            `    print(num)`,
        ].join("\n"),
        60 * 6
    ),
    new ModifyingTask(
        "18b",
        "Modify the program so that it includes another variable that is initially set to 125 and then is decremented by 5 for 25 times. display the value of both variables everytime their value changes in the loop.",
        [
            `num = 0`,
            `for i in range(25):`,
            `    num += 5`,
            `    print(num)`,
        ].join("\n"),
        [
            [
                "output: <b>First: 5</b>",
                "output: <b>Second: 120</b>",
                "output: <b>First: 10</b>",
                "output: <b>Second: 115</b>",
                "...",
                "output: <b>First: 0</b>",
                "output: <b>Second: 125</b>",
            ],
        ],
        [
            `num1 = 125`,
            `num2 = 0`,
            `for i in range(25):`,
            `    num1 -= 5`,
            `    num2 += 5`,
            `    print("First: " + str(num1))`,
            `    print("Second: " + str(num2))`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "19a",
        "set a variable called <i>sentence</i> to <b>we</b>. Then create a loop that would repeatedly add the letter <b>e</b> to <i>sentence</i> for 5 times and displaying the sentence every time. At the end of the loop, at an exclamation mark (!) to the <i>sentence</i> variable and then display its value.",
        [
            [
                "output: <b>we</b>",
                "output: <b>wee</b>",
                "output: <b>weee</b>",
                "output: <b>weeee</b>",
                "output: <b>weeeee</b>",
                "output: <b>weeeee!</b>",
            ],
        ],
        [
            `sentence = "we"`,
            `for i in range(5):`,
            `    sentence += "e"`,
            `    print(sentence)`,
            `sentence += "!"`,
            `print(sentence)`,
        ].join("\n"),
        60 * 8
    ),
    new ModifyingTask(
        "19b",
        "set a variable called <i>sentence</i> to <b>My top three fruits are:</b>. Then create a loop that would repeatedly ask the user to enter a fruit and then add it to the <i>sentence</i>. The loop should be repeated for 3 times. At the end, add a dot (.) to the sentence and then display the sentence.",
        [
            `sentence = "we"`,
            `for i in range(5):`,
            `    sentence += "e"`,
            `    print(sentence)`,
            `sentence += "!"`,
            `print(sentence)`,
        ].join("\n"),
        [
            [
                "output: <b>enter a fruit:</b>",
                "input: <b>apple</b>",
                "output: <b>enter a fruit:</b>",
                "input: <b>orange</b>",
                "output: <b>enter a fruit:</b>",
                "input: <b>strawberry</b>",

                "output: <b>My top three fruits are: apple orange strawberry.</b>",
            ],
        ],
        [
            `sentence = "My top three fruits are"`,
            `for i in range(3):`,
            `    fruit = input("enter a fruit: ")`,
            `    sentence += " " + fruit`,
            `sentence += "."`,
            `print(sentence)`,
        ].join("\n"),
        60 * 6
    ),

    new AuthoringTask(
        "20a",
        "display all the numbers from 1 to 100 line by line.",
        [
            [
                "output: <b>1</b>",
                "output: <b>2</b>",
                "...",
                "output: <b>99</b>",
                "output: <b>100</b>",
            ],
        ],
        [`for i in range(1, 101):`, `    print(i)`].join("\n"),
        60 * 6
    ),
    new ModifyingTask(
        "20b",
        "Modify the following program to ask the user for a number, and then display all the numbers from 1 to that number line by line.",
        [`for i in range(1, 101):`, `    print(i)`].join("\n"),
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>25</b>",
                "output: <b>1</b>",
                "output: <b>2</b>",
                "...",
                "output: <b>24</b>",
                "output: <b>25</b>",
            ],
        ],
        [
            `num = int(input("enter a number: "))`,
            `for i in range(1, num + 1):`,
            `    print(i)`,
        ].join("\n"),
        60 * 3
    ),

    // checked times until here.

    new AuthoringTask(
        "21a",
        "Write a program that would ask the user to enter a number, then use a loop to calculate the total sum of all numbers from 1 to the given number (including the given number). Finally, display the total.",
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>50</b>",
                "output: <b>1275</b>",
            ],
        ],
        [
            `num = int(input("enter a number: "))`,
            `total = 0`,
            `for i in range(1, num + 1):`,
            `    total += i`,
            `print(total)`,
        ].join("\n"),
        60 * 4
    ),

    new ModifyingTask(
        "21b",
        "Modify the program so that it would only calculate the sum of all even numbers between 1 to the given number (including the given number). Finally, display the sum. <br/><b>Hint:</b> a number is even when it is divisible by 2.",
        [
            `num = int(input("enter a number: "))`,
            `total = 0`,
            `for i in range(1, num + 1):`,
            `    total += i`,
            `print(total)`,
        ].join("\n"),
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>50</b>",
                "output: <b>600</b>",
            ],
        ],
        [
            `num = int(input("enter a number: "))`,
            `total = 0`,
            `for i in range(1, num + 1):`,
            `    if i % 2 == 0:`,
            `        total += i`,
            `print(total)`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "22a",
        "Write a program that would repeatedly ask the user to enter a password (as a number) and check if the password is equal to 123. If it is, display the message <b>Password is correct</b>. If it is not, display the message <b>Password is incorrect</b> and should ask for the user to enter another password. The program should stop when the user enters the number 123. Finally, after the user got the correct password, display the message <b>Password is correct</b>.",
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>321</b>",
                "output: <b>Password is incorrect</b>",
                "output: <b>enter a number:</b>",
                "input: <b>123</b>",
                "output: <b>Password is correct</b>",
            ],
        ],
        [
            `num = int(input("enter a number: "))`,
            `while num != 123:`,
            `    num = int(input("enter a number: "))`,
            `print("Password is correct")`,
        ].join("\n"),
        60 * 4
    ),

    new ModifyingTask(
        "22b",
        "Modify the program so that it would count the number of incorrect attempts at the end.",
        [
            `num = int(input("enter a number: "))`,
            `while num != 123:`,
            `    num = int(input("enter a number: "))`,
            `print("Password is correct")`,
        ].join("\n"),
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>321</b>",
                "output: <b>Password is incorrect</b>",
                "output: <b>enter a number:</b>",
                "input: <b>222</b>",
                "output: <b>Password is incorrect</b>",
                "output: <b>enter a number:</b>",
                "input: <b>123</b>",
                "output: <b>Password is correct</b>",
                "output: <b>Incorrect attempts: 2</b>",
            ],
        ],
        [
            `num = int(input("enter a number: "))`,
            `incorrect_attempts = 0`,
            `while num != 123:`,
            `    num = int(input("enter a number: "))`,
            `    incorrect_attempts += 1`,
            `print("Password is correct")`,
            `print("Incorrect attempts: " + str(incorrect_attempts))`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "23a",
        "Write a program that would repeatedly do the following until the user enters <b>stop</b>: ask the user for a number, and then add it up to a variable called <b>total</b>. If the user enters <b>stop</b>, display the total at the end (only once).",
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>7</b>",
                "output: <b>enter a number:</b>",
                "input: <b>25</b>",
                "output: <b>enter a number:</b>",
                "input: <b>stop</b>",
                "output: <b>total: 32</b>",
            ],
        ],
        [
            `total = 0`,
            `num = input("enter a number: ")`,
            `while num != "stop":`,
            `    total += int(num)`,
            `    num = input("enter a number: ")`,
            `print("total: " + str(total))`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "23b",
        "Modify the program so that it would calculate the average of all numbers entered by the user. <br/>Note: the average is the sum of all numbers divided by the number of numbers entered.",
        [
            `total = 0`,
            `num = input("enter a number: ")`,
            `while num != "stop":`,
            `    total += int(num)`,
            `    num = input("enter a number: ")`,
            `print("total: " + str(total))`,
        ].join("\n"),
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>15</b>",
                "output: <b>enter a number:</b>",
                "input: <b>7</b>",
                "output: <b>enter a number:</b>",
                "input: <b>stop</b>",
                "output: <b>the average is: 11</b>",
            ],
        ],
        [
            `total = 0`,
            `count = 0`,
            `num = input("enter a number: ")`,
            `while num != "stop":`,
            `    total += int(num)`,
            `    count += 1`,
            `    num = input("enter a number: ")`,
            `print("the average is: " + str(total / count))`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "24a",
        "Write a guess a number game: the program will first pick a random number between 1 and 1000. Then it would repeatedly ask the user to guess the number. If the user guesses the number, the program would display the message <b>You guessed the number!</b>. If the user guesses a number that is too high, the program should display the message <b>The number is too high</b>. If the user guesses a number that is too low, the program should display the message <b>The number is too low</b>. The program should stop when the user guesses the number.",
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>500</b>",
                "output: <b>The number is too high</b>",
                "output: <b>enter a number:</b>",
                "input: <b>250</b>",
                "output: <b>The number is too low</b>",
                "output: <b>enter a number:</b>",
                "input: <b>375</b>",
                "output: <b>You guessed the number!</b>",
            ],
        ],
        [
            `num = random.randint(1, 1000)`,
            `num_guess = int(input("enter a number: "))`,
            `while num_guess != num:`,
            `    if num_guess > num:`,
            `        print("The number is too high")`,
            `    else:`,
            `        print("The number is too low")`,
            `    num_guess = int(input("enter a number: "))`,
            `print("You guessed the number!")`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "24b",
        "Modify the program so that it would count the number of incorrect attempts and display the message <b>You guessed the number after <i>n</i> incorrect attempts!</b> at the end.",
        [
            `num = random.randint(1, 1000)`,
            `num_guess = int(input("enter a number: "))`,
            `while num_guess != num:`,
            `    if num_guess > num:`,
            `        print("The number is too high")`,
            `    else:`,
            `        print("The number is too low")`,
            `    num_guess = int(input("enter a number: "))`,
            `print("You guessed the number!")`,
        ].join("\n"),
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>500</b>",
                "output: <b>The number is too high</b>",
                "output: <b>enter a number:</b>",
                "input: <b>250</b>",
                "output: <b>The number is too low</b>",
                "output: <b>enter a number:</b>",
                "input: <b>375</b>",
                "output: <b>You guessed the number after 2 incorrect attempts!</b>",
            ],
        ],
        [
            `num = random.randint(1, 1000)`,
            `num_guess = int(input("enter a number: "))`,
            `incorrect_attempts = 0`,
            `while num_guess != num:`,
            `    if num_guess > num:`,
            `        print("The number is too high")`,
            `    else:`,
            `        print("The number is too low")`,
            `    incorrect_attempts += 1`,
            `    num_guess = int(input("enter a number: "))`,
            `print("You guessed the number after " + str(incorrect_attempts) + " incorrect attempts!")`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "25a",
        "write a program that would ask the user to enter a number between 1 and 100. The program should then repeatedly decrease the number by 1 until it reaches 0 and displaying the number each time.",
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>73</b>",
                "output: <b>73</b>",
                "output: <b>72</b>",
                "...",
                "output: <b>1</b>",
                "output: <b>0</b>",
            ],
        ],
        [
            `num = int(input("enter a number: "))`,
            `while num >= 0:`,
            `    print(num)`,
            `    num -= 1`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "25b",
        "Modify the program so that it would continue repeatedly decreasing the number by 1 until it becomes divisible by 5. After the number becomes divisible by 5, it should repeatedly decrease the number by 5 on each step until it reaches 0. <b>Hint:</b> you could use another variable to store and update the decrement value.",
        [
            `num = int(input("enter a number: "))`,
            `while num >= 0:`,
            `    print(num)`,
            `    num -= 1`,
        ].join("\n"),
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>73</b>",
                "output: <b>72</b>",
                "output: <b>71</b>",
                "output: <b>70</b>",
                "output: <b>65</b>",
                "output: <b>60</b>",
                "...",
                "output: <b>5</b>",
                "output: <b>0</b>",
            ],
        ],
        [
            `num = int(input("enter a number: "))`,
            `decrement = 1`,
            `while num >= 0:`,
            `    if num % 5 == 0:`,
            `        decrement = 5`,
            `    print(num)`,
            `    num -= decrement`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "26a",
        "Write a program that generates a number between 1 and 999999 and then displays the number of digits in the number by repeatedly dividing the number by 10 until the number becomes less than 10 and counting the number of divisions.",
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>100</b>",
                "output: <b>The number has 3 digits</b>",
            ],
            [
                "output: <b>enter a number:</b>",
                "input: <b>74182</b>",
                "output: <b>The number has 5 digits</b>",
            ],
        ],
        [
            `num = random.randint(1, 999999)`,
            `num_digits = 0`,
            ``,
            `while num > 10:`,
            `    num = num // 10`,
            `    num_digits += 1`,
            `print("The number has " + str(num_digits) + " digits")`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "26b",
        "Modify the program so that it would add all the digits in the number and display the sum.",
        [
            `num = random.randint(1, 999999)`,
            `num_digits = 0`,
            ``,
            `while num > 10:`,
            `    num = num // 10`,
            `    num_digits += 1`,
            `print("The number has " + str(num_digits) + " digits")`,
        ].join("\n"),
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>100</b>",
                "output: <b>The sum of the digits is 1</b>",
            ],
            [
                "output: <b>enter a number:</b>",
                "input: <b>74182</b>",
                "output: <b>The sum of the digits is 22</b>",
            ],
        ],
        [
            `num = random.randint(1, 999999)`,
            `digits_sum = 0`,
            ``,
            `while num > 10:`,
            `    num = num // 10`,
            `    digits_sum += num`,
            `print("The sum of the digits is " + str(digits_sum))`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "27a",
        "Write a program that repeatedly generates a random number between 0 and 100 until the number is equal to 50. Then display the number of attempts it took to generate the number.",
        [
            ["output: <b>It took 27 attempts.</b>"],
            ["output: <b>It took 14 attempts.</b>"],
        ],
        [
            `num = random.randint(0, 100)`,
            `attempts = 0`,
            `while num != 50:`,
            `    num = random.randint(0, 100)`,
            `    attempts += 1`,
            `print("It took " + str(attempts) + " attempts.")`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "27b",
        "Modify the program so that it stop when when the random number becomes equal to 50 for six times (in total).<br/><b>Hint: </b>you could use a counter to count the number of successful hits.",
        [
            `num = random.randint(0, 100)`,
            `attempts = 0`,
            `while num < 50:`,
            `    num = random.randint(0, 100)`,
            `    attempts += 1`,
            `print("It took " + str(attempts) + " attempts.")`,
        ].join("\n"),
        [
            [
                "output: <b>It took 75 attempts.</b>",
                "output: <b>It took 43 attempts.</b>",
            ],
        ],
        [
            `num = random.randint(0, 100)`,
            `attempts = 0`,
            `success_count = 0`,

            `while success_count < 6:`,
            `    if num == 50:`,
            `        success_count += 1`,
            `    num = random.randint(0, 100)`,
            `    attempts += 1`,
            `print("It took " + str(attempts) + " attempts.")`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "28a",
        "Repeatedly roll a dice for 1000 times. At the end, display the total times it rolled six.",
        [
            ["output: <b>It rolled six for 165 times.</b>"],
            ["output: <b>It rolled six for 166 times.</b>"],
        ],
        [
            `times = 0`,
            `for i in range(1000):`,
            `    if random.randint(1, 6) == 6:`,
            `        times += 1`,
            `print("It rolled six for " + str(times) + " times.")`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "28b",
        "Modify the program so that it would count the number of times it rolled any of the six faces and finally display the result.",
        [
            `times = 0`,
            `for i in range(1000):`,
            `    if random.randint(1, 6) == 6:`,
            `        times += 1`,
            `print("It rolled six for " + str(times) + " times.")`,
        ].join("\n"),
        [
            [
                "output: <b>It rolled one for 166</b>",
                "output: <b>It rolled two for 168</b>",
                "output: <b>It rolled three for 162</b>",
                "output: <b>It rolled four for 170</b>",
                "output: <b>It rolled five for 164</b>",
                "output: <b>It rolled six for 170</b>",
            ],
        ],
        [
            `ones = 0`,
            "twos = 0",
            "thress = 0",
            "fours = 0",
            "fives = 0",
            `sixes = 0`,
            ``,
            `for i in range(1000):`,
            `    num = random.randint(1, 6)`,
            `    if num == 1:`,
            `        ones += 1`,
            `    elif num == 2:`,
            `        twos += 1`,
            `    elif num == 3:`,
            `        thress += 1`,
            `    elif num == 4:`,
            `        fours += 1`,
            `    elif num == 5:`,
            `        fives += 1`,
            `    elif num == 6:`,
            `        sixes += 1`,
            `print("It rolled one for " + str(ones) + " times.")`,
            `print("It rolled two for " + str(twos) + " times.")`,
            `print("It rolled three for " + str(thress) + " times.")`,
            `print("It rolled four for " + str(fours) + " times.")`,
            `print("It rolled five for " + str(fives) + " times.")`,
            `print("It rolled six for " + str(sixes) + " times.")`,
        ].join("\n"),
        60 * 4
    ),

    // can start working with lists
    new AuthoringTask(
        "29a",
        "create a list with these values: 1, 5, 9, 13, 17, 21. Then, display the first item in the list by accessing the list using the appropriate indicies. Then, display the length of the list.<br/> <b>Hint: </b>you should use a special function that returns the length of a list.",
        [["output: <b>First item: 1</b>", "output: <b>Length: 6</b>"]],
        [
            `list = [1, 5, 9, 13, 17, 21]`,
            `print("First item: " + str(list[0]))`,
            `print("Length: " + str(len(list)))`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "29b",
        "Modify the program so that it would display the last item in the list by accessing the list using the appropriate index.<br/> <b>Note:</b> You must use the <b>len</b> function to determine the length of the list.",
        [
            `list = [1, 5, 9, 13, 17, 21]`,
            `print("First item: " + str(list[0]))`,
            `print("Length: " + str(len(list)))`,
        ].join("\n"),
        [
            [
                "output: <b>First item: 1</b>",
                "output: <b>Length: 6</b>",
                "output: <b>Last item: 21</b>",
            ],
        ],
        [
            `list = [1, 5, 9, 13, 17, 21]`,
            `print("First item: " + str(list[0]))`,
            `print("Length: " + str(len(list)))`,
            `print("Last item: " + str(list[len(list) - 1]))`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "30a",
        `Write a program that would create a list with the following textual values: "math", "history", "programming", and "art". Then use a while loop to display the items in the list one by one.`,
        [
            [
                "output: <b>math</b>",
                "output: <b>history</b>",
                "output: <b>programming</b>",
                "output: <b>art</b>",
            ],
        ],
        [
            `list = ["math", "history", "programming", "art"]`,
            `i = 0`,
            `while i < len(list):`,
            `    print(list[i])`,
            `    i += 1`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "30b",
        "Modify the program so that it would display the items in the list in reverse order.",
        [
            `list = ["math", "history", "programming", "art"]`,
            `i = 0`,
            `while i < len(list):`,
            `    print(list[i])`,
            `    i += 1`,
        ].join("\n"),
        [
            [
                "output: <b>art</b>",
                "output: <b>programming</b>",
                "output: <b>history</b>",
                "output: <b>math</b>",
            ],
        ],
        [
            `list = ["math", "history", "programming", "art"]`,
            `i = len(list) - 1`,
            `while i >= 0:`,
            `    print(list[i])`,
            `    i -= 1`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "31a",
        `Write a program that would create an empty list and then, inside a loop that would repeat for 10 times, ask the user to enter a number and then add it to the list. At the end, display the length of the list.`,
        [
            [
                "output: <b>Enter a number:</b>",
                "input: <b>13</b>",
                "output: <b>Enter a number:</b>",
                "input: <b>4</b>",
                "...",
                "output: <b>Enter a number:</b>",
                "input: <b>22</b>",
                "output: <b>Length: 10</b>",
            ],
        ],
        [
            `list = []`,
            `for i in range(10):`,
            `    num = int(input("Enter a number: "))`,
            `    list.append(num)`,
            `print("Length: " + str(len(list)))`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "31b",
        "After receiving the 10 numbers, use another loop to calculate the sum of all the numbers in the list and display the result.",
        [
            `list = []`,
            `for i in range(10):`,
            `    num = int(input("Enter a number: "))`,
            `    list.append(num)`,
            `print("Length: " + str(len(list)))`,
        ].join("\n"),
        [
            [
                "output: <b>Enter a number:</b>",
                "input: <b>13</b>",
                "output: <b>Enter a number:</b>",
                "input: <b>4</b>",
                "...",
                "output: <b>Enter a number:</b>",
                "input: <b>22</b>",
                "output: <b>Length: 10</b>",
            ],
        ],
        [
            `list = []`,
            `for i in range(10):`,
            `    num = int(input("Enter a number: "))`,
            `    list.append(num)`,
            `print("Length: " + str(len(list)))`,
            `sum = 0`,
            `for i in range(len(list)):`,
            `    sum += list[i]`,
            `print("Sum: " + str(sum))`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "32a",
        `Create an empty list called grades. Then, repeatedly add a random number between 50 to 100 to the list for a random number of times (between 15 and 25). Finally, use another loop to find the smallest number in the list and then display the smallest value.`,
        [["output: <b>Smallest: 54</b>"]],
        [
            `grades = []`,
            `for i in range(random.randint(500, 750)):`,
            `    grades.append(random.randint(50, 100))`,
            `smallest = grades[0]`,
            `for i in range(len(grades)):`,
            `    if grades[i] < smallest:`,
            `        smallest = grades[i]`,
            `print("Smallest: " + str(smallest))`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "32b",
        "Modify the code so that it would also find the largest number in the list and display the largest value as well.",
        [
            `grades = []`,
            `for i in range(random.randint(500, 750)):`,
            `    grades.append(random.randint(50, 100))`,
            `smallest = grades[0]`,
            `for i in range(len(grades)):`,
            `    if grades[i] < smallest:`,
            `        smallest = grades[i]`,
            `print("Smallest: " + str(smallest))`,
        ].join("\n"),
        [["output: <b>Smallest: 54</b>", "output: <b>Largest: 98</b>"]],
        [
            `grades = []`,
            `for i in range(random.randint(500, 750)):`,
            `    grades.append(random.randint(50, 100))`,
            `smallest = grades[0]`,
            `for i in range(len(grades)):`,
            `    if grades[i] < smallest:`,
            `        smallest = grades[i]`,
            `print("Smallest: " + str(smallest))`,
            `largest = grades[0]`,
            `for i in range(len(grades)):`,
            `    if grades[i] > largest:`,
            `        largest = grades[i]`,
            `print("Largest: " + str(largest))`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "33a",
        `Repeatedly ask the user to enter a movie name and add it to a list called <i>movies</i> until the user enters <b>stop</b>. At the end just display how many movies the user has entered.<br/><b>Note:</b> The list should not contain the stop word.`,
        [
            [
                "output: <b>Enter a movie name:</b>",
                "input: <b>spiderman</b>",
                "output: <b>Enter a movie name:</b>",
                "input: <b>rango</b>",
                "output: <b>Enter a movie name:</b>",
                "input: <b>stop</b>",
                "output: <b>You entered 3 movies.</b>",
            ],
        ],
        [
            `movies = []`,
            `movie = input("Enter a movie name: ")`,
            `while movie != "stop":`,
            `    movies.append(movie)`,
            `    movie = input("Enter a movie name: ")`,
            `print("You entered " + str(len(movies)) + " movies.")`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "33b",
        "Ask the user to enter a movie name and then using another loop, search if the new movie is inside the list or not.",
        [
            `movies = []`,
            `movie = input("Enter a movie name: ")`,
            `while movie != "stop":`,
            `    movies.append(movie)`,
            `    movie = input("Enter a movie name: ")`,
            `print("You entered " + str(len(movies)) + " movies.")`,
        ].join("\n"),
        [
            [
                "output: <b>Enter a movie name:</b>",
                "input: <b>spiderman</b>",
                "output: <b>Enter a movie name:</b>",
                "input: <b>rango</b>",
                "output: <b>Enter a movie name:</b>",
                "input: <b>stop</b>",
                "output: <b>You entered 3 movies.</b>",
                "output: <b>Enter a movie name to search for:</b>",
                "input: <b>spiderman</b>",
                "output: <b>Spiderman is already in the list.</b>",
            ],
        ],
        [
            `movies = []`,
            `movie = input("Enter a movie name: ")`,
            `while movie != "stop":`,
            `    movies.append(movie)`,
            `    movie = input("Enter a movie name: ")`,
            `print("You entered " + str(len(movies)) + " movies.")`,
            `movie = input("Enter a movie name to search for: ")`,
            `for i in range(len(movies)):`,
            `    if movie == movies[i]:`,
            `        print(movie + " is already in the list.")`,
        ].join("\n"),
        60 * 4
    ),
];

export const getTaskSequenceFromTaskId = (taskId: string): number =>
    CodingTasks.findIndex((task) => task.id === taskId);

export const getTaskFromTaskId = (taskId: string): Task | undefined =>
    CodingTasks.find((task) => task.id === taskId);

(function checkUniqueIds() {
    const taskIds = CodingTasks.map((task) => task.id);

    if (new Set(taskIds).size !== taskIds.length) {
        throw new Error("Task ids must be unique");
    }
})();
