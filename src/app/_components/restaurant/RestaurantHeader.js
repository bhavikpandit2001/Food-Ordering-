'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
const RestaurantHeader = () => {
    const [details, setDetails] = useState();
    const pathName = usePathname();
    const router = useRouter();
    useEffect(() => {
        const data = localStorage.getItem("restaurantUser");
        if (!data && pathName == "/restaurant/dashboard") {
            router.push("/restaurant")
        }
        else if (data && pathName == "/restaurant") {
            router.push("/restaurant/dashboard")
        }

        if (data) {
            setDetails(JSON.parse(data));
        }
    }, [])

    const logout = () => {
        localStorage.removeItem("restaurantUser");
        router.push("/restaurant")
    }
    return (
        <div className='header-wrapper'>
            <div className="logo">
                <img style={{ width: 60 }} src="https://media.istockphoto.com/id/1138234161/vector/delivery-illustration.jpg?s=612x612&w=0&k=20&c=BXRhh9OYBOEbpfUD9DrO-aOLoyoqyzVj6s2EQyXQYRQ=" />
            </div>
            <ul>
                <li>
                    <Link href="/restaurant">Home</Link>
                </li>

                {
                    details && details.name ?
                        <>
                            <li>
                                <Link href="/restaurant/orders">Orders</Link>
                            </li>
                            <li>
                                <Link href="/restaurant/profile">Profile</Link>
                            </li>
                            <li>
                                <button onClick={logout}>Logout</button>
                            </li>
                        </>
                        : <li>
                            <Link href="/restaurant">Login</Link>
                        </li>
                }
            </ul>
        </div >
    )
}

export default RestaurantHeader;