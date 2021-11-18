import React,{useEffect} from 'react'
import {View, Text,Button} from 'react-native';
import * as firebase from 'firebase';

export default function Users(props) {
    useEffect(() => {
        firebase.firestore().collection('users')
        .doc()

    }, [input])
    const onSignOut =()=>{
        firebase.auth().signOut()
        props.navigation.navigate('Login')
    }
    return (
       <View>
           <Text>Users Screen</Text>
           <Button
           title="Signout"
           onPress={() => onSignOut()}
           />
       </View>
    )
}
