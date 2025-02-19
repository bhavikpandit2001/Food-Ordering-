import { restaurantSchema } from "../../../lib/models/restaurantsModel";
import connectDB from "../../../lib/db";
import { orderSchema } from "../../../lib/models/ordersModel";
import { NextResponse } from "next/server";
import { foodSchema } from "../../../lib/models/foodsModel";


export async function POST(request) {
    await connectDB()
    const payload = await request.json();
    let result;
    let success = false;
    const newOrder = await orderSchema.create(payload);
    if (newOrder) {
        success = true
        result = newOrder
    }
    return NextResponse.json({ result, success, message: "order created..." }, { status: 200 })
}

export async function GET(request) {
    const userId = request.nextUrl.searchParams.get('id');
    console.log(userId)
    let success = false
    let result;
    let orders = await orderSchema.find({ userId: userId });
    if (orders) {
        let restoData = await Promise.all(
            orders.map(async (item) => {
                let restoInfo = {};
                restoInfo.order = item
                restoInfo.restaurant = await restaurantSchema.findOne({ _id: item.restaurantId })
                restoInfo.foodItems = await foodSchema.find({ _id: { $in: item.fooditemsId } })
                return restoInfo;
            })
        )
        result = restoData;
        success = true
    }

    return NextResponse.json({ result, success })

}