import React, { useState, useEffect, useRef } from 'react'
import Quiz from './Quiz'
import "../App.css"

function Main(probs) {

    const {category, difficulty, type, startQuiz} = probs

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    function decodeText(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    function evaluateAnswer(){
        let correctAnswer = 0
        data.forEach(elemment=> elemment.correct_answer === elemment.selected_answer && correctAnswer++)
        return correctAnswer
    }

    function checkAllSelected(){
        let allSelected = true
        data.forEach(element=> !element.selected_answer && (allSelected = false))
        return allSelected
    }

    const [data, setData] = useState([])
    const [submitPage, setSubmitPage] = useState(false)
    const isFetch = useRef(false)

    useEffect(()=>{
        const fetchData = ()=>{
            fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}`)
                .then(res => res.json())
                .then(data => setData(() => {
                    const newData = data.results.map(element => {
                        const {question, correct_answer, incorrect_answers} = element
                        return {
                            question: decodeText(question),
                            options: shuffleArray([...incorrect_answers, correct_answer])
                                                    .map(element => decodeText(element)),
                            correct_answer: decodeText(correct_answer),
                            selected_answer: null
                        }
                    })
                    return newData
                }))
            }
        
        !isFetch.current && fetchData()
        
        isFetch.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const optionClick = function(questionIndex, selectedAnswer){
        setData((preValue) => preValue.map((element, index)=> {
            return index===questionIndex? 
                {...element, selected_answer: selectedAnswer} : 
                element
        }))
    }

    const submitClick = function(){
        setSubmitPage(true)
    }

    const restartClick = function(){
        startQuiz()
    }


    const quizElements = data.map((element, index) => 
            <Quiz 
                key={element.question} 
                {...element}
                submitPage = {submitPage}
                optionClick={(selectedAnswer) => optionClick(index, selectedAnswer)}>
            </Quiz>
        )

    if (!data.length){
        return
    }    

    return (
        <div className='main'>
                {quizElements}
                {submitPage && <h3 className='total-txt'>You scored {evaluateAnswer()}/5 correct answers</h3>}
                
                <input 
                    className={'submit-btn ' + (checkAllSelected()? '': 'disable-btn no-effect-btn')} 
                    type='button' 
                    value= {submitPage? 'Play again': 'Check answers'} 
                    onClick = {submitPage? restartClick: checkAllSelected()? submitClick: ()=>{}}
                />
                
        </div>
    )
}

export default Main