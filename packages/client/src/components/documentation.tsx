import { Fragment, useState } from "react";

import { Button } from "./button";
import { BooleansDoc } from "./docs/booleans-doc";
import { CastingDoc } from "./docs/casting-doc";
import { CommentsDoc } from "./docs/comments-doc";
import { DataTypesDoc } from "./docs/data-types-doc";
import { ForLoopDoc } from "./docs/for-loop-doc";
import { GlobalVariablesDoc } from "./docs/global-variables-doc";
import { IfElseDoc } from "./docs/if-esle-doc";
import { ListAddItemDoc } from "./docs/list-add-item";
import { ListLoopThroughDoc } from "./docs/list-loop-doc";
import { ListOperationsDoc } from "./docs/list-operations";
import { ListRemoveItemDoc } from "./docs/list-remove";
import { ListsDoc } from "./docs/lists-doc";
import { NumbersDoc } from "./docs/numbers-doc";
import { OperatorsDoc } from "./docs/operators-doc";
import { OutputVarDoc } from "./docs/output-variables-doc";
import { RandomDoc } from "./docs/random-doc";
import { StringsConcatenationDoc } from "./docs/strings-concatenation";
import { StringsDoc } from "./docs/strings-doc";
import { SyntaxDoc } from "./docs/syntax-doc";
import { UserInputDoc } from "./docs/user-input-doc";
import { VariablesDoc } from "./docs/variables-doc";
import { VariableNamesDoc } from "./docs/variables-names-doc";
import { WhileLoopsDoc } from "./docs/while-loops-doc";

export const Documentation = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState("syntax");

    return (
        <div>
            <p>
                here you could use the provided documentations for Python to
                learn about different concepts
            </p>
            <Button
                type="block"
                onClick={() => {
                    setShowModal(true);
                }}
            >
                Open Documentation
            </Button>

            <Fragment>
                <div
                    className={`modal-background + ${
                        showModal ? "active" : ""
                    }`}
                    onClick={() => {
                        setShowModal(false);
                    }}
                ></div>
                <section
                    className={`doc-container modal-content + ${
                        showModal ? "active" : ""
                    } `}
                >
                    <div className="doc-navigation">
                        {docs.map((doc, index) => (
                            <DocButton
                                selected={selectedContent === doc.id}
                                key={doc.id}
                                name={doc.name}
                                id={doc.id}
                                onClick={() => {
                                    setSelectedContent(doc.id);
                                    console.log(doc.id);
                                }}
                            />
                        ))}
                    </div>
                    <div className="doc-content">
                        {getContent(selectedContent)}
                    </div>
                </section>
            </Fragment>
        </div>
    );
};

const docs: Array<IDocButton> = [
    { id: "syntax", name: "syntax" },
    { id: "comments", name: "comments" },
    { id: "variables", name: "variables" },
    { id: "variable-names", name: "variable names" },
    { id: "output-variables", name: "output variables" },
    { id: "global-variables", name: "global variables" },
    { id: "data-types", name: "data types" },
    { id: "numbers", name: "numbers" },
    { id: "random", name: "random" },
    { id: "casting", name: "casting" },
    { id: "strings-concatenation", name: "strings concatenation" },
    { id: "strings", name: "strings" },
    { id: "operators", name: "operators" },
    { id: "booleans", name: "booleans" },
    { id: "lists", name: "lists" },
    { id: "list-add-item", name: "list add item" },
    { id: "list-remove-item", name: "list remove item" },
    { id: "list-loop-through", name: "list loop through" },
    { id: "list-operations", name: "list operations" },
    { id: "if-else", name: "if-else" },
    { id: "while-loops", name: "while loops" },
    { id: "for-loops", name: "for loops" },
    { id: "user-input", name: "user input" },
];

interface IDocButton {
    name: string;
    id: string;
    selected?: boolean;
    onClick?: () => void;
}

const DocButton = (props: IDocButton) => {
    return (
        <div
            className={`doc-button ${
                props.selected ? "doc-button-selected" : ""
            }`}
            onClick={() => {
                if (props.onClick) props.onClick();
            }}
        >
            {props.name}
        </div>
    );
};

const getContent = (docId: string) => {
    switch (docId) {
        case "syntax":
            return <SyntaxDoc />;

        case "comments":
            return <CommentsDoc />;

        case "variables":
            return <VariablesDoc />;

        case "variable-names":
            return <VariableNamesDoc />;

        case "output-variables":
            return <OutputVarDoc />;

        case "global-variables":
            return <GlobalVariablesDoc />;

        case "booleans":
            return <BooleansDoc />;

        case "casting":
            return <CastingDoc />;

        case "data-types":
            return <DataTypesDoc />;

        case "for-loops":
            return <ForLoopDoc />;

        case "if-else":
            return <IfElseDoc />;

        case "list-add-item":
            return <ListAddItemDoc />;

        case "list-loop-through":
            return <ListLoopThroughDoc />;

        case "list-operations":
            return <ListOperationsDoc />;

        case "list-remove-item":
            return <ListRemoveItemDoc />;

        case "lists":
            return <ListsDoc />;

        case "numbers":
            return <NumbersDoc />;

        case "operators":
            return <OperatorsDoc />;

        case "random":
            return <RandomDoc />;

        case "strings-concatenation":
            return <StringsConcatenationDoc />;

        case "strings":
            return <StringsDoc />;

        case "user-input":
            return <UserInputDoc />;

        case "while-loops":
            return <WhileLoopsDoc />;
    }
};
