import React from 'react'
import Dashboard from '../components/Dashboard'
import SideBar from '../components/SideBar'
const Admin = () => {
  return (
    <div className='flex  	'>
        <div className=''><SideBar/></div>
        <div className='w-full'><Dashboard/></div>
        
    </div>
  )
}

export default Admin