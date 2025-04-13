const router = require("express").Router()

const { getAllProducts, getOneProduct, saveProduct, editProduct, deleteProduct } = require("../controllers/product.controllers")
const { isAuthenticated } = require("../middlewares/verifyToken.middleware")
const { isAdmin } = require("../middlewares/isAdmin.middleware")


router.get("/getAllProducts", getAllProducts)
router.get("/getOneProduct/:product_id", getOneProduct)
router.post("/saveProduct", isAuthenticated, isAdmin, saveProduct)
router.put("/editProduct/:product_id", isAuthenticated, isAdmin, editProduct)

router.delete("/deleteProduct/:product_id", isAuthenticated, isAdmin, deleteProduct)

module.exports = router
