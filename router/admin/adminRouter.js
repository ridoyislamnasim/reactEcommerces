const express = require("express");
const admin = express.Router();
const mongoose = require("mongoose");



// / internal imports
// controller
const { registration } = require("../../controller/auth/registrationController");
const { login } = require("../../controller/auth/loginController");
const { forgetPassword } = require("../../controller/auth/forgetPasswordController");

//validator 
// const { singinValidators } = require("../../validator/auth/registrationStudentValidator");
// const { singinValidatorsEmployee } = require("../../validator/auth/registrationEmployeeValidator");
// const Schema = mongoose.Schema

//middleWare
const { requireSignIn } = require("../../midelware/auth/authMidelware");


// ===================================================
// Category
// ===================================================
admin.post('/create-category',
    requireSignIn,
    createCategory
);
// admin.put('/update-category',
//     requireSignIn,
//     updateCategory
// );
// admin.get('/category',
//     requireSignIn,
//     category
// );
// admin.get('/single-category',
//     requireSignIn,
//     singleCategory
// );
// admin.get('/delete-category',
//     requireSignIn,
//     deleteCategory
// );




// admin.post("/:id",editroom);

// // delete the data by id 
// admin.get("/delete/:id",deleteroom);

module.exports = admin;