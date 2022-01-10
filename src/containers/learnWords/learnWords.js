import React, {Component} from 'react';
import {GetAllThemesFromDB, GetAllWordsFromDB} from "../../components/DataDB/DataDB";
import './learnWords.css'
class LearnWords extends Component {
    state = {
        arrayWord : [],
        currentWord: '',
        currentNumber: 1,
        isRightWord: true,
        userWord: ''
    };
    componentDidMount() {
        GetAllWordsFromDB().then(value => {
            this.setState({
                arrayWord: value,
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
            currentWord: this.state.arrayWord[this.state.currentNumber].translation,
            currentNumber: Math.floor(Math.random() * this.state.arrayWord.length)
        })
    };
    create = () => {
        GetAllThemesFromDB();
    };
    render() {
        return (
            <div className = 'body'>
                <button onClick={this.create}>Выбрать тему</button>
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