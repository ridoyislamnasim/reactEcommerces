const mongoose = require("mongoose");
const Schema = mongoose.Schema
const orderSchema = new Schema(
    {
        product: {
            type: mongoose.ObjectId,
            ref: 'productInfo'
        },
        payment: {
        },
        buyer: {
            type: mongoose.ObjectId,
            ref: 'registrationInfo'
        },
        phone: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['Not Process', 'Processing', 'Shipped', 'Deliverd', 'Cancel'],
            default: 'Not Process',

        },
    },
    {
        timestamps: true,
    }
);
// databaseTable name , schema name 
const orderschema = mongoose.model("orderInfo", orderSchema);

module.exports = orderschema;