"use client"
import { useRouter } from 'next/navigation'
import Footer from '../../_components/common/Footer'
import RestaurantHeader from '../../_components/restaurant/RestaurantHeader'
import React from 'react'

const Profile = () => {
  const local = localStorage.getItem("restaurantUser")
  const loggedinUser = local? JSON.parse(local) : {}
  const router = useRouter()
  return (
    <>
      <RestaurantHeader />
      <div className='dashboard-container'>
        <div>
          <button onClick={() => router.back()}>Back</button>
        </div>
        <div className='profile-container'>
          <div className='profile-image'>
            <img src={loggedinUser?.image} alt='restaurant image'/>
          </div>
          <div className='detail-container'>
              <div style={{fontSize:"50px", fontWeight:"600"}}>{loggedinUser?.name}</div>
              <div style={{fontSize:"25px"}}>{loggedinUser?.email}</div>
              <div style={{fontSize:"25px"}}>{loggedinUser?.mobile}</div>
              <div style={{fontSize:"25px"}}>{loggedinUser?.address}, {loggedinUser?.city}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile