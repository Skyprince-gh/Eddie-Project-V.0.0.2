var firebase = require('firebase');
var serviceAccount = require('../../cert.json');

console.log(serviceAccount);
firebase.initializeApp({
  apiKey: "AIzaSyBawDmkESvSIJ-o0heENrOcp0mkXo7Q3CM",
  authDomain: "eddie-project-d2d84.firebaseapp.com",
  databaseURL: "https://eddie-project-d2d84.firebaseio.com",
  projectId: "eddie-project-d2d84",
  storageBucket: "gs://eddie-project-d2d84.appspot.com/",
  messagingSenderId: "211996821751"
  // credential: firebase.credential.cert(serviceAccount),
  // databaseURL: 'https://eddie-project-d2d84.firebaseio.com'
});

const auth = firebase.auth();
const firestore = firebase.firestore();



module.exports = {
  auth: auth,
  firestore: firestore,
  
}