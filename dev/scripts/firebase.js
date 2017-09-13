import firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAGzLFn6xG23-ZYIaOnKEI8UKr3ADfwYvI",
    authDomain: "walkyourdev.firebaseapp.com",
    databaseURL: "https://walkyourdev.firebaseio.com",
    projectId: "walkyourdev",
    storageBucket: "walkyourdev.appspot.com",
    messagingSenderId: "520289199952"
  };
  firebase.initializeApp(config);

export default firebase;