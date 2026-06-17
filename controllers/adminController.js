const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Admin not found",
            });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                role: admin.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            },
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            role: admin.role,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    adminLogin,
};
