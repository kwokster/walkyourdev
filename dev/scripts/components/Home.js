import React from 'react'; 

const Home = (props) => {
		return (
			<div className="home">
				<h2>Does your developer look grumpy?</h2>
				<h2>It's time to take them for a walk!</h2>
				<button className="startButton" onClick={props.start}>Click here to analyze duration of walk</button> 
			</div>
		)
}

export default Home;