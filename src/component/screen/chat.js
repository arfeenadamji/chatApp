import React, { useState, useCallback, useEffect } from 'react'
import { View, Text } from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GiftedChat, Send } from 'react-native-gifted-chat'

import * as firebase from 'firebase';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { saveUser } from "../../redux/action/index";

export function Chat(props) {
    const [message, setMessage] = useState([]);
    const [length,setLength] = useState(10);

    useEffect(() => {
        fetchChat()
    }, [])

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons name="send-circle"
                        style={{ marginBottom: 5, marginRight: 5 }}
                        size={32}
                        color="#2e64e5" />
                </View>
            </Send>
        )
    }
    // const fetchChat = (db) => {
    //     firebase.firestore().collection('conversations').doc(props.route.params.chatId).collection('messages').limit(10)
    //         .orderBy('createdAt', 'desc')
    //         .onSnapshot((snapshot) => {
    //             const last = snapshot.docs.length-1;

    //             const next = firebase.firestore().collection('conversations').doc(props.route.params.chatId).collection('messages')
    //             .orderBy('createdAt')
    //             .startAfter(last.data().createdAt)
    //             .limit(3);
    //             // const nextSnapshot =  next.get();
    //             // console.log('Num results:', nextSnapshot.docs.length);
    //             let chat = [];
    //             snapshot.docs.map((doc) => {

    //                 let RandomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    //                 let temp = {
    //                     _id: RandomId,
    //                     text: doc.data().text,
    //                     createdAt: doc.data().createdAt,
    //                     user: {
    //                         _id: doc.data().senderId,
    //                         name: props.currentUser.name,
    //                         avatar: 'https://placeimg.com/140/140/any',
    //                     }
    //                 }
    //                 chat.push(temp);
    //                 setMessage(chat)
    //             })
    //         })
    // }

    const fetchChat = (db) => {
        firebase.firestore().collection('conversations').doc(props.route.params.chatId).collection('messages').limit(length)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                const last = snapshot.docs[snapshot.docs.length-1];

                // const next = firebase.firestore().collection('conversations').doc(props.route.params.chatId).collection('messages')
                // .orderBy('createdAt')
                // .startAfter(last.data().createdAt)
                // .limit(3);
                // const nextSnapshot =  next.get();
                // console.log('Num results:', nextSnapshot.docs.length);
                let chat = [];
                snapshot.docs.map((doc) => {

                    let RandomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                    let temp = {
                        _id: RandomId,
                        text: doc.data().text,
                        createdAt: doc.data().createdAt,
                        user: {
                            _id: doc.data().senderId,
                            name: props.currentUser.name,
                            avatar: 'https://placeimg.com/140/140/any',
                        }
                    }
                    chat.push(temp);
                    setMessage(chat)
                })
            })
    }
    const onSend = useCallback((message = []) => {
        setMessage(previousMessage => GiftedChat.append(previousMessage, message))
        firebase.firestore().collection('conversations').doc(props.route.params.chatId).collection('messages').add({
            createdAt: Date.now(),
            senderId: props.currentUser.uid,
            text: message[0].text
        })
    }, [])
    const scrollToBottomComponent = () => {
        return (<FontAwesome name='angle-double-down' size={22} color='#333' />);
    }
    return (
        <GiftedChat
            messages={message}
            onSend={message => onSend(message)}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
            // onLoadEarlier
            loadEarlier={true}
//             onLoadEarlier={this.onLoadEarlier}
//   isLoadingEarlier={this.state.isLoadingEarlier}
            scrollToBottomComponent={scrollToBottomComponent}
            user={{
                _id: props.currentUser.uid,
            }} />
    )
}

const mapStateToProps = (store) => {
    return {
        currentUser: store.userState.currentUser,
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ saveUser }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
