import { useEffect, useRef, useState } from "react";

interface IAccordionProps {
    title: string;
    section: string;
    page: string;
    current: string;
    click: (cur: string) => void;
    children: React.ReactNode;
}

export const Accordion = (props: IAccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const content = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (!isOpen) {
            props.click(props.section);
        } else {
            props.click("");
        }

        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const newIsOpen = props.current === props.section;

        if (isOpen != newIsOpen) {
            setIsOpen(props.current === props.section);
        }
    }, [props.current]);

    return (
        <div className="accordion-container">
            <div
                className={`accordion-header ${isOpen && "open-header"}`}
                onClick={handleClick}
            >
                <h2 className="accordion-title">{props.title}</h2>
                <div className="accordion-arrow-button" onClick={handleClick}>
                    {isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="accordion-arrow"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="accordion-arrow"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    )}
                </div>
            </div>

            <div
                className={`accordion-content ${
                    isOpen
                        ? "accordion-content-open"
                        : "accordion-content-closed"
                }`}
                ref={content}
            >
                {props.children}
            </div>
        </div>
    );
};
