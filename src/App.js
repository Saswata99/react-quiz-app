import React, { useState } from 'react';
import './App.css';
import Welcome from './component/Welcome';
import Main from './component/Main'
import topImg from "./img/top.png"
import bottomImg from "./img/bottom.png"


function App() {
	const [quizeInitialize, setQuizeInitialize] = useState({
			welcomePage: true,
			category: "",
			difficulty: "",
			type: ""
		})

	const startQuiz = function(){
		setQuizeInitialize(preValue => ({
			...preValue, 
			welcomePage: !preValue.welcomePage
		}))
	}
	
	const selectOption = function(event){
		setQuizeInitialize(preValue => ({
			...preValue, 
			[event.target.name]: event.target.value
		}))
	}
	
	return (
		<div className='app'>
			<img className='top-img' src={topImg} alt='top' />
			<img className='bottom-img' src={bottomImg} alt='bottom' />

			{quizeInitialize.welcomePage? 
				<Welcome startQuiz={startQuiz} selectOption={selectOption}></Welcome> : 
				<Main {...quizeInitialize} startQuiz={startQuiz}></Main>
			}
		</div>
	);
}

export default App;
