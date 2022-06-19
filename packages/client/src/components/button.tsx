import { getIconSVG } from "../utils/icons";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (e: any) => void;
    icon?: string;
    class?: string;
    type?: "link" | "button" | "block";
    disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
    let style = props.class;

    switch (props.type) {
        case "link":
            style += " btn-link";
            break;

        case "block":
            style += " btn btn-block";
            break;

        default:
            style += " btn";
    }

    if (props.disabled) {
        style += " disabled";
    }

    return (
        <button className={style} onClick={props.onClick}>
            {props.children}
            {getIconSVG(props.icon, "icon")}
        </button>
    );
};
