const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

const createAdmin = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        const adminExists = await Admin.findOne({
            email: "admin@gmail.com"
        });

        if (adminExists) {
            console.log("Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        await Admin.create({
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully");

        process.exit();

    } catch (error) {

        console.log(error.message);
        process.exit();

    }

};

createAdmin();