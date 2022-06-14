enum TaskType {
    Authoring = "authoring",
    Modifying = "modifying",
    MultipleChoice = "multipleChoice",
}

abstract class Task {
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

class AuthoringTask extends Task {
    constructor(id: string, title: string, description: string) {
        super(id, title, description, TaskType.Authoring);
    }
}

class ModifyingTask extends Task {
    starterCode: string;

    constructor(
        id: string,
        title: string,
        description: string,
        starterCode: string
    ) {
        super(id, title, description, TaskType.Modifying);

        this.starterCode = starterCode;
    }
}

class MultipleChoiceTask extends Task {
    constructor(id: string, title: string, description: string) {
        super(id, title, description, TaskType.MultipleChoice);
    }
}

export const Tasks = [
    new AuthoringTask(
        "1a",
        "Display message",
        "Write a program that will display the following message: <b>Hello World!</b>"
    ),
    new ModifyingTask(
        "1b",
        "Change message",
        "Modify the given program so that it would display the following message instead: <b>My first program!<b/>",
        `print("Hello World!")`
    ),
    new AuthoringTask(
        "2a",
        "Set variable",
        "Write a program that will first create a variable called <b>name</b> and set its value to <b>John</b>. Then, display the value of the variable."
    ),
    new ModifyingTask(
        "2b",
        "Change variable",
        "Modify the given program's variable name from <b>name</b> to <b>first_name</b>.",
        `name = "John"
        print(name)`
    ),
];
