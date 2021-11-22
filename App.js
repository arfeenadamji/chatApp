import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "./src/component/auth/login"
import RegisterScreen from './src/component/auth/register';
import UsersScreen from './src/component/screen/users';
import ChatScreen from './src/component/screen/chat';

import firebase from './src/firebase'

import {Provider} from 'react-redux'
import { createStore,applyMiddleware } from 'redux';
import rootReducer from './src/redux/reducers'
import thunk from 'redux-thunk';

const store = createStore(rootReducer,applyMiddleware(thunk))

const Stack = createStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Users" component={UsersScreen} />
          <Stack.Screen name="Chat" component={ChatScreen}  
          options={({route}) =>({
            title:route.params.name,
            headerBackTitleVisible:false,
          
          })}
          />

        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
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
