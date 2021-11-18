import React,{useState} from 'react'
import { View,Text,StyleSheet,TextInput,Button } from 'react-native'
import * as firebase from 'firebase'

export default function Login(props) {
    const [email,setEmail] = useState('')
    const[pass, setPass] = useState('')
    
    const onSignIn=() =>{
      
        firebase.auth().signInWithEmailAndPassword(email,pass)
        .then((result) =>{
         if(result !== undefined){
          // console.log('result from login ', result.email)
          props.navigation.navigate('Users, {}');
         }else{console.log('error from login',error)}
        })
    }      

    // const onRegister=() =>{
    //   firebase.auth().createUserWithEmailAndPassword(email,pass)
    //   .then((result) =>{
    //     firebase.firestore().collection('users')
    //     .doc(result.user.uid)
    //     .set({
    //       name,
    //       email
    //     })
    //     console.log('result from register',result)
    //   })
    //   .catch((error) =>{
    //     console.log('error from signUp',error)
    //   })
    // }
    return (
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={styles.heading}>Login Screen</Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          style={styles.inputEmail}
          onChangeText={(email) => setEmail(email)}
        />
  
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          value={pass}
          style={styles.inputPassword}
          onChangeText={(pass) => setPass(pass)}
        />
        <Button
          style={[styles.btn]}
          onPress={() => onSignIn()}
          title="Login "
        />
        <View style={{paddingTop:20}}/>
        <Button
          style={[styles.btn]}
          onPress={() => props.navigation.navigate('Register')}
          title="Register User "
        />
        </View>
       )}
   
   const styles = StyleSheet.create({
      textStyle: {
        fontSize: 10,
      },
      inputEmail: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginBottom: 25,
        borderRadius:10,
        width:'90%'
      },
      inputPassword: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginBottom: 25,
        borderRadius:10,
        width:'90%'
      },
      btn: {
        margin: 100,
        marginTop: 10,
      },
      heading: {
        textAlign: "center",
        fontSize: 30,
      },
      btnR: {
        margin: 100,
        marginTop: 50,
        paddingTop: 50,
      },
    });