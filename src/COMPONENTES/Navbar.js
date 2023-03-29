import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { auth } from '../FIREBASE/firebase'

export const NavBar = () => {
  const {currenuser} =useContext(AuthContext)
  
  return (
    <div className='navbar'>
        <span className='logo'>Chat</span>
        <div className='user'>
            <img src={currenuser.photoURL} />
            <span>{currenuser.displayName} </span>
            <span>{currenuser.email} </span>
            <button onClick={()=>signOut(auth)}>logout</button>
        </div>
    </div>
  )
}
