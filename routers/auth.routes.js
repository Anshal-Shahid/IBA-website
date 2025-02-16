const express=require("express")
const {authMiddleware}= require("../middlewares/authMiddleware.js")


const { signupController, loginController, logoutController, signup,login } = require("../controllers/auth.controller.js");

const router= express.Router()
router.get("/signup",signup)
router.get("/login",login)
router.get("/logout",logoutController)


router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", logoutController);


module.exports=router