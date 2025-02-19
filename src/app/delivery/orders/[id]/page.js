'use client'
import Footer from '../../../_components/common/Footer'
import DeliveryHeader from '../../../_components/deliverypartner/DeliveryHeader'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const OrderDetails = () => {
    const params = useParams()
    const [order, setOrder] = useState({})

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    const fetchOrderDetails = async () => {
        const response = await axios.get(`http://localhost:3000/api/delivery/orders/${params.id}`)
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
        const response = await axios.post(`http://localhost:3000/api/delivery/orders/${params.id}`, payload)
        console.log(response)
        if(response.data.success){
            fetchOrderDetails()
        }
    }
    console.log(order)
    return (
        <>
            <DeliveryHeader />
            <div className='dashboard-container'>
                <h1>order details</h1>
                <div className='order-details-container'>
                    <div className='details-layout'>
                        <div className='resto-user-details'>
                            <div className='user-details'>
                                <div>
                                    <h2>From</h2>
                                    <div>Name : {order?.restaurant?.name}</div>
                                    <div>Contact : {order?.restaurant?.mobile}</div>
                                    <div>Address : {order?.restaurant?.address}</div>
                                    <div>City : {order?.restaurant?.city}</div>
                                </div>
                                <div>
                                    <h2>To</h2>
                                    <div>Name :  {order?.user?.name}</div>
                                    <div>Email :  {order?.user?.email}</div>
                                    <div>Contact :  {order?.user?.mobile}</div>
                                    <div>Address :  {order?.user?.address}</div>
                                    <div>City :  {order?.user?.city}</div>
                                </div>
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <div style={{ fontSize: "16px", fontWeight: "600" }}>Payment Method : {order?.order?.paymentMethod}</div>
                                <div style={{ fontSize: "16px", fontWeight: "600" }}>Status : {order?.order?.status === 1 ? "placed" : order?.order?.status === 2 ? "prepared" : order?.order?.status === 3 ? "out for delivery" : order?.order?.status === 4 ? "delivered" : "completed"}</div>
                                <div>
                                    {
                                        order?.order?.status === 2 ? (
                                            <button onClick={() => handleStatus(3)}>out for delivery</button>
                                        ) : order?.order?.status === 3 ? (
                                            <button onClick={() => handleStatus(4)}>delivered</button>
                                        ) : (
                                            <button onClick={() => handleStatus(5)}>completed</button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='food-details'>
                            <div className='delivery-food-list'>
                                <h2>Food list</h2>
                                {
                                    order?.foodlist?.map((food) => (
                                        <div className='food-wrapper'>
                                            <div style={{ width: "20%" }}>
                                                <img width={50} src={food?.image} />
                                            </div>
                                            <div style={{ width: "80%" }}>
                                                <div>{food?.name}</div>
                                                <div>{food?.description}</div>
                                            </div>
                                            <div style={{ width: "10%" }}>{food?.price}</div>
                                        </div>
                                    ))
                                }
                                <div className='price-wrapper'>
                                    <div>
                                        <div>Sub Total</div>
                                        <div>Tax</div>
                                        <div>Delivery</div>
                                        <h3>Total</h3>
                                    </div>
                                    <div>
                                        <div>{order?.order?.foodCharges}</div>
                                        <div>{order?.order?.tax}</div>
                                        <div>{order?.order?.deliveryCharges}</div>
                                        <h3>{order?.order?.totalAmount}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default OrderDetails