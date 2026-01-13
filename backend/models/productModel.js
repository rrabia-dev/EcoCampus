const pool = require("../config/db");

const createProduct = async (title, description, price, image_url, user_id, category_id) => {
  const result = await pool.query(
    `INSERT INTO products 
     (title, description, price, image_url, user_id, category_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [title, description, price, image_url, user_id, category_id]
  );

  return result.rows.map(product => ({
  ...product,
  isDonation: Number(product.price) === 0
}));

};

const getAllProducts = async () => {
  const result = await pool.query(
    `SELECT p.*, c.name AS category_name, u.username
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     LEFT JOIN users u ON p.user_id = u.id
     ORDER BY p.created_at DESC`
  );

  return result.rows;
};

const deleteProductById = async (productId, userId) => {
  const result = await pool.query(
    `DELETE FROM products 
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [productId, userId]
  );

  return result.rows[0];
};


module.exports = {
  createProduct,
  getAllProducts,
  deleteProductById,
};
