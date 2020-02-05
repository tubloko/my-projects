import React, { Component } from "react";

export default class Buttons extends Component {

    state = {
        number: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }

    getValue = (event) => {
        this.props.addSymbol(event.target.value);
    }

    render() {
        return (
            <div className="calculator">
                <div className="keyboard">
                    {this.state.number.map((a, ind) => {
                            return <button
                                onClick={this.getValue}
                                className='key'
                                value={ind}
                                key={ind}>{a}</button>
                        }
                    )}
                    <button className='key k' value='+' onClick={this.getValue}>+</button>
                    <button className='key k' value='C' onClick={this.getValue}>C</button>
                    <button className='key k' value='-' onClick={this.getValue}>-</button>
                    <button className='key k' value='*' onClick={this.getValue}>*</button>
                    <button className='key k' value='/' onClick={this.getValue}>/</button>
                    <button className='keyDot Dot k' value='.' onClick={this.getValue}>.</button>
                    <button className='keyRes k' value='=' onClick={this.getValue}>=</button>
                </div>
            </div>
        );
    }
}