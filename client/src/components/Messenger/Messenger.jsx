import React, { useEffect, useState, useRef } from 'react';
import { FaEllipsisH, FaEdit, FaSistrix, FaSignOutAlt } from "react-icons/fa";
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, messageSend, getMessage, ImageMessageSend, seenMessage, updateMessage, getTheme, themeSet } from '../../actions/messenger';

// import toast, { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client';
import { loadUser } from '../../actions/auth';



const Messenger = () => {
     const scrollRef = useRef();
     const socket = useRef();
     const dispatch = useDispatch();

     const { friends, message, mesageSendSuccess, message_get_success, themeMood, new_user_add } = useSelector(state => state.messenger);
     const { auth } = useSelector(state => state.auth);



     const [currentfriend, setCurrentFriend] = useState('');
     const [newMessage, setNewMessage] = useState('');

     const [activeUser, setActiveUser] = useState([]);
     const [socketMessage, setSocketMessage] = useState('');
     const [typingMessage, setTypingMessage] = useState('');

     useEffect(() => {
          socket.current = io('ws://localhost:8000');
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

          dispatch(loadUser())
     }, [dispatch]);

     useEffect(() => {
          if (socketMessage && currentfriend) {
               if (socketMessage.senderId === currentfriend._id && socketMessage.reseverId === (auth && auth._id)) {
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
     }, [socketMessage, currentfriend, auth._id, auth, dispatch]);

     useEffect(() => {
          socket.current.emit('addUser', auth._id, auth)
     }, [auth]);

     useEffect(() => {
          socket.current.on('getUser', (users) => {
               const filterUser = users.filter(u => u.userId !== (auth && auth._id))
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
     }, [auth._id, auth, dispatch]);

     useEffect(() => {
          if (socketMessage && socketMessage.senderId !== currentfriend._id && socketMessage.reseverId === (auth && auth._id)) {
               // toast.success(`${socketMessage.senderName} Send a New Message`)
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
     }, [socketMessage, currentfriend._id, auth, auth._id, dispatch]);




     const inputHendle = (e) => {
          setNewMessage(e.target.value);

          socket.current.emit('typingMessage', {
               senderId: auth._id,
               reseverId: currentfriend._id,
               msg: e.target.value
          })

     }

     const sendMessage = (e) => {
          e.preventDefault();
          const data = {
               senderName: auth._id,
               reseverId: currentfriend._id,
               message: newMessage ? newMessage : '❤'
          }


          socket.current.emit('typingMessage', {
               senderId: auth._id,
               reseverId: currentfriend._id,
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
     }, [message, mesageSendSuccess, dispatch]);

     useEffect(() => {
          dispatch(getFriends());
          dispatch({ type: 'NEW_USER_ADD_CLEAR' })
     }, [dispatch, new_user_add]);

     useEffect(() => {
          if (friends && friends.length > 0)
               setCurrentFriend(friends[0].fndInfo)

     }, [friends]);


     useEffect(() => {
          dispatch(getMessage(currentfriend._id));
          if (friends.length > 0) {

          }
     }, [dispatch, currentfriend?._id, friends.length]);


     useEffect(() => {
          if (message.length > 0) {
               if (message[message.length - 1].senderId !== (auth && auth._id) && message[message.length - 1].status !== 'seen') {
                    dispatch({
                         type: 'UPDATE',
                         payload: {
                              id: currentfriend._id
                         }
                    })
                    socket.current.emit('seen', { senderId: currentfriend._id, reseverId: auth._id })
                    dispatch(seenMessage({ _id: message[message.length - 1]._id }))
               }
          }
          dispatch({
               type: 'MESSAGE_GET_SUCCESS_CLEAR'
          })

     }, [dispatch, message, currentfriend._id, auth._id, auth]);



     useEffect(() => {
          scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
     }, [message]);


     const emojiSend = (emu) => {
          setNewMessage(`${newMessage}` + emu);
          socket.current.emit('typingMessage', {
               senderId: auth._id,
               reseverId: currentfriend._id,
               msg: emu
          })
     }

     const ImageSend = (e) => {

          if (e.target.files.length !== 0) {
               const imagename = e.target.files[0].name;
               const newImageName = Date.now() + imagename;

               socket.current.emit('sendMessage', {
                    senderId: auth._id,
                    senderName: auth._id,
                    reseverId: currentfriend._id,
                    time: new Date(),
                    message: {
                         text: '',
                         image: newImageName
                    }
               })

               const formData = new FormData();

               formData.append('senderName', auth._id);
               formData.append('imageName', newImageName);
               formData.append('reseverId', currentfriend._id);
               formData.append('image', e.target.files[0]);
               dispatch(ImageMessageSend(formData));
          }
     }

     const [hide, setHide] = useState(true);

     useEffect(() => {
          dispatch(getTheme());
     }, [dispatch]);

     const search = (e) => {

          const getFriendClass = document.getElementsByClassName('hover-friend');
          const friendNameClass = document.getElementsByClassName('Fd_name');
          for (var i = 0; i < getFriendClass.length && i < friendNameClass.length; i++) {
               let text = friendNameClass[i].innerText.toLowerCase();
               if (text.indexOf(e.target.value.toLowerCase()) > -1) {
                    getFriendClass[i].style.display = '';
               } else {
                    getFriendClass[i].style.display = 'none';
               }
          }
     }


     return (
          <div className={themeMood === 'dark' ? 'messenger theme' : 'messenger'}>
               {/* <Toaster
                    position={'top-right'}
                    reverseOrder={false}
                    toastOptions={{
                         style: {
                              fontSize: '18px'
                         }
                    }}

               /> */}


               <div className='row'>
                    <div className='col-3'>
                         <div className='left-side'>
                              <div className='top'>
                                   <div className='image-name'>
                                        {/* <div className='image'>
                                             <img src={`./image/${auth && myInfo.image}`} alt='' />

                                        </div> */}
                                        <div className='name'>
                                             <h3>{auth && auth._id} </h3>
                                        </div>
                                   </div>

                                   <div className='icons'>
                                        <div onClick={() => setHide(!hide)} className='icon'>
                                             <FaEllipsisH />
                                        </div>
                                        <div className='icon'>
                                             <FaEdit />
                                        </div>

                                        <div className={hide ? 'theme_logout' : 'theme_logout show'}>
                                             <h3>Dark Mode </h3>
                                             <div className='on'>
                                                  <label htmlFor='dark'>ON</label>
                                                  <input onChange={(e) => dispatch(themeSet(e.target.value))} type="radio" value="dark" name="theme" id="dark" />
                                             </div>

                                             <div className='of'>
                                                  <label htmlFor='white'>OFF</label>
                                                  <input onChange={(e) => dispatch(themeSet(e.target.value))} type="radio" value="white" name="theme" id="white" />
                                             </div>
                                        </div>
                                   </div>
                              </div>

                              <div className='friend-search'>
                                   <div className='search'>
                                        <button> <FaSistrix /> </button>
                                        <input onChange={search} type="text" placeholder='Search' className='form-control' />
                                   </div>
                              </div>

                              {/* <div className='active-friends'>
     {
        activeUser && activeUser.length > 0 ? activeUser.map(u =>  <ActiveFriend setCurrentFriend = {setCurrentFriend} user={u} />) : ''  
     }
                        
               </div> */}

                              <div className='friends'>
                                   {
                                        friends && friends.length > 0 ? friends.map((fd) => <div onClick={() => setCurrentFriend(fd.fndInfo)} className={currentfriend._id === fd.fndInfo._id ? 'hover-friend active' : 'hover-friend'}>
                                             <Friends activeUser={activeUser} myId={auth._id} friend={fd} />
                                        </div>) : 'No Friend'
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
                              ImageSend={ImageSend}
                              activeUser={activeUser}
                              typingMessage={typingMessage}
                         /> : 'Please Select your Friend'
                    }
               </div>
          </div>
     )
};

export default Messenger;
