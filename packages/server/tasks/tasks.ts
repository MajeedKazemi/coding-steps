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
    // using print
    new AuthoringTask(
        "1a",
        "I am a robot!",
        "Write a program that will display the following message: <b>I'm Wall-E!</b>",
        60 * 3

        // check output equals to the expected output
    ),
    new ModifyingTask(
        "1b",
        "Beep Boop",
        "Modify the given program so that it would display another message after the first one: <b>Beep Boop</b>",
        `print("I am a robot!")`,
        60 * 2

        // check output equals to the expected output
    ),

    // set str variable -> print value
    new AuthoringTask(
        "2a",
        "Variable Wall-E",
        "Write a program that will first create a variable called <i>name</i> and set its value to <b>Wall-E</b>. Then, display the value of the variable.",
        60 * 4

        // check output equals to the expected output
        // check if the code is using a variable
    ),
    new ModifyingTask(
        "2b",
        "Change variable",
        "Modify the given program's variable name from <i>name</i> to <i>robot_name</i>.",
        [`name = "Wall-E"`, `print(name)`].join("\n"),
        60 * 4

        // check output equals to the expected output
        // check if the code is using a variable called first_name (or with an underscore)
    ),

    // join text
    new AuthoringTask(
        "3a",
        "I am Wall-E",
        "Write a program that would create a variable called <i>name</i> and set its value to <b>Wall-E</b>. Then, display the message <b>My name is <i>name</i></b>.",
        60 * 4

        // check if program has a variable
        // check if program has a print statement
        // check if program joins text using the plus operator or the , operator
    ),
    new ModifyingTask(
        "3b",
        "Hi Wall-E",
        "Modify the given program so that it would display the following message: <b>Hi, <i>name</i>! Nice to meet you!</b>.",
        [`name = "Wall-E"`, `print("My name is " + name)`].join("\n"),
        60 * 4
    ),

    // input -> print + join
    new AuthoringTask(
        "4a",
        "What's your name?",
        "Write a program that would ask the user their name and then store their name into a variable called <i>name</i>. Finally, display the message <b>Hello, <i>name</i>!</b>.",
        60 * 4
    ),
    new ModifyingTask(
        "4b",
        "What's your name?",
        "Modify the following program so that it would ask the user their family name (storing into <i>family_name</i>) in addition to their given name and display the message <b>Hello, <i>name</i> <i>family_name</i>!</b>.",
        [
            `name = input("What is your name? ")`,
            `print("Hello, " + name + "!")`,
        ].join("\n"),
        60 * 4
    ),

    // join str + static var -> update variable -> display var
    new AuthoringTask(
        "5a",
        "Robot food",
        "Write a program that would create a variable called <i>food1</i> and set its value to <b>nuts</b>, and another variable called <i>food2</i> set to <b>bolts</b>. Then create a third variable called <i>robot_food</i> and set it to the value of <b><i>food1</i> and <i>food2</i></b>. Finally, display the message <b>I like <i>robot_food</i>.</b>.",
        60 * 4
    ),
    new ModifyingTask(
        "5b",
        "More robot food",
        "Modify the following program so that it would include a third food (called <i>food3</i>) set to <b>screws</b>. Then modify <i>robot_food</i> to be the value of <b><i>food1</i>, <i>food2</i> and <i>food3</i></b>. Finally display the message <b>I like <i>robot_food</i>.</b>.",
        [
            `food1 = "nuts"`,
            `food1 = "bolts"`,
            `robot_food = food1 + " and " + food2`,
            `print("I like " + robot_food + ".")`,
        ].join("\n"),
        60 * 4
    ),

    // numbers -> add -> print
    new AuthoringTask(
        "6a",
        "Numbers",
        "Write a program that would set a variable called <i>num1</i> to <b>10</b>, and another variable called <i>num2</i> to <b>20</b>. Then, add the values of <i>num1</i> and <i>num2</i> and store the result in a variable called <i>num3</i>. Finally, display the value of <i>num3</i>.",
        60 * 4
    ),
    new ModifyingTask(
        "6b",
        "More numbers",
        "Modify the following program so that it would store the multiplication of <i>num1</i> and <i>num2</i> into a new variable called <i>num4</i> and then display the value of <i>num3</i> and <i>num4</i> separately.",
        [`num1 = 10`, `num2 = 20`, `num3 = num1 + num2`, `print(num3)`].join(
            "\n"
        ),
        60 * 4
    ),

    // random number -> print
    new AuthoringTask(
        "7a",
        "Random number",
        "Write a program that would generate a random number between 1 and 10 and set it to a variable called <i>num</i>. Then, display the value of <i>num</i>.",
        60 * 4
    ),
    new ModifyingTask(
        "7b",
        "More random numbers",
        "Modify the following program so that it would generate a second random number between 50 and 100 and set it to another variable named <i>num2</i>. Then, display the value of each random number separately.",
        [`import random`, `num = random.randint(1, 10)`, `print(num)`].join(
            "\n"
        ),
        60 * 4
    ),

    // random number -> print
    new AuthoringTask(
        "8a",
        "Numbers and text",
        "Write a program that would generate a random number between 1 and 6 and set it to a variable named <i>roll</i>. Then, create another variable called <i>message</i> and set it to the value of <b>You rolled: <i>roll</i></b>. Finally, display the value of <i>message</i>.",
        60 * 4
    ),
    new ModifyingTask(
        "8b",
        "Modify numbers and text",
        "Modify the following program so that it would generate a second random number between 1 and 6 and set it to another variable named <i>roll2</i>. Then modify the message to be the value of <b>You rolled: <i>roll</i> and <i>roll2</i></b>.",
        [
            `import random`,
            `roll = random.randint(1, 6)`,
            `message = "You rolled: " + str(roll)`,
            `print(message)`,
        ].join("\n"),
        60 * 4
    ),

    // random number -> print
    new AuthoringTask(
        "9a",
        "Calculator",
        "Write a program that would ask the user for two numbers and then display the sum of them.",
        60 * 4
    ),
    new ModifyingTask(
        "9b",
        "Full calculator",
        "Modify the following program so that it would display the subtraction, multiplication, and division of the two numbers as well.",
        [
            `num1 = int(input("Enter a number: "))`,
            `num2 = int(input("Enter another number: "))`,
            `print(num1 + num2)`,
        ].join("\n"),
        60 * 4
    ),

    // str() and int()
    // get input -> convert to int -> print message
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
