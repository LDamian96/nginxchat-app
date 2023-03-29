import { async } from '@firebase/util'
import React, { useContext, useState } from 'react'
import { db } from '../FIREBASE/firebase'
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { AuthContext } from '../Context/AuthContext';

export const Search = () => {
  const {currenuser}=useContext(AuthContext)
  const [username, setusername] = useState("")
  const [user, setuser] = useState(null)
  const [err, seterr] = useState(false)
  const handleSearch =async()=>{
    const q = query(collection(db, "users"), 
              where("displayName", "==", username));
  
  try {
    
 
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          setuser(doc.data())

});

} catch (err) {
  seterr(true)
    
}

  }
  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect= async()=>{
    //verificar si el chat existe - firestore
    const combineId= 
          currenuser.uid > user.uid
          ? currenuser.uid + user.uid
          : user.uid + currenuser.uid
          try {
            const res = await getDoc(doc(db,'chats',combineId));

              if (!res.exists()){  
                //crear colección en chats 
                await setDoc(doc(db, "chats", combineId),{messages:[]} );
                //crear user chats //autor
              await updateDoc(doc(db,"userChats",currenuser.uid),{
                [combineId+".userInfo"]:{
                  uid:user.uid,
                  displayName:user.displayName,
                  photoURL:user.photoURL
                },
                [combineId+".date"]:serverTimestamp()
              });
                ////cliente
              await updateDoc(doc(db,"userChats",user.uid),{
                [combineId+".userInfo"]:{
                  uid:currenuser.uid,
                  displayName:currenuser.displayName,
                  photoURL:currenuser.photoURL,
                  email:currenuser.email
                },
                [combineId+".date"]:serverTimestamp()
              });
              }
          } catch (err) {
          
            
          }
  
          setuser(null)
          setusername("")


  }
 
  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text"
        onKeyDown={handleKey}
        onChange={e=>setusername(e.target.value)}
        value={username}
      placeholder="search name"
        />
      </div>
      {err &&<span>no se encontro</span>}

      { user &&(
      <div className='userChat' onClick={handleSelect}>
        <img src={user.photoURL} alt=""/>
        <div className='userChatInfo'>
          <span>{user.displayName} </span>
          
        </div>
      </div>)}

    </div>
  )
}
