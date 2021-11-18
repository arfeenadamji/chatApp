import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "./src/component/auth/login"
import RegisterScreen from './src/component/auth/register';

import firebase from './src/firebase'

const Stack = createStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin:20,
    // backgroundColor: 'yellow',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
