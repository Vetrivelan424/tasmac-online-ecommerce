import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Check, ShoppingBag } from 'lucide-react';
import { addToCart } from '../../redux/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {product.volume}
        </div>
        <div className="absolute top-3 left-3 bg-yellow-400 text-red-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {product.alcohol_percentage}% ABV
        </div>
      </div>
      <div className="p-5">
        <div className="mb-3">
          <p className="text-xs text-red-600 font-semibold uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
            {product.name}
          </h3>
          <span className="inline-block bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-red-600">
              ₹{parseFloat(product.price).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">{product.stock_quantity} in stock</p>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0}
          className={`w-full py-3 rounded-lg font-semibold transition-all shadow-md flex items-center justify-center space-x-2 ${
            added
              ? 'bg-green-500 text-white'
              : product.stock_quantity === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700 active:scale-95'
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              <span>Added!</span>
            </>
          ) : product.stock_quantity === 0 ? (
            <span>Out of Stock</span>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;