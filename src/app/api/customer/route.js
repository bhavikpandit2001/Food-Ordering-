import connectDB from "../../lib/db";
import { restaurantSchema } from "../../lib/models/restaurantsModel";
import { NextResponse } from "next/server";


export async function GET(request) {
    await connectDB()
    let queryParams = request.nextUrl.searchParams;
    console.log(queryParams.get("location"));
    let filter = {};
    if (queryParams.get("location")) {
        let city = queryParams.get("location");
        filter = { city: { $regex: new RegExp(city, 'i') } }
    } else if (queryParams.get("restaurant")) {
        let name = queryParams.get("restaurant");
        filter = { name: { $regex: new RegExp(name, 'i') } }
    }
    let result = await restaurantSchema.find(filter);
    return NextResponse.json({ success: true, result }, { status: 200 })
}