import React, {Component} from 'react';
import {GetAllThemesFromDB, GetAllWordsFromDB} from "../../components/DataDB/DataDB";
import './learnWords.css'
import ModalWindowChooseTheme from "./modalWindowChooseTheme/modalWindowChooseTheme";
class LearnWords extends Component {
    state = {
        words : [],
        currentWord: '',
        currentNumber: 1,
        isRightWord: true,
        userWord: '',
        themes: []

    };
    componentDidMount() {
        GetAllWordsFromDB().then(value => {
            this.setState({
                words: value,
                currentWord: value[0].translation
            });
        })
    }
    checkWordHandler = () => {
       if(this.state.userWord === this.state.currentWord){
           this.setState({
               isRightWord:true
           })
       }else {
           this.setState({
               isRightWord:false
           })
       }
    };
    changeWordHandler = () => {
        this.setState({
            currentWord: this.state.words[this.state.currentNumber].translation,
            currentNumber: Math.floor(Math.random() * this.state.words.length)
        })
    };
    create = () => {
        GetAllThemesFromDB().then(value => {
            this.setState({
                themes: value
            })
        });
    };
    render() {
        return (
            <div className = 'body'>
                <button onClick={this.create}>Выбрать тему</button>
                <ModalWindowChooseTheme themes={this.state.themes}/>
                <p>{this.state.currentWord}</p>
                <button onClick={this.changeWordHandler}>Change</button>
                <input onChange={event => {this.setState({userWord:event.target.value})}} type="text"/>
                <button onClick={this.checkWordHandler}>Check</button>
                <p>{this.state.isRightWord ? 'верно':'неверно'}</p>

            </div>
        );
    }
}

export default LearnWords;