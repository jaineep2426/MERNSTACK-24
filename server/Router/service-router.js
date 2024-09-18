const express = require("express");
const services = require("../Controllers/service-controller");
const router = express.Router();

router.route("/service").get(services);

module.exports=router;