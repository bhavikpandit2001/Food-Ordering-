const { default: mongoose } = require("mongoose");


const deliveryPartnersModel = new mongoose.Schema({
    name: String,
    mobile: String,
    email: String,
    password: String,
    city: String,
    address: String,
    image: String
}, { timestamps: true })

export const deliveryPartnersSchema = mongoose.models.deliverypartners || mongoose.model('deliverypartners', deliveryPartnersModel);