const { createProduct, getAllProducts } = require("../models/productModel");
const { deleteProductById } = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const { title, description, price, image_url, category_id } = req.body;

    if (!title || price === undefined) {
      return res.status(400).json({
        message: "Başlık ve fiyat zorunludur",
      });
    }

    const user_id = req.user.id;

    const product = await createProduct(
      title,
      description,
      price,
      image_url,
      user_id,
      category_id
    );

    res.status(201).json({
      message: "Ürün başarıyla eklendi",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ürün eklenirken hata oluştu",
    });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Ürünler alınamadı",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;

    const deletedProduct = await deleteProductById(productId, userId);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Ürün bulunamadı veya yetkiniz yok",
      });
    }

    res.json({
      message: "Ürün başarıyla silindi",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ürün silinirken hata oluştu",
    });
  }
};

module.exports = {
  addProduct,
  listProducts,
  deleteProduct,

};
