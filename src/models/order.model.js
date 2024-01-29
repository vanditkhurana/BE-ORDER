const mongoose = require("mongoose");
// const User = require("./user.model.js")
const orderSchema = new mongoose.Schema(
    {
        _id : mongoose.Schema.ObjectId,
        userId : mongoose.Schema.ObjectId,
        totalAmount : Number,
        createdAt : { type : Date, default: Date.now },
        updatedAt : { type : Date, default: Date.now },
    }
)

const OrderModel = mongoose.model("Order", orderSchema);

module.exports  = OrderModel;