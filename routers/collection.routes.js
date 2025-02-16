const express=require("express")
const {authMiddleware}= require("../middlewares/authMiddleware.js")

const router= express.Router()
const upload=require("../middlewares/multer.js")


const {index}= require("../controllers/index.controller.js")
const {addCollectionPage,createCollection,showCollectionPage,deleteCollection}=require("../controllers/addCollection.controller.js")




router.get("/add-collection",authMiddleware,addCollectionPage)
router.post("/add-collection", authMiddleware, upload.fields([
    { name: "image" },
    { name: "music" },
    { name: "pdf" },
    { name: "file" }
]), createCollection);


router.post("/delete-collection/:id", deleteCollection); 



router.get("/show-collection/:id",authMiddleware,showCollectionPage)
// router.post("/edit-collection/:id", authMiddleware,editCollection)
module.exports=router