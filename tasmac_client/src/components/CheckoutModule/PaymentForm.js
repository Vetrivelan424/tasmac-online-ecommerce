import React from 'react';
import { CreditCard } from 'lucide-react';
import { PAYMENT_METHODS } from '../../utils/validation';

const PaymentForm = ({ formData, onUpdate, onSubmit, onBack, cartItems, total, loading }) => {
  const handlePaymentChange = (e) => {
    onUpdate({ payment_method: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-red-600" />
          Payment Method
        </h3>
        <div className="space-y-3">
          {PAYMENT_METHODS.map(method => (
            <label
              key={method.value}
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <input
                type="radio"
                name="payment"
                value={method.value}
                checked={formData.payment_method === method.value}
                onChange={handlePaymentChange}
                className="w-5 h-5 text-red-600"
              />
              <span className="ml-3 font-semibold text-gray-900">
                {method.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
        <div className="space-y-2 mb-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-700">
                {item.name} × {item.quantity}
              </span>
              <span className="font-semibold text-gray-900">
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t-2 border-red-300 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total Amount:</span>
            <span className="text-2xl font-bold text-red-600">
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition"
          disabled={loading}
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;