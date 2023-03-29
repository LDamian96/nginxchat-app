import React from 'react'
import { Chat } from '../COMPONENTES/Chat'
import { NavBar } from '../COMPONENTES/Navbar'
import { SideBar } from '../COMPONENTES/SideBar'

export const Home = () => {
  return (
    <div className='home'>
        
        <div className='container'>
           
            <SideBar/>
            <Chat/>
        </div>

    </div>
  )
}
