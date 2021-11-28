//  import React, { Component } from 'react';
// import {View, Text, Button} from 'react-native'
// import * as firebase from 'firebase'

// export default function temp(){
//     return(
//         <View>
//         <Text>temp</Text>
//         <Button 
//         title="signOut"
//         onPress={() => firebase.auth().signOut()}
//         />
//         </View>
//     )
// // }

// import { StatusBar } from 'expo-status-bar';
// import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';

// import firebase from './firebase';
// import { PersistGate } from 'redux-persist/integration/react';

// import { Provider } from 'react-redux';
// import { createStore, applyMiddleaware, applyMiddleware } from 'redux';
// import rootReducer from './Redux/reducers'
// import thunk from 'redux-thunk';

// import LoginScreen from './Screens/AuthScreens/Login'
// import SignUpScreen from './Screens/AuthScreens/SignUp'

// import ChatScreen from './Screens/Pages/Chats'
// import MessagesScreen from './Screens/Pages/Messages'

// import { persistStore, persistReducer } from "redux-persist";
// import allReducers from './Redux/reducers/index'
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
//   timeout: null,
// };
// const persistedReducer = persistReducer(persistConfig, allReducers);
// const store = createStore(persistedReducer, {}, applyMiddleaware);
// const persistor = persistStore(store);


// const Stack = createStackNavigator();

// export class App extends Component{
//   constructor(props){
//     super(props)
//     this.state = {
//       loaded:false
//     }

//   }
//   componentDidMount(){
//     firebase.auth().onAuthStateChanged((user) =>{
//       if(!user){
//         this.setState({
//           loggedIn: false,
//           loaded: true,
//         })
//       }

//       else{
//         this.setState({
//           loggedIn: true,
//           loaded: true,
//         })
//       }
//     })
//   }

//   render(){
//     const {loggedIn, loaded} = this.state;
//     if(!loaded){
//       return(
//         <Text>Loading...</Text>
//       )
//     }
//     if(!loggedIn){
//       return(
//         <Provider store={store}>
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="Login">
//             <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
//             <Stack.Screen name="SignUp" component={SignUpScreen}/>
//           </Stack.Navigator>
//         </NavigationContainer>
//       </Provider>
//       )}
//       return(
//         <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <NavigationContainer>
//             <Stack.Navigator initialRouteName="Main">
//               <Stack.Screen name="Chats" component={ChatScreen}/>
//               <Stack.Screen name="messages" component={MessagesScreen}
//               options={({route}) => ({
//                 title: route.params.name
//               })}
//               />
//             </Stack.Navigator>
//           </NavigationContainer>
//           </PersistGate>
//         </Provider>
//       )


//   }
// }


// export default App