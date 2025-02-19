import { deliveryPartnersSchema } from "../../../lib/models/deliverypartnersModel";
import connectDB from "../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB()
    let payload = await request.json();
    console.log(payload)
    let result;
    let success = false

    let deliveryUser = await deliveryPartnersSchema.findOne({ email: payload.mobile, password: payload.password })
    if (!deliveryUser) {
        return NextResponse.json({ result: {}, success, messege: "Invalid credentials..."  }, { status: 401 })
    }else{
        success = true
        result = deliveryUser
    }
    return NextResponse.json({ result, success, messege: "login success..." }, { status: 200 })
}