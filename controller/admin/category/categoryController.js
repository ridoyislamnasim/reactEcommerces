const express = require("express");
const bcrypt = require("bcrypt");
const registrationschema = require("../../models/auth/registration");
const categoryschema = require("../../../models/product/categotyModel");

const JWT = require("jsonwebtoken");
const { createSlug, removeSlug } = require("../../common/function/common");
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}
createCategory = async (req, res) => {
    console.log("req.body")
    console.log(req.body)
    const { name } = req.body;
    if (!name || name.trim() === '') {
        res.json({ errorMsg: "name is required" });
    } else {
        try {
            // Check if the email exists in the database
            const existsCategory = await categoryschema.findOne({ name });

            if (existsCategory) {
                return res.json({ success: false, errorMsg: 'Category already exits' });
            }
            const slug = createSlug(name)
            try {
                const category = await new categoryschema({
                    name,
                    slug: slug
                })
                if (category) {
                    // Login successful
                    res.json({ success: true, message: 'Category Create successful', category });
                }
            } catch (error) {
                console.error('Error:', error);
                res.json({ success: false, errorMsg: 'Internal server error occurred' });

            }

        } catch (error) {
            console.error('Error:', error);
            res.json({ success: false, errorMsg: 'Internal server error occurred' });
        }

    }





}


module.exports = {
    createCategory,
};