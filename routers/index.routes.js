const express=require("express")

const router= express.Router()

const {index}= require("../controllers/index.controller.js")




const {authMiddleware}= require("../middlewares/authMiddleware.js")

router.get("/",authMiddleware,index)


module.exports=router