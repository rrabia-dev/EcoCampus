const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../config/db");
const { createUser } = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Lütfen tüm alanları doldurun!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(username, email, hashedPassword);

    res.status(201).json({
      message: "Kayıt başarılı, EcoCampus'e hoş geldin!",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Kayıt sırasında bir hata oluştu, tekrar deneyiniz!",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: "Kullanıcı bulunamadı",
      });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Şifre hatalı",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Giriş başarılı",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Giriş sırasında bir hata oluştu",
    });
  }
};

module.exports = { register, login };



