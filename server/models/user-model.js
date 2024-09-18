const mongoose=require("mongoose");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    Username:{
        type:String,
        require:true,
    },
    Email:{
        type:String,
        require:true,
    },
    MobileNo:{
        type:String,
        require:true,
    },
    Password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

});

//secure the password with the bcrypt
userSchema.pre('save' ,async function(next){
   // console.log("pre method" , this);
    const user = this;

    if(!user.isModified("Password")){
        next();
    }

    try {
        const saltRound= await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.Password , saltRound);
        user.Password =hash_password;

    } catch (error) {
        next(error);
    }
});

//compare Password
userSchema.methods.comparePassword = async function(Password){
   return bcrypt.compare(Password , this.Password);
};

//Json Web Token

//Instance Method
userSchema.methods.generateToken = async function(){
  try {
    return jwt.sign({
        userId : this._id.toString(),
        Email:this.Email,
        isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET_KEY,{
        expiresIn : "30d",
    }
)
  } catch (error) {
    console.error(error);
  }
}

const User = new mongoose.model("User" , userSchema);

module.exports=User;