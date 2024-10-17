import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Wrapper = () => {
  return (
   <div className=' min-h-[100vh]'>
   <Navbar/>
   <Outlet/>
   </div>
  )
}

export default Wrapper