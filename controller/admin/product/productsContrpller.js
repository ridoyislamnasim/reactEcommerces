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
            try {
                const createNewProduct = new productschema({
                    ...fields,
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
    // console.log("=======================================================================", req.params.id)
    // if (req.params.id) {
    //     // console.log(await imageRemove(req.params.id))
    //     if (!await imageRemove(req.params.id)) {
    //         return res.json({ ok: false, msg: 'inviled id' })
    //     }
    // }

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
            const productName = fields.name
            const productId = req.params.id
            // Check if the product exists in the database
            try {
                const existsProduct = await productschema.findOne({ name: productName });
                if (existsProduct) {
                    await removeLocalImage(req.uploadedFiles[0])
                    return res.json({ success: false, errorMsg: 'Product already exits' });
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
                console.log("updateProduct", updateProduct)
                // let savefile = `http://localhost:2000/uploads/${fileName}`

                // Convert the Mongoose document to a plain JavaScript object
                const plainProduct = updateProduct.toObject();

                if (updateProduct) {
                    // Extract only the required fields
                    const Extract = {
                        ...plainProduct,
                        image: `http://localhost:2000/${saveProduct.image}`,
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