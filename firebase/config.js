import firebase from "@firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

let getServer;


const devConfig = {
    apiKey: "AIzaSyDLieBYpSFU6fyL6EPz4hzEhevkOda27es",
    authDomain: "movilperu.firebaseapp.com",
    databaseURL: "https://movilperu.firebaseio.com",
    projectId: "movilperu",
    storageBucket: "movilperu.appspot.com",
    messagingSenderId: "135498032188",
    appId: "1:135498032188:web:94d90dbdc2987110838f39"
};

firebase.initializeApp(devConfig);



const firestore = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const server = getServer;

export {
    server,
    storage,
    firestore,
    auth
};
