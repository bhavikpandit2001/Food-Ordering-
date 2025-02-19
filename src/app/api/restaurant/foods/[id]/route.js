import connectDB from "../../../../lib/db";
import {foodSchema} from "../../../../lib/models/foodsModel"
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    await connectDB()
    const id = content.params.id
    let success=false;
    let result;
    const data = await foodSchema.find({resto_id:id});
    if(data){
        success=true
        result = data
    }
    return NextResponse.json({result,success},{status: 200})

}
export async function DELETE(request,content){
    await connectDB()
    const id = content.params.id;
    let success = false;
    let result;
    const data = await foodSchema.findByIdAndDelete({_id:id})
    console.log(data)
    if(data){
        success = true,
        result = {}
    }

    return NextResponse.json({result,success, message: "deleted successfully"},{status: 200})
}
