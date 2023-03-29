import React, { useContext, useState } from 'react'
import Img from '../IMAGENES/img.png'
import Attach from '../IMAGENES/attach.png'
import { ChatContext } from '../Context/ChatContext'
import { AuthContext } from '../Context/AuthContext'

import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from '../FIREBASE/firebase'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { async } from '@firebase/util'



export const Input = () => {
  const [text, settext] = useState("")
  const [img, setimg] = useState(null);

  const {data} =useContext(ChatContext);
  const {currenuser} =useContext(AuthContext);
  console.log(data)

    
      const handleSend = async () => {
        if (img) {
          const storageRef = ref(storage, uuid());
    
           await uploadBytesResumable(storageRef, img).then(()=>{

              
            getDownloadURL(storageRef).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  img: downloadURL,
                  senderId: currenuser.uid,
                  date: Timestamp.now(),
                 
                }),
              });
            });
          
    });
        
           
          
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currenuser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db,"userChats",currenuser.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp()
    });

    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId + ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]: serverTimestamp()
    });

 settext("")
 setimg(null)

   
  };
  console.log(data)



  return (
    <div className='input' >
        <input type="text" placeholder="Message" 
               onChange={e=>settext((e).target.value)}
               value={text} />
    <div className='send'>
        <img src={Attach} />
        <input type="file" style={{display:"none"}} id="file" 
               onChange={e=>setimg((e).target.files[0])}/>
        <label htmlFor='file'>
            <img src={Img} alt=""/>
        </label>
        <button onClick={handleSend}>Send</button>
        
    </div>
    </div>
  )
}
