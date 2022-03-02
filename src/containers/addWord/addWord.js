import React,{useState}  from 'react';
import axios from 'axios'
import './addWord.css'

function AddWord(props) {
    let [wordEn, setWordEn] = useState('');
    let [wordRu, setWordRu] = useState('');
    let [validation, setValidation] = useState(false);
    let [errorRu, setErrorRu] = useState('');
    let [errorEn, setErrorEn] = useState('');
    async function addWordHandler(event) {
        event.preventDefault();
        validationForm();
        if (validation){
            try {
                await axios.post('https://react-words-29c77-default-rtdb.firebaseio.com/word.json', {word: wordEn, translation: wordRu });
            } catch (e) {
                console.log(e)
            }
        }
        cleanForm();
    }
    function validationForm() {
        setErrorEn(validationWord(wordEn));
        setErrorRu(validationWord(wordRu));
        setValidation(errorRu !== '' && errorEn !== '')
    }
    function validationWord(word) {
        if(word.trim().length === 0){
            return 'Entry field doesn\'t can be empty or complit of spaces'
        }
    }
    function cleanForm() {
        setWordEn('');
        setWordRu('');
    }
    return (
        <div className = 'body'>
            <p>Russian word</p>
            <input value={wordRu} onChange={(event) => {setWordRu(event.target.value)}} type="text"/>
            {validation ?<p className='exception_valid'>{errorRu}</p>: '' }
            <p>English word</p>
            <input value={wordEn} onChange={(event) => {setWordEn(event.target.value)}} type="text"/>
            {validation ?<p className='exception_valid'>{errorEn}</p>: '' }
            <button onClick={addWordHandler}>send</button>
        </div>
    );
}
export default AddWord