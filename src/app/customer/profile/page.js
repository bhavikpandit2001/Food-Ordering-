"use client"
import { useRouter } from 'next/navigation'
import Footer from '../../_components/common/Footer'
import React, { useEffect, useState } from 'react'
import CustomerHeader from '../../_components/customer/CustomerHeader'
import axios from 'axios'

const Profile = () => {
  // const local = localStorage.getItem("customer")
  // const loggedinUser = local? JSON.parse(local) : {}
  const router = useRouter()
  const loggedinUser = JSON.parse(localStorage.getItem("customer"))
  const [orders, setOrders] = useState([])
  useEffect(() => {
    fetchOrder()
  }, [])

  const fetchOrder = async () => {
    const response = await axios.get(`http://localhost:3000/api/customer/order?id=${loggedinUser._id}`)
    console.log(response)
    if (response.data.success) {
      setOrders(response.data.result)
    }
  }

  const handleView = (id) => {
    console.log("handle view clicked", id)
    router.push(`/customer/profile/${id}`)
  }

  return (
    <>
      <CustomerHeader />
      <div className='dashboard-container'>
        <div>
          <button onClick={() => router.back()}>Back</button>
        </div>
        <div className='profile-container'>
          <div className='profile-image'>
            <img src={loggedinUser?.image} alt='restaurant image' />
          </div>
          <div className='detail-container'>
            <div style={{ fontSize: "50px", fontWeight: "600" }}>{loggedinUser?.name}</div>
            <div style={{ fontSize: "25px" }}>{loggedinUser?.email}</div>
            <div style={{ fontSize: "25px" }}>{loggedinUser?.mobile}</div>
            <div style={{ fontSize: "25px" }}>{loggedinUser?.address}, {loggedinUser?.city}</div>
          </div>
        </div>
        <div className='order-container'>
          <h2>Orders</h2>
          {orders ? orders?.map((order) => (
            <div className='order-list' onClick={() => handleView(order?.order?._id)}>
              <div style={{fontSize: "20px", fontWeight:"600"}}>From : {order?.restaurant?.name}</div>
              <div>Address : {order?.restaurant?.address}</div>
              <div>Amount : {order?.order?.totalAmount}</div>
              <div style={{fontWeight:"600"}}>Status : {order?.order?.status == 1 ? "placed" : order?.order?.status == 2 ?  "prepared" : order?.order?.status == 3 ?"out for delivery" : order?.order?.status == 4 ? "delivered" : "completed" }</div>
            </div>
          )) : (
            <div>
              <h1> no orders found!!!</h1>
            </div>
          )
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile