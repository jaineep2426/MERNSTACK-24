const express = require("express");
const router=express();
const authconrollers=require("../Controllers/auth_controller");
const {signupSchema , loginSchema} = require("../validators/auth-validator");
const validate=require("../middlewares/validate-middleware");
const authMiddleware=require("../middlewares/auth-middleware");

//router.get("/" , (req , res)=>{
//    res.status(200).send("Welcome to Router Page");
//});

router.route("/").get(authconrollers.home);

router.route("/register").post(validate(signupSchema) , authconrollers.register);
router.route("/login").post(validate(loginSchema), authconrollers.login);

router.route("/user").get(authMiddleware , authconrollers.user);


module.exports=router