const express = require("express");
const bcrypt = require("bcrypt");
const fsPromises = require('fs').promises;

// const registrationschema = require("../../models/auth/registration");
// model
const productschema = require("../../../models/product/productModel");

const { createSlug, removeSlug } = require("../../common/function/common");

// =========================== createProductController===========================
createProductController = async (req, res) => {
    console.log("req.body")
    console.log(req.body)
    console.log(req.uploadedFiles)
    console.log(req.uploadfields)
    const fields = { ...req.uploadfields }
    console.log(fields)
    // const { category } = req.body;
    if (!fields.name || fields.name.trim() === '') {
        res.json({ errorMsg: "name is required" });
    } else if (!fields.price || fields.price.trim() === '') {
        res.json({ errorMsg: "price is required" });
    } else if (!fields.quantity || fields.quantity.trim() === '') {
        res.json({ errorMsg: "quantity is required" });
    }
    // else if (!fields.shipping || fields.shipping.trim() === '') {
    //     res.json({ errorMsg: "shipping is required" });
    // } 
    else if (!fields.category || fields.category.trim() === '') {
        res.json({ errorMsg: "category is required" });
    } else if (!fields.description || fields.description.trim() === '') {
        res.json({ errorMsg: "description is required" });
    } else {
        try {
            // Check if the email exists in the database
            const productName = fields.name
            const existsProduct = await productschema.findOne({ productName });

            if (existsProduct) {
                return res.json({ success: false, errorMsg: 'Product already exits' });
            }
            const slug = await createSlug(productName)
            try {
                const createNewProduct = new productschema({
                    ...fields,
                    slug: slug,
                    photo: req.uploadedFiles[0]
                });
                const saveProduct = await createNewProduct.save()
                // let savefile = `http://localhost:2000/uploads/${fileName}`
                if (saveProduct) {
                    // Extract only the required fields
                    const { name, slug, description, quantity, photo } = saveProduct;
                    const Extract = {
                        img: saveProduct.photo,
                        name: saveProduct.name,
                        slug: saveProduct.slug,
                        description: saveProduct.description,
                        category: saveProduct.category,
                        quantity: saveProduct.quantity,

                    }
                    // Login successful
                    res.json({ success: true, message: 'Product Create successful', data: Extract });
                }
            } catch (error) {
                try { await fsPromises.unlink(req.uploadedFiles[0]) } catch (e) { }
                console.error('Error:', error);
                res.json({ success: false, errorMsg: 'Internal server error occurred save' });

            }

        } catch (error) {
            console.log("===========================================================================================", req.uploadedFiles[0])
            try { await fsPromises.unlink(`public/${req.uploadedFiles[0]}`) } catch (e) { console.log('not remove', e) }

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