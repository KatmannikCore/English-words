import React, {Component} from 'react';
import {GetAllThemesFromDB, GetAllWordsFromDB} from "../../components/DataDB/DataDB";
import './learnWords.css'
import ModalWindowChooseTheme from "./modalWindowChooseTheme/modalWindowChooseTheme";
class LearnWords extends Component {
    constructor(){
        super();
        this.state = {
            currentWord: '',
            currentNumber: 1,
            isRightWord: true,
            userWord: '',
            themes: [],
            currentTheme: [],
            isOpenWindow:false,
        };
        this.changeTheme = this.changeTheme.bind(this)
    }
    changeTheme = (value) =>{
        this.setState({
            currentTheme: value,
            currentWord: value.list[0].translation
        });
        this.createWindow()
    };
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
            currentWord: this.state.currentTheme.list[this.state.currentNumber].translation,
            currentNumber: Math.floor(Math.random() * this.state.currentTheme.list.length)
        })
    };
    createWindow = () => {
        this.setState({
            isOpenWindow: !this.state.isOpenWindow
        })
    };
    componentDidMount() {
        GetAllThemesFromDB().then(value => {
            this.setState({
                themes: value
            })
        });
    }

    render() {
        return (
            <div className = 'body'>
                <button onClick={this.createWindow}>Выбрать тему</button>
                {this.state.isOpenWindow ?(
                    <div>
                        <p>{this.state.currentWord}</p>
                        <button onClick={this.changeWordHandler}>Change</button>
                        <input onChange={event => {this.setState({userWord:event.target.value})}} type="text"/>
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