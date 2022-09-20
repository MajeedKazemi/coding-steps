import React, { PureComponent } from "react";
import ReactDiffViewer from "react-diff-viewer";

interface IProps {
    old: string;
    new: string;
}

export class Diff extends PureComponent<IProps> {
    render = () => {
        return (
            <ReactDiffViewer
                oldValue={this.props.old.replace("\r", "")}
                newValue={this.props.new.replace("\r", "")}
                splitView={true}
            />
        );
    };
}
