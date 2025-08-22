const Product = require('../models/Product');
const database = require('../utils/database');

class ProductController {
  getAllProducts(req, res) {
    const products = database.findAll();
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  }

  getProductById(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    const product = database.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  }

  createProduct(req, res) {
    const { name, type, price, quantity } = req.body;
    const productData = { name: name?.trim(), type, price, quantity };

    const errors = Product.validate(productData);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    const product = database.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  }

  updateProduct(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    const { name, type, price, quantity } = req.body;
    const productData = { name: name?.trim(), type, price, quantity };

    const errors = Product.validate(productData);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    const product = database.update(id, productData);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  }

  deleteProduct(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    const product = database.delete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: product
    });
  }
}

module.exports = new ProductController();