const express = require("express");
const router = express.Router();
const {
  addCategory,
  listCategories,
} = require("../controllers/categoryController");

router.get("/", listCategories);

router.post("/", addCategory);

module.exports = router;
