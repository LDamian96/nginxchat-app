import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../Context/ChatContext'
import { db } from '../FIREBASE/firebase'
import { Message } from './Message'


export const Mesages = () => {
  const [messages, setmessages] = useState([])
  const {data} =useContext(ChatContext)
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setmessages(doc.data().messages);
  });
    return ()=>{
      unsub();
    };
  }, [data.chatId]);
  
  return (
    <div className='messages'>
      
      {messages.map((m)=>(
                <Message message={m} key={m.id} />
      ))}

    
    </div>
  );

};
