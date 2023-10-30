const express = require("express");
const admin = express.Router();
const mongoose = require("mongoose");



// / internal imports
// controller
const { registration } = require("../../controller/auth/registrationController");
const { login } = require("../../controller/auth/loginController");
const { createCategoryController, updateCategoryController } = require("../../controller/admin/category/categoryController");

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
    // requireSignIn,
    createCategoryController
);
admin.put('/update-category/:id',
    // requireSignIn,
    updateCategoryController
);
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