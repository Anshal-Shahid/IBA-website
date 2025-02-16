const Collection = require("../models/collectionModel.js");
const expressAsyncHandler = require("express-async-handler");

const addCollectionPage=expressAsyncHandler((req,res)=>{
    res.render("add.ejs")
})



// 🟢 Create Collection
const createCollection = async (req, res) => {
    console.log("Uploaded Files: ", req.files);
    console.log("Form Data: ", req.body);

    const { name, code, type, isPublic, text } = req.body;

    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const existingCollection = await Collection.findOne({ code });
    if (existingCollection) {
        return res.status(400).json({ message: "Code already in use" });
    }

    let items = [];
    if (req.files) {
        Object.values(req.files).forEach(fileArray => {
            fileArray.forEach(file => items.push(file.path));
        });
    }

    if (text) {
        items.push(text);
    }

    const newCollection = new Collection({
        userId: req.userId,
        name,
        code,
        type,
        isPublic: isPublic === "true",
        items
    });

    await newCollection.save();
    res.status(201).redirect("/");
};

// 🔵 Get Collections for Logged-in User
const getUserCollections = expressAsyncHandler(async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const collections = await Collection.find({ userId: req.userId });
    res.json(collections);
});

// 🟣 Get Collection by Code
const getCollectionByCode = expressAsyncHandler(async (req, res) => {
    const { code } = req.params;

    const collection = await Collection.findOne({ code });
    if (!collection) {
        return res.status(404).json({ message: "Collection not found" });
    }

    // If private, check ownership
    if (!collection.isPublic && collection.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "Access denied" });
    }

    res.json(collection);
});







const showCollectionPage = async (req, res) => {
    try {
        const collectionId = req.params.id;
        const userId = req.userId; // Get logged-in user ID from middleware

        const collection = await Collection.findById(collectionId);

        console.log(collection.items);
        

        if (!collection) {
            return res.status(404).send("Collection not found");
        }

        // Restrict access to private collections
        if (!collection.isPublic && (!userId || collection.userId.toString() !== userId)) {
            return res.status(403).send("You do not have permission to view this collection.");
        }

        res.render("showCollection", { collection, userId });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};


const deleteCollection = async (req, res) => {
    try {
        const collectionId = req.params.id;

        // Find and delete the collection
        const deletedCollection = await Collection.findByIdAndDelete(collectionId);

        if (!deletedCollection) {
            return res.status(404).send("Collection not found.");
        }

        res.redirect("/"); // Redirect to homepage after deleting
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};


module.exports = { createCollection, getUserCollections, getCollectionByCode, addCollectionPage,showCollectionPage,deleteCollection };
