export enum TaskType {
    Authoring = "authoring",
    Modifying = "modifying",
    ShortAnswer = "shortAnswer",
    MultipleChoice = "multipleChoice",
}

export interface IUserTask {
    userId: string;
    taskId: string;
    userTaskId: string;
    startedAt: Date;
    finishedAt: Date;
    data: any;
}

export abstract class Task {
    id: string;
    title: string;
    description: string;

    type: TaskType;

    constructor(
        id: string,
        title: string,
        description: string,
        type: TaskType
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
    }
}

class CodeCheckResult {
    passed: boolean;
    message?: string;

    constructor(passed: boolean, message: string) {
        this.passed = passed;
        this.message = message;
    }
}

export class AuthoringTask extends Task {
    timeLimit: number;

    constructor(
        id: string,
        title: string,
        description: string,
        timeLimit: number
    ) {
        super(id, title, description, TaskType.Authoring);

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

    constructor(
        id: string,
        title: string,
        description: string,
        starterCode: string,
        timeLimit: number
    ) {
        super(id, title, description, TaskType.Modifying);

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

    constructor(
        id: string,
        title: string,
        description: string,
        choices: string[]
    ) {
        super(id, title, description, TaskType.MultipleChoice);

        this.choices = choices;
    }
}

export class ShortAnswerTask extends Task {
    constructor(id: string, title: string, description: string) {
        super(id, title, description, TaskType.ShortAnswer);
    }
}

export const getNextTask = (completedTasks: IUserTask[]): Task => {
    if (completedTasks === undefined || completedTasks.length === 0)
        return CodingTasks[0];

    const lastCompletedTaskId =
        completedTasks[completedTasks.length - 1].taskId;
    const lastCompletedTaskIndex = CodingTasks.findIndex(
        (task) => task.id === lastCompletedTaskId
    );

    return CodingTasks[lastCompletedTaskIndex + 1];
};

export const CodingTasks = [
    // using print
    new AuthoringTask(
        "1a",
        "Display message",
        "Write a program that will display the following message: <b>Hello World!</b>",
        60 * 4

        // check output equals to the expected output
    ),
    new ModifyingTask(
        "1b",
        "Change message",
        "Modify the given program so that it would display the following message instead: <b>My first program!<b/>",
        `print("Hello World!")`,
        60 * 4

        // check output equals to the expected output
    ),

    new ShortAnswerTask(
        "6",
        "Explain what this code does?",
        `Read the following Python code and briefly explain what it does:\n<pre class="code-block" data-lang="python">x = 10\ny = 50\nt = x\nx = y\ny = t\n</pre>`
    ),

    // set variable -> print value
    new AuthoringTask(
        "2a",
        "Set variable",
        "Write a program that will first create a variable called <b>name</b> and set its value to <b>John</b>. Then, display the value of the variable.",
        60 * 4

        // check output equals to the expected output
        // check if the code is using a variable
    ),
    new ModifyingTask(
        "2b",
        "Change variable",
        "Modify the given program's variable name from <b>name</b> to <b>first_name</b>.",
        [`name = "John"`, `print(name)`].join("\n"),
        60 * 4

        // check output equals to the expected output
        // check if the code is using a variable called first_name (or with an underscore)
    ),

    // join text
    new AuthoringTask(
        "3a",
        "My name is...",
        "Write a program that would create a variable called <b>name</b> and set its value to your name. Then, display the message <b>My name is <i>name</i></b>.",
        60 * 4

        // check if program has a variable
        // check if program has a print statement
        // check if program joins text using the plus operator or the , operator
    ),
    new ModifyingTask(
        "3b",
        "My name is...",
        "Modify the given program so that it would display the following message: <b>Hi, <i>name</i>! Nice to meet you!</b>.",
        [`name = "John"`, `print("My name is " + name)`].join("\n"),
        60 * 4
    ),

    // input -> print + join
    new AuthoringTask(
        "4a",
        "What's your name?",
        "Write a program that would ask the user their name and then display the message <b>Hello, <i>name</i>!</b>.",
        60 * 4
    ),
    new ModifyingTask(
        "4b",
        "What's your name?",
        "Modify the following program so that it would ask the user their family name in addition to their given name and display the message <b>Hello, <i>first_name</i> <i>last_name</i>!</b>.",
        [
            `name = input("What is your name? ")`,
            `print("Hello, " + name + "!")`,
        ].join("\n"),
        60 * 4
    ),

    new MultipleChoiceTask(
        "5",
        "Choose the correct answer",
        `Which option correctly explains the difference between the two following codes? <pre class="code-block" data-lang="python">something = input("enter something:")\nprint(something)</pre> and <pre class="code-block" data-lang="python">print(input("enter something:"))</pre>`,
        ["option one", "option two", "option three", "option four"]
    ),
];

export const getTaskFromTaskId = (taskId: string): Task | undefined =>
    CodingTasks.find((task) => task.id === taskId);

(function checkUniqueIds() {
    const taskIds = CodingTasks.map((task) => task.id);

    if (new Set(taskIds).size !== taskIds.length) {
        throw new Error("Task ids must be unique");
    }
})();
