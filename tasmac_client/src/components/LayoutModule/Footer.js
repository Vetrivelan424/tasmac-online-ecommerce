import React from 'react';
import { Wine, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Wine className="w-6 h-6 mr-2" />
              TASMAC Online
            </h3>
            <p className="text-gray-400 text-sm">
              Your trusted source for premium spirits delivered across Tamil Nadu.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition">About Us</li>
              <li className="hover:text-white cursor-pointer transition">Terms & Conditions</li>
              <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition">Responsible Drinking</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition">Track Order</li>
              <li className="hover:text-white cursor-pointer transition">Return Policy</li>
              <li className="hover:text-white cursor-pointer transition">FAQs</li>
              <li className="hover:text-white cursor-pointer transition">Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center hover:text-white transition">
                <Phone className="w-4 h-4 mr-2" /> 1800-XXX-XXXX
              </p>
              <p className="flex items-center hover:text-white transition">
                <Mail className="w-4 h-4 mr-2" /> support@tasmac.com
              </p>
              <p className="flex items-center hover:text-white transition">
                <MapPin className="w-4 h-4 mr-2" /> Chennai, Tamil Nadu
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>© 2025 TASMAC Online. All rights reserved. | Drink Responsibly. Age 21+ Only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;