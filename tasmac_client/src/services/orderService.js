import axiosInstance from '../axios/axiosInstance';

class OrderService {
  async createOrder(orderData) {
    try {
      const response = await axiosInstance.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getOrderById(id) {
    try {
      const response = await axiosInstance.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getOrderByNumber(orderNumber) {
    try {
      const response = await axiosInstance.get(`/orders/number/${orderNumber}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async validateAddress(addressData) {
    try {
      const response = await axiosInstance.post('/orders/validate-address', addressData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      return {
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data
      };
    } else if (error.request) {
      return {
        message: 'No response from server. Please check your connection.',
        status: 0
      };
    } else {
      return {
        message: error.message || 'An unexpected error occurred',
        status: -1
      };
    }
  }
}

export default new OrderService();
