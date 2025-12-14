import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, ShoppingCart, ShoppingBag, ArrowRight, AlertCircle } from 'lucide-react';
import CartItem from './CartItem';
import Checkout from '../CheckoutModule/Checkout';
import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
  setCartOpen
} from '../../redux/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isOpen = useSelector(selectIsCartOpen);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleClose = () => {
    dispatch(setCartOpen(false));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setShowCheckout(true);
  };

  const handleBackFromCheckout = () => {
    setShowCheckout(false);
  };

  if (!isOpen) return null;

  if (showCheckout) {
    return <Checkout onBack={handleBackFromCheckout} />;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <ShoppingCart className="w-6 h-6" />
            <span>Your Cart</span>
            {cartItems.length > 0 && (
              <span className="bg-white text-red-600 text-sm px-2 py-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </h2>
          <button
            onClick={handleClose}
            className="hover:bg-red-800 p-2 rounded-full transition"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-semibold">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add some products to get started</p>
              <button
                onClick={handleClose}
                className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <>
                  {console.log('items',item)}
                  <CartItem key={item.id} item={item} />
                  </>
                ))}
              </div>
              
              {/* Cart Summary */}
              <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-gray-900 text-lg">
                    <span>Total</span>
                    <span className="text-red-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Info Note */}
              <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800">
                    Delivery available only in Tamil Nadu. Valid ID proof required at delivery (21+ age verification).
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer / Checkout Button */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all shadow-lg flex items-center justify-center space-x-2 active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">
              Secure checkout • Free delivery across Tamil Nadu
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
