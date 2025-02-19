const { default: mongoose } = require("mongoose");


const orderModel = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    fooditemsId: [String],
    restaurantId: mongoose.Schema.Types.ObjectId,
    deliveryboyId: mongoose.Schema.Types.ObjectId,
    status: Number,
    foodCharges: Number,
    tax: Number,
    deliveryCharges: Number,
    totalAmount: Number,
    paymentMethod: String,

}, { timestamps: true })

export const orderSchema = mongoose.models.orders || mongoose.model('orders', orderModel);