import connectDB from "../../../../../lib/db";
import { foodSchema } from "../../../../../lib/models/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request,content){
    await connectDB()
    const id = content.params.id;
    let success=false;
    let result;
    const data = await foodSchema.findOne({_id:id})
    if(data){
        success=true
        result = data
    }
    return NextResponse.json({result,success, message: "fetched successfully.."},{status: 200})
}

export async function PATCH(request,content){
    await connectDB()
    const id = content.params.id;
    const payload = await request.json();
    console.log(payload)
    let success=false;
    let result;
    const data = await foodSchema.findOneAndUpdate({_id:id},payload);
    if(data){
        success=true
        result = data
    };
    return NextResponse.json({result,success, message: "updated successfully.."},{status: 200})

}