import React, {Component} from "react";

import {getFrame} from "../movie-services";

import './iframe.css';

export default class Iframe extends Component {

    state = {
        key: '',
    }

    showTrailer = () => {
        getFrame(this.props.value).then(body => {
            this.setState({key: body.results[0].key});
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.key !== '') {
            this.setState({key: ''});
        }
    }


    render() {

        console.log(this.state.key);

        const iframe = this.state.key === '' ? null
            : (
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item"
                            src={`https://www.youtube.com/embed/${this.state.key}?rel=0`}
                            allowFullScreen>
                    </iframe>
                </div>
            );


        return (
            <div>
                <button className='btn frame'
                        onClick={this.showTrailer} >
                    Trailer {`${this.state.key === '' ? 'on' : 'off'}`}</button>
                {/*<button className='btn' onClick={this.showTrailer}>Show trailer</button>*/}
                {iframe}
            </div>

        );
    }
}