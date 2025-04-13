const User = require('../models/User.model')


// USER LIST
const getAllUsers = (req, res, next) => {

    User
        .find()
        .then(response => res.json(response))
        .catch(err => next(err))
}


// USER DETAIL
const getOneUser = (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .populate({
            path: 'cart.product', 
            select: 'title' 
        })
        .populate({
            path: 'purchasedProduct.product', 
            select: 'title' 
        })
        .then(response => res.json(response))
        .catch(err => next(err))
}


// ADD TO CART
const addToCart = (req, res, next) => {

    const { product_id, user_id } = req.params;
    const { options, price } = req.body;

    User
        .findById(user_id)
        .then(user => {
            const existingCartItem = user.cart.find(item => 
                item.product.toString() === product_id && JSON.stringify(item.options) === JSON.stringify(options)
            );

            if (existingCartItem) {
                existingCartItem.quantity = (existingCartItem.quantity || 1) + 1;
            } else {
                user.cart.push({ product: product_id, options, price, quantity: 1 });
            }

            return user.save();
        })
        .then(response => res.json(response))
        .catch(err => next(err));
};


// EDIT CART ITEM
const editCartItem = (req, res, next) => {
    const { user_id, cart_item_id } = req.params;
    const { quantity } = req.body;

    User
        .findById(user_id)
        .then(user => {
            const cartItem = user.cart.id(cart_item_id);

            if (!cartItem) {
                throw new Error('Cart item not found');
            }

            if (quantity > 0) {
                cartItem.quantity = quantity;
            } else {
                user.cart.id(cart_item_id).remove();
            }

            return user.save();
        })
        .then(response => res.json(response))
        .catch(err => next(err));
};


// REMOVE FROM CART
const removeFromCart = (req, res, next) => {
    const { user_id, cart_item_id } = req.params;

    User
        .findById(user_id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const cartItem = user.cart.id(cart_item_id);
            if (!cartItem) {
                return res.status(404).json({ message: 'Cart item not found' });
            }

            user.cart = user.cart.filter(item => item._id.toString() !== cart_item_id);
            return user.save();
        })
        .then(response => res.json(response))
        .catch(err => next(err));
};


// BUY PRODUCTS
const buyProducts = (req, res, next) => {
    const { user_id } = req.params;
    const { shipmentAddress, purchaseMethod } = req.body;

    User
        .findById(user_id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const purchasedItems = user.cart.map(item => ({
                product: item.product,
                options: item.options,
                price: item.price,
                quantity: item.quantity,
                purchaseMethod,
                shipmentAddress,
                purchaseDate: new Date()
            }));

            user.purchasedProduct.push(...purchasedItems);
            user.cart = [];

            return user.save();
        })
        .then(response => res.json(response))
        .catch(err => next(err));
};


// EDIT USER
const editUser = (req, res, next) => {

    const { user_id } = req.params
    let { username, email} = req.body 

    User
        .findByIdAndUpdate(user_id, { username, email })
        .then(response => res.json(response))
        .catch(err => next(err))

}


// DELETE USER
const deleteUser = (req, res, next) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}


module.exports = {
    getAllUsers,
    getOneUser,
    addToCart,
    editCartItem,
    removeFromCart,
    buyProducts,
    editUser,
    deleteUser
};