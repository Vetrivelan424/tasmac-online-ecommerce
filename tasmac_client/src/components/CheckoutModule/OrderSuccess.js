import React from 'react';
import { Check, Package, Truck } from 'lucide-react';

const OrderSuccess = ({ orderNumber, totalAmount, onContinueShopping }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <Check className="w-12 h-12 text-green-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Order Placed Successfully!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Your order has been confirmed and will be delivered soon.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border-2 border-dashed border-gray-300">
          <p className="text-sm text-gray-600 mb-2">Order Number</p>
          <p className="text-xl font-bold text-red-600 font-mono break-all">
            {orderNumber}
          </p>
          <p className="text-sm text-gray-600 mt-3 mb-1">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{parseFloat(totalAmount).toFixed(2)}
          </p>
        </div>
        
        <div className="space-y-3 mb-6 text-left bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <Package className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span className="text-sm">Order will be processed within 24 hours</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <Truck className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span className="text-sm">Expected delivery in 2-3 business days</span>
          </div>
        </div>
        
        <button
          onClick={onContinueShopping}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition shadow-lg"
        >
          Continue Shopping
        </button>
        
        <p className="text-xs text-gray-500 mt-4">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;