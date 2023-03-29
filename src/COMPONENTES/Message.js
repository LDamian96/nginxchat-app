import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'

export const Message = ({message}) => {
  const {data} =useContext(ChatContext)
  const {currenuser} =useContext(AuthContext)
 const ref =useRef()
 useEffect(() => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
}, [message]);
  return (
    <div ref={ref}
    
      className={`message ${message.senderId=== currenuser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currenuser.uid
              ? currenuser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span className='hola4'>Just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

