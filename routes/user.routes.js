const router = require("express").Router()

const { getAllUsers, getOneUser, addToCart, editCartItem, removeFromCart, buyProducts, editUser, deleteUser } = require("../controllers/user.controllers")
const { isAuthenticated } = require("../middlewares/verifyToken.middleware")

router.get("/getAllUsers", getAllUsers)
router.get("/getOneUser/:user_id", getOneUser)

router.post("/cart/:user_id/:product_id", isAuthenticated, addToCart)
router.put("/cart/:user_id/:cart_item_id", isAuthenticated, editCartItem)
router.delete("/cart/:user_id/:cart_item_id", isAuthenticated, removeFromCart)

router.post("/buyProducts/:user_id", isAuthenticated, buyProducts)

router.put("/editUser/:user_id", isAuthenticated, editUser)
router.delete("/deleteUser/:user_id", isAuthenticated, deleteUser)

module.exports = router
