const Product = require('../models/Product.model')


// PRODUCT LIST
const getAllProducts = (req, res, next) => {

    Product
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
}


// PRODUCT DETAIL
const getOneProduct = (req, res, next) => {

    const { product_id } = req.params;

    Product
        .findById(product_id)
        .then(response => res.json(response))
        .catch(err => next(err));
};


// CREATE PRODUCT
const saveProduct = (req, res, next) => {

    const { title, basePrice, customizableParts, isCustomizable } = req.body;

    Product
        .create({ title, basePrice, customizableParts, isCustomizable })
        .then(response => res.json(response))
        .catch(err => next(err));
};


// EDIT PRODUCT
const editProduct = (req, res, next) => {

    const { product_id } = req.params
    const { title, basePrice, customizableParts, isCustomizable  } = req.body 

    Product
        .findByIdAndUpdate(product_id, { title, basePrice, customizableParts, isCustomizable })
        .then(response => res.json(response))
        .catch(err => next(err))
}


// DELETE PRODUCT
const deleteProduct = (req, res, next) => {

    const { product_id } = req.params

    Product
        .findByIdAndDelete(product_id)
        .then(() => res.sendStatus(204))
        .catch(err => next(err))
}


module.exports = {
    getAllProducts,
    getOneProduct,
    saveProduct,
    editProduct,
    deleteProduct
}