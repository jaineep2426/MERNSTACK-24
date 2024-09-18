const { z } = require('zod');

const loginSchema= z.object({
    Email: z
        .string({ required_error: "Email is Required" })
        .trim()
        .email({ message: "Invalid Email address" })
        .min(3, { message: "Email must be at least 3 characters" })
        .max(250, { message: "Email must not exceed 250 characters" }),

        Password: z
        .string({ required_error: "Password is Required" })
        .trim()
        .min(7, { message: "Password must be at least 6 characters" })
        .max(250, { message: "Password must not exceed 250 characters" }),
})

// creating an object schema
const signupSchema = loginSchema.extend({
    Username: z
        .string({ required_error: "Name is Required" })
        .trim()
        .min(3, { message: "USERNAME MUST CONTAIN AT LEAST 3 CHARACTERS" })
        .max(250, { message: "The name is not more than 250 characters" }),
   
    MobileNo: z
        .string({ required_error: "MobileNo is Required" })
        .trim()
        .min(10, { message: "MobileNo must be at least 10 characters" })
        .max(20, { message: "MobileNo must not exceed 20 characters" }),
  
});

module.exports = {signupSchema , loginSchema};
