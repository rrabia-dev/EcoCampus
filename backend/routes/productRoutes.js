const express = require("express");
const router = express.Router();

const {
  addProduct,
  listProducts,
  deleteProduct
} = require("../controllers/productController");

const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", listProducts);

router.post("/", authMiddleware, addProduct);

router.delete("/:id", authMiddleware, deleteProduct);


module.exports = router;
