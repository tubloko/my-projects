import React, {Component} from "react";
import ReactDOM from "react-dom";

import Display from "./field";
import Buttons from "./keyboard";

import './index.css';


class Calculator extends Component {

    state = {
        toShow: '0',
        string: '0',
        lastActive: '',
        nextMayMinus: true,
    };

    calc = (string) => {
        console.log(string);
        let str = string.split(' ');
        for (let i = 0; i < str.length; i++) {
            if (str[i] === '/' || str[i] === '*') {
                if (str[i] === '/') {
                    let tmp = +str[i - 1] / +str[i + 1];
                    str[i] = str[i].replace('/', tmp);
                    str.splice(i - 1, 1);
                    str.splice(i, 1);
                    i--;
                } else {
                    let tmp = +str[i - 1] * +str[i + 1];
                    str[i] = str[i].replace('*', tmp);
                    str.splice(i - 1, 1);
                    str.splice(i, 1);
                    i--;
                }
            }
        }
        for (let i = 0; i < str.length; i++) {
            if (str[i] === '+' || str[i] === '-') {
                if (str[i] === '+') {
                    let tmp = +str[i - 1] + +str[i + 1];
                    str[i] = str[i].replace('+', tmp);
                    str.splice(i - 1, 1);
                    str.splice(i, 1);
                    i--;
                } else {
                    let tmp = +str[i - 1] - +str[i + 1];
                    str[i] = str[i].replace('-', tmp);
                    str.splice(i - 1, 1);
                    str.splice(i, 1);
                    i--;
                }
            }
        }
        console.log(str);
        return str;
    };


    addSymbol = (e) => {
        if (e === '=') {
            this.setState(({toShow, string}) => {
                return {
                    string: toShow === '0' ? this.calc(string) : this.calc((string + toShow).replace('  ', ' ')),
                    toShow: ''
                };

            });
        } else if (e === 'C') {
            this.setState(() => {
                return {
                    toShow: '0',
                    string: '0',
                    lastActive: '',
                    nextMayMinus: true,
                }
            });
        } else if (e === '.') {
            if (this.state.toShow.includes('.')) {
                return;
            }
            this.setState(({toShow}) => {
                return {
                    toShow: toShow + e,
                }
            })
        } else if (/[\d]/g.test(e)) {
            this.setState({
                toShow: this.state.toShow === '0' || /[*/+]/.test(this.state.toShow[0]) ? e : this.state.toShow + e,
                nextMayMinus: false,
                lastActive: '',
            })
        } else if (/[+-/*]/.test(e)) {
            if (e === '-' && (this.state.nextMayMinus)) {
                this.setState({
                    string: this.state.string === '0' ? '' : this.state.string,
                    toShow: '-',
                    nextMayMinus: false,
                });
            } else {
                if (/[/*+-]/.test(this.state.lastActive)){
                    const idx = this.state.string.lastIndexOf(this.state.lastActive);
                    const rep = [...this.state.string.split('')];
                    rep[idx] = e;
                    this.setState({
                        toShow: '0',
                        string: rep.join(''),
                        lastActive: e,
                        nextMayMinus: true,
                    });
                    return;
                }
                this.setState({
                    toShow: '0',
                    string: this.state.string === '0' ? this.state.toShow + ' ' + e + ' ' : this.state.string + ' ' + this.state.toShow + ' ' + e + ' ',
                    nextMayMinus: true,
                    lastActive: e,
                })
            }
        }
    };

    render() {
        return (
            <div>
                <Display toShow={this.state.toShow} string={this.state.string}/>
                <Buttons addSymbol={this.addSymbol}/>
            </div>
        )
    }
}

ReactDOM.render(
    <Calculator/>,
    document.getElementById('root')
)
