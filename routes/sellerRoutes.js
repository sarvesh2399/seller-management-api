const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    createSeller,
    getSellers,
    sellerLogin
} = require("../controllers/sellerController");

router.post(
    "/create",
    authMiddleware,
    roleMiddleware("admin"),
    createSeller
);

router.get(
    "/list",
    authMiddleware,
    roleMiddleware("admin"),
    getSellers
);

router.post("/login", sellerLogin);

module.exports = router;