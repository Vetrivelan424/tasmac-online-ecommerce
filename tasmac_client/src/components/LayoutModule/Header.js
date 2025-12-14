import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Wine } from 'lucide-react';
import { setCartOpen, selectCartItemCount } from '../../redux/cartSlice';
import logo from '../../assets/tamilnadu_logo.png'
const Header = () => {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectCartItemCount);

  return (
    <header className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* <Wine className="w-8 h-8" /> */}
            <img src={logo} width={60} height={60} />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">TASMAC Online</h1>
              <p className="text-xs text-red-200">Tamil Nadu State Marketing Corporation</p>
            </div>
          </div>
          <button
            onClick={() => dispatch(setCartOpen(true))}
            className="relative bg-white text-red-700 px-6 py-3 rounded-full font-semibold hover:bg-red-50 transition-all shadow-lg flex items-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-900 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
