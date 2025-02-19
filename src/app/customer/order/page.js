'use client'
import { useEffect, useState } from "react"
import CustomerHeader from "../../_components/customer/CustomerHeader"
import Footer from "../../_components/common/Footer"
import { DELIVERY_CHARGES, TAX } from "../../lib/constant"
import { useRouter } from "next/navigation"
import axios from "axios"



const Order = () => {

    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem('customer')));
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
    const [foodCharges] = useState(() => cartStorage?.length == 1 ? cartStorage[0].price : cartStorage?.reduce((a, b) => {
        return a.price + b.price
    }))

    const [removeCartData, setRemoveCartData] = useState(false)
    const router = useRouter()

    console.log(cartStorage)
    console.log(foodCharges)
    useEffect(() => {
        if (!foodCharges) {
            router.push('/customer')
        }
    }, [foodCharges])

    let tax = foodCharges * TAX
    let total = foodCharges + tax + DELIVERY_CHARGES
    const orderNow = async () => {
        console.log("order now");
        let user = JSON.parse(localStorage.getItem('customer'));
        let cart = JSON.parse(localStorage.getItem('cart'));
        let foodItemIds = cart.map((item) => item._id);
        let resto_id = cart[0].resto_id;
        let orderObj = {
            userId: user?._id,
            restaurantId: resto_id,
            fooditemsId: foodItemIds,
            status: 1,
            foodCharges: foodCharges,
            tax: TAX,
            deliveryCharges: DELIVERY_CHARGES,
            totalAmount: total,
            paymentMethod: "CashOnDelivery"
        }

        console.log(orderObj)
        let response = await axios.post('http://localhost:3000/api/customer/order', orderObj);
        console.log(response)
        if (response.data.success) {
            alert("order confirmed")
            localStorage.removeItem('cart')
            router.push('/customer')

        } else {
            alert("order failed")
        }
    }

    return (
        <>
            <CustomerHeader/>
            <div className="dashboard-container">
                <div>
                    <button onClick={() => router.back()}>Back</button>
                </div>
                <div className="total-wrapper">
                    <div className="block-1">
                        <h2>User Details</h2>
                        <div className="row">
                            <span>Name </span>
                            <span>{userStorage.name}</span>
                        </div>
                        <div className="row">
                            <span>address </span>
                            <span>{userStorage.address}</span>
                        </div>
                        <div className="row">
                            <span>Mobile </span>
                            <span>{userStorage.mobile}</span>
                        </div>
                        <h2>Amount Details</h2>
                        <div className="row">
                            <span>Food Charges : </span>
                            <span>{foodCharges}</span>
                        </div>
                        <div className="row">
                            <span>Tax : </span>
                            <span>{tax}</span>
                        </div>
                        <div className="row">
                            <span>Delivery Charges  : </span>
                            <span>{DELIVERY_CHARGES}</span>
                        </div>
                        <div className="row">
                            <span>Total Amount : </span>
                            <span>{total}</span>
                        </div>
                        <h2>Payment Methods</h2>
                        <div className="row">
                            <span>Cash on Delivery : </span>
                            <span>{total}</span>
                        </div>

                    </div>
                    <div className="block-2">
                        <button onClick={orderNow} >Place your Order Now</button>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Order