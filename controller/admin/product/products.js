const express = require("express");
const bcrypt = require("bcrypt");
// const registrationschema = require("../../models/auth/registration");
const categoryschema = require("../../../models/product/categotyModel");

const JWT = require("jsonwebtoken");
const { createSlug, removeSlug } = require("../../common/function/common");
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}
// =========================== createProductController===========================
createProductController = async (req, res) => {
    console.log("req.body")
    console.log(req.body)
    const { category } = req.body;
    if (!category || category.trim() === '') {
        res.json({ errorMsg: "name is required" });
    } else {
        try {
            // Check if the email exists in the database
            const existsProduct = await categoryschema.findOne({ category });

            if (existsProduct) {
                return res.json({ success: false, errorMsg: 'Product already exits' });
            }
            const slug = await createSlug(category)
            try {
                const createNewProduct = new categoryschema({
                    category,
                    slug: slug
                });
                const savecategory = await createNewProduct.save()
                if (createNewProduct) {
                    // Login successful
                    res.json({ success: true, message: 'Product Create successful', data: savecategory });
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
// =========================== updateProductController===========================
updateProductController = async (req, res) => {
    console.log("req.body")
    const { category } = req.body;
    const { id } = req.params;
    console.log(req.body, id)
    if (!category || category.trim() === '') {
        res.json({ errorMsg: "name is required" });
    } else if (!id || id.trim() === '') {
        res.json({ errorMsg: "id is required" });
    } else {
        try {
            // Check if the email exists in the database  
            try {
                const slug = await createSlug(category)
                const updateProduct = await categoryschema.findByIdAndUpdate(id, { category, slug }, { new: true });
                if (updateProduct) {
                    // Login successful
                    res.json({ success: true, message: 'Product Update successful', data: updateProduct });
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
// =========================== getAllProductController===========================
getAllProductController = async (req, res) => {
    // Check if the email exists in the database  
    try {
        const AllProduct = await categoryschema.find();
        if (AllProduct) {
            // Login successful
            res.json({ success: true, message: 'get Product successful', data: AllProduct });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, errorMsg: 'Internal server error occurred' });

    }
}
// =========================== deleteProductController===========================
deleteProductController = async (req, res) => {
    // Check if the email exists in the database  
    const { id } = req.params;
    try {
        const deleteProduct = await categoryschema.findByIdAndDelete(id);
        if (deleteProduct) {
            // Login successful
            res.json({ success: true, message: 'Delete Product successful', data: deleteProduct });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, errorMsg: 'Internal server error occurred' });

    }

}

module.exports = {
    createProductController,
    updateProductController,
    getAllProductController,
    deleteProductController
};