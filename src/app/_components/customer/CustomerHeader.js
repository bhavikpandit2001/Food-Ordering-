'use client'
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = (props) => {

    const data = localStorage.getItem("customer");
    const customer = data ? JSON.parse(data) : undefined
    const cartStorage = localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'));
    const [cartItem, setCartItem] = useState(cartStorage);
    const [user, setUser] = useState(customer ? customer : undefined)
    const [count, setCount] = useState(cartItem?.length);
    const router = useRouter();

    useEffect(() => {
        if (props.cartData && Object.keys(props.cartData).length > 0) {

            setCartItem((prevCart) => {
                if (!Array.isArray(prevCart)) prevCart = []; // Ensure prevCart is an array

                const currentRestaurantId = prevCart.length > 0 ? prevCart[0].restaurantId : null;
                const newRestaurantId = props.cartData.restaurantId;
                let updatedCart = prevCart;
                if (currentRestaurantId && currentRestaurantId !== newRestaurantId) {
                    // If restaurant changed, clear cart
                    updatedCart = [];
                }

                const itemExists = updatedCart.some(
                    (item) => JSON.stringify(item) === JSON.stringify(props.cartData)
                );

                if (!itemExists) {
                    updatedCart = [...updatedCart, JSON.parse(JSON.stringify(props.cartData))];
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                }
                return updatedCart;
            });
        }
    }, [props.cartData]);

    useEffect(() => {
        if (props.removeCartData) {
            let localCartItem = cartItem.filter((item) => {
                return item._id != props.removeCartData
            });
            setCartItem(localCartItem);
            setCount(count - 1);
            localStorage.setItem('cart', JSON.stringify(localCartItem))
            if (localCartItem.length == 0) {
                localStorage.removeItem('cart')
            }
        }
    }, [props.removeCartData])

    // Use another useEffect to update count when cartItem changes
    useEffect(() => {
        setCount(cartItem?.length);
    }, [cartItem]);

    const logout = () => {
        localStorage.removeItem('customer');
        router.push('/customer')
    }

    return (
        <div className="header-wrapper">
            <div className="logo">
                <img style={{ width: 60 }} src="https://media.istockphoto.com/id/1138234161/vector/delivery-illustration.jpg?s=612x612&w=0&k=20&c=BXRhh9OYBOEbpfUD9DrO-aOLoyoqyzVj6s2EQyXQYRQ=" />
            </div>
            <ul>
                <li>
                    <Link href="/customer" >Home</Link>
                </li>
                <li>
                    <Link href="/customer/cart" >Cart({count ? count : 0})</Link>
                </li>
                {
                    customer ?
                        <>
                            <li>
                                <Link href="/customer/profile" >Profile</Link>
                            </li>
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                        :
                        <>
                            <li>
                                <Link href="/customer/auth">Login</Link>
                            </li>
                        </>
                }

            </ul>
        </div>
    )
}

export default CustomerHeader