import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import Header from './components/LayoutModule/Header';
import Navbar from './components/LayoutModule/Navbar';
import Footer from './components/LayoutModule/Footer';
import ProductList from './components/ProductModule/ProductList';
import ProductDetails from './components/ProductModule/ProductDetails';
import Cart from './components/CartModule/Cart';
import './styles/main.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
          <Header />
          <Navbar />
          <Cart />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;