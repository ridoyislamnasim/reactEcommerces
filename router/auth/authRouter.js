const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



// / internal imports
// const roomschem= require("../models/users"); 
const { registration } = require("../../controller/auth/registrationController");
const { login } = require("../../controller/auth/loginController");

// title 
// const decorateHtmlResponse = require("../../middleware/common/decorateHtmlResponse");
//validator 
// const { singinValidators } = require("../../validator/auth/registrationStudentValidator");
// const { singinValidatorsEmployee } = require("../../validator/auth/registrationEmployeeValidator");
// const Schema = mongoose.Schema

//middleWare
const { requireSignIn } = require("../../midelware/auth/authMidelware")


router.post('/registrations',
    // isUnAuthenticated,
    // singinValidators,
    registration
);
router.post('/login',
    // isUnAuthenticated,
    // singinValidators,
    login
);
router.post('/auth',
    // isUnAuthenticated,
    requireSignIn,
    (req, res) => res.status(200).json({ isAuthenticated: true })

);



// router.post("/:id",editroom);

// // delete the data by id 
// router.get("/delete/:id",deleteroom);

module.exports = router;