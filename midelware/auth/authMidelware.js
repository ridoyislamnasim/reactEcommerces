const express = require("express");
const { JWT } = require("jsonwebtoken");
// import registrationschema from "../../models/auth/registration";

//Protected Routes token base
const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    requireSignIn,
};