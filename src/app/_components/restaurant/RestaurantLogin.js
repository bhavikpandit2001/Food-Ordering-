import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"

const RestaurantLogin = () => {
    const router = useRouter();
    const [error,setError]=useState(false);
    const [formData, setFormData] = useState({
        email: "",
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
        console.log("login restaurant")
        if(!formData.email || !formData.password){
            setError(true)
            return false
        }else{
            setError(false)
        }
        let payload = {
            email: formData.email,
            password: formData.password,
            login: true
        }

        const response = await axios.post("http://localhost:3000/api/restaurant",payload)
        console.log(response)
        if(response.data.success){
            localStorage.setItem("restaurantUser",JSON.stringify(response.data.result));
            router.push("/restaurant/dashboard");
        }else{
            alert("Login failed")
        }
    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="input-wrapper">
                    <input type="text" name="email" placeholder="enter email" value={formData.email} onChange={handleChange} className="input-field" />
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

export default RestaurantLogin