const db = require('../db/db-knex-connection');
const { v4: uuidv4 } = require('uuid');

class OrderModel {
  generateOrderNumber() {
    const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const random = uuidv4().split('-')[0].toUpperCase();
    return `ORD-${date}-${random}`;
  }

  async createOrder(orderData) {
    const trx = await db.transaction();

    try {
      const orderNumber = this.generateOrderNumber();

      const [orderId] = await trx('orders').insert({
        order_number: orderNumber,
        customer_name: orderData.customer.name,
        customer_email: orderData.customer.email,
        customer_phone: orderData.customer.phone,
        delivery_address: orderData.address.street,
        city: orderData.address.city,
        district: orderData.address.district,
        state: orderData.address.state,
        pincode: orderData.address.pincode,
        total_amount: orderData.totalAmount,
        payment_method: orderData.payment_method,
        payment_status: 'Pending',
        order_status: 'Placed',
        delivery_validation_status: orderData.delivery_validation_status
      });

      const orderItems = orderData.items.map(item => ({
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price_per_unit: item.price,
        subtotal: item.quantity * item.price
      }));

      await trx('order_items').insert(orderItems);

      // Update stock
      for (const item of orderData.items) {
        await trx('products')
          .where('id', item.product_id)
          .decrement('stock_quantity', item.quantity);
      }

      await trx.commit();

      return {
        order_id: orderId,
        order_number: orderNumber,
        total_amount: orderData.totalAmount,
        payment_status: 'Pending',
        order_status: 'Placed'
      };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async getOrderById(id) {
    const order = await db('orders').where('id', id).first();
    if (!order) return null;

    const items = await db('order_items as oi')
      .join('products as p', 'oi.product_id', 'p.id')
      .where('oi.order_id', id)
      .select(
        'oi.*',
        'p.name',
        'p.brand',
        'p.image_url',
        'p.volume'
      );

    return { ...order, items };
  }

  async getOrderByNumber(orderNumber) {
    const order = await db('orders').where('order_number', orderNumber).first();
    if (!order) return null;

    const items = await db('order_items as oi')
      .join('products as p', 'oi.product_id', 'p.id')
      .where('oi.order_id', order.id)
      .select(
        'oi.*',
        'p.name',
        'p.brand',
        'p.image_url',
        'p.volume'
      );

    return { ...order, items };
  }
}

module.exports = new OrderModel();