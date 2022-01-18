import React, {Component} from 'react';
import {GetAllWordsFromDB, SendWordsInDB} from "../../../components/DataDB/DataDB";
import './modalWindowThemes.css';
class ModalWindowThemes extends Component {
    state = {
        words: [],
        themesWords: {name: '', list: []},
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
        let themesWords = this.state.themesWords;
        themesWords.list = [];
        themesWordsBlock.forEach(item => {
            let word = {'word':item.firstChild.textContent, 'translation': item.lastChild.textContent,};
            themesWords.list.push(word);
            this.setState({themesWords});
        });
        SendWordsInDB('Themes', this.state.themesWords);
    };

    setNameTheme = event =>{
        this.setState({
            themesWords: {name: event.target.value, list: {...this.state.themesWords.list}}
        });
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
                <p>Название темы</p>
                <input onChange={this.setNameTheme} type="text"/>
                <button onClick={this.addWordsHandler}>add</button>



            </div>
        );
    }
}

export default ModalWindowThemes;
