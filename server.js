const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const productRoutes = require("./routes/productRoutes");
dotenv.config();
const connectDB = require("./config/db");


connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/admin", adminRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);

app.get("/", (req, res) => {
    res.send("API Running");
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});