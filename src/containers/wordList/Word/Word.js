import React from 'react';
import './Word.css'
function Word(props) {
    return (
        <div className={'Word'} key = {props.key}>
            <div>{props.word}</div>
            <div>{props.translation}</div>
        </div>
    );
}

export default Word;