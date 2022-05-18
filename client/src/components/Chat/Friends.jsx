import React from 'react';
import moment from 'moment';
import { FaRegCheckCircle } from "react-icons/fa";

const Friends = ({ activeUser, auth, friend }) => {
     const { fndInfo, msgInfo } = friend;
     return (
          <div className='friend'>
               <div className='friend-image'>
                    <div className='image'>
                         <img src={fndInfo.avatar} alt='' />
                         {
                              activeUser && activeUser.length > 0 && activeUser.some(u => u.userId === fndInfo.user) ? <div className='active_icon'></div> : ''
                         }

                    </div>
               </div>

               <div className='friend-name-seen'>
                    <div className='friend-name'>
                         <h4 className={msgInfo?.senderId !== auth && msgInfo?.status !== undefined && msgInfo.status !== 'seen' ? 'unseen_message Fd_name ' : 'Fd_name'} >{fndInfo.userName}</h4>

                         <div className='msg-time'>
                              <span>
                                   {msgInfo ?
                                        moment(msgInfo.createdAt).startOf('mini').fromNow() :
                                        moment(fndInfo.createdAt).startOf('mini').fromNow()
                                   }
                              </span>
                              <br />
                              {
                                   msgInfo && msgInfo.message.text ?
                                        <span className={msgInfo?.senderId !== auth && msgInfo?.status !== undefined && msgInfo.status !== 'seen' ? 'unseen_message' : ''}>
                                             You: {msgInfo.message.text.slice(0, 10)} {""}
                                        </span> : msgInfo && msgInfo.message.image ?
                                             <span>Send A image </span>
                                             : <></>
                              }
                              {
                                   msgInfo && msgInfo.message.text ?
                                        <span className={msgInfo?.senderId !== auth && msgInfo?.status !== undefined && msgInfo.status !== 'seen' ? 'unseen_message' : ''}>
                                             You: {msgInfo.message.text.slice(0, 10)} {""}
                                        </span> : msgInfo && msgInfo.message.image ?
                                             <span>Send A image </span>
                                             : <></>
                              }

                         </div>
                    </div>

                    {
                         auth === msgInfo?.senderId ?
                              <div className='seen-unseen-icon'>
                                   {
                                        msgInfo.status === 'seen' ?
                                             <img src={fndInfo.avatar} alt='' /> : msgInfo.status === 'delivared' ? <div className='delivared'> <FaRegCheckCircle /> </div> : <div className='unseen'> </div>
                                   }

                              </div> :
                              <div className='seen-unseen-icon'>
                                   {
                                        msgInfo?.status !== undefined && msgInfo?.status !== 'seen' ? <div className='seen-icon'> </div> : ''
                                   }


                              </div>
                    }
               </div>
          </div>
     )
};

export default Friends;
