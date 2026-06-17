const PDFDocument = require("pdfkit");

const generatePdf = (product, res) => {

    const doc = new PDFDocument();

    res.setHeader(
        "Content-Type",
        "application/pdf"
    );

    doc.pipe(res);

    doc.fontSize(20).text("Product Details");

    doc.moveDown();

    doc.text(`Product Name: ${product.productName}`);
    doc.text(`Description: ${product.productDescription}`);

    doc.moveDown();

    let totalPrice = 0;

    // product.brands.forEach((brand, index) => {

    //     doc.text(`Brand ${index + 1}`);

    //     doc.text(`Name: ${brand.brandName}`);
    //     doc.text(`Detail: ${brand.detail}`);
    //     doc.text(`Price: ${brand.price}`);

    //     doc.moveDown();

    //     totalPrice += brand.price;

    // });

    product.brands.forEach((brand, index) => {

    doc.text(`Brand ${index + 1}`);
    doc.text(`Brand Name: ${brand.brandName}`);
    doc.text(`Brand Detail: ${brand.detail}`);
    doc.text(`Brand Image: ${brand.image}`);
    doc.text(`Brand Price: ${brand.price}`);

    doc.moveDown();

    totalPrice += brand.price;

});

    doc.text(`Total Price: ${totalPrice}`);

    doc.end();
};

module.exports = generatePdf;