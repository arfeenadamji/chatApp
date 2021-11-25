import React, { Component } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";

import { saveUser } from "../../redux/action/index";

import * as firebase from "firebase";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user,
            chatId1: ''
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    setUser = (item) => {
        firebase.firestore().collection('conversations')
            .where(`parties.${this.props.route.params.uid1}`, '==', true)
            .where(`parties.${item.uid}`, '==', true)
            .limit(1)
            .get()
            .then((snapshot) => {
                console.log('123 user', snapshot.empty)
                if (snapshot.empty) {
                    console.log('6789', snapshot)
                    firebase.firestore()
                        .collection("conversations")
                        .add({
                            parties: {
                                [this.props.route.params.uid1]: true,
                                [item.uid]: true
                            },
                            partiesInfo: {
                                [this.props.currentUser.uid]: {
                                    name: this.props.currentUser.name,
                                    profilePic: null,
                                    unreadMessage: 0
                                },
                                [item.uid]: {
                                    name: item.name,
                                    profilePic: null,
                                    unreadMessage: 0
                                }
                            }
                        }).then((snapshot) => {
                            console.log('snapshot snapshot', snapshot)
                            firebase.firestore()
                                .collection("conversations")
                                .doc(snapshot.id)
                                .update({ cid: snapshot.id })
                            this.props.navigation.navigate("Chat", { id: item.uid, name: item.name, chatId: snapshot.id });
                            console.log('snapshot.id',snapshot.id)
                            // }
                        })
                } else {
                    let cid;
                    console.log('snapshot.docs',snapshot.docs)
                    snapshot.docs.forEach(e => {
                        console.log('e',e)
                        cid = e.data().cid
                        console.log('e.data()',e.data())
                        console.log("el", e.data().cid)
                    });
                    this.props.navigation.navigate("Chat", { id: item.uid, name: item.name, chatId: cid });
                }
            }).catch((err) => {
                console.log(err)
            })
    };
    fetchUsers = () => {
        firebase
            .firestore()
            .collection("users")
            .where("uid", "!=", this.props.currentUser.uid)
            .get()
            .then((snapshot) => {
                let users = [];
                snapshot.docs.map((doc) => {
                    users.push(doc.data());
                    // const data = doc.data();
                    // const id = doc.id;
                    // return { id, ...data }
                });
                // this.setState({data})
                this.setState({ users });
            });
    };

    onSignOut = () => {
        firebase.auth().signOut();
        this.props.navigation.navigate("Login");
    };

    render() {
        return (
            <View>
                <FlatList
                    style={{ marginTop: 10 }}
                    data={this.state.users}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => this.setUser(item)}>
                            <View style={{ marginBottom: 15, flexDirection: "row" }}>
                                <Text>{item.name}</Text>
                                <MaterialCommunityIcons
                                    name="chat"
                                    style={{ position: "absolute", right: 20 }} />
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <Button title="SignOut" onPress={() => this.onSignOut()} />
            </View>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        currentUser: store.userState.currentUser,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ saveUser }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Users);
