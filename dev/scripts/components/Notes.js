import React from 'react';
import ReactDOM from 'react-dom';
import firebase, { auth, provider } from '../firebase.js';

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
	    developerName: this.state.user.displayName || this.state.user.email

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
				              <input type="text" name="developerName" placeholder="Name of Developer Walker" onChange={this.handleChange} value={this.state.user.displayName || this.state.user.email} required />
				              <textarea type="text" name="currentNote" cols="30" rows="10" placeholder="Name of Developer/Notes..." onChange={this.handleChange} value={this.state.currentNote} required />
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
				          					{note.developerName === this.state.user.displayName || note.developerName === this.state.user.email ?
				          					<button onClick={() => this.removeNote(note.id)}>Remove note</button> : null}
				          				</li>
				          			)
				          		})}
				          	</ul>
				          </section>
				      </div>
				    </div>
				    :
				    <div className='wrapper'></div>
				  }
			</div>
		)
	}
}

export default Notes;
