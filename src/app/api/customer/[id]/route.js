import connectDB from "../../../lib/db";
import { foodSchema } from "../../../lib/models/foodsModel";
import { restaurantSchema } from "../../../lib/models/restaurantsModel";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    await connectDB()
    const id = content.params.id;
    let result;
    let success = false;

    const details = await restaurantSchema.findOne({ _id: id })
    const foodItems = await foodSchema.find({ restaurantId: id })

    if(details || foodItems){
        success = true 
        result = {
            restaurant: details,
            foodItems: foodItems
        }
    }
    return NextResponse.json({ result, success, message: "fetched successfully..."}, {status: 200})
}