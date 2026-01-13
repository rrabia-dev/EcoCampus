const pool = require("../config/db");

const createCategory = async (name, icon) => {
  const result = await pool.query(
    `INSERT INTO categories (name, icon)
     VALUES ($1, $2)
     RETURNING *`,
    [name, icon]
  );

  return result.rows[0];
};

const getAllCategories = async () => {
  const result = await pool.query(
    "SELECT * FROM categories ORDER BY id ASC"
  );
  return result.rows;
};

module.exports = {
  createCategory,
  getAllCategories,
};
