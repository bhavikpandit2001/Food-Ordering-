import { foodSchema } from "../../../../lib/models/foodsModel";
import connectDB from "../../../../lib/db";
import { orderSchema } from "../../../../lib/models/ordersModel"
import { NextResponse } from "next/server";
import { restaurantSchema } from "../../../../lib/models/restaurantsModel";
import { userSchema } from "../../../../lib/models/userModel";

export async function GET(request, content) {
    await connectDB()
    const id = content.params.id
    let success = false;
    let result;
    const order = await orderSchema.findOne({ _id: id });
    const restaurant = await restaurantSchema.findOne({ _id: order.restaurantId })
    const foodItems = await foodSchema.find({ _id: { $in: order.fooditemsId } })
    const user = await userSchema.findOne({ _id: order.userId })

    if (order) {
        success = true
        result = {
            order: order,
            restaurant: restaurant,
            foodlist: foodItems,
            user: user
        }
    }
    return NextResponse.json({ result, success }, { status: 200 })
}