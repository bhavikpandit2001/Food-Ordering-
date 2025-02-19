"use client"
import { useRouter } from 'next/navigation'
import Footer from '../../_components/common/Footer'
import React from 'react'
import CustomerHeader from '../../_components/customer/CustomerHeader'

const Profile = () => {
  const local = localStorage.getItem("customer")
  const loggedinUser = local? JSON.parse(local) : {}
  const router = useRouter()
  return (
    <>
      <CustomerHeader />
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