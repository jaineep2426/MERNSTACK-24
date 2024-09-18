const mongoos=require("mongoose");

//const URI="mongodb://127.0.0.1:27017/mern_stack" 
//mongoos.connect(URI);

const URI=process.env.MONGODB_URI

const connectDb = async()=>{
    try {
        await mongoos.connect(URI);
        console.log("FILE SUCCESSFULLY RUN IN DB");
    } catch (error) {
        console.error("Connection database was failed")
        console.error(error)
        process.exit(0)
        
    }
}

module.exports=connectDb;