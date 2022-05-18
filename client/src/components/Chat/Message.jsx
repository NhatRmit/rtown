import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { FaRegCheckCircle } from "react-icons/fa";

const Message = ({ message, currentfriend, scrollRef, typingMessage }) => {
     const auth = useSelector(state => state.auth);
     return (
          <>
               <div className='message-show'>
                    {
                         message && message.length > 0 ? message.map((m, index) =>
                              m.senderId === auth._id ? <div key={index} ref={scrollRef} className='my-message'>
                                   <div className='image-message'>
                                        <div className='my-text'>
                                             <p className='message-text'> {m.message.text === '' ? <img src={m.message.image} alt="" /> : m.message.text} </p>

                                             {
                                                  index === message.length - 1 && m.senderId === auth._id ? m.status === 'seen' ? <img className='img' src={currentfriend.avatar} alt='' /> : m.status === 'delivared' ? <span> <FaRegCheckCircle /> </span> : <span> <FaRegCheckCircle /> </span> : ''
                                             }


                                        </div>
                                   </div>
                                   <div className='time'>
                                        {moment(m.createdAt).startOf('mini').fromNow()}
                                   </div>
                              </div> : <div key={index} ref={scrollRef} className='fd-message'>
                                   <div className='image-message-time-fnd'>
                                        <img src={currentfriend.avatar} alt='lala' />
                                        <div className='message-time-fnd'>
                                             <div className='fd-text'>
                                                  <p className='message-text-fnd'> {m.message.text === '' ? <img src={`./image/${m.message.image}`} alt="" /> : m.message.text}  </p>
                                             </div>
                                             <div className='time'>
                                                  {moment(m.createdAt).startOf('mini').fromNow()}
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         ) : <div className='friend_connect'>
                              <img src={currentfriend.avatar} alt='' />
                              <h3>{currentfriend.userName} Connect You </h3>
                              <span> {moment(currentfriend.createdAt).startOf('mini').fromNow()} </span>
                         </div>
                    }


               </div>
               {
                    typingMessage && typingMessage.msg && typingMessage.senderId === currentfriend.user ? <div className='typing-message'>
                         <div className='fd-message'>
                              <div className='image-message-time'>
                                   <img src={currentfriend.avatar} alt='' />
                                   <div className='message-time'>
                                        <div className='fd-text'>
                                             <p className='time'>Typing Message.... </p>
                                        </div>

                                   </div>
                              </div>
                         </div>

                    </div> : ''
               }



          </>
     )
};

export default Message;
