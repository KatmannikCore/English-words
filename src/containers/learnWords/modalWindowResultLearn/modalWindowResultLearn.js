import React, {useState} from 'react';
import './modalWindowResultLearn.css'
function ModalWindowResultLearn(props) {
    let [active, setActive] = useState(props.active);
    function resultAnswers() {
        return props.answers.map(item => {
            return (<p> № {item.numberQuestion} | answers: {item.isRightAnswer} | word: {item.word.word} | translation: {item.word.translation} | your word: {item.userWord}</p>)
        });
    }
    function result() {
        let countRightAnswers = 0;
        props.answers.forEach(item => {
            if (item.isRightAnswer){
                countRightAnswers++
            }
        });
        return (<span>{countRightAnswers}/{props.answers.length}</span> )
    }
    function closeModal(){
        props.endLearn();
        setActive(!active)
    }
    return (
        <div className={active ? 'modal-container active': 'modal-container' } onClick={() => closeModal()}>
            <div className='modal-result' onClick={e => e.stopPropagation()}>
                <p>Результат теста: {result()}</p>
                {resultAnswers()}
            </div>
        </div>
    );
}

export default ModalWindowResultLearn;