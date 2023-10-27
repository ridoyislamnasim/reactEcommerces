const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



// / internal imports
// const roomschem= require("../models/users"); 
const { registration } = require("../../controller/auth/registrationController");

// title 
// const decorateHtmlResponse = require("../../middleware/common/decorateHtmlResponse");
//validator 
// const { singinValidators } = require("../../validator/auth/registrationStudentValidator");
// const { singinValidatorsEmployee } = require("../../validator/auth/registrationEmployeeValidator");
// const Schema = mongoose.Schema

//middleWare
// const { isUnAuthenticated } = require("../../middleware/isUnAuthenticatedMiddleware")


router.post('/registrations',
    // isUnAuthenticated,
    // singinValidators,
    registration
);



// router.post("/:id",editroom);

// // delete the data by id 
// router.get("/delete/:id",deleteroom);

module.exports = router;