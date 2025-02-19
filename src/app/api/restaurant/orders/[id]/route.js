import { foodSchema } from "../../../../lib/models/foodsModel";
import connectDB from "../../../../lib/db";
import {orderSchema} from "../../../../lib/models/ordersModel"
import { NextResponse } from "next/server";

export async function GET(request,content){
    await connectDB()
    const id = content.params.id
    let success=false;
    let result;
    const order = await orderSchema.findOne({_id:id});
    const foodItems = await foodSchema.find({_id: { $in: order.fooditemsId}})

    if(order){
        success=true
        result = {
            order: order,
            foodlist: foodItems
        }
    }
    return NextResponse.json({result,success},{status: 200})
}

export async function POST(request, content){
    await connectDB()
    const id = content.params.id;
    const payload = await request.json()
    let success=false;
    let result;
    const order = await orderSchema.findOne({_id:id})

    if(order){
        await orderSchema.updateOne({_id: order.id},{$set: {status: payload.status}})
        success = true
        result = order
    }
    return NextResponse.json({result,success},{status: 200})
}