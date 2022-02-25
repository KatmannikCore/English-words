import React, {Component} from 'react';
import Word from "./Word/Word";
import {GetAllWordsFromDB} from "../../components/DataDB/DataDB";

class WordList extends Component {
    state = {
        arrayWord: []
    };
    componentDidMount() {
        GetAllWordsFromDB().then(value => {
             this.setState({
                 arrayWord: value
             });
         })
    }

    renderWord(){
        return this.state.arrayWord.map(item => {
            return(
                <Word
                    key = {item.id}
                    word = {item.word}
                    translation = {item.translation}
                />
            )
        })
    }
    render() {
        return (
            <div className = 'body'>
                {this.renderWord()}
            </div>
        );
    }
}

export default WordList;
