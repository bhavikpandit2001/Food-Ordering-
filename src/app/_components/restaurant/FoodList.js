import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodList = () => {
    const [foodItems, setFoodItems] = useState();
    const router = useRouter()

    useEffect(() => {
        loadFoodItems();
    }, []);

    const loadFoodItems = async () => {
        const restaurantData = JSON.parse(localStorage.getItem('restaurantUser'));
        const resto_id = restaurantData._id;
        let response = await axios.get(`http://localhost:3000/api/restaurant/foods/${resto_id}`);
        if (response.data.success) {
            setFoodItems(response.data.result)
        } else {
            alert("food item list not loading")
        }
    }

    const deleteFoodItem = async (id) => {
        console.log("delete function", id)
        let response = await axios.delete(`http://localhost:3000/api/restaurant/foods/${id}`);
        if (response.data.success) {
            loadFoodItems();
        } else {
            alert("food item not deleted")
        }
    }

    console.log(foodItems)
    return (
        <div className="list-container">
            <table>
                <thead>
                    <tr>
                    <th>No</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        foodItems && foodItems.map((item, key) => (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td><img src={item.image} /> </td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td><button onClick={() => deleteFoodItem(item._id)}>Delete</button>
                                    <button onClick={() => router.push(`/restaurant/dashboard/${item._id}`)} >Edit</button></td>
                            </tr>

                        ))
                    }
                </tbody>
            </table>

        </div>
        )
}

export default FoodList;