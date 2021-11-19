import firebase from 'firebase';
import {USER_STATE_CHANGE} from '../constants/index';

export function saveUser(email,pass,nav){
    // console.log('122',email,pass)
    return (disptach) =>{
        // console.log('return')
        // firebase.auth().signInWithEmailAndPassword(email,pass)
        
        // .then((result) =>{
        //     console.log('result',result)
        //  if(result !== undefined){
        //      console.log(result)
            // nav('Users',{uid: firebase.auth().currentUser.uid});
          
          firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser?.uid)
        .get()
        .then((snapshot) =>{
            if(snapshot.exists){
                disptach({type:USER_STATE_CHANGE, currentUser:snapshot.data()})
                

            } else{
                console.log(error)
            }
        })
        //  }else{console.log('error from login',error)}
        // }).catch((err) =>{
        //     console.log('errerr',err)
        // })
    }
}