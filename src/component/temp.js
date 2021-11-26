 import React, { Component } from 'react';
import {View, Text, Button} from 'react-native'
import * as firebase from 'firebase'

export default function temp(){
    return(
        <View>
        <Text>temp</Text>
        <Button 
        title="signOut"
        onPress={() => firebase.auth().signOut()}
        />
        </View>
    )
}