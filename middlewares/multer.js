const multer = require("multer");
const path = require("path");

// Set up storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Save files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// File filter to accept all file types
const fileFilter = (req, file, cb) => {
    cb(null, true); // Accept all files
};

// Multer upload configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
