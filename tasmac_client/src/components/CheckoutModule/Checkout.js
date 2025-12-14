import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Loader } from 'lucide-react';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import OrderSuccess from './OrderSuccess';
import { 
  selectCartItems, 
  selectCartTotal, 
  clearCart, 
  setCartOpen 
} from '../../redux/cartSlice';
import { 
  createOrder, 
  selectOrderLoading, 
  selectOrderError,
  clearError,
  clearOrder
} from '../../redux/orderSlice';

const Checkout = ({ onBack }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const orderLoading = useSelector(selectOrderLoading);
  const orderError = useSelector(selectOrderError);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    district: '',
    state: 'Tamil Nadu',
    pincode: '',
    payment_method: 'COD'
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // Clear any previous errors when component mounts
  useEffect(() => {
    dispatch(clearError());
    dispatch(clearOrder());
  }, [dispatch]);

  const handleFormUpdate = (data) => {
    setFormData({ ...formData, ...data });
  };

  const handleAddressSubmit = () => {
    setStep(2);
  };

  const handleOrderSubmit = async () => {
    // Clear previous errors
    dispatch(clearError());

    // Prepare order payload for API
    const orderPayload = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      address: {
        street: formData.street,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode
      },
      items: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      })),
      payment_method: formData.payment_method
    };

    try {
      // Call API through Redux thunk
      const result = await dispatch(createOrder(orderPayload)).unwrap();
      // Store order data for success screen
      setOrderData(result.data);
      setOrderSuccess(true);
      
      // Clear cart after successful order
      dispatch(clearCart());
    } catch (err) {
      // Error is handled by Redux slice
      console.error('Order creation failed:', err);
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContinueShopping = () => {
    setOrderSuccess(false);
    setStep(1);
    dispatch(setCartOpen(false));
  };

  // Show success screen
  if (orderSuccess && orderData) {
    return (
      <OrderSuccess
        orderNumber={orderData.order_number}
        totalAmount={orderData.total_amount}
        orderStatus={orderData.order_status}
        paymentStatus={orderData.payment_status}
        onContinueShopping={handleContinueShopping}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 sticky top-0 z-10 shadow-lg">
        <button
          onClick={onBack}
          disabled={orderLoading}
          className="mb-4 hover:bg-red-800 p-2 rounded-full transition inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go back"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-2">Checkout</h2>
        
        {/* Progress Steps */}
        <div className="flex items-center space-x-2 text-sm">
          <div className={`flex items-center ${step >= 1 ? 'text-white' : 'text-red-300'}`}>
            <span
              className={`w-6 h-6 rounded-full ${
                step >= 1 ? 'bg-white text-red-600' : 'bg-red-500'
              } flex items-center justify-center font-bold mr-2`}
            >
              {step > 1 ? '✓' : '1'}
            </span>
            <span className="hidden sm:inline">Delivery Details</span>
            <span className="sm:hidden">Details</span>
          </div>
          <div className="flex-1 h-0.5 bg-red-400" />
          <div className={`flex items-center ${step >= 2 ? 'text-white' : 'text-red-300'}`}>
            <span
              className={`w-6 h-6 rounded-full ${
                step >= 2 ? 'bg-white text-red-600' : 'bg-red-500'
              } flex items-center justify-center font-bold mr-2`}
            >
              2
            </span>
            <span className="hidden sm:inline">Payment & Review</span>
            <span className="sm:hidden">Payment</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-6">
        {/* Error Display */}
        {orderError && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded-lg animate-shake">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-red-800">Order Error</h3>
                <p className="text-sm text-red-700 mt-1">{orderError}</p>
              </div>
              <button
                onClick={() => dispatch(clearError())}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {orderLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4">
              <Loader className="w-12 h-12 text-red-600 animate-spin" />
              <p className="text-gray-900 font-semibold">Processing your order...</p>
              <p className="text-sm text-gray-600">Please wait</p>
            </div>
          </div>
        )}

        {/* Step Content */}
        {step === 1 ? (
          <AddressForm
            formData={formData}
            onUpdate={handleFormUpdate}
            onSubmit={handleAddressSubmit}
          />
        ) : (
          <PaymentForm
            formData={formData}
            onUpdate={handleFormUpdate}
            onSubmit={handleOrderSubmit}
            onBack={() => setStep(1)}
            cartItems={cartItems}
            total={total}
            loading={orderLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;