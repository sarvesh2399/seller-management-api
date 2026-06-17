const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    addProduct,
    getProducts,
    deleteProduct,
    viewPdf
} = require("../controllers/productController");

router.post(
    "/add",
    authMiddleware,
    roleMiddleware("seller"),
    addProduct
);

router.get(
    "/list",
    authMiddleware,
    roleMiddleware("seller"),
    getProducts
);

router.delete(
    "/delete/:id",
    authMiddleware,
    roleMiddleware("seller"),
    deleteProduct
);

router.get(
    "/pdf/:id",
    authMiddleware,
    roleMiddleware("seller"),
    viewPdf
);

module.exports = router;