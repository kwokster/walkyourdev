import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.js';
import Home from './components/Home.js';
import questionData from './components/questionData.js';
import Walkanalyzer from './components/walkAnalyzer.js';
import Results from './components/Results.js';
import Footer from './components/Footer.js';
import { 
	BrowserRouter as Router, 
	Route, Link } from 'react-router-dom';
import { ajax } from 'jquery';
import firebase, { auth, provider } from './firebase.js';

class Notes extends React.Component {
	constructor() {
		super(); 
		this.state = {
			currentNote: '',
			developerName: '',
			notes: [],
			user: null
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}
	login() {
	  auth.signInWithPopup(provider) 
	    .then((result) => {
	      const user = result.user;
	      this.setState({
	        user
	      });
	    })
	    .then( () => {
		    const notesRef = firebase.database().ref('notes');
		    notesRef.on('value', (snapshot) => {
		      let notes = snapshot.val();
		      let newState = [];
		      for (let note in notes) {
		        newState.push({
		          id: note,
		          desc: notes[note].desc,
		          developerName: notes[note].developerName
		        });
		      }
		      this.setState({
		        notes: newState
		      });
		    });

		});
	}
	logout() {
		auth.signOut()
			.then(() => {
				const notesRef = firebase.database().ref('notes');
				notesRef.off();
				this.setState({
				user: null
			});
		});
	}

	handleSubmit(event) {
	  event.preventDefault();
	  const notesRef = firebase.database().ref('notes');
	  const note = {
	    desc: this.state.currentNote,
	    developerName: this.state.developerName

	  }
	  notesRef.push(note);
	  this.setState({
	    currentNote: '',
	    developerName: ''
	  });
	}
	removeNote(noteId) {
	  const noteRef = firebase.database().ref(`/notes/${noteId}`);
	  noteRef.remove();
	}
	componentDidMount() {
	  auth.onAuthStateChanged((user) => {
		if (user) {
			this.setState({ user });
		} 
	  });
	  const notesRef = firebase.database().ref('notes');
	  notesRef.on('value', (snapshot) => {
	    let notes = snapshot.val();
	    let newState = [];
	    for (let note in notes) {
	      newState.push({
	        id: note,
	        desc: notes[note].desc,
	        developerName: notes[note].developerName
	      });
	    }
	    this.setState({
	      notes: newState
	    });
	  });
	}
	render() {
		return(
			<div className='notes'>
				<div className="noteWrapper"> 
				  <h2>Log in to write about your developer/compare notes with other developer walkers!</h2>
				  {this.state.user ?
				    <button onClick={this.logout} className="logButton">Log Out</button>
				    :
				    <button onClick={this.login} className="logButton">Log In</button>
				  }
				</div>
				{this.state.user ?
				    <div>
				      <div className='user-profile'>
				      	<h3>Developer Walker:</h3>
				        <img src={this.state.user.photoURL} />
				      </div>
				      <div className=''> 
				      	<h2>Notes about developer:</h2>
				          <section className='notesForm'>
				            <form onSubmit={this.handleSubmit}>
				              <input type="text" name="developerName" placeholder="Name of Developer" onChange={this.handleChange} value={this.state.developerName} required />
				              <textarea type="text" name="currentNote" cols="30" rows="10" placeholder="Notes..." onChange={this.handleChange} value={this.state.currentNote} required />
				              <button>Add Notes</button>
				            </form>
				          </section>
				          <section className='displayNote'>
				          	<ul>
				          		{this.state.notes.map((note) => {
				          			return (
				          				<li key={note.id} className="notePads">
				          					<h3>{note.developerName}</h3>
				          					<p>{note.desc}</p>
				          					<button onClick={() => this.removeNote(note.id)}>Remove Note</button>
				          				</li>
				          			)
				          		})}
				          	</ul>
				          </section>
				      </div>
				    </div>
				    :
				    <div className='wrapper'> 
				      <p></p>
				    </div>
				  }
			</div>
		)
	}
}

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