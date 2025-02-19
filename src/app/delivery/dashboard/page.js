import Footer from '../../_components/common/Footer'
import DeliveryHeader from '../../_components/deliverypartner/DeliveryHeader'
import React from 'react'

const Dashboard = () => {
  return (
    <>
      <DeliveryHeader />
      <div className='dashboard-container'>
        <h1>Dashboard</h1>
      </div>
      <Footer/>
    </>
  )
}

export default Dashboard