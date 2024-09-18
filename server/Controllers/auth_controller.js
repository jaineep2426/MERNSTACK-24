const User =require("../models/user-model");
const bcrypt = require("bcryptjs");
const  response  = require("../Router/auth_router");

const home = async (req, res) => {
    try {
        router.route("/").get((req, res) => {
            res.status(200).send("Welcome to Router Page");
        });
    } catch (error) {
        console.log(error)
    };
};

//Registration Path

const register = async (req, res) => {
    try {
       // console.log(req.body)
        const {Username , Email , MobileNo , Password ,} =req.body;

        const userExist = await User.findOne({Email} );
        
        if(userExist){
            return res.status(400).json({message : "Email already Exists"})
        }

        //hash the password

        //const saltRound= 10;
        //const hash_password =await bcrypt.hash(Password , saltRound);

//Registration
        const Usercreated = await User.create({Username , Email , MobileNo ,Password ,});
        res.status(200).json({msg : "Registration Successful" ,
             token : await Usercreated.generateToken(),
            userId: Usercreated._id.toString(),});
    }
     catch (error) {
    res.status(404).json("Internal Server Error")
}
};

//User Login

const login = async (req, res) => {
    try {
      

    
      const { Email, Password } = req.body;
  
      const userExist = await User.findOne({ Email });
  
      if (!userExist) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // const user = await bcrypt.compare(password, userExist.password);
      const isPasswordValid = await userExist.comparePassword(Password);
  
      if (isPasswordValid) {
        res.status(200).json({
          Message: "Login Successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password " });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  //User Logic- to send user data
  const user=(req , res)=>{
    try {
      const userData=req.user;
      console.log(userData);
      return res.status(200).json({userData});
     
    } catch (error) {
      console.log(`error from the user route ${error}`);
    }
  }

module.exports = { home , register , login , user};