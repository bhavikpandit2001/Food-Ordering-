"use client";

import { useRouter } from "next/navigation";
import Footer from "../_components/common/Footer";
import CustomerHeader from "../_components/customer/CustomerHeader";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants()
  }, [])

  const loadLocations = async () => {
    let response = await fetch('http://localhost:3000/api/customer/locations');
    response = await response.json()
    if (response.success) {
      setLocations(response.result)
    }
  }

  const loadRestaurants = async (params) => {
    let url = `http://localhost:3000/api/customer`;
    if (params?.location) {
      url = `${url}?location=${params.location}`
    } else if (params?.restaurant) {
      url = `${url}?restaurant=${params.restaurant}`
    }
    let response = await axios.get(url);
    if (response.data.success) {
      setRestaurants(response.data.result)
    }
  }

  const handleListItem = (item) => {
    setSelectedLocation(item)
    setShowLocation(false)
    loadRestaurants({ location: item })
  }
  return (
    <main >
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input type="text" value={selectedLocation}
            onClick={() => setShowLocation(true)}
            className="select-input" placeholder="Select Place" />
          <ul className="location-list">
            {
              showLocation && locations.map((item) => (
                <li onClick={() => handleListItem(item)}>{item}</li>
              ))
            }
          </ul>

          <input type="text" className="search-input"
            onChange={(event) => loadRestaurants({ restaurant: event.target.value })}
            placeholder="Enter food or restaurant name" />
        </div>
      </div>
      <div className="restaurant-list-container">
        {
          restaurants ? restaurants.map((item) => (
            <div onClick={() => router.push(`/customer/explore/${item.name}?id=${item._id}`)} className="restaurant-wrapper">
              <div style={{ display: "flex" }}>
                <div>
                  <img width={100} src={item?.image} alt="restaurant-image" />
                </div>
                <div className="details-wrapper">
                  <div style={{ fontSize: "30px", fontWeight: "600" }}>{item?.name}</div>
                  <div style={{ fontSize: "15px" }}>{item?.email}</div>
                  <div style={{ fontSize: "15px" }}>{item?.mobile}</div>
                  <div style={{ fontSize: "15px" }}>{item?.address}, {item?.city}</div>
                </div>
              </div>
            </div>
          )) : (
            <div> restaurants not found!!!</div>
          )
        }
      </div>
      <Footer />
    </main>
  );
}
