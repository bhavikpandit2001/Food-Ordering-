import connectDB  from "../../../lib/db";
import { restaurantSchema } from "../../../lib/models/restaurantsModel";
import { NextResponse } from "next/server";

export async function GET(){
    await connectDB
    let result = await restaurantSchema.find();
    result = result.map((item)=>item?.city?.charAt(0).toUpperCase()+ item?.city?.slice(1));

    result = [...new Set(result.map((item)=>item))]

    return NextResponse.json({success:true,result},{status: 200})
}