import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Plus, Minus, Trash2, AlertTriangle } from 'lucide-react';
import { updateQuantity, removeFromCart } from '../../redux/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleIncrement = () => {
    if (item.quantity < item.stock_quantity) {
      dispatch(updateQuantity({ productId: item.id, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ productId: item.id, quantity: item.quantity - 1 }));
    } else {
      handleRemove();
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      dispatch(removeFromCart(item.id));
    }, 300);
  };

  const isLowStock = item.stock_quantity <= 5;
  const isMaxQuantity = item.quantity >= item.stock_quantity;

  return (
    <div
      className={`bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200 transition-all duration-300 ${
        isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="flex space-x-4">
        {/* Product Image */}
        <div className="relative">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          {isLowStock && (
            <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              Low
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {item.volume} • {item.brand}
              </p>
            </div>
            <button
              onClick={handleRemove}
              className="text-red-600 hover:text-red-800 transition ml-2"
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-lg font-bold text-red-600">
            ₹{parseFloat(item.price).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Quantity Controls & Total */}
      <div className="flex items-center justify-between mt-3">
        {/* Quantity Selector */}
        <div className="flex items-center space-x-3 bg-white rounded-lg border border-gray-300 p-1">
          <button
            onClick={handleDecrement}
            className="p-1 hover:bg-gray-100 rounded transition disabled:opacity-50"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4 text-red-600" />
          </button>
          <span className="font-bold text-gray-900 w-8 text-center">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="p-1 hover:bg-gray-100 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isMaxQuantity}
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4 text-red-600" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right">
          <p className="font-bold text-gray-900 text-lg">
            ₹{(parseFloat(item?.price) * item?.quantity).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">
            ₹{parseFloat(item?.price)?.toFixed(2)} × {item.quantity}
          </p>
        </div>
      </div>

      {/* Stock Warning */}
      {isMaxQuantity && (
        <div className="mt-2 flex items-center space-x-1 text-xs text-orange-600">
          <AlertTriangle className="w-3 h-3" />
          <span>Maximum available quantity added</span>
        </div>
      )}

      {isLowStock && !isMaxQuantity && (
        <div className="mt-2 flex items-center space-x-1 text-xs text-orange-600">
          <AlertTriangle className="w-3 h-3" />
          <span>Only {item.stock_quantity} items left in stock</span>
        </div>
      )}
    </div>
  );
};

export default CartItem;