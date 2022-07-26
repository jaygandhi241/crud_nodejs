const mongoose=require("mongoose")

const connectDB =async()=>{
    try{
        const con=await mongoose.connect('mongodb://localhost:27017/ADD-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindOneAndModify:false
           
        })
        console.log("mongo connected");
    }catch(err){
        console.log(err);
        process.exit(1)
    }
}

module.exports=connectDB