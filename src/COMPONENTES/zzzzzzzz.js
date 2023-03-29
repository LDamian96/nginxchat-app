import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

const LuisD = (mensaje) => {
  const {data} =useContext(ChatContext)
  const {currenuser} =useContext(AuthContext)
 
  return (
    <div
    
      className={`message ${mensaje.senderId=== currenuser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            mensaje.senderId === currenuser.uid
              ? currenuser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{mensaje.text}</p>
        {mensaje.img && <img src={mensaje.img} alt="" />}
      </div>
    </div>
  );
};
export default LuisD