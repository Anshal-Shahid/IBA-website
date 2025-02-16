const expressAsyncHandler = require("express-async-handler");
const asyncHandler=require( "express-async-handler");


const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

// User Signup
const signupController = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.render("signup.ejs", { error: "Email already exists", username, email });
      }
  
      // Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create User
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      res.redirect("/auth/login");
    } catch (error) {
      console.error(error);
      res.render("signup.ejs", { error: "Something went wrong. Try again!", username: "", email: "" });
    }
  };
  

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Set HTTP-Only Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite: "Strict", 
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
    });

    res.redirect("/")
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Server error" });
  }
};

// Logout
const logoutController = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.redirect("/");
};






const signup=expressAsyncHandler(async(req,res)=>{
    res.render("signup.ejs")
})

const login=expressAsyncHandler(async(req,res)=>{
    res.render("login.ejs")
})




module.exports = { signupController, loginController, logoutController ,signup,login};


