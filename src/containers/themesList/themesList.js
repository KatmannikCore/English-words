import React, {useState} from 'react';
import {GetAllWordsFromDB} from "../../components/DataDB/DataDB";
import ModalWindow from "../addWord/modalWindow/modalWindow";
function ThemesList() {
    let [words, setWords] = useState([]);
     async function addThemeHandler() {
         let result = await GetAllWordsFromDB();
         setWords(prevState =>{
             return {...prevState, ...result}
         });

     }
    return (
        <div className = 'body'>
            <button onClick = {addThemeHandler}>cheate new them</button>
            {!!(words[0]) ? <ModalWindow />: <h1>123</h1>}
        </div>
    );
}

export default ThemesList;