import { restaurantSchema } from "../../lib/models/restaurantsModel";
import connectDB from "../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB()
    let payload = await request.json();
    console.log(payload)
    let result;
    let success=false

    if (payload.login) {
        let restaurant = await restaurantSchema.findOne({ email: payload.email, password: payload.password })
        if(restaurant){
            success=true
            result = restaurant
        }
    } else {
        let newRestaurant = await restaurantSchema.create(payload)
        if(newRestaurant){
            success=true;
            result = newRestaurant 
        }
    }
    return NextResponse.json({ result, success },{status: 200})
}