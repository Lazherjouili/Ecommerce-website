import React from 'react'
import SideBar from '../components/SideBar'
import Create from '../components/Create'
const Products = () => {
  return (
    <div className='flex'>
        <div><SideBar/></div>
        <div className='w-full'><Create/></div>
    </div>
  )
}

export default Products