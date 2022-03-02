import React, {Component} from 'react';
import {GetAllThemesFromDB, GetAllWordsFromDB} from "../../components/DataDB/DataDB";
import './learnWords.css'
import ModalWindowChooseTheme from "./modalWindowChooseTheme/modalWindowChooseTheme";
import ModalWindowResultLearn from "./modalWindowResultLearn/modalWindowResultLearn";
class LearnWords extends Component {
    constructor(){
        super();
        this.state = {
            currentWord: {},
            currentIndex: 0,
            currentNumber:1,
            isRightWord: false,
            userWord: '',
            themes: [],
            currentTheme: [],
            isOpenWindow:false,
            answers: [],
            isEnd: false
        };
        this.changeTheme = this.changeTheme.bind(this);
        this.resetData = this.resetData.bind(this);
    }
    changeTheme = (value) =>{
        this.setState({
            currentTheme: value.list,
            currentWord: value.list[this.state.currentIndex]
        });
        this.createWindow()
    };
    checkWordHandler = () => {
        if(this.state.currentTheme.length === 0){
            alert('тест закочен');
        }else {
            this.nextWordHandler();
        }
    };
    nextWordHandler = () => {
        let currentTheme = this.state.currentTheme;
        let index = currentTheme.indexOf(this.state.currentWord);
        currentTheme.splice(index, 1);
        let answers = this.state.answers;
        answers.push({numberQuestion: this.state.currentNumber, isRightAnswer: this.state.userWord === this.state.currentWord.word, word: this.state.currentWord, userWord: this.state.userWord })
        this.setState({
            currentTheme,
            answers,
            currentNumber: ++this.state.currentNumber
        });
        this.changeWordHandler();
    };
    changeWordHandler = () => {
        if(this.state.currentTheme.length === 0){
            alert('тест закочен');
            this.setState({
                isEnd: !this.state.isEnd
            });
        }else {
            this.setState({
                currentWord: this.state.currentTheme[this.state.currentIndex],
                currentIndex: Math.floor(Math.random() *(this.state.currentTheme.length - 1))
            });
        }
    };
    createWindow = () => {
        this.setState({
            isOpenWindow: !this.state.isOpenWindow
        });
    };
    componentDidMount() {
        GetAllThemesFromDB().then(value => {
            this.setState({
                themes: value,
            })
        });
    }
    onChangeHandler = (event) =>{
        this.setState({userWord:event.target.value});
    };
    resetData = () =>{
        this.setState( {
            currentWord: {},
            currentIndex: 0,
            currentNumber:1,
            isRightWord: false,
            userWord: '',
            currentTheme: [],
            isOpenWindow:false,
            answers: [],
            isEnd: false
        });
    };
    render() {
        return (
            <div className = 'body'>
                {this.state.isOpenWindow ?(
                    <div>
                        {this.state.isEnd ? <ModalWindowResultLearn active={this.state.isEnd} endLearn={this.resetData} answers={this.state.answers} /> : ''}
                        <button onClick={this.createWindow}>Выбрать тему</button>
                        <p>{this.state.currentWord.translation}</p>
                        <button onClick={this.changeWordHandler}>Change</button>
                        <input onChange={this.onChangeHandler} type="text"/>
                        <button onClick={this.checkWordHandler}>Check</button>
                    </div>)
                    :(<ModalWindowChooseTheme themes={this.state.themes} changeTheme = {this.changeTheme}/>)
                }
            </div>
        );
    }
}

export default LearnWords;