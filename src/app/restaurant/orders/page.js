"use client"
import axios from 'axios'
import Footer from '../../_components/common/Footer'
import RestaurantHeader from '../../_components/restaurant/RestaurantHeader'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Orders = () => {
  const [orders, setOrders] = useState([])
  let restaurant = JSON.parse(localStorage.getItem("restaurantUser"))
  const router = useRouter() 

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const response = await axios.post("http://localhost:3000/api/restaurant/orders", { id: restaurant._id })
    console.log(response)
    if (response.data.success) {
      setOrders(response.data.result)
    }
  }
  return (
    <div>
      <RestaurantHeader />
      <div className='dashboard-container'>
        <h1>Orders</h1>
        <div className="list-container">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Amount</th>
                <th>Tax</th>
                <th>Status</th>
                <th>Total</th>
                <th>paymentMethod</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                orders && orders.map((item, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{item.foodCharges}</td>
                    <td>{item.tax}</td>
                    <td>{item.status == 1 ? "placed" : item.status == 2 ? "prepared" : item.status == 3 ? "out for delivery" : item.status == 4 ? "delivered" : "completed"}</td>
                    <td>{item.totalAmount}</td>
                    <td>{item.paymentMethod}</td>

                    <td>
                      <button onClick={() => router.push(`/restaurant/orders/${item._id}`)}>View</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Orders