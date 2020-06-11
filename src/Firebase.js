import * as firebase from 'firebase';
import "firebase/auth";
import 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const app = firebase.initializeApp({
  apiKey: "AIzaSyD2BFjkQjIA9Zua7bNPcY7euUp0eqj_-cw",
    authDomain: "crudreact-34ae8.firebaseapp.com",
    databaseURL: "https://crudreact-34ae8.firebaseio.com",
    projectId: "crudreact-34ae8",
    storageBucket: "crudreact-34ae8.appspot.com",
    messagingSenderId: "149965987373",
    appId: "1:149965987373:web:a788aa8d128cf19fd1a2a4",
    measurementId: "G-Y3TCJEXFPX"

});

export const firestore = firebase.firestore();
firebase.firestore().settings(settings);
export default app;
