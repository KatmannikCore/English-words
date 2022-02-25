import React, {Component} from 'react';
import {GetAllThemesFromDB, GetAllWordsFromDB} from "../../components/DataDB/DataDB";
import ModalWindowThemes from "./modalWindowThemes/modalWindowThemes";
import './themesList.css'

class ThemesList extends Component {
    state = {
        words: [],
        isHiddenWindow: false,
        themes: [],
        isHiddenUl: false
    };

    componentDidMount() {
        GetAllThemesFromDB().then(value => {
            this.setState({
                themes: value,
            });
        });
        GetAllWordsFromDB().then(value => {
            this.setState({
                word: value,
            });
        });

    }
    toggleWindow = () => {
        this.setState({
            isHiddenWindow: !this.state.isHiddenWindow
        });
    };
    renderThemes = () =>{
        return <ul>
            {this.state.themes.map((item) =>{
                return <li
                    className='themes_item hidden_ul'
                    onClick={(e) => { e.target.classList.toggle('hidden_ul')}}
                >
                    {item.name}
                    <ul>
                        {this.renderTemp(item.list)}
                    </ul>
                </li>
        })}
        </ul>
    };
    renderTemp = (words) =>{
        return words.map(item => {
            return <li>{item.word}</li>
        })
    };
    render() {
        return (
            <div className = 'body'>
                <button onClick={this.toggleWindow}>create window </button>
                {this.state.isHiddenWindow ? <ModalWindowThemes />: this.renderThemes()}
            </div>
        );
    }
}

export default ThemesList;