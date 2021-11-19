import React, { Component, useState } from 'react'
import { TextInput, View, Button, Text, StyleSheet } from 'react-native';
import  * as firebase from 'firebase'

export default function Register(props) {

    const[name,setName] = useState('')
    const[email,setEmail]= useState('')
    const [password,setPassword] = useState('')

   const onSignUp = ()=> {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                .doc(result.user.uid)
                .set({
                    name,
                    email,
                    uid: result.user.uid
                })
                alert('user register')
                props.navigation.navigate('Login')
                console.log('result from register',result)
            })
            .catch((error) => {
                console.log(error)
            })

    }
        return (
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="name"
                    onChangeText={(name) =>setName(name)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    autoCapitalize={false}
                    onChangeText={(email) =>setEmail(email)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="password"
                    secureTextEntry
                    onChangeText={(password) =>setPassword(password)}
                />
                <Button
                    onPress={() =>onSignUp()}
                    title="Sign Up"
                />
            </View>
        )
    
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 25,
    }
})
