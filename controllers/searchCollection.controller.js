const Collection = require("../models/collectionModel.js");
const User = require("../models/userModel.js");

const searchCollection = async (req, res) => {
    try {
        const query = req.query.q; // Get search input from the user
        if (!query.includes("/")) {
            return res.status(400).send("Invalid search format. Use username/code.");
        }

        const [username, code] = query.split("/");

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Find the collection by code and user ID
        const collection = await Collection.findOne({ userId: user._id, code });

        if (!collection) {
            return res.status(404).send("Collection not found.");
        }

        // Render the collection page (even if private)
        res.render("showCollection", { collection, userId: req.userId || null });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

module.exports = { searchCollection };
