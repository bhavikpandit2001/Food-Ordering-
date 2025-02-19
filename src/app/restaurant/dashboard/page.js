'use client'
import FoodList from '../../_components/restaurant/FoodList'
import RestaurantHeader from '../../_components/restaurant/RestaurantHeader'
import React, { useState } from 'react'
import AddFoodItem from '../../_components/restaurant/AddFoodItem'

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false)
  return (
    <>
      <RestaurantHeader />
      <div className='dashboard-container'>
        
        <button onClick={() => setAddItem(true)}>Add Food </button>
        <button onClick={() => setAddItem(false)}>Dashboard</button>
        {
          addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodList />
        }
      </div>
    </>

  )
}

export default Dashboard