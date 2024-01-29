const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        _id : mongoose.Schema.ObjectId,
        username : String,
        email : String,
        createdAt : { type : Date, default: Date.now },
        updatedAt : { type : Date, default: Date.now },
    }
)

const UserModel = mongoose.model("User", userSchema);

module.exports  = UserModel;