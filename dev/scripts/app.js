import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.js';
import Home from './components/Home.js';
import Notes from './components/Notes.js';
import questionData from './components/questionData.js';
import Walkanalyzer from './components/walkAnalyzer.js';
import Results from './components/Results.js';
import Footer from './components/Footer.js';
import { ajax } from 'jquery';
import firebase, { auth, provider } from './firebase.js';


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			question: questionData[0].q,
			start: true,
			result: false,
			counter: 0,
			shortBreak: [],
			longBreak: []
		}
		this.startWalkAnalyzer = this.startWalkAnalyzer.bind(this);
		this.handleAnswer = this.handleAnswer.bind(this);
		this.getResults = this.getResults.bind(this); 
		this.renderWalkAnalyzer = this.renderWalkAnalyzer.bind(this); 
		this.renderResults = this.renderResults.bind(this);
	} 


startWalkAnalyzer() {
	this.setState ({
		start: false
		});
}


newQuestion() {
	let newCounter = this.state.counter + 1;
	if (newCounter < 3 && newCounter >= 0) {
		this.setState ({
			counter: newCounter,
			question: questionData[newCounter].q,
		});
	} else {
		this.setState ({
			result: true
		});
	}
}


handleAnswer(event) {
	let shortBreak = Array.from(this.state.shortBreak);
	let longBreak = Array.from(this.state.longBreak);
	if(event.target.value === "yes") {
		shortBreak.push('');
	} else if (event.target.value ==="no") {
		longBreak.push('');
	}
	this.setState({
		shortBreak: shortBreak,
		longBreak: longBreak
	});
	this.newQuestion();
}


getResults() {
	const shortResults = this.state.shortBreak;
	const longResults = this.state.longBreak;
	const shortResultLength = shortResults.length;
	const longResultLength = longResults.length;
	let finalResults = 0;
	if (shortResultLength > longResultLength) {
		return finalResults = 20;
	} else {
		return finalResults = 60;
	} 
	return finalResults;
}


renderResults() {
	return (
		<Results results={this.getResults} />
	)
}


renderWalkAnalyzer() {
	return (
		<Walkanalyzer
			counter={this.state.counter}
			question={this.state.question}
			handleAnswer={this.handleAnswer}
		 />
	);
}

	render() {
		return(
			<div>
				<Header />
					<div className='wrapper__main'>
						{this.state.start ? <Home start={this.startWalkAnalyzer} /> : this.state.result ? this.renderResults() : this.renderWalkAnalyzer()}
						<Notes />
					</div>
				<Footer />
			</div>
		)
	}
}


ReactDOM.render(<App />, document.getElementById('app'));