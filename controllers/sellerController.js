const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createSeller = async (req, res) => {
    try {
        const { name, email, mobileNo, country, state, skills, password } =
            req.body;

        if (!name || !email || !mobileNo || !country || !state || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const sellerExists = await Seller.findOne({ email });

        if (sellerExists) {
            return res.status(400).json({
                success: false,
                message: "Seller already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const seller = await Seller.create({
            name,
            email,
            mobileNo,
            country,
            state,
            skills,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "Seller created successfully",
            data: {
                id: seller._id,
                name: seller.name,
                email: seller.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



const getSellers = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const totalSellers = await Seller.countDocuments();

        const sellers = await Seller.find()
            .select("-password")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalSellers / limit),
            totalSellers,
            data: sellers
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


const sellerLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        const seller = await Seller.findOne({ email });

        if (!seller) {
            return res.status(400).json({
                success: false,
                message: "Seller not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            seller.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: seller._id,
                role: seller.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            role: seller.role
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createSeller,
    getSellers,
    sellerLogin
};