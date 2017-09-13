import React from 'react';
import ReactCountdownClock from 'react-countdown-clock'; //Clock courtesy of pughpugh.github.io/react-countdown-clock

const Results = (props) => {
	const finalResults = props.results();
	const timerResults = finalResults * 60;

	return (
		<div className='results'>
			<h2>You should walk your developer for approximately {finalResults} mins.</h2>
{/*			<div className='results__notes'>
				<Notes />
			</div>*/}
			<div className='results__timer'>
				<ReactCountdownClock seconds={timerResults} />
			</div>
		</div>
	)
}

export default Results;



