const ProductModel = require('../models/product.model');

class ProductController {
  async getAllProducts(req, res) {
    try {
      const { category, search, page, limit } = req.query;
      const result = await ProductModel.getAllProducts({
        category,
        search,
        page,
        limit
      });

      res.json({
        success: true,
        data: result.products,
        pagination: result.pagination
      });
    } catch (error) {
      console.error('Get products error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch products'
      });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.getProductById(id);

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
    } catch (error) {
      console.error('Get product error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch product'
      });
    }
  }
}

module.exports = new ProductController();
