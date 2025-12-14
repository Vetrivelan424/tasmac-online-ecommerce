import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import {
  fetchProducts,
  setFilters,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectFilters
} from '../../redux/productSlice';
import { PRODUCT_CATEGORIES } from '../../utils/validation';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleCategoryChange = (category) => {
    dispatch(setFilters({ category: category === 'All' ? '' : category }));
  };

  const handleSearchChange = (e) => {
    dispatch(setFilters({ search: e.target.value }));
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
          <h3 className="text-red-800 font-bold text-lg mb-2">Error Loading Products</h3>
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts(filters))}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-8 sticky top-20 z-40">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
            {PRODUCT_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                  (cat === 'All' && !filters.category) || filters.category === cat
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading products...</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filters.category ? `${filters.category} Collection` : 'All Products'}
            </h2>
            <p className="text-gray-600">{products.length} products found</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {products.length === 0 && (
            <div className="text-center py-20">
              <Filter className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No products found</p>
              <p className="text-gray-400 text-sm">Try adjusting your filters</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;