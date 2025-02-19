import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"

const DeliveryLogin = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        mobile: "",
        password: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log("login delivery partner")
        let response = await axios.post('http://localhost:3000/api/delivery/login', formData)
        if (response.data.success) {
            localStorage.setItem('deliveryUser',JSON.stringify(response.data.result));
            router.push('/delivery/dashboard')
        } else {
            alert("failed to login. Please try again with valid email and password")
        }
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="input-wrapper">
                    <input type="text" name="mobile" placeholder="enter mobile no" value={formData.mobile} onChange={handleChange} className="input-field" />
                </div>
                <div className="input-wrapper">
                    <input type="password" name="password" placeholder="enter password" value={formData.password} onChange={handleChange} className="input-field" />
                </div>
                <div className="input-wrapper">
                    <button className="button">Login</button>
                </div>
            </form>
        </div>
    )
}

export default DeliveryLogin