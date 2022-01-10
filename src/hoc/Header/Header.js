import React from 'react';
import {NavLink} from 'react-router-dom'
import "./Header.css"
const Header = () => {
    return (
        <div className={'Header'}>
            <NavLink to='/' >Главная</NavLink>
            <NavLink to='/add-word' >Добавть слово</NavLink>
            <NavLink to='/learn-words' >Учить слова</NavLink>
            <NavLink to='/words-list' >Список слов</NavLink>
            <NavLink to='/themes-list' >Список тем</NavLink>
        </div>
    );
};

export default Header;