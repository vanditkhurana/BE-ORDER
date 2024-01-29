const User = require("../models/user.model");

exports.createUser = async (req, res) => {
    try{
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Internal Server Error.",
        });
    }
}

exports.getAllUsers = async (req, res) => {
    try{
        const users = await User.find({});
        if(!users){
            res.status(404).json({
                message : "Users Not Found",
            })
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message : "Internal Server Error.",
        });
    }
}

exports.getUser = async (req, res) => {
    try{
        const user = await User.findOne({_id : req.params.id});
        if(!user){
            res.status(404).json({
                message : "User Not Found",
            })
        }
        res.status(200).json(user);
    } catch (error) {
        if(error.status == 404){
            res.status(404).json({
                message : "User Not Found",
            })
        }
        else{
            res.status(500).json({
                message : "Internal Server Error.",
            });
        }
    }
}

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new : true}
        )
        updatedUser.updatedAt = Date.now;
        if(!updatedUser){
            res.status(404).json({
                message : "User Not Found",
            })
        }
        res.status(200).json(updatedUser);
    } catch(error) {
        if(error.status == 404){
            res.status(404).json({
                message : "User Not Found",
            })
        }
        else{
            res.status(500).json({
                message : "Internal Server Error.",
            });
        }
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete(
            {_id : req.params.id}
        )
        if(!deletedUser){
            res.status(404).json({
                message : "User Not Found",
            })
        }
        res.status(200).json(deletedUser);
    } catch (error) {
        if(error.status == 404){
            res.status(404).json({
                message : "User Not Found",
            })
        }
        else{
            res.status(500).json({
                message : "Internal Server Error.",
            });
        }
    }
}