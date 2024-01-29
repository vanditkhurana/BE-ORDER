const express = require('express');
const router = express.Router();
const orderController = require("../controllers/order.controller")

router.post("/:userId", orderController.createOrder);

router.get("/:userId", orderController.getAllOrders);

router.get("/singleorder/:id", orderController.getOrder);

router.put("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);

module.exports = router;