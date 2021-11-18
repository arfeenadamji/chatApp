import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBAxAu-VB-YWA5HtqEDzSj1E50wUe9lOPE",
    authDomain: "chatapp-7616a.firebaseapp.com",
    projectId: "chatapp-7616a",
    storageBucket: "chatapp-7616a.appspot.com",
    messagingSenderId: "210028723893",
    appId: "1:210028723893:web:fa64c21cd1a53994e748fc",
    measurementId: "G-FL9GZGS6HS"
  };
  
  if(firebase.apps.length == 0){
    firebase.initializeApp(firebaseConfig)
}

export default firebase;