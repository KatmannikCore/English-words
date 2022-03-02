import React, {useRef}  from 'react';
import './modalWindowChooseTheme.css'
function ModalWindowChooseTheme(props) {
    let currentTheme = useRef();
    function renderThemes() {
        return props.themes.map(item =>{
            return(
                <div onClick = {highlightInRed} >
                    <p>{item.name}</p>
                </div>
            )
        })
    }
    function highlightInRed(event){
        document.querySelectorAll('.active-string').forEach(item => item.className = '');
        event.currentTarget.classList.toggle('active-string');
        findCurrentTheme(event.currentTarget.innerText);
    }
    function findCurrentTheme(wordOfTheme) {
        props.themes.forEach(item =>{
            if(item.name === wordOfTheme){
                currentTheme = item;
                console.log(currentTheme, item)
            }
        });
    }
    return (
        <div id="block">
            <nav className="changeTheme">
                {renderThemes() }
                <button onClick={() => props.changeTheme(currentTheme)}>Выбрать</button>
            </nav>
        </div>
    );
}

export default ModalWindowChooseTheme;