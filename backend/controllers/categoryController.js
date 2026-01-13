const {
  createCategory,
  getAllCategories,
} = require("../models/categoryModel");

const addCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Kategori adı zorunludur",
      });
    }

    const category = await createCategory(name, icon);

    res.status(201).json({
      message: "Kategori başarıyla eklendi",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Kategori eklenirken hata oluştu",
    });
  }
};

const listCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Kategoriler alınamadı",
    });
  }
};

module.exports = {
  addCategory,
  listCategories,
};
