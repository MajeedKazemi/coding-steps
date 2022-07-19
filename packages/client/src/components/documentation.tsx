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
import { LoopsDoc } from "./docs/loops-doc";
import { NumbersDoc } from "./docs/numbers-doc";
import { OperatorsDoc } from "./docs/operators-doc";
import { OutputVarDoc } from "./docs/output-variables-doc";
import { FunctionsDoc } from "./docs/functions-doc";
import { RandomDoc } from "./docs/random-doc";
import { StringsConcatenationDoc } from "./docs/strings-concatenation";
import { StringsDoc } from "./docs/strings-doc";
import { SyntaxDoc } from "./docs/syntax-doc";
import { UserInputDoc } from "./docs/user-input-doc";
import { VariablesDoc } from "./docs/variables-doc";
import { VariableNamesDoc } from "./docs/variables-names-doc";
import { WhileLoopsDoc } from "./docs/while-loops-doc";
import { ConditionalsDoc } from "./docs/conditionals-doc";
import { ComparisonsDoc } from "./docs/comparisons-doc";
import { ArithmeticsDoc } from "./docs/arithmetics.doc";
import { ModifyingStringsDoc } from "./docs/modifying-strings-doc";
import { ImportsDoc } from "./docs/imports-doc";
import { ErrorsDoc } from "./docs/errors-doc";
import { LogicalOperatorsDoc } from "./docs/logical-operators-doc";

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
            case "data-types":
                return(
                    <DataTypesDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                    
                )
            case "variables":
                return(
                    <VariablesDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                )
            case "functions":
                return (
                    <FunctionsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                )
            case "loops":
                return(
                    <LoopsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                )
            case "conditionals":
                return(
                    <ConditionalsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                )
            case "lists":
                return(
                    <ListsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                )
            case "strings":
            return(
                <ModifyingStringsDoc
                    pageId={pageId}
                    onSectionChange={handleSectionChange}
                />
            )
            case "comparisons":
                return(
                    <ComparisonsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                )
            case "logical-operators":
                return(
                    <LogicalOperatorsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                )
            case "arithmetics":
                return(
                    <ArithmeticsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                )
            case "imports":
                return(
                    <ImportsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                )
            case "random":
                return(
                    <RandomDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />
                )
            case "errors":
                return(
                    <ErrorsDoc
                        pageId={pageId}
                        onSectionChange={handleSectionChange}
                    />      
                )
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
    { id: "data-types", name: "Data Types" }, //done
    { id: "variables", name: "Variables" }, //done
    { id: "functions", name: "Built-In Functions" }, //done
    { id: "loops", name: "Loops" }, //done
    { id: "conditionals", name: "Conditionals" }, //done
    { id: "lists", name: "Lists" }, //done
    { id: "strings", name: "Strings" }, //done
    { id: "arithmetics", name: "Arithmetics" }, //done
    { id: "comparisons", name: "Comparisons" }, //done
    { id: "logical-operators", name: "Logical Operators" }, //todo
    { id: "imports", name: "Imports" }, //done
    { id: "random", name: "Random" }, //done
    { id: "errors", name: "Error Message Guide" }, //todo
];
