import React from 'react';
import './modalWindowChooseTheme.css'
function ModalWindowChooseTheme(props) {
    function renderTheme() {
        return props.themes.map(item =>{
            let listWords = item.list.map(word => {
                return(
                    <li ><a >{word.word}</a></li>
                )
            });

            return(
                <li><a className="active">{item.name} </a>
                    <ul className="submenu">
                        {listWords}
                    </ul>
                </li>
            )
        })
    }
    return (
        <div id="block">
            <nav id="menuVertical">
                <ul >
                    {renderTheme() }
                </ul>
            </nav>
        </div>
    );
}

export default ModalWindowChooseTheme;