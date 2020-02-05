import React, {Component} from "react";

import Board from "./board";

export default class Game extends Component {

    state = {
        history: [
            {
                field: Array(9).fill(null)
            }
        ],
        stepNumber: 0,
        xIsNext: true
    };

    calculateWinner(field) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (field[a] && field[a] === field[b] && field[a] === field[c]) {
                return field[a];
            }
        }
        return null;
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const field = current.field.slice();
        if (this.calculateWinner(field) || field[i]) {
            return;
        }
        field[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    field: field
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.field);

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else if (!winner && current.field.filter(a => a === null).length === 0) {
            status = 'Draw!!!';
        } else {
            status = "Next: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div>
                <div>
                    <Board
                        field={current.field}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div>
                    <div>{status}</div>
                </div>
            </div>
        );
    }
}