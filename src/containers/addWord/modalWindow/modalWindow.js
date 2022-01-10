import React, {Component} from 'react';
import {GetAllWordsFromDB, SendWordsInDB} from "../../../components/DataDB/DataDB";
import Word from "../../wordList/Word/Word";
import './modalWindow.css';
import axios from "axios";
class ModalWindow extends Component {
    state = {
        words: [],
        themesWords: []
    };
    componentDidMount() {
        GetAllWordsFromDB().then(value => {
                this.setState({
                    words: value
                })
            }
        )
    }
    addWordsHandler = async () =>{
        let themesWordsBlock = document.querySelectorAll('.modal-string.active-string');
        themesWordsBlock.forEach(item => {
            let word = {'word':item.firstChild.textContent, 'translation': item.lastChild.textContent};
            let themesWords = this.state.themesWords;
            themesWords.push(word);
            this.setState({
                themesWords
            });
        });
        SendWordsInDB('Themes', this.state.themesWords);
    };

    renderModalWindow(){
        return this.state.words.map(item =>{
            return  <div key = {item.id} onClick = {event => event.currentTarget.classList.toggle('active-string')} className = 'modal-string' >
                <p>{item.word}</p>
                <p>{item.translation}</p>
            </div>
        })
    }

    render() {
        return (
            <div className = 'ModalWindow'>
                {this.renderModalWindow()}
                <button onClick={this.addWordsHandler}>add</button>
            </div>
        );
    }
}

export default ModalWindow;
