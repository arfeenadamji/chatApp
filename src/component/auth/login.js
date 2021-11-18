import React,{useState} from 'react'
import { View,Text,StyleSheet,TextInput,Button } from 'react-native'

export default function Login() {
    const [email,setEmail] = useState('')
    const[pass, setPass] = useState('')
    
    const onSignIn=() =>{
        alert('khk')
    }
    return (
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={styles.heading}>Login Screen</Text>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          style={styles.inputEmail}
          onChangeText={(email) => this.setState({email})}
        />
  
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          value={pass}
          style={styles.inputPassword}
          onChangeText={(pass) => this.setState({pass})}
        />
        <Button
          style={[styles.btn]}
          onPress={() => onSignIn()}
          title="Login "
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