import firebase from 'firebase';
import {USER_STATE_CHANGE} from '../constants/index';

export function saveUser(email,pass,nav){
    return (disptach) =>{ 
        // firebase.auth().signInWithEmailAndPassword(email,pass)
        // .then((result) =>{
        //  if(result !== undefined){
        //   firebase.firestore().collection('users')
        // .doc(result.user?.uid)
        // .get()
        // .then((snapshot) =>{
        //     if(snapshot.exists){
        //         dispatch({type:USER_STATE_CHANGE, currentUser:snapshot.data()})
        //       nav.navigate('Users',{uid1: result.user.uid});
        //     } else{
        //         console.log('error from action while saving user',error)
        //     }
        // })
        //  }else{console.log(error)}
        // }).catch((err) =>{
        //     console.log('errerr',err)
        // })
        // })
    }
}