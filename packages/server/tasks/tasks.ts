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
    output: Array<Array<string>>;
    solution: string;

    constructor(
        id: string,
        title: string,
        description: string,
        output: Array<Array<string>>,
        solution: string,
        timeLimit: number
    ) {
        super(id, title, description, TaskType.Authoring);

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
        title: string,
        description: string,
        starterCode: string,
        output: Array<Array<string>>,
        solution: string,
        timeLimit: number
    ) {
        super(id, title, description, TaskType.Modifying);

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
        [["output: <b>I'm Wall-E!</b>"]],
        [`print("I'm Wall-E!")`].join("\n"),
        60 * 3

        // check output equals to the expected output
    ),
    new ModifyingTask(
        "1b",
        "Beep Boop",
        "Modify the given program so that it would display another message after the first one: <b>Beep Boop</b>",
        `print("I am a robot!")`,
        [["output: <b>Beep Boop</b>"]],
        [`print("I'm Wall-E!")`, `print("Beep Boop")`].join("\n"),
        60 * 2

        // check output equals to the expected output
    ),

    // set str variable -> print value
    new AuthoringTask(
        "2a",
        "Variable Wall-E",
        "Write a program that will first create a variable called <i>name</i> and set its value to <b>Wall-E</b>. Then, display the value of the variable.",
        [["output: <b>Wall-E</b>"]],
        [`name = "Wall-E"`, `print(name)`].join("\n"),
        60 * 4

        // check output equals to the expected output
        // check if the code is using a variable
    ),
    new ModifyingTask(
        "2b",
        "Change variable",
        "Modify the given program's variable name from <i>name</i> to <i>robot_name</i>.",
        [`name = "Wall-E"`, `print(name)`].join("\n"),
        [["output: <b>Wall-E</b>"]],
        [`robot_name = "Wall-E"`, `print(robot_name)`].join("\n"),
        60 * 4

        // check output equals to the expected output
        // check if the code is using a variable called first_name (or with an underscore)
    ),

    // join text
    new AuthoringTask(
        "3a",
        "I am Wall-E",
        "Write a program that would create a variable called <i>name</i> and set its value to <b>Wall-E</b>. Then, display the message <b>My name is <i>name</i></b>.",
        [[`output: <b>My name is Wall-E</b>`]],
        [`name = "Wall-E"`, `print("My name is " + name)`].join("\n"),
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
        [["output: <b>Hi, Wall-E! Nice to meet you!</b>"]],
        [`name = "Wall-E"`, `print("Hi, " + name + "! Nice to meet you!)`].join(
            "\n"
        ),
        60 * 4
    ),

    // input -> print + join
    new AuthoringTask(
        "4a",
        "What's your name?",
        "Write a program that would ask the user their name and then store their name into a variable called <i>name</i>. Finally, display the message <b>Hello, <i>name</i>!</b>.",
        [
            [
                "output: <b>What's your name?</b>",
                "input: <b>Donald</b>",
                "output: <b>Hello, Donald!</b>",
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
        [
            [
                "output: <b>What's your name?</b>",
                "input: <b>Donald</b>",
                "output: <b>What's your family name?</b>",
                "input: <b>Trump</b>",
                "output: <b>Hello, Donald Trump!</b>",
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

    // join str + static var -> update variable -> display var
    new AuthoringTask(
        "5a",
        "Robot food",
        "Write a program that would create a variable called <i>food1</i> and set its value to <b>nuts</b>, and another variable called <i>food2</i> set to <b>bolts</b>. Then create a third variable called <i>robot_food</i> and set it to the value of <b><i>food1</i> and <i>food2</i></b>. Finally, display the message <b>I like <i>robot_food</i>.</b>.",
        [[`output: <b>I like nuts and bolts</b>`]],
        [
            `food1 = "nuts"`,
            `food2 = "bolts"`,
            `robot_food = food1 + " and " + food2`,
            `print("I like " + robot_food + ".")`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "5b",
        "More robot food",
        "Modify the following program so that it would include a third food (called <i>food3</i>) set to <b>screws</b>. Then modify <i>robot_food</i> to be the value of <b><i>food1</i>, <i>food2</i> and <i>food3</i></b>. Finally display the message <b>I like <i>robot_food</i>.</b>.",
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
        60 * 4
    ),

    // numbers -> add -> print
    new AuthoringTask(
        "6a",
        "Numbers",
        "Write a program that would set a variable called <i>num1</i> to <b>10</b>, and another variable called <i>num2</i> to <b>20</b>. Then, add the values of <i>num1</i> and <i>num2</i> and store the result in a variable called <i>num3</i>. Finally, display the value of <i>num3</i>.",
        [["output: <b>30</b>"]],
        [`num1 = 10`, `num2 = 20`, `num3 = num1 + num2`, `print(num3)`].join(
            "\n"
        ),
        60 * 4
    ),
    new ModifyingTask(
        "6b",
        "More numbers",
        "Modify the following program so that it would store the multiplication of <i>num1</i> and <i>num2</i> into a new variable called <i>num4</i> and then display the value of <i>num3</i> and <i>num4</i> separately.",
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
        60 * 4
    ),

    // random number -> print
    new AuthoringTask(
        "7a",
        "Random number",
        "Write a program that would generate a random number between 1 and 10 and set it to a variable called <i>num</i>. Then, display the value of <i>num</i>.",
        [["output: <b>3</b>"], ["output: <b>5</b>"], ["output: <b>7</b>"]],
        [`import random`, `num = random.randint(1, 10)`, `print(num)`].join(
            "\n"
        ),
        60 * 4
    ),
    new ModifyingTask(
        "7b",
        "More random numbers",
        "Modify the following program so that it would generate a second random number between 50 and 100 and set it to another variable named <i>num2</i>. Then, display the value of <i>num2</i> below the value of <i>num</i>.",
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
        "Numbers and text",
        "Write a program that would generate a random number between 1 and 6 and set it to a variable named <i>roll</i>. Then, create another variable called <i>message</i> and set it to the value of <b>You rolled: <i>roll</i></b>. Finally, display the value of <i>message</i>.",
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
        "Calculator",
        "Write a program that would ask the user for two numbers and then display the sum of them.",
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
        "Full calculator",
        "Modify the following program so that it would display the subtraction, multiplication, and division of the two numbers as well.",
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
        60 * 3
    ),

    new AuthoringTask(
        "10a",
        "Check random",
        "Write a program that would first generate a random number between 1 and 6 and assign it to a variable called <i>roll</i>. Then display the message <b>rolled six</b> only if the number is equal to six.",
        [["output: <b>rolled six</b>"]],
        [
            `import random`,
            `roll = random.randint(1, 6)`,
            `if roll == 6:`,
            `    print("rolled six")`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "10b",
        "Check two randoms",
        "Modify the following program so that it would generate a second random number between 1 and 6 and set it to another variable named <i>roll2</i>. Then, display the message <b>rolled the same</b> only if both rolls were equal to each other.",
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
        60 * 4
    ),

    new AuthoringTask(
        "11a",
        "Both Rolled Six",
        "Write a program that would first generate two random numbers between 1 and 6 and then display the message <b>both rolled six</b> only if both are equal to six.",
        [["output: <b>both rolled six</b>"]],
        [
            `import random`,
            `roll = random.randint(1, 6)`,
            `roll2 = random.randint(1, 6)`,
            `if roll == 6 and roll2 == 6:`,
            `    print("both rolled six")`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "11b",
        "All three rolled six",
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
        60 * 4
    ),

    new AuthoringTask(
        "12a",
        "Check Input",
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
        60 * 4
    ),
    new ModifyingTask(
        "12b",
        "Modify Check Input",
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
        60 * 4
    ),

    new AuthoringTask(
        "13a",
        "Check Input 2",
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
        60 * 4
    ),
    new ModifyingTask(
        "13b",
        "Modify Check Input 2",
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
        "Check Number and Word",
        "Write a program that would ask the user to enter one of the words one, two, or three. Then ask the user to enter one of the numbers 1, 2, or 3. Then check if the word and the numbers match so for example if they enter one and 1 it should display <b>correct</b> otherwise it should display <b>incorrect</b>.",
        [
            [
                "output: <b>enter one of the words one, two, or three:</b>",
                "input: <b>two</b>",
                "output: <b>enter one of the numbers 1, 2, or 3:</b>",
                "input: <b>2</b>",
                "output: <b>correct</b>",
            ],
            [
                "output: <b>enter one of the words one, two, or three:</b>",
                "input: <b>three</b>",
                "output: <b>enter one of the numbers 1, 2, or 3:</b>",
                "input: <b>1</b>",
                "output: <b>incorrect</b>",
            ],
        ],
        [
            `word = input("enter one of the words one, two, or three: ")`,
            `num = int(input("enter one of the numbers 1, 2, or 3: "))`,
            `if word == "one" and num == 1:`,
            `    print("correct")`,
            `if word == "two" and num == 2:`,
            `    print("correct")`,
            `if word == "three" and num == 3:`,
            `    print("correct")`,
            `else:`,
            `    print("incorrect")`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "14b",
        "Modify Check Number and Word",
        "Modify the following program so that whenever the answer is correct (the word and the number match) then it should display the value of the number multiplied by 10.",
        [
            `word = input("enter one of the words one, two, or three: ")`,
            `num = int(input("enter one of the numbers 1, 2, or 3: "))`,
            `if word == "one" and num == 1:`,
            `    print("correct")`,
            `if word == "two" and num == 2:`,
            `    print("correct")`,
            `if word == "three" and num == 3:`,
            `    print("correct")`,
            `else:`,
            `    print("incorrect")`,
        ].join("\n"),
        [
            [
                "output: <b>enter one of the words one, two, or three:</b>",
                "input: <b>two</b>",
                "output: <b>enter one of the numbers 1, 2, or 3:</b>",
                "input: <b>2</b>",
                "output: <b>correct</b>",
                "output: <b>20</b>",
            ],
            [
                "output: <b>enter one of the words one, two, or three:</b>",
                "input: <b>three</b>",
                "output: <b>enter one of the numbers 1, 2, or 3:</b>",
                "input: <b>1</b>",
                "output: <b>incorrect</b>",
            ],
        ],
        [
            `word = input("enter one of the words one, two, or three: ")`,
            `num = int(input("enter one of the numbers 1, 2, or 3: "))`,
            `if word == "one" and num == 1:`,
            `    print("correct")`,
            `    print(num * 10)`,
            `if word == "two" and num == 2:`,
            `    print("correct")`,
            `    print(num * 10)`,
            `if word == "three" and num == 3:`,
            `    print("correct")`,
            `    print(num * 10)`,
            `else:`,
            `    print("incorrect")`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "15a",
        "Full Calculator",
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
        60 * 4
    ),
    new ModifyingTask(
        "15b",
        "Modify Full Calculator",
        "Instead of asking the user to enter two numbers, modify the program so that it would generate two numbers between 1 and 1000, display them one by one, and then ask the user to enter an operator and then perform the appropriate operation.",
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
        60 * 4
    ),

    new AuthoringTask(
        "16a",
        "Divisble By Two",
        "Ask the user to enter a number. Check if it is even or odd. If it is even, then display the number divided by two. If it is odd, just display the number.<br/>Note: a number is even if it's remainder when divided by two is 0, and a number is odd if it's remainder when divided by two is 1.",
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>41</b>",
                "output: <b>41</b>",
            ],
            [
                "output: <b>enter a number:</b>",
                "input: <b>28</b>",
                "output: <b>14</b>",
            ],
        ],
        [
            `num = int(input("enter a number: "))`,
            `if num % 2 == 0:`,
            `    print(num / 2)`,
            `else:`,
            `    print(num)`,
        ].join("\n"),
        60 * 4
    ),
    new ModifyingTask(
        "16b",
        "Divisble By Other Number",
        "Instead of checking if the number is divisble by two, check if the number is divisible by each of the prime numbers from 1 to 10 (1, 2, 3, 5, 7). At the end, display all the prime numbers (between 1 and 10) that the number is divisible by.",
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
                "output: <b>2</b>",
                "output: <b>3</b>",
                "output: <b>7</b>",
            ],
        ],
        [
            `num = int(input("enter a number: "))`,
            `if num % 2 == 0:`,
            `    print(2)`,
            `if num % 3 == 0:`,
            `    print(3)`,
            `if num % 5 == 0:`,
            `    print(5)`,
            `if num % 7 == 0:`,
            `    print(7)`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "17a",
        "Repeat and say",
        "display hello world 10 times using a loop.",
        [
            [
                "output: <b>hello world</b>",
                "output: <b>hello world</b>",
                "output: <b>hello world</b>",
                "...",
                "output: <b>hello world</b>",
            ],
        ],
        [`for i in range(3):`, `    print("hello world")`].join("\n"),
        60 * 4
    ),

    new ModifyingTask(
        "17b",
        "Repeat and ask",
        "Modify the code so that it would instead repeat the following program for 5 times: ask the user for their name, display hello, name. At the end, display the message: program finished, only once.",
        [`for i in range(2):`, `    print("hello world")`].join("\n"),
        [
            [
                "output: <b>enter your name:</b>",
                "input: <b>joe</b>",
                "output: <b>hello, joe</b>",
                "...",
                "output: <b>enter your name:</b>",
                "input: <b>dan</b>",
                "output: <b>hello, dan</b>",
                "output: <b>program finished</b>",
            ],
        ],
        [
            `for i in range(2):`,
            `    name = input("enter your name: ")`,
            `    print("hello, " + name)`,
            `print("program finished")`,
        ].join("\n"),
        60 * 4
    ),

    new AuthoringTask(
        "18a",
        "All numbers",
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
        60 * 4
    ),
    new ModifyingTask(
        "18b",
        "All numbers from input",
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
        60 * 4
    ),

    new AuthoringTask(
        "19a",
        "Sum numbers",
        "Write a program that would ask the user to enter a number, then use a loop to calculate the sum of all numbers from 1 to the given number. Finally, display the sum.",
        [
            [
                "output: <b>enter a number:</b>",
                "input: <b>50</b>",
                "output: <b>1225</b>",
            ],
        ],
        [
            `num = int(input("enter a number: "))`,
            `sum_numbers = 0`,
            `for i in range(1, num + 1):`,
            `    sum_numbers += i`,
            `print(sum_numbers)`,
        ].join("\n"),
        60 * 4
    ),

    new ModifyingTask(
        "19b",
        "Sum numbers",
        "Modify the program so that it would only calculate the sum of all even numbers between 1 to the given number. Finally, display the sum.",
        [
            `num = int(input("enter a number: "))`,
            `sum_numbers = 0`,
            `for i in range(1, num + 1):`,
            `    sum_numbers += i`,
            `print(sum_numbers)`,
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
            `sum_numbers = 0`,
            `for i in range(1, num + 1):`,
            `    if i % 2 == 0:`,
            `        sum_numbers += i`,
            `print(sum_numbers)`,
        ].join("\n"),
        60 * 4
    ),

    // new AuthoringTask(
    //     "16a",
    //     "Open Ended Task",
    //     "Use the code generator to create any program that you want to!",
    //     [[]],
    //     [].join("\n"),
    //     60 * 4
    // ),

    // new ModifyingTask(
    //     "16b",
    //     "Open Ended Task",
    //     "Use the documentation to create any program that you want to!",
    //     "",
    //     [[]],
    //     [].join("\n"),
    //     60 * 4
    // ),
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
