import * as firebase from 'firebase';
import "firebase/auth";
import 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyD2BFjkQjIA9Zua7bNPcY7euUp0eqj_-cw",
  authDomain: "crudreact-34ae8.firebaseapp.com",
  databaseURL: "https://crudreact-34ae8.firebaseio.com",
  projectId: "crudreact-34ae8",
  storageBucket: "crudreact-34ae8.appspot.com",
  messagingSenderId: "149965987373"
};
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
firebase.firestore().settings(settings);

export default firebase;