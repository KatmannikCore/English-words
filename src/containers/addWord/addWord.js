import React,{useState}  from 'react';
import axios from 'axios'
import './addWord.css'

function AddWord(props) {
    let word = useState({
        word: '',
        translation: ''
    });

    async function addWordHandler(event) {
        event.preventDefault();
        try {
            await axios.post('https://react-words-29c77-default-rtdb.firebaseio.com/word.json', word[0]);
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className = 'body'>
            <p>Русское слово</p>
            <input onChange={(event) => {
                word[0].word = event.target.value
            }} type="text"/>

            <p>Англиское слово</p>
            <input onChange={(event) => {
                word[0].translation = event.target.value
            }} type="text"/>
            <button onClick={addWordHandler}>send</button>
        </div>
    );
}
export default AddWord