// import * as firebase from "firebase/app";
import firebase from 'firebase/app';
// import app from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
// };

const config = {
  apiKey: 'AIzaSyBuTF_6kLW62CDPHWN1MGT36Rtgoo_C9Xo',
  authDomain: 'careduet-bebed.firebaseapp.com',
  databaseURL: 'https://careduet-bebed.firebaseio.com',
  projectId: 'careduet-bebed',
  storageBucket: 'careduet-bebed.appspot.com',
  messagingSenderId: '662731017525',
  appId: '1:662731017525:web:4e5e9fa2646f2a8fea907c',
  measurementId: 'G-4NGZVQFBHB',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const storage = firebase.storage();
const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, storage, auth, db };
