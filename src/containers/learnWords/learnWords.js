import React, {Component} from 'react';
import {GetAllThemesFromDB, GetAllWordsFromDB} from "../../components/DataDB/DataDB";
import './learnWords.css'
import ModalWindowChooseTheme from "./modalWindowChooseTheme/modalWindowChooseTheme";
class LearnWords extends Component {
    constructor(){
        super();
        this.state = {
            currentWord: {},
            currentNumber: 0,
            isRightWord: false,
            userWord: '',
            themes: [],
            currentTheme: [],
            isOpenWindow:false,
        };
        this.changeTheme = this.changeTheme.bind(this)
    }
    changeTheme = (value) =>{
        this.setState({
            currentTheme: value.list,
            currentWord: value.list[this.state.currentNumber]
        });
        this.createWindow()
    };
    checkWordHandler = () => {
        if(this.state.currentTheme.length === 0){
            alert('тест закочен')
        }else {
            if(this.state.userWord === this.state.currentWord.word){
                let currentTheme = this.state.currentTheme;
                let index = currentTheme.indexOf(this.state.currentWord);
                currentTheme.splice(index, 1);
                this.setState({
                    isRightWord:true,
                    currentTheme
                });
                this.changeWordHandler()
            }else {
                this.setState({
                    isRightWord:false
                })
            }
        }
    };
    changeWordHandler = () => {
        if(this.state.currentTheme.length === 0){
            alert('тест закочен')
        }else {
            this.setState({
                currentWord: this.state.currentTheme[this.state.currentNumber],
                currentNumber: Math.floor(Math.random() *(this.state.currentTheme.length - 1))
            });
            console.log(this.state.currentNumber, this.state.currentTheme.length)
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
    render() {
        return (
            <div className = 'body'>
                <button onClick={this.createWindow}>Выбрать тему</button>
                {this.state.isOpenWindow ?(
                    <div>
                        {console.log(this.state.currentWord.translation)}
                        <p>{this.state.currentWord.translation}</p>
                        <button onClick={this.changeWordHandler}>Change</button>
                        <input onChange={this.onChangeHandler} type="text"/>
                        <button onClick={this.checkWordHandler}>Check</button>
                        <p>{this.state.isRightWord ? 'верно':'неверно'}</p>
                    </div>)
                    :(<ModalWindowChooseTheme themes={this.state.themes} changeTheme = {this.changeTheme}/>)
                }
            </div>
        );
    }
}

export default LearnWords;