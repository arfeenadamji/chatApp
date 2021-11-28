import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/component/auth/login";
import RegisterScreen from "./src/component/auth/register";
import UsersScreen from "./src/component/screen/users";
import ChatScreen from "./src/component/screen/chat";
import temp from "./src/component/temp";

import firebase from "./src/firebase";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/redux/reducers";
import thunk from "redux-thunk";

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';


// const store = createStore(rootReducer, applyMiddleware(thunk));

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  timeout: null,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, {}, applyMiddleware);
const persistor = persistStore(store);

const Stack = createStackNavigator();
export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;

    if (loggedIn) {
    return (
        <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Users">
            {/* <Stack.Screen name="temp" component={temp} /> */}
              <Stack.Screen name="Users" component={UsersScreen} />
              <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={({ route }) => ({
                  title: route.params.name,
                  headerBackTitleVisible: false,
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>

          </PersistGate>
        </Provider>
      )
    } else if (!loggedIn) {
      return (
        <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        </PersistGate>
         </Provider>
      );
    } else {
      return (
        <View>
          <Text>User is not Logged In </Text>
        </View>
      );
    }
  }
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
export default App
