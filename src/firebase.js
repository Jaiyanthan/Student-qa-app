import { firebase } from '@firebase/app';
import '@firebase/firestore'
import '@firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCnpkDfszWvtF0lg64SMSECtaQ_NxwoI3E",
    authDomain: "questionans-app.firebaseapp.com",
    projectId: "questionans-app",
    storageBucket: "questionans-app.appspot.com",
    messagingSenderId: "1016381120620",
    appId: "1:1016381120620:web:c054597a2463fb5b903849"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;