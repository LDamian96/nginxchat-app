import React, { useContext, useEffect, useState } from 'react'
import { db } from '../FIREBASE/firebase';
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';
export const Chats = () => {
  const [chats, setchats] = useState([])
  const {currenuser} =useContext(AuthContext)
  const {dispatch} =useContext(ChatContext)
  useEffect(() => {
    const GetChats=()=>{
    const unsub = onSnapshot(doc(db, 'userChats',currenuser.uid), (doc) => {
      setchats(doc.data());
  });
  return ()=>{
    unsub()
  };
};
currenuser.uid && GetChats()
  }, [currenuser.uid])
  console.log(Object.entries(chats))

  const handlSelect=(u)=>{
    dispatch({type:"CHANGE_USER",payload:u})

  }
  
  return (
    <>
    
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=> (

      <div className='userChat' 
                      key={chat[0]} 
                      onClick={()=>handlSelect(chat[1].userInfo)} >
        <img src={chat[1].userInfo.photoURL} />
        <div className='userChatInfo'>
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text} </p>
          
          
        </div>
      </div>

     
))}
      
    </div>
    </>
  )
}
