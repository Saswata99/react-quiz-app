import React from 'react'
import "../App.css"

function Quiz(probs) {

    const {question, options, selected_answer, correct_answer, optionClick, submitPage} = probs

    const optionElements = options.map(element => {

        let inputClass = 'option-btn '
        if (submitPage){
            inputClass += 'no-effect-btn '
            if (correct_answer === element){
                inputClass += 'correct-btn'
            } else if (selected_answer===element){
                inputClass += 'worng-btn'
            } 
        } else{
            inputClass += selected_answer===element?'seletected-btn': 'hover-btn'
        }

        return <input 
            className= {inputClass}
            type='button' 
            id={element} 
            value={element}
            onClick={() => !submitPage && optionClick(element)} 
        />})

    return (
        <div className='quiz'>      
            <p className='question'>{question}</p>
            <div className='option-group'>
                {optionElements}
            </div>
        </div>
    )

}

export default Quiz