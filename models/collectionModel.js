const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum: ["image", "music", "pdf", "file", "text"],
        required: true
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    items: [String], // Array to store uploaded file paths or text entries
}, { timestamps: true });

module.exports = mongoose.model("Collection", collectionSchema);
