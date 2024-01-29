const express = require('express');
const app = express();
const { PORT, mongoURI } = require("./config/config.js");
const mongoose = require("mongoose");
const userRoute = require("./src/routes/user.route.js");
const orderRoute = require("./src/routes/order.route.js");


mongoose.connect(`${mongoURI}/data`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());

app.use("/users", userRoute);
app.use("/orders", orderRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});