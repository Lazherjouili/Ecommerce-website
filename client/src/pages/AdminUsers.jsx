import React from 'react'

import SideBar from '../components/SideBar'
import DashboardUsers from '../components/DashboardUsers'
const AdminUsers = () => {
  return (
    <div className='flex  	'>
        <div className=''><SideBar/></div>
        <div className='w-full'><DashboardUsers/></div>
        
    </div>
  )
}

export default AdminUsers