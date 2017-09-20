import React from 'react';

// class Notes extends React.Component {
// 	constructor() {
// 		super(); 
// 		this.state = {
// 			currentNote: '',
// 			developerName: '',
// 			notes: []
// 		}
// 		this.handleChange = this.handleChange.bind(this);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 	}
// 	handleChange(event) {
// 		this.setState({
// 			[event.target.name]: event.target.value,
// 		});
// 	}
// 	handleSubmit(event) {
// 	  event.preventDefault();
// 	  const notesRef = firebase.database().ref('notes');
// 	  const note = {
// 	    desc: this.state.currentNote,
// 	    developerName: this.state.developerName
// 	  }
// 	  notesRef.push(note);
// 	  this.setState({
// 	    currentNote: '',
// 	    developerName: ''
// 	  });
// 	}
// 	removeNote(noteId) {
// 	  const noteRef = firebase.database().ref(`/notes/${noteId}`);
// 	  noteRef.remove();
// 	}
// 	componentDidMount() {
// 	  const notesRef = firebase.database().ref('notes');
// 	  notesRef.on('value', (snapshot) => {
// 	    let notes = snapshot.val();
// 	    let newState = [];
// 	    for (let note in notes) {
// 	      newState.push({
// 	        id: note,
// 	        desc: notes[note].desc,
// 	        developerName: notes[note].developerName
// 	      });
// 	    }
// 	    this.setState({
// 	      notes: newState
// 	    });
// 	  });
// 	}
// 	render() {
// 		return(
// 			<div className='notes'>
// 				<h2>Notes about developer:</h2>
// 				<section className='notes__form'>
// 					<form onSubmit={this.handleSubmit}>
// 						<input type="text" name='developerName' placeholder='Name of Developer' onChange={this.handleChange} value={this.state.developerName} required />
// 						<input type="text" name='currentNote' placeholder='Notes...' onChange={this.handleChange} value={this.state.currentNote} required />
// 						<button>Add Notes</button>
// 					</form>
// 				</section>
// 				<section className='display-note'>
// 					<ul>
// 						{this.state.notes.map((note) => {
// 							return (
// 								<li key={note.id} className="notePads">
// 									<h3>{note.developerName}</h3>
// 									<p>{note.desc}</p>
// 									<button onClick={() => this.removeNote(note.id)}>Remove Note</button>
// 								</li>
// 							)
// 						})}
// 					</ul>
// 				</section>
// 			</div>
// 		)
// 	}
// }