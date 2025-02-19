'use client'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeliveryHeader = (props) => {
    const [details, setDetails] = useState();
    const pathName = usePathname();
    const router = useRouter();
    useEffect(() => {
        const data = localStorage.getItem("deliveryUser");
        if (!data && pathName == "/delivery/dashboard") {
            router.push("/delivery")
        }
        else if (data && pathName == "/delivery") {
            router.push("/delivery/dashboard")
        }

        if (data) {
            setDetails(JSON.parse(data));
        }
    }, [])

    const logout = () => {
        localStorage.removeItem("deliveryUser");
        router.push("/delivery")
    }

    return (
        <div className="header-wrapper">
            <div className="logo">
                <img style={{ width: 60 }} src="https://media.istockphoto.com/id/1138234161/vector/delivery-illustration.jpg?s=612x612&w=0&k=20&c=BXRhh9OYBOEbpfUD9DrO-aOLoyoqyzVj6s2EQyXQYRQ=" />
            </div>
            <ul>
                {
                    details && details.name ?
                        <>
                            <li>
                                <Link href="/delivery/orders">Orders</Link>
                            </li>
                            <li>
                                <Link href="/delivery/profile">Profile</Link>
                            </li>
                            <li>
                                <button onClick={logout}>Logout</button>
                            </li>
                        </>
                        : <li>
                            <Link href="/delivery">Login</Link>
                        </li>
                }
            </ul>
        </div>
    )
}

export default DeliveryHeader