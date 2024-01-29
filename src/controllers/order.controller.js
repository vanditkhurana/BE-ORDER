const { default: mongoose } = require("mongoose");
const Order = require("../models/order.model");

exports.createOrder = async (req, res) => {
    try{
        const userId = req.params.userId;
        console.log(userId)
        const newOrder = new Order({
            _id: new mongoose.Types.ObjectId(),
            userId: userId,
            totalAmount: req.body.totalAmount,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
        await newOrder.save();
        res.status(200).json(newOrder);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Internal Server Error.",
        });
    }
}

exports.getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find({userId : req.params.userId});
        if(!orders){
            res.status(404).json({
                message : "Orders Not Found",
            })
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message : "Internal Server Error.",
        });
    }
}

exports.getOrder = async (req, res) => {
    try{
        const order = await Order.findOne({_id : req.params.id});
        if(!order){
            res.status(404).json({
                message : "Order Not Found",
            })
        }
        res.status(200).json(order);
    } catch (error) {
        if(error.status == 404){
            res.status(404).json({
                message : "Order Not Found",
            })
        }
        else{
            res.status(500).json({
                message : "Internal Server Error.",
            });
        }
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new : true}
        )
        updatedOrder.updatedAt = Date.now;
        if(!updatedOrder){
            res.status(404).json({
                message : "Order Not Found",
            })
        }
        res.status(200).json(updatedOrder);
    } catch(error) {
        if(error.status == 404){
            res.status(404).json({
                message : "Order Not Found",
            })
        }
        else{
            res.status(500).json({
                message : "Internal Server Error.",
            });
        }
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findOneAndDelete(
            {_id : req.params.id}
        )
        if(!deletedOrder){
            res.status(404).json({
                message : "Order Not Found",
            })
        }
        res.status(200).json(deletedOrder);
    } catch (error) {
        if(error.status == 404){
            res.status(404).json({
                message : "Order Not Found",
            })
        }
        else{
            res.status(500).json({
                message : "Internal Server Error.",
            });
        }
    }
}