import React from 'react'
import {  AuthContextProvider } from '../Context/AuthContext'
import { ChatContextProvider } from '../Context/ChatContext'
import { Home } from '../PAGE-REGISTRO/Home'
import { Login } from '../PAGE-REGISTRO/Login'
import { Register } from '../PAGE-REGISTRO/Register'
import { RouterApp } from '../Routers/RouterApp'


export const ChatApp = () => {
  return (
 <AuthContextProvider>
  <ChatContextProvider>
  <RouterApp/>
  </ChatContextProvider>
 </AuthContextProvider>
  )
}
