'use client'
import { useEffect, useState } from "react"
import CustomerHeader from "../../_components/customer/CustomerHeader"
import Footer from "../../_components/common/Footer"
import { useRouter } from "next/navigation"
import { DELIVERY_CHARGES, TAX } from "../../lib/constant"

const Cart = () => {

    const [cartStorage, setCartStorage] = useState([])
    const [foodCharges, setFoodCharges] = useState(0)
    const router = useRouter()
    const [cartData, setCartData] = useState();
    const [removeCartData, setRemoveCartData] = useState()
    const [cartIds, setCartIds] = useState(cartStorage ? () => cartStorage.map((cartItem) => {
        return cartItem._id
    }) : [])

    useEffect(() => {
        // Retrieve cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Set cart state
        setCartStorage(cart);
        // Calculate total price
        const totalcharge = cart.reduce((sum, item) => sum + item.price, 0);
        setFoodCharges(totalcharge);
    }, [removeCartData]);

    const removeFromCart = (id) => {
        setRemoveCartData(id);
        let localIds = cartIds.filter(item => item != id);
        setCartData()
        setCartIds(localIds)
    }

    const orderNow = () => {
        if (JSON.parse(localStorage.getItem('customer'))) {
            router.push('/customer/order')
        } else {
            router.push('/customer/auth?order=true')
        }
    }

    let tax = foodCharges * TAX
    let total = foodCharges + tax + DELIVERY_CHARGES

    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
            {cartStorage && cartStorage.length > 0 ? (
                <div className='dashboard-container'>
                    <div>
                        <button onClick={() => router.back()}>Back</button>
                    </div>
                    {
                        cartStorage?.length > 0 ? cartStorage.map((item) => (
                            <div className="restaurant-wrapper" key={item._id}>
                                <div style={{ display: "flex" }}>
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
                                    <button onClick={() => removeFromCart(item._id)} >Remove From Cart</button>
                                </div>
                            </div>
                        )) : (
                            <h1>Cart is empty please add food for order!!!</h1>
                        )
                    }
                    <div className="restaurant-wrapper">
                        <div style={{ display: "flex", justifyContent: "space-between", width: "70%" }}>
                            <div style={{ textAlign: "left" }}>
                                <div>Food Charges :</div>
                                <div>Tax :</div>
                                <div>Delivery Charges :</div>
                                <div>Total Amout :</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div>{foodCharges}</div>
                                <div>{tax}</div>
                                <div>{DELIVERY_CHARGES}</div>
                                <div>{total}</div>
                            </div>
                        </div>
                        <div>
                            <button onClick={orderNow}>Order Now</button>
                        </div>
                    </div>
                </div>
            )
                : <h1>Cart is empty please add food for order!!!</h1>
            }
            <Footer />

        </div>
    )
}

export default Cart