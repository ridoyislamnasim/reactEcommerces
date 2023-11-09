const express = require("express");
const common = express.Router();
const mongoose = require("mongoose");



// / internal imports
// controller
// const roomschem= require("../models/users"); 
const { registration } = require("../../controller/auth/registrationController");
const { login } = require("../../controller/auth/loginController");
const { forgetPassword } = require("../../controller/auth/forgetPasswordController");

//validator 
// const { singinValidators } = require("../../validator/auth/registrationStudentValidator");
// const { singinValidatorsEmployee } = require("../../validator/auth/registrationEmployeeValidator");
// const Schema = mongoose.Schema

//middleWare
const { requireSignIn } = require("../../midelware/auth/authMidelware");
const { filter, getCategoryProductController } = require("../../controller/common/controller/filterController");
const { getSingleProductController, getSimilarProductController } = require("../../controller/admin/product/productsContrpller");
const { orderProduct } = require("../../controller/order/orderController");



common.post('/filter',
    // isUnAuthenticated,
    // singinValidators,
    filter
);
// common.post('/login',
//     // isUnAuthenticated,
//     // singinValidators,
//     login
// );
common.get('/product/:cp_id/:ca_id',
    // isUnAuthenticated,
    getSimilarProductController,
);
common.get('/product/:category_id',
    // isUnAuthenticated,
    getCategoryProductController,
);

common.get('/order',
    // isUnAuthenticated,
    requireSignIn,
    orderProduct
);



// common.post("/:id",editroom);

// // delete the data by id 
// common.get("/delete/:id",deleteroom);

module.exports = common;