import React from 'react';
import { Check, Truck, Package } from 'lucide-react';

const Navbar = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium Spirits Delivered</h2>
            <p className="text-xl text-red-100 mb-6">
              Browse our collection of finest liquors and get them delivered to your doorstep across Tamil Nadu
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <Check className="w-5 h-5 mr-2" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <Truck className="w-5 h-5 mr-2" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <Package className="w-5 h-5 mr-2" />
                <span>Secure Packaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;