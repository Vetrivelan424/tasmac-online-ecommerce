const OrderModel = require('../models/order.model');
const ProductModel = require('../models/product.model');
const config = require('../config/config');

class OrderController {
  validateAddress(address) {
    const errors = [];

    if (address.state.toLowerCase() !== 'tamil nadu') {
      return {
        is_valid: false,
        is_in_state: false,
        message: 'Delivery is only available in Tamil Nadu',
        delivery_validation_status: 'Out_of_State'
      };
    }

    const district = address.district.trim();
    const isValidDistrict = config.tamilNaduDistricts.some(
      d => d.toLowerCase() === district.toLowerCase()
    );

    if (!isValidDistrict) {
      errors.push('Invalid district name');
    }

    const pincode = address.pincode.toString();
    if (!/^[6][0-4]\d{4}$/.test(pincode)) {
      errors.push('Invalid Tamil Nadu pincode');
    }

    if (errors.length > 0) {
      return {
        is_valid: false,
        is_in_state: true,
        message: errors.join(', '),
        delivery_validation_status: 'Invalid'
      };
    }

    return {
      is_valid: true,
      is_in_state: true,
      message: 'Address is valid for delivery',
      delivery_validation_status: 'Valid'
    };
  }

  async createOrder(req, res) {
    try {
      const { customer, address, items, payment_method } = req.body;

      // Validate address
      const addressValidation = this.validateAddress(address);
      if (!addressValidation.is_valid) {
        return res.status(422).json({
          success: false,
          message: addressValidation.message,
          data: {
            delivery_validation_status: addressValidation.delivery_validation_status
          }
        });
      }

      // Validate products and calculate total
      const productIds = items.map(item => item.product_id);
      const products = await ProductModel.getProductsByIds(productIds);

      if (products.length !== items.length) {
        return res.status(400).json({
          success: false,
          message: 'One or more products not found'
        });
      }

      // Check stock and calculate total
      let totalAmount = 0;
      const validatedItems = [];

      for (const item of items) {
        const product = products.find(p => p.id === item.product_id);
        
        if (!product) {
          return res.status(400).json({
            success: false,
            message: `Product ${item.product_id} not found`
          });
        }

        if (product.stock_quantity < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${product.name}`
          });
        }

        totalAmount += product.price * item.quantity;
        validatedItems.push({
          product_id: product.id,
          quantity: item.quantity,
          price: product.price
        });
      }

      const orderData = {
        customer,
        address,
        items: validatedItems,
        totalAmount,
        payment_method,
        delivery_validation_status: addressValidation.delivery_validation_status
      };

      const order = await OrderModel.createOrder(orderData);

      res.status(201).json({
        success: true,
        data: order,
        message: 'Order placed successfully'
      });
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create order'
      });
    }
  }

  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderModel.getOrderById(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error('Get order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order'
      });
    }
  }

  async getOrderByNumber(req, res) {
    try {
      const { orderNumber } = req.params;
      const order = await OrderModel.getOrderByNumber(orderNumber);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      console.error('Get order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order'
      });
    }
  }

  async validateAddressEndpoint(req, res) {
    try {
      const validation = this.validateAddress(req.body);
      res.json({
        success: true,
        data: validation
      });
    } catch (error) {
      console.error('Validate address error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to validate address'
      });
    }
  }
}

module.exports = new OrderController();