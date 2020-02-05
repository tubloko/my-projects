import React from "react";

import './field.css';

const Field = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Field;