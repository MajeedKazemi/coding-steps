import { Fragment, useState } from "react";

import { Button } from "./button";

export const Documentation = () => {
    const [showModal, setShowModal] = useState(false);

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
                    className={`modal-content + ${showModal ? "active" : ""} `}
                >
                    <p>this is the content that we've been waiting for</p>
                </section>
            </Fragment>
        </div>
    );
};
