import React from 'react';
import Question from './Question.js';
import Answer from './Answer.js';

const Walkanalyzer = (props) => {
	return (
		<div className='analyzers'>
			<Question question={props.question} counter={props.counter} />
			<Answer handleAnswer={props.handleAnswer} />
		</div>
	)
}

export default Walkanalyzer;

