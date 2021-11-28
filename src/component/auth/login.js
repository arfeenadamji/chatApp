import React,{useState} from 'react'
import { View,Text,StyleSheet,TextInput,Button } from 'react-native'
import * as firebase from 'firebase'
import { saveUser}  from '../../redux/action/index'
import { connect, useDispatch, useSelector } from 'react-redux'

export default function Login({navigation}) {
  const dispatch = useDispatch()



    const [email,setEmail] = useState('temp@test.com')
    const[pass, setPass] = useState('test123')
    
    const onSignIn=() =>{
        firebase.auth().signInWithEmailAndPassword(email,pass)
        .then((result) =>{
         if(result !== undefined){
          firebase.firestore().collection('users')
        .doc(result.user?.uid)
        .get()
        .then((snapshot) =>{
            if(snapshot.exists){
                dispatch({type:'USER_STATE_CHANGE', currentUser:snapshot.data()})
              navigation.navigate('Users',{uid1: result.user.uid});
            } else{
                console.log('error from action while saving user',error)
            }
        })
         }else{console.log(error)}
        }).catch((err) =>{
            console.log('errerr',err)
        })
    }      

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