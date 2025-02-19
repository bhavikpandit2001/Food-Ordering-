import mongoose from "mongoose"

const restaurantModel= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    city:String,
    address:String,
    mobile:String,
    image: String
},{ timestamps: true });

export const  restaurantSchema= mongoose.models.restaurants
|| mongoose.model("restaurants",restaurantModel);