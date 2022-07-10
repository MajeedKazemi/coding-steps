import { Fragment, useContext, useState } from "react";
import { AuthContext } from "../context";
import { DocEventType, log, LogType } from "../utils/logger";

import { Button } from "./button";
import { DocButton, IDocButton } from "./doc-button";
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

interface IPropsDocumentation {
    taskId: string;
}

export const Documentation = (props: IPropsDocumentation) => {
    const { context } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [selectedPageId, setSelectedPageId] = useState("intro");
    const [selectedSectionId, setSelectedSectionId] = useState("");

    const handleSectionChange = (prev: string, next: string) => {
        if (prev !== "") {
            log(props.taskId, context?.user?.id, LogType.DocEvent, {
                type: DocEventType.CloseSection,
                section: prev,
            });
        }

        if (next !== "") {
            log(props.taskId, context?.user?.id, LogType.DocEvent, {
                type: DocEventType.OpenSection,
                section: next,
            });
        }

        setSelectedSectionId(next);
    };

    const getContentFromId = (pageId: string) => {
        switch (pageId) {
            case "intro":
                return (
                    <SyntaxDoc
                        pageId="syntax"
                        onSectionChange={handleSectionChange}
                    />
                );

            case "syntax":
                return (
                    <SyntaxDoc
                        pageId="syntax"
                        onSectionChange={handleSectionChange}
                    />
                );

            case "comments":
                return (
                    <CommentsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "variables":
                return (
                    <VariablesDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "variable-names":
                return (
                    <VariableNamesDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "output-variables":
                return (
                    <OutputVarDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "global-variables":
                return (
                    <GlobalVariablesDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "booleans":
                return (
                    <BooleansDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "casting":
                return (
                    <CastingDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "data-types":
                return (
                    <DataTypesDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "for-loops":
                return (
                    <ForLoopDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "if-else":
                return (
                    <IfElseDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "list-add-item":
                return (
                    <ListAddItemDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "list-loop-through":
                return (
                    <ListLoopThroughDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "list-operations":
                return (
                    <ListOperationsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "list-remove-item":
                return (
                    <ListRemoveItemDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "lists":
                return (
                    <ListsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "numbers":
                return (
                    <NumbersDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "operators":
                return (
                    <OperatorsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "random":
                return (
                    <RandomDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "strings-concatenation":
                return (
                    <StringsConcatenationDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "strings":
                return (
                    <StringsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "user-input":
                return (
                    <UserInputDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );

            case "while-loops":
                return (
                    <WhileLoopsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                );
        }
    };

    return (
        <div>
            <p>
                here you could use the provided documentations for Python to
                learn about different concepts
            </p>
            <Button
                type="block"
                onClick={() => {
                    log(props.taskId, context?.user?.id, LogType.DocEvent, {
                        type: DocEventType.OpenDocModal,
                    });
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

                        log(props.taskId, context?.user?.id, LogType.DocEvent, {
                            type: DocEventType.CloseDocModal,
                        });

                        if (selectedPageId !== "intro") {
                            log(
                                props.taskId,
                                context?.user?.id,
                                LogType.DocEvent,
                                {
                                    type: DocEventType.ClosePage,
                                    page: selectedPageId,
                                }
                            );
                        }

                        if (selectedSectionId !== "") {
                            log(
                                props.taskId,
                                context?.user?.id,
                                LogType.DocEvent,
                                {
                                    type: DocEventType.CloseSection,
                                    section: selectedSectionId,
                                }
                            );
                        }
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
                                selected={selectedPageId === doc.id}
                                key={doc.id}
                                name={doc.name}
                                id={doc.id}
                                onClick={() => {
                                    if (selectedPageId !== "intro") {
                                        log(
                                            props.taskId,
                                            context?.user?.id,
                                            LogType.DocEvent,
                                            {
                                                type: DocEventType.ClosePage,
                                                page: selectedPageId,
                                            }
                                        );
                                    }

                                    log(
                                        props.taskId,
                                        context?.user?.id,
                                        LogType.DocEvent,
                                        {
                                            type: DocEventType.OpenPage,
                                            page: doc.id,
                                        }
                                    );

                                    setSelectedPageId(doc.id);
                                }}
                            />
                        ))}
                    </div>
                    <div
                        className="doc-content"
                        onCopy={(e) => {
                            const clipboardText = window
                                .getSelection()
                                ?.toString();

                            if (clipboardText) {
                                log(
                                    props.taskId,
                                    context?.user?.id,
                                    LogType.DocEvent,
                                    {
                                        type: DocEventType.CopyText,
                                        text: window.getSelection()?.toString(),
                                    }
                                );
                            }
                        }}
                    >
                        {getContentFromId(selectedPageId)}
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
