const express = require("express");
const bcrypt = require("bcrypt");
const fsPromises = require('fs').promises;

// const registrationschema = require("../../models/auth/registration");
// model
const productschema = require("../../../models/product/productModel");

const { createSlug, removeSlug } = require("../../common/function/common");
const mongoose = require("mongoose");
const removeLocalImage = async (img) => {
    console.log('removeLocalImage', img)
    try { await fsPromises.unlink(`public/${img}`) } catch (e) { console.log('not remove', e) }
}
// convert To Boolean
const convertToBoolean = async (value) => {
    const trueValues = ['1', 'true', 'yes', 'Yes', 'on', 'enabled', 'active'];
    const falseValues = ['0', 'false', 'no', 'No', 'off', 'disabled', 'inactive'];

    if (trueValues.includes(value)) {
        return true;
    } else if (falseValues.includes(value)) {
        return false;
    } else {
        // Default to false if the input is not recognized as a true value
        return false;
    }
}
// if img remove need than call this function
const imageRemove = async (id) => {
    console.log("imageRemove run")
    try {
        const removeProdectImg = await productschema.findById(id)
        console.log(removeProdectImg)
        console.log(removeProdectImg.image)
        try { await fsPromises.unlink(`public/${removeProdectImg.image}`) } catch (e) { console.log('not remove', e) }
        return true
    } catch (error) {
        return false
    }

}
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
        await removeLocalImage(req.uploadedFiles[0])
        res.json({ errorMsg: "name is required" });
    } else if (!fields.price || fields.price.trim() === '') {
        await removeLocalImage(req.uploadedFiles[0])
        res.json({ errorMsg: "price is required" });
    } else if (!fields.quantity || fields.quantity.trim() === '') {
        await removeLocalImage(req.uploadedFiles[0])
        res.json({ errorMsg: "quantity is required" });
    }
    // else if (!fields.shipping || fields.shipping.trim() === '') {
    //     res.json({ errorMsg: "shipping is required" });
    // } 
    else if (!fields.category || fields.category.trim() === '') {
        await removeLocalImage(req.uploadedFiles[0])
        res.json({ errorMsg: "category is required" });
    } else if (!fields.description || fields.description.trim() === '') {
        await removeLocalImage(req.uploadedFiles[0])
        res.json({ errorMsg: "description is required" });
    } else {
        try {
            // Check if the email exists in the database
            const productName = fields.name
            const existsProduct = await productschema.findOne({ name: productName });

            if (existsProduct) {
                await removeLocalImage(req.uploadedFiles[0])
                return res.json({ success: false, errorMsg: 'Product already exits' });
            }
            const slug = await createSlug(productName)

            const shippingBoolean = await convertToBoolean(fields.shipping)
            console.log(shippingBoolean)
            try {
                const createNewProduct = new productschema({
                    ...fields,
                    shipping: shippingBoolean,
                    slug: slug,
                    image: req.uploadedFiles[0]
                });
                const saveProduct = await createNewProduct.save()
                // let savefile = `http://localhost:2000/uploads/${fileName}`

                // Convert the Mongoose document to a plain JavaScript object
                const plainProduct = saveProduct.toObject();

                if (saveProduct) {
                    // Extract only the required fields
                    const { name, slug, description, quantity, photo } = saveProduct;
                    const Extract = {
                        ...plainProduct,
                        image: `http://localhost:2000/${saveProduct.image}`,
                    }
                    // Login successful
                    res.json({ success: true, message: 'Product Create successful', data: Extract });
                }
            } catch (error) {
                console.log("===========================================================================================", req.uploadedFiles[0])
                await removeLocalImage(req.uploadedFiles[0])
                console.error('Error:', error);
                res.json({ success: false, errorMsg: 'Internal server error occurred save' });

            }

        } catch (error) {
            console.log("===========================================================================================", req.uploadedFiles[0])
            await removeLocalImage(req.uploadedFiles[0])
            console.error('Error:', error);
            res.json({ success: false, errorMsg: 'Internal server error occurred' });
        }

    }




}
// =========================== updateProductController===========================
updateProductController = async (req, res) => {
    console.log("req.body")
    // console.log(req.body)
    // console.log(req.uploadedFiles)
    // console.log(req.uploadfields)
    const fields = { ...req.uploadfields }
    // const { category } = req.body;
    if (!fields.name || fields.name.trim() === '') {
        await removeLocalImage(req.uploadedFiles[0])
        res.json({ errorMsg: "name is required" });
    } else if (!fields.price || fields.price.trim() === '') {
        await removeLocalImage(req.uploadedFiles[0])
        res.json({ errorMsg: "price is required" });
    } else if (!fields.quantity || fields.quantity.trim() === '') {
        await removeLocalImage(req.uploadedFiles[0])
        res.json({ errorMsg: "quantity is required" });
    }
    // else if (!fields.shipping || fields.shipping.trim() === '') {
    //     res.json({ errorMsg: "shipping is required" });
    // } 
    else if (!fields.category || fields.category.trim() === '') {
        await removeLocalImage(req.uploadedFiles[0])
        res.json({ errorMsg: "category is required" });
    } else if (!fields.description || fields.description.trim() === '') {
        await removeLocalImage(req.uploadedFiles[0])
        res.json({ errorMsg: "description is required" });
    } else {
        try {
            const productName = fields.name
            const productId = req.params.id
            // Check  the product id exists in the database
            try {
                await productschema.findById(productId);
            } catch (error) {
                await removeLocalImage(req.uploadedFiles[0])
                return res.json({ success: false, errorMsg: 'Product id  dose not exits' });
            }
            // Check  same product exists in the database
            try {
                const existsProduct = await productschema.find({ name: productName });
                // length gater than 0 must this product exit
                if (existsProduct.length > 1) {
                    await removeLocalImage(req.uploadedFiles[0])
                    return res.json({ success: false, errorMsg: 'Product already exits' });
                } else if (existsProduct.length == 0) {

                } else {
                    const oneProduct = await productschema.find({ _id: productId, name: productName });
                    //this id update this id product name same langth 1 
                    console.log("oneProduct", oneProduct.length)
                    if (oneProduct.length == 0) {
                        await removeLocalImage(req.uploadedFiles[0])
                        return res.json({ success: false, errorMsg: 'Product already exits same' });
                    }
                }
            } catch (error) {
                console.log("=existsProduct=== not find")
            }
            // update product
            try {
                const slug = await createSlug(productName)
                const updateProduct = await productschema.findByIdAndUpdate(productId,
                    {
                        ...fields,
                        slug: slug,
                        image: req.uploadedFiles[0]
                    })
                await removeLocalImage(updateProduct.image)
                console.log("updateProduct==============", updateProduct)
                // let savefile = `http://localhost:2000/uploads/${fileName}`

                // Convert the Mongoose document to a plain JavaScript object
                const nowUpdateProduct = await productschema.findById(productId)
                const plainProduct = nowUpdateProduct.toObject();

                if (nowUpdateProduct) {
                    // Extract only the required fields
                    const Extract = {
                        ...plainProduct,
                        image: `http://localhost:2000/${nowUpdateProduct.image}`,
                    }
                    // update successful
                    res.json({ success: true, message: 'Product update successful', data: Extract });
                }
            } catch (error) {
                console.log("===========================================================================================", req.uploadedFiles[0])
                await removeLocalImage(req.uploadedFiles[0])
                console.error('Error:', error);
                res.json({ success: false, errorMsg: 'Internal server error occurred save' });

            }

        } catch (error) {
            console.log("===========================================================================================", req.uploadedFiles[0])
            await removeLocalImage(req.uploadedFiles[0])
            // try { await fsPromises.unlink(`public/${req.uploadedFiles[0]}`) } catch (e) { console.log('not remove', e) }

            console.error('Error:', error);
            res.json({ success: false, errorMsg: 'Internal server error occurred' });
        }

    }

}
// =========================== getAllProductController===========================
getAllProductController = async (req, res) => {
    // Check if the email exists in the database  
    try {
        const AllProduct = await productschema.find().limit(12).sort({ updatedAt: -1 }).populate("category");
        if (AllProduct.length > 0) {
            const Extract = []
            for (const product of AllProduct) {
                const plainProduct = product.toObject();
                let singleProduct = {
                    ...plainProduct,
                    image: `http://localhost:2000/${plainProduct.image}`
                }
                Extract.push(singleProduct)
            }
            // Login successful
            return res.json({ success: true, message: 'get Product successful', data: Extract, tptalProduct: AllProduct.length });
        }
        res.json({ success: false, errorMsg: 'no any Product in DB' });
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, errorMsg: 'Internal server error occurred' });

    }
}
// =========================== getSingleProductController===========================
getSingleProductController = async (req, res) => {
    // Check if the email exists in the database  
    const { id } = req.params;
    console.log('id', id);
    try {

        const Product = await productschema.findById(id).populate("category");
        console.log('Product', Product);
        if (Product !== null) {
            const Extract = []
            const plainProduct = Product.toObject();
            let singleProduct = {
                ...plainProduct,
                image: `http://localhost:2000/${plainProduct.image}`
            }
            Extract.push(singleProduct)

            // Login successful
            return res.json({ success: true, message: 'get Product successful', data: Extract });
        }
        res.json({ success: false, errorMsg: 'no any Product' });
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, errorMsg: 'Internal server error occurred' });

    }
}
// =========================== deleteProductController===========================
deleteProductController = async (req, res) => {
    // console.log("=======================================================================", req.params.id)
    // if (req.params.id) {
    //     // console.log(await imageRemove(req.params.id))
    //     if (!await imageRemove(req.params.id)) {
    //         return res.json({ ok: false, msg: 'inviled id' })
    //     }
    // }
    // Check if the email exists in the database  
    const { id } = req.params;
    const deleteProduct = await productschema.findByIdAndDelete(id);
    console.log("deleteProduct", deleteProduct)
    try {
        const deleteProduct = await productschema.findByIdAndDelete(id);
        if (deleteProduct === null) {
            return res.json({ success: false, message: 'Product not found. Deletion unsuccessful', });
        }
        // Delete successful
        await removeLocalImage(deleteProduct.image)
        res.json({ success: true, message: 'Delete Product successful', data: deleteProduct });

    } catch (error) {
        console.error('Error:', error);
        return res.json({ success: false, errorMsg: 'Internal server error occurred' });

    }

}

module.exports = {
    createProductController,
    updateProductController,
    getAllProductController,
    getSingleProductController,
    deleteProductController
};