const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        mobileNo: {
            type: String,
            required: true,
        },

        country: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },

        skills: [
            {
                type: String,
            },
        ],

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            default: "seller",
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Seller", sellerSchema);
