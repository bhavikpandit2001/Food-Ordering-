'use client'
import axios from 'axios'
import Footer from '../../../_components/common/Footer'
import RestaurantHeader from '../../../_components/restaurant/RestaurantHeader'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const OrderDetail = () => {
    const params = useParams()
    const [order, setOrder] = useState({})

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    const fetchOrderDetails = async () => {
        const response = await axios.get(`http://localhost:3000/api/restaurant/orders/${params.id}`)
        console.log(response)
        if (response.data.success) {
            setOrder(response.data.result)
        }
    }

    const handleStatus = async(status) => {
        console.log(status)
        let payload = {
            id: order?.order?._id,
            status: status 
        }
        const response = await axios.post(`http://localhost:3000/api/restaurant/orders/${params.id}`, payload)
        console.log(response)
        if(response.data.success){
            fetchOrderDetails()
        }
    }
    return (
        <>
            <RestaurantHeader />
            <div className='dashboard-container'>
                <h1>order details</h1>
                <div className='order-details-container'>
                    <div>
                        <div >
                            <div style={{ fontSize: "20px", fontWeight: "bold" }}>Foodlist</div>
                            {order && order?.foodlist ? order?.foodlist?.map((food, key) => (
                                <div >
                                    <div style={{ fontSize: "20px" }}>no : {key + 1}, name : {food?.name}, price : {food?.price}</div>
                                </div>
                            )) : (
                                <div>no food found</div>
                            )
                            }
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600" }}>Total Amount : {order?.order?.totalAmount}</div>
                        <div style={{ fontSize: "16px", fontWeight: "600" }}>Payment Method : {order?.order?.paymentMethod}</div>
                        <div style={{ fontSize: "16px", fontWeight: "600" }}>Status : {order?.order?.status === 1 ? "placed" : order?.order?.status === 2 ? "prepared" : order?.order?.status === 3 ? "out for delivery" : order?.order?.status === 4 ? "delivered" : "completed"}</div>
                        <div>
                            {
                                order?.order?.status === 1 ? (
                                    <button onClick={() => handleStatus(2)}>prepare</button>
                                ) : order?.order?.status === 2 ? (
                                    <button onClick={() => handleStatus(3)}>out for delivery</button>
                                ) : (
                                    <button onClick={() => handleStatus(4)}>delivered</button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default OrderDetail