import React from 'react';

const Question = (props) => {
	return (
		<h3 key={props.counter}>{props.question}</h3>
	)
}

export default Question;