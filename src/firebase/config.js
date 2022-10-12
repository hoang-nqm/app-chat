import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';

import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCS0V1ibJH9-SHU4qIO4-Ecos5Emtkgjbk',
  authDomain: 'chat-fd6ae.firebaseapp.com',
  projectId: 'chat-fd6ae',
  storageBucket: 'chat-fd6ae.appspot.com',
  messagingSenderId: '375198692994',
  appId: '1:375198692994:web:435b5eef9a7e0eceb4669b',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
// auth.useEmulator('http://localhost:9099');
// if (window.location.hostname === 'localhost') {
//   db.useEmulator('localhost', '8080');
// }
export { auth, db };
export default firebase;
