const { default: mongoose } = require("mongoose");

const foodModel = new mongoose.Schema({
    name:String,
    price:Number,
    image: String,
    description:String,
    restaurantId:mongoose.Schema.Types.ObjectId
},{ timestamps: true });

export const foodSchema= mongoose.models.foods ||  mongoose.model("foods",foodModel);