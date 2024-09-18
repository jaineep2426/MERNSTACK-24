const Contact = require("../models/contact-model");

const contactForm =async(req , res)=>{
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({msg : "Message send was successfully"});
    } catch (error) {
        return res.status(500).json({msg : "Message was not send "});
    }
}

module.exports = contactForm;