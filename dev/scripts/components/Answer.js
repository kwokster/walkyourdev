import React from 'react';

const Answer = (props) => {
	return (
		<div>
			<button className='answer' value='yes' onClick={props.handleAnswer}>Yes</button>
			<button className='answer' value='no' onClick={props.handleAnswer}>No</button>
		</div>
	)
}

export default Answer;