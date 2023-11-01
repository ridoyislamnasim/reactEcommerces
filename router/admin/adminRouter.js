const express = require("express");
const admin = express.Router();
const mongoose = require("mongoose");



// / internal imports
// controller
const { registration } = require("../../controller/auth/registrationController");
const { login } = require("../../controller/auth/loginController");
const { createCategoryController, updateCategoryController,
    getAllCategoryController, deleteCategoryController } = require("../../controller/admin/category/categoryController");
const { createProductController,
    updateProductController,
    getAllProductController,
    deleteProductController } = require("../../controller/admin/product/productsContrpller");

// const { upload } = require("../../controller/admin/product/productImg");
const { upload } = require("../../midelware/admin/fileUpload/productUpload");

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
admin.get('/category',
    // requireSignIn,
    getAllCategoryController
);
// admin.get('/single-category',
//     requireSignIn,
//     singleCategory
// );
admin.delete('/delete-category/:id',
    // requireSignIn,
    deleteCategoryController
);

admin.post('/upload',
    // requireSignIn,
    upload,
    createProductController
);



// admin.post("/:id",editroom);

// // delete the data by id 
// admin.get("/delete/:id",deleteroom);

module.exports = admin;