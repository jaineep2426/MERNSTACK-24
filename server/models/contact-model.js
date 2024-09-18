const {Schema , model} = require("mongoose");
const { string } = require("zod");
const { required } = require("../validators/auth-validator");

const contactSchema = new Schema({
    Username :{type : String , required : true},
    Email :{type : String , required : true},
    Message :{type : String , required : true},  

});


//create a model or collection
const Contact = new model("Contact" ,contactSchema);

module.exports =Contact;
