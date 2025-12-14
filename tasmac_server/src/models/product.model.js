const db = require('../db/db-knex-connection');

class ProductModel {
  async getAllProducts(filters = {}) {
    let query = db('products').where('is_active', true);

    if (filters.category) {
      query = query.where('category', filters.category);
    }

    if (filters.search) {
      query = query.where(function() {
        this.where('name', 'like', `%${filters.search}%`)
          .orWhere('brand', 'like', `%${filters.search}%`);
      });
    }

    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 12;
    const offset = (page - 1) * limit;

    const [products, [{ total }]] = await Promise.all([
      query.clone().limit(limit).offset(offset).orderBy('created_at', 'desc'),
      query.clone().count('* as total')
    ]);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getProductById(id) {
    return db('products').where({ id, is_active: true }).first();
  }

  async getProductsByIds(ids) {
    return db('products').whereIn('id', ids).where('is_active', true);
  }

  async updateStock(productId, quantity) {
    return db('products')
      .where('id', productId)
      .decrement('stock_quantity', quantity);
  }
}

module.exports = new ProductModel();
