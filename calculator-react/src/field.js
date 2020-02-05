import React, { Component } from "react";

export default class Display extends Component {



    render() {
        return (
            <div className="inputOutput">
                <div className="number">{this.props.string}</div>
                <div className="result">{this.props.toShow}</div>
            </div>
        );
    }
}