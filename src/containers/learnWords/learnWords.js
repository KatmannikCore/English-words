import React, {Component} from 'react';
import {GetAllThemesFromDB} from "../../components/DataDB/DataDB";
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
            isEnd: false,
            validationErrors: ''
        };
        this.changeTheme = this.changeTheme.bind(this);
        this.resetData = this.resetData.bind(this);
    }
    changeTheme = (value) =>{
        if (value.list ===  undefined){
            this.setState({
                validationErrors: 'You should choose theme'
            })
        } else {
            this.setState({
                validationErrors: '',
                currentTheme: value.list.slice(),
                currentWord: value.list[this.state.currentIndex]
            });
             this.createWindow();
            console.log(this.state)
        }
    };
    checkWordHandler = () => {
        this.setState({
            validationErrors: ''
        });
        if(this.state.currentTheme.length === 0){
            alert('тест закочен');
        }
        else if(this.state.userWord.trim().length === 0){
            this.setState({
                validationErrors: 'Entry field doesn\'t can be empty or complit  of spaces'
            })
        } else {
            this.nextWordHandler();
        }
        this.clearInput();
    };
    nextWordHandler = () => {
        console.log(this.state.themes);
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
        this.clearInput()
    };
    createWindow = () => {
        if (this.state.isOpenWindow) {
            this.resetData()
        }
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
    clearInput = () => {
        this.setState({
            userWord: ''
        })
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
                        <input value={this.state.userWord} onChange={this.onChangeHandler} type="text"/>
                        <button onClick={this.checkWordHandler}>Check</button>
                    </div>)
                    :(<ModalWindowChooseTheme themes={this.state.themes} changeTheme = {this.changeTheme}/>)
                }
                <div className='validation_learn_word'>
                    {this.state.validationErrors}
                </div>
            </div>
        );
    }
}

export default LearnWords;