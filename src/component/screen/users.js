import React,{Component} from 'react'
import {View, Text,Button,FlatList,TouchableOpacity} from 'react-native';

import {saveUser} from '../../redux/action/index'

import * as firebase from 'firebase';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class Users extends Component {
    constructor(props){
        super(props);
        this.state={
           user
        }
    }
    
    componentDidMount(){
        this.fetchUsers();
        console.log('props.route.params.uid from feed',this.props.route.params.uid)
       
    }
    setUser=(item)=>{
        this.props.navigation.navigate('Chat',{id:item.uid1,name:item.name})
        firebase.firestore().collection('coversation').add({
        //  firebase.firestore().collection('conversations').collection("messages").collection('parties').add({
            timestamp: Date.now(),
            parties:{
            [this.props.route.params.uid1]:true,
            [item.uid2]:true
            }
         }); 
        //  firebase.firestore().collection('parties').doc().collection("inbox").doc().collection('uid2').add({
        //     timestamp: Date.now(),
        //     uid2:item.uid

        //  }); 
        }
    fetchUsers=()=>{    
        firebase.firestore().collection('users')
        .where('uid' ,'!=',  this.props.currentUser.uid)
        .get()
        .then((snapshot) =>{
            let users = []
             snapshot.docs.map(doc => {
                users.push(doc.data())
            console.log("Users: ",doc.data())
                // const data = doc.data();
                // const id = doc.id;
                
                // return { id, ...data }
            });
            this.setState({users})
            console.log('users11', this.state.users)
        })
    }
     onSignOut =()=>{
        firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }
    render(){
        return (
            <View>
                <Text>Users Screen</Text>
                
                <FlatList
                style={{marginTop:10}}
          data={this.state.users}
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => this.setUser(item)}
            >
            <View  style={{marginBottom:15,flexDirection:'row'}}>
                <Text>{item.name}</Text>
                <MaterialCommunityIcons name="chat" style={{position: 'absolute', right: 20}}/>
            </View>
            </TouchableOpacity>
          )}
        />
                <Button
                title="Signout"
                onPress={() => this.onSignOut()}
                />
            </View>
         )
    }
}

const mapStateToProps = (store) =>{
    return{
        currentUser:store.userState.currentUser
    }
    
}

const mapDispatchToProps = (dispatch) => bindActionCreators({saveUser}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Users)