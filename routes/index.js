const router = require("express").Router();

router.use("/users", require('./user.routes'))
router.use("/products", require('./product.routes'))
router.use("/auth", require('./auth.routes'))

router.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando 🚀" });
});

module.exports = router