const path = require("path");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 5000;

app.listen(5000, "0.0.0.0", () => {
   console.log(`Server 5000 portunda çalışıyor`);

});



