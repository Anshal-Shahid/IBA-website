const mongoose=require("mongoose")



const connectDB=async()=>{
    try  {
         mongoose.connect(process.env.CONNECTION_STRING )
        .then(() => console.log('Connected to MongoDB'))
        
    } catch(err){
        console.log(err);
        process.exit(1);    
    }
}

module.exports={connectDB}
