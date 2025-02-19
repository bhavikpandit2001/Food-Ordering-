'use client'
import Footer from "../../../_components/common/Footer";
import RestaurantHeader from "../../../_components/restaurant/RestaurantHeader";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditFoodItems = () => {
    const params = useParams()
    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        description: "",
        image: "",
    });
    const [error, setError] = useState(false)
    const router = useRouter();

    useEffect(() => {
        handleLoadFoodItem();
    }, [])

    const handleLoadFoodItem = async () => {
        let response = await axios.get(`http://localhost:3000/api/restaurant/foods/view/${params.id}`);
        console.log(response)
        if (response.data.success) {
            setFormData(response.data.result)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditFoodItem = async () => {
        if (!formData?.name || !formData?.image || !formData?.price || !formData?.description) {
            setError(true);
            return false
        } else {
            setError(false)
        }
        let response = await axios.patch(`http://localhost:3000/api/restaurant/foods/view/${params.id}`,formData);
        if (response.data.success) {
            router.push('../dashboard')
        } else {
            alert("data is not updated please try again")
        }
    }

    return (
        <>
            <RestaurantHeader />
            <div className="container">
                <h1> Update Food Item</h1>
                <div className="input-wrapper">
                    <input type="text" name="name" className="input-field" placeholder="Enter food name"
                        value={formData.name} onChange={handleChange}
                    />
                    {error && !formData.name && <span className="input-error">Please enter valid name</span>}
                </div>
                <div className="input-wrapper">
                    <input type="text" name="price" className="input-field" placeholder="Enter price"
                        value={formData.price} onChange={handleChange}
                    />
                    {error && !formData.price && <span className="input-error">Please enter valid price</span>}

                </div>
                <div className="input-wrapper">
                    <input type="text" name="image" className="input-field" placeholder="Enter image path"
                        value={formData.image} onChange={handleChange}
                    />
                    {error && !formData.image && <span className="input-error">Please enter valid path</span>}

                </div>
                <div className="input-wrapper">
                    <input type="text" name="description" className="input-field" placeholder="Enter description"
                        value={formData?.description} onChange={handleChange}
                    />
                    {error && !formData?.description && <span className="input-error">Please enter valid description</span>}

                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={handleEditFoodItem}>Update Food Item</button>
                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={() => router.push('../dashboard')}>Back to Food Item list</button>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default EditFoodItems;