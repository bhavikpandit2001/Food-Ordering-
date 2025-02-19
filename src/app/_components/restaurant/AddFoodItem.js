import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddFoodItem = (props) => {
    const [formData, setFormData] = useState({
        name: "",
        price: 0,
        image: "",
        description: "",
        resto_id: ""
    })
    const [error, setError] = useState(false)
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddFoodItem = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.price || !formData.image || !formData.description) {
            setError(true);
            return false
        } else {
            setError(false)
        }
        let resto_id;
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
        if (restaurantData) {
            resto_id = restaurantData._id
        }
        let payload = {
            name: formData.name,
            price:formData.price,
            image: formData.image,
            description: formData.description,
            resto_id: resto_id
        }
        let response = await axios.post("http://localhost:3000/api/restaurant/foods", payload);
        if (response.data.success) {
            props.setAddItem(false)
        } else {
            alert("Food item not added")
        }

    }

    return (<div className="container">
        <h1>Add New Food Item</h1>
        <form onSubmit={handleAddFoodItem}>
            <div className="input-wrapper">
                <input type="text" name="name" className="input-field" placeholder="Enter food name"
                    value={formData.name} onChange={handleChange}
                />
                {error && !formData.name && <span className="input-error">Please enter valid name</span>}
            </div>
            <div className="input-wrapper">
                <input type="number" name="price" className="input-field" placeholder="Enter price"
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
                    value={formData.description} onChange={handleChange}
                />
                {error && !formData.description && <span className="input-error">Please enter valid description</span>}

            </div>
            <div className="input-wrapper">
                <button className="button" >Add Food Item</button>
            </div>
        </form>
    </div>)
}

export default AddFoodItem;