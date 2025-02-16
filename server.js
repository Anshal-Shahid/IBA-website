const express = require("express")
const app = express()
const ejs = require("ejs")
const path = require("path")
const dotenv=require("dotenv")
dotenv.config()
const cors=require("cors")
const bodyParser=require("body-parser")
const {connectDB}=require("./configs/connectionDB.js")
const cookieParser = require("cookie-parser");


connectDB()
 
app.use(cors())
app.use(cookieParser())

//ejs
const templatePath= path.join(__dirname,"./tempelates")



app.set("view engine", "ejs")
app.set("views",templatePath)



//middleware
app.use(express.json())
app.use(bodyParser.urlencoded( { extended: false} ))
app.use(express.static(path.join(__dirname,"./public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




//routes
app.use("/",require("./routers/index.routes.js"))
app.use("/",require("./routers/collection.routes.js"))
app.use("/",require("./routers/searchCollection.routes.js"))
app.use("/",require("./routers/download.routes.js"))
app.use("/auth",require("./routers/auth.routes.js"))








//port

const port=process.env.PORT || 3000

app.listen(port,()=>{
    console.log( `app is running on ${port} port`);
})
