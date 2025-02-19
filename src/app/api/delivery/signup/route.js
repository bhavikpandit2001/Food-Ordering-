import { deliveryPartnersSchema } from "../../../lib/models/deliverypartnersModel";
import connectDB from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB()
    let payload = await request.json();
    console.log(payload)
    let result;
    let success = false

    let deliveryUser = await deliveryPartnersSchema.findOne({ mobile: payload.mobile })
    if (deliveryUser) {
        return NextResponse.json({ success, messege: "user already exist! please register with different mobile..." }, { status: 401 })
    } else {
        let newUser = await deliveryPartnersSchema.create(payload)
        if (newUser) {
            success = true
            result = newUser
        }
    }
    return NextResponse.json({ result, success, messege: "signup success..." }, { status: 200 })
}