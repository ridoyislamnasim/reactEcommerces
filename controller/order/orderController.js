const express = require("express");
const bcrypt = require("bcrypt");
const registrationschema = require("../../models/auth/registration");
const JWT = require("jsonwebtoken")
const { hashPassword } = require("../common/function/common");
const orderschema = require("../../models/order/orderModel");
// function addPublicPathToImages(order) {
//     const modifiedOrder = {};
//     for (const key in order) {
//         if (order.hasOwnProperty(key)) {
//             const product = order[key];
//             const modifiedProduct = {
//                 ...product,
//                 image: 'http://localhost:2000/' + product.image
//             };
//             modifiedOrder[key] = modifiedProduct;
//         }
//     }
//     return modifiedOrder;
// }
// const addPublicPathToImages = async (order) => {
//     const modifiedOrder = { ...order };
//     for (const key in modifiedOrder) {
//         if (modifiedOrder.hasOwnProperty(key)) {
//             modifiedOrder[key].image = 'http://localhost:2000/' + modifiedOrder[key].image;
//         }
//     }
//     return modifiedOrder;
// }


function updateProductImageUrls(data, imagePath) {
    if (data && data.products && data.products.length > 0) {
        data.products.forEach(product => {
            if (product.image) {
                product.image = imagePath + product.image;
            }
        });
    }
    return data;
}
orderProduct = async (req, res) => {
    try {
        console.log('order ======call');
        const orders = await orderschema.find({ buyer: req.user._id })
        // Loop through each order and populate products one by one
        const fullOorder = []
        for (const order of orders) {
            const orderById = await orderschema.findById(order._id).populate("buyer").populate("products")
            console.log('orderById ---', orderById);
            let data = updateProductImageUrls(orderById, 'http://localhost:2000/')
            fullOorder.push(data)
            console.log('modifiedOrders-------------------------', data);
            // await populateProducts(order);
        }



        // ======================
        if (!orders) {
            res.status(500).json({ success: false, errorMsg: 'Internal server error occurred' });
        }
        res.status(200).json({ success: true, message: 'Order information', data: fullOorder });
    } catch (error) {
        console.error('Error:', error);
        res.status(401).json({ success: false, errorMsg: 'Internal server error occurred' });
    }
}


module.exports = {
    orderProduct,
};



