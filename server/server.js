require("dotenv").config();
const cors=require("cors");
const express = require("express");
const app=express();
const authRoute=require("./Router/auth_router");
const contactRoute=require("./Router/contact-router");
const serviceRoute=require("./Router/service-router");
const adminRoute= require("./Router/admin-router");
const connectDb=require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

//cors

const corsOption={
   origin:"http://localhost:5173",
   methods:"GET , POST , PUT ,DELETE , PATCH ,HEAD",
   credentials : true,
}
app.use(cors(corsOption));

app.use(express.json());
//Mount the Router:To use the Router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth" , authRoute)
app.use("/api/form" , contactRoute)
app.use("/api/data" , serviceRoute)

//lets define admin route
app.use("/api/admin" , adminRoute)

app.use(errorMiddleware);
//app.get("/" , (req , res)=>{
//    res.status(200).send("Hello , This is my first MERN Stack file.");
//});

//app.get("/register" , (req , res)=>{
//    res.status(200).send("Welcome to Registration Page");
//});


const PORT = 3000;

connectDb().then(()=>{
app.listen(PORT, ()=>{
   console.log(`Server is running at port : ${PORT}`);
});
});