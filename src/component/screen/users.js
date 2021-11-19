import React,{Component} from 'react'
import {View, Text,Button,FlatList} from 'react-native';

import {saveUser} from '../../redux/action/index'

import * as firebase from 'firebase';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cos } from 'react-native-reanimated';

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
          data={this.state.users}
          renderItem={({ item }) => (
            <View >
                <Text>{item.name}</Text>
             {/* <Text>{{item.name}</Text> */}
            </View>
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