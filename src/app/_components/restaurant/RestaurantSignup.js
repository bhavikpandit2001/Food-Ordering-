import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"

const RestaurantSignup = () => {
    const router = useRouter();
    const [error,setError]=useState(false);
    const [passwordError,setPasswordError]=useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        c_password: "",
        city: "",
        address: "",
        mobile: "",
        image: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault()
        console.log("signup restaurant", formData)

        if (formData.password !== formData.c_password) {
            setPasswordError(true);
            return false
        } else {
            setPasswordError(false)
        }
        if (!formData.email || !formData.password || !formData.c_password || !formData.name || !formData.city || !formData.address || !formData.mobile) {
            setError(true)
            return false
        } else {
            setError(false)
        }
        let response = await axios.post("http://localhost:3000/api/restaurant", formData)
        console.log(response);
        if (response.data.success) {
            localStorage.setItem("restaurantUser", JSON.stringify(response.data.result))
            router.push("/restaurant/dashboard")
        }
    }
    return (
        <div>
            <form onSubmit={handleSignup}>
                <div className="input-wrapper">
                    <input type="text" name="name" placeholder="enter name" value={formData.name} onChange={handleChange} className="input-field" />
                </div>
                <div className="input-wrapper">
                    <input type="text" name="email" placeholder="enter email" value={formData.email} onChange={handleChange} className="input-field" />
                </div>
                <div className="input-wrapper">
                    <input type="password" name="password" placeholder="enter password" value={formData.password} onChange={handleChange} className="input-field" />
                </div>

                <div className="input-wrapper">
                    <input type="password" name="c_password" className="input-field" value={formData.c_password} onChange={handleChange} placeholder="Confirm password" />
                </div>
                <div className="input-wrapper">
                    <input type="text" name="city" className="input-field" value={formData.city} onChange={handleChange} placeholder="Enter city" />
                </div>
                <div className="input-wrapper">
                    <input type="text" name="address" className="input-field" value={formData.address} onChange={handleChange} placeholder="Enter address" />
                </div>
                <div className="input-wrapper">
                    <input type="text" name="mobile" className="input-field" value={formData.mobile} onChange={handleChange} placeholder="Enter mobile" />
                </div>
                <div className="input-wrapper">
                    <input type="text" name="image" className="input-field" value={formData.image} onChange={handleChange} placeholder="Select Profile Image" />
                </div>
                <div className="input-wrapper">
                    <button className="button">Signup</button>
                </div>
            </form>
        </div>
    )
}

export default RestaurantSignup