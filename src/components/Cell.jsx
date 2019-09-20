import React from 'react';
import './Cell.css';

const Cell = (props) => {
    return (
        <div className="cell">{props.name}</div>
    )
}

export default Cell;