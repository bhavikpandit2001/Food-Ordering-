import { foodSchema } from "../../../../lib/models/foodsModel";
import connectDB from "../../../../lib/db";
import { orderSchema } from "../../../../lib/models/ordersModel"
import { NextResponse } from "next/server";
import { deliveryPartnersSchema } from "../../../../lib/models/deliverypartnersModel";
import { restaurantSchema } from "../../../../lib/models/restaurantsModel";

export async function GET(request, content) {
    await connectDB()
    const id = content.params.id
    let success = false;
    let result;
    const order = await orderSchema.findOne({ _id: id });
    const foodItems = await foodSchema.find({ _id: { $in: order.fooditemsId } })

    if (order) {
        success = true
        result = {
            order: order,
            foodlist: foodItems
        }
    }
    return NextResponse.json({ result, success }, { status: 200 })
}

export async function POST(request, content) {
    await connectDB()
    const id = content.params.id;
    const payload = await request.json()
    let success = false;
    let result;
    const order = await orderSchema.findOne({ _id: id })

    if (order) {
        const restaurant = await restaurantSchema.findOne({ _id: order.restaurantId })
        const deliveryPartners = await deliveryPartnersSchema.find({ city: restaurant.city }) // Ensure 'restaurantCity' is the correct field});
        if (deliveryPartners.length > 0) {
            // Select a random delivery partner
            const assignedDeliveryPartner = deliveryPartners[Math.floor(Math.random() * deliveryPartners.length)];

            // Update the order with the new status and assigned delivery partner
            await orderSchema.updateOne(
                { _id: order.id },
                { $set: { status: payload.status, deliveryboyId: assignedDeliveryPartner._id } }
            );
            const updatedOrder = await orderSchema.findOne({ _id: id })

            success = true;
            result = updatedOrder
        } else {
            // If no delivery partners are available, update only the order status
            await orderSchema.updateOne(
                { _id: order.id },
                { $set: { status: payload.status } }
            );
        }
        return NextResponse.json({ result, success }, { status: 200 })
    }
}