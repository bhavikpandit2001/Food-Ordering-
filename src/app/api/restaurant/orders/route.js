import connectDB from "../../../lib/db";
import { orderSchema } from "../../../lib/models/ordersModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB()
    const payload = await request.json();
    let success = false;
    let result;
    const orders = await orderSchema.find({restaurantId: payload.id})
    if (orders) {
        success = true
        result = orders
    }
    return NextResponse.json({ result, success, message: "success..." }, { status: 200 })
}