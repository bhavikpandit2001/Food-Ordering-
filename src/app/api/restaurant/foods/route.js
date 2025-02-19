import connectDB from "../../../lib/db";
import { foodSchema } from "../../../lib/models/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB()
    const payload = await request.json();
    let success = false;
    let result;
    const food = await foodSchema.create(payload)
    if (food) {
        success = true
        result = food
    }
    return NextResponse.json({ result, success }, { status: 200 })
}