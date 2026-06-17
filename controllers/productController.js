const Product = require("../models/Product");
const generatePdf = require("../utils/generatePdf");
const addProduct = async (req, res) => {

    try {

        const {
            productName,
            productDescription,
            brands
        } = req.body;

        if (!productName || !productDescription) {
            return res.status(400).json({
                success: false,
                message: "Product name and description are required"
            });
        }

        if (!brands || brands.length === 0) {
    return res.status(400).json({
        success: false,
        message: "At least one brand is required"
    });
}

const brandData = brands;

        const product = await Product.create({
            sellerId: req.user.id,
            productName,
            productDescription,
            brands: brandData
        });

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getProducts = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments({
            sellerId: req.user.id
        });

        const products = await Product.find({
            sellerId: req.user.id
        })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            data: products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.sellerId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can delete only your own products"
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const viewPdf = async (req, res) => {

    try {

        const product = await Product.findById(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (product.sellerId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        generatePdf(product, res);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    viewPdf
};



// fr eg add prdct

// [
//   {
//     "brandName": "Dell",
//     "detail": "Dell Mouse",
//     "image": "dell.jpg",
//     "price": 1000
//   },
//   {
//     "brandName": "HP",
//     "detail": "HP Mouse",
//     "image": "hp.jpg",
//     "price": 2000
//   }
// ]