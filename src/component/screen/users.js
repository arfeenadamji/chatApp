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
    setUser=()=>{
        firebase.firestore().collection('parties').doc(this.props.route.params.uid).collection("messages").add({
            // message: input,
            timestamp: Date.now(),
            
            uid:this.props.route.params.uid

         }); 
    //     else {
    //       alert('user object is null')
    //    }
        // .collection('party-1').doc(this.props.route.params.uid)
        // this.props.navigation.navigate('Chat',{id:item.uid,name:item.name})
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
            onPress={() => this.setUser()}
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
    // console.log('store',store)
    return{
        currentUser:store.userState.currentUser
    }
    
}

const mapDispatchToProps = (dispatch) => bindActionCreators({saveUser}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Users)