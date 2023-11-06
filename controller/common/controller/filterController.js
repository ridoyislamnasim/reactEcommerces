const express = require("express");
const productschema = require("../../../models/product/productModel");

filter = async (req, res) => {
    console.log("req.body")
    console.log(req.body)
    const { categoryArray, priceRange } = req.body;
    let category = [], gt_price, lh_price
    if (categoryArray.length > 0) category = categoryArray
    console.log('category', category);
    if (priceRange.length > 0) gt_price = priceRange[0], lh_price = priceRange[1]
    try {
        const filterProduct = await productschema.find({
            $or: [
                { category: { $in: category }, },
                { price: { $gte: gt_price, $lte: lh_price } }
            ]
        })
        const filterProduct2 = await productschema.aggregate([
            {
                $match: {
                    category: { $in: category },
                    price: { $gte: gt_price, $lte: lh_price }
                }
            }
        ])
        console.log('filterProduct', filterProduct);
        console.log('filterProduct222', filterProduct2);
        res.json({ success: true, message: 'find successful', data: filterProduct });
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, errorMsg: 'Internal server error occurred' });
    }






}


module.exports = {
    filter,
};