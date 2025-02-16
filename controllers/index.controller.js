const expressAsyncHandler = require("express-async-handler");
// const asyncHandler=require( "express-async-handler");
const Collection=require("../models/collectionModel")
const User =require("../models/userModel.js")



const index = expressAsyncHandler(async (req, res) => {
    try {
        const collections = await Collection.find({ userId: req.userId }); // Fetch user's collections
        res.render("index", { collections, userId:req.userId }); // Pass collections to EJS template
    } catch (error) {
        console.error("Error fetching collections:", error);
        res.status(500).send("Server Error");
    }
});
module.exports={index}