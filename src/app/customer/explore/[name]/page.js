'use client'
import CustomerHeader from "../../../_components/customer/CustomerHeader"
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

const Page = () => {
    const searchParams = useSearchParams()
    const [restaurantDetails, setRestaurantDetails] = useState({});
    const [foodItems, setFoodItems] = useState([])
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')));
    const [cartIds, setCartIds] = useState(cartStorage ? () => cartStorage.map((cartItem) => {
        return cartItem._id
    }) : [])
    const router = useRouter()
    const [cartData, setCartData] = useState();
    const [removeCartData,setRemoveCartData]=useState()
    useEffect(() => {
        loadRestaurantDetails()
    }, []);

    const loadRestaurantDetails = async () => {
        const id = searchParams.get("id")
        let response = await axios.get(`http://localhost:3000/api/customer/${id}`)
        console.log(response)
        if (response.data.success) {
            setRestaurantDetails(response.data.result.restaurant)
            setFoodItems(response.data.result.foodItems)
        }
    }
    const addToCart = (item) => {
        let localCartIds=cartIds;
        localCartIds.push(item._id);
        setCartIds(localCartIds)
        setCartData(item)
        setRemoveCartData();
    }

    const removeFromCart=(id)=>{
        setRemoveCartData(id);
        let localIds=cartIds.filter(item=>item!=id);
        setCartData()
        setCartIds(localIds)
    }
    return (
        <>
            <CustomerHeader cartData={cartData}  removeCartData={removeCartData}/>
            <div className='dashboard-container'>
                <div>
                    <button onClick={() => router.back()}>Back</button>
                </div>
                <div className='profile-container'>
                    <div className='profile-image'>
                        <img width={200} src={restaurantDetails?.image} alt='restaurant image' />
                    </div>
                    <div className='detail-container'>
                        <div style={{ fontSize: "50px", fontWeight: "600" }}>{restaurantDetails?.name}</div>
                        <div style={{ fontSize: "25px" }}>{restaurantDetails?.email}</div>
                        <div style={{ fontSize: "25px" }}>{restaurantDetails?.mobile}</div>
                        <div style={{ fontSize: "25px" }}>{restaurantDetails?.address}, {restaurantDetails?.city}</div>
                    </div>
                </div>
                <div className="restaurant-list-container">
                    {
                        foodItems && foodItems.length > 0 ? foodItems.map((item) => (
                            <div className="restaurant-wrapper">
                                <div style={{display: "flex"}}>
                                    <div>
                                        <img width={100} src={item?.image} alt="restaurant-image" />
                                    </div>
                                    <div className="details-wrapper">
                                        <div style={{ fontSize: "30px", fontWeight: "600" }}>{item?.name}</div>
                                        <div style={{ fontSize: "15px" }}>{item?.price}</div>
                                        <div style={{ fontSize: "15px" }}>{item?.description}</div>
                                    </div>
                                </div>
                                <div>
                                    {
                                        cartIds.includes(item._id) ?
                                            <button onClick={() => removeFromCart(item._id)} >Remove From Cart</button>
                                            : <button onClick={() => addToCart(item)}>Add to Cart</button>
                                    }

                                </div>
                            </div>
                        )) : (
                            <div> foods not found!!!</div>
                        )
                    }
                </div>
            </div>

        </>
    )
}
export default Page