import React, { useEffect, useState, useRef } from 'react';
import Friends from './Friends';
import RightSide from './RightSide';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, messageSend, getMessage, seenMessage, updateMessage } from '../../actions/messenger';
import { getProfile } from '../../actions/profile'
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import Layout from '../Layout'

const Messenger = () => {
     const dispatch = useDispatch();
     const scrollRef = useRef();
     const socket = useRef();

     const { friends, message, mesageSendSuccess, message_get_success, new_user_add } = useSelector(state => state.messenger);
     const auth = useSelector(state => state.auth);
     const profile = useSelector(state => state.profile.profile)
     
     const [currentfriend, setCurrentFriend] = useState('');
     const [newMessage, setNewMessage] = useState('');

     const [activeUser, setActiveUser] = useState([]);
     const [socketMessage, setSocketMessage] = useState('');
     const [typingMessage, setTypingMessage] = useState('');
     useEffect(() => {
          dispatch(getProfile())
          socket.current = io('ws://34.124.147.121:8000/');
          socket.current.on('getMessage', (data) => {
               setSocketMessage(data);
          })

          socket.current.on('typingMessageGet', (data) => {
               setTypingMessage(data);
          })

          socket.current.on('msgSeenResponse', msg => {
               dispatch({
                    type: 'SEEN_MESSAGE',
                    payload: {
                         msgInfo: msg
                    }
               })
          })

          socket.current.on('msgDelivaredResponse', msg => {
               dispatch({
                    type: 'DELIVARED_MESSAGE',
                    payload: {
                         msgInfo: msg
                    }
               })
          })

          socket.current.on('seenSuccess', data => {
               dispatch({
                    type: 'SEEN_ALL',
                    payload: data
               })
          })

     }, [dispatch]);


     useEffect(() => {
          if (socketMessage && currentfriend) {
               if (socketMessage.senderId === currentfriend.user && socketMessage.receiverId === auth._id) {
                    dispatch({
                         type: 'SOCKET_MESSAGE',
                         payload: {
                              message: socketMessage
                         }
                    })
                    dispatch(seenMessage(socketMessage));
                    socket.current.emit('messageSeen', socketMessage);
                    dispatch({
                         type: 'UPDATE_FRIEND_MESSAGE',
                         payload: {
                              msgInfo: socketMessage,
                              status: 'seen'
                         }
                    })
               }
          }
          setSocketMessage('')
     }, [socketMessage, currentfriend, auth._id, dispatch]);

     useEffect(() => {
          socket.current.emit('addUser', auth._id, auth)
     }, [auth]);

     useEffect(() => {
          socket.current.on('getUser', (users) => {
               const filterUser = users.filter(u => u.userId !== auth._id)
               setActiveUser(filterUser);
          })

          socket.current.on('new_user_add', data => {
               dispatch({
                    type: 'NEW_USER_ADD',
                    payload: {
                         new_user_add: data
                    }
               })
          })
     }, [dispatch, auth]);

     useEffect(() => {
          if (socketMessage && socketMessage.senderId !== currentfriend.user && socketMessage.receiverId === auth._id) {
               toast.success(`${socketMessage.senderName} Send a New Message`)
               dispatch(updateMessage(socketMessage));
               socket.current.emit('delivaredMessage', socketMessage);
               dispatch({
                    type: 'UPDATE_FRIEND_MESSAGE',
                    payload: {
                         msgInfo: socketMessage,
                         status: 'delivared'
                    }
               })

          }
     }, [socketMessage, currentfriend.user, dispatch, auth._id]);

     const inputHendle = (e) => {
          setNewMessage(e.target.value);

          socket.current.emit('typingMessage', {
               senderId: auth._id,
               receiverId: currentfriend.user,
               msg: e.target.value
          })

     }

     const sendMessage = (e) => {
          e.preventDefault();
          const data = {
               senderName: auth.usernameOrEmail,
               receiverId: currentfriend.user,
               message: newMessage ? newMessage : '❤'
          }
          socket.current.emit('typingMessage', {
               senderId: auth._id,
               receiverId: currentfriend.user,
               msg: ''
          })
          dispatch(messageSend(data));
          setNewMessage('')
     }

     useEffect(() => {
          if (mesageSendSuccess) {
               socket.current.emit('sendMessage', message[message.length - 1]);
               dispatch({
                    type: 'UPDATE_FRIEND_MESSAGE',
                    payload: {
                         msgInfo: message[message.length - 1]
                    }
               })
               dispatch({
                    type: 'MESSAGE_SEND_SUCCESS_CLEAR'
               })
          }
     }, [mesageSendSuccess, dispatch, message]);


     useEffect(() => {
          dispatch(getFriends());
          dispatch({ type: 'NEW_USER_ADD_CLEAR' })
     }, [new_user_add, dispatch]);

     useEffect(() => {
          if (friends && friends.length > 0)
               setCurrentFriend(friends[0].fndInfo)
     }, [friends]);


     useEffect(() => {
          dispatch(getMessage(currentfriend.user));
          if (friends.length > 0) {

          }
     }, [currentfriend.user, dispatch, friends.length]);


     useEffect(() => {
          if (message.length > 0) {
               if (message[message.length - 1].senderId !== auth._id && message[message.length - 1].status !== 'seen') {
                    dispatch({
                         type: 'UPDATE',
                         payload: {
                              id: currentfriend.user
                         }
                    })
                    socket.current.emit('seen', { senderId: currentfriend.user, receiverId: auth._id })
                    dispatch(seenMessage({ _id: message[message.length - 1]._id }))
               }
          }
          dispatch({
               type: 'MESSAGE_GET_SUCCESS_CLEAR'
          })

     }, [message_get_success, dispatch, currentfriend.user, auth._id, message]);



     useEffect(() => {
          scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
     }, [message]);


     const emojiSend = (emu) => {
          setNewMessage(`${newMessage}` + emu);
          socket.current.emit('typingMessage', {
               senderId: auth._id,
               receiverId: currentfriend.user,
               msg: emu
          })
     }

     // const ImageSend = (e) => {

     //      if (e.target.files.length !== 0) {
     //           const imagename = e.target.files[0].name;
     //           const newImageName = Date.now() + imagename;

     //           socket.current.emit('sendMessage', {
     //                senderId: auth.id,
     //                senderName: auth.userName,
     //                receiverId: currentfriend.user,
     //                time: new Date(),
     //                message: {
     //                     text: '',
     //                     image: newImageName
     //                }
     //           })

     //           const formData = new FormData();

     //           formData.append('senderName', auth.userName);
     //           formData.append('imageName', newImageName);
     //           formData.append('receiverId', currentfriend.user);
     //           formData.append('image', e.target.files[0]);
     //           dispatch(ImageMessageSend(formData));
     //      }
     // }

     return (
          <Layout header footer>
               <div className='messenger'>
                    <div className='row'>
                         <div className='col-3'>
                              <div className='left-side'>
                                   <div className='top'>
                                        <div className='image-name'>
                                             <div className='image'>
                                                  <img src={profile && profile.avatar} alt='user avatar' />

                                             </div>
                                             <div className='name'>
                                                  <h3>{auth.usernameOrEmail} </h3>
                                             </div>
                                        </div>
                                   </div>

                                   <div className='friends'>
                                        {
                                             friends && friends.length > 0 ?
                                                  friends.map((fd, index) => fd.fndInfo.admin === false &&
                                                       <div key={index} onClick={() =>
                                                            setCurrentFriend(fd.fndInfo)} className={currentfriend.user === fd.fndInfo._id ? 'hover-friend active' : 'hover-friend'}>
                                                            <Friends activeUser={activeUser} auth={auth._id} friend={fd} />
                                                       </div>
                                                  ) : 'No Friend'
                                        }
                                   </div>
                              </div>
                         </div>

                         {
                              currentfriend ? <RightSide
                                   currentfriend={currentfriend}
                                   inputHendle={inputHendle}
                                   newMessage={newMessage}
                                   sendMessage={sendMessage}
                                   message={message}
                                   scrollRef={scrollRef}
                                   emojiSend={emojiSend}
                                   // ImageSend={ImageSend}
                                   activeUser={activeUser}
                                   typingMessage={typingMessage}
                              /> : 'Please Select your Friend'
                         }
                    </div>

               </div>
          </Layout>
     )
};

export default Messenger;
