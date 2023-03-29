import React, { useContext } from 'react'
import Cam from '../IMAGENES/cam.png'
import Add from '../IMAGENES/add.png'
import More from '../IMAGENES/more.png'
import { Mesages } from './Mesages'
import { Input } from './Input'
import { ChatContext } from '../Context/ChatContext'
import { AuthContext } from '../Context/AuthContext'
export const Chat = () => {
  const {data} =useContext(ChatContext)
  const {currenuser} =useContext(AuthContext)
  console.log(data)
  
  return (

    <div className='chat'>
         
      <div className='chatInfo '>
      <div className='hola'>
        <img   className='hola2' src={data.user?.photoURL} />
         <span  className='hola3'> {data.user?.displayName}</span>
        </div>
      <div className='chatIcons'>
        <img src={Cam}/>
        <img src={Add}/>
        <img src={More}/>
      </div>
     
      </div>
      <Mesages/>
      <Input/>
    </div>
  )
}
