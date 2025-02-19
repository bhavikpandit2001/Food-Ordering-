import connectDB from "../../../lib/db";
import { orderSchema } from "../../../lib/models/ordersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


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
    return NextResponse.json({ result, success, message: "order created..." },{status: 200})
}

// export async function GET(request) {
//     const userId = request.nextUrl.searchParams.get('id');
//     let success = false
//     await mongoose.connect(connectionStr, { useNewUrlParser: true })
//     let result = await orderSchema.find({ user_id: userId });
//     if (result) {
//         let restoData = await Promise.all(
//             result.map(async (item) => {
//                 let restoInfo = {};
//                 restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id })
//                 restoInfo.amount = item.amount;
//                 restoInfo.status = item.status;
//                 return restoInfo;
//             })
//         )
//         result = restoData;
//         success = true
//     }

//     return NextResponse.json({ result,success })

// }