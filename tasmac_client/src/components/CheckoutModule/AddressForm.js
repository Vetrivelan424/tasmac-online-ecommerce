import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { User, MapPin, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { validateForm, TAMIL_NADU_DISTRICTS } from '../../utils/validation';
import { validateAddress } from '../../redux/orderSlice';

const AddressForm = ({ formData, onUpdate, onSubmit }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [validatingAddress, setValidatingAddress] = useState(false);
  const [addressValidation, setAddressValidation] = useState(null);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Clear address validation when address fields change
    if (['district', 'state', 'pincode'].includes(name)) {
      setAddressValidation(null);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleValidateAddress = async () => {
    // Check if required address fields are filled
    if (!formData.district || !formData.pincode) {
      setAddressValidation({
        is_valid: false,
        message: 'Please fill in district and pincode to validate address'
      });
      return;
    }

    const addressData = {
      state: formData.state,
      pincode: formData.pincode,
      district: formData.district
    };

    setValidatingAddress(true);
    setAddressValidation(null);

    try {
      // Call API through Redux thunk
      const result = await dispatch(validateAddress(addressData)).unwrap();
      setAddressValidation(result.data);
     
    } catch (error) {
      console.log("error",error)
      setAddressValidation({
        is_valid: false,
        is_in_state: false,
        message: error.message || 'Address validation failed. Please check your details.',
        delivery_validation_status: 'Invalid'
      });
    } finally {
      setValidatingAddress(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {
      name: true,
      email: true,
      phone: true,
      street: true,
      city: true,
      district: true,
      pincode: true
    };
    setTouched(allTouched);
    
    // Validate form
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      
      // Scroll to first error
      const firstErrorField = Object.keys(validation.errors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
        element.focus();
      }
      return;
    }

    // Check if address validation is needed
    if (!addressValidation) {
      setErrors({ 
        general: 'Please validate your delivery address before proceeding' 
      });
      return;
    }

    if (!addressValidation.is_valid) {
      setErrors({ 
        general: 'Your delivery address is not valid. Please correct it before proceeding.' 
      });
      return;
    }

    // Clear any errors and proceed
    setErrors({});
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error Message */}
      {errors.general && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg animate-shake">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="ml-3 text-sm text-red-800 font-semibold">{errors.general}</p>
          </div>
        </div>
      )}

      {/* Customer Information Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-red-600" />
          Customer Information
        </h3>
        
        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                errors.name && touched.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
              autoComplete="name"
            />
            {errors.name && touched.name && (
              <p className="text-red-600 text-sm mt-1 flex items-center animate-slide-down">
                <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                {errors.name}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              As per government ID (minimum 3 characters)
            </p>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                errors.email && touched.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="your.email@example.com"
              autoComplete="email"
            />
            {errors.email && touched.email && (
              <p className="text-red-600 text-sm mt-1 flex items-center animate-slide-down">
                <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                {errors.email}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Order confirmation will be sent to this email
            </p>
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-500 font-semibold">+91</span>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-14 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                  errors.phone && touched.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="9876543210"
                maxLength="10"
                autoComplete="tel"
              />
            </div>
            {errors.phone && touched.phone && (
              <p className="text-red-600 text-sm mt-1 flex items-center animate-slide-down">
                <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                {errors.phone}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              10-digit mobile number for delivery updates
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Address Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-red-600" />
          Delivery Address
        </h3>
        
        <div className="space-y-4">
          {/* Street Address */}
          <div>
            <label htmlFor="street" className="block text-sm font-semibold text-gray-700 mb-2">
              Street Address <span className="text-red-600">*</span>
            </label>
            <textarea
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="3"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none ${
                errors.street && touched.street ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="House/Flat no, Building name, Street name, Landmark"
              autoComplete="street-address"
            />
            {errors.street && touched.street && (
              <p className="text-red-600 text-sm mt-1 flex items-center animate-slide-down">
                <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                {errors.street}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Complete address including landmarks (minimum 5 characters)
            </p>
          </div>

          {/* City and District Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* City Field */}
            <div>
              <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                City/Town <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                  errors.city && touched.city ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="City or Town name"
                autoComplete="address-level2"
              />
              {errors.city && touched.city && (
                <p className="text-red-600 text-sm mt-1 flex items-center animate-slide-down">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  {errors.city}
                </p>
              )}
            </div>

            {/* District Field */}
            <div>
              <label htmlFor="district" className="block text-sm font-semibold text-gray-700 mb-2">
                District <span className="text-red-600">*</span>
              </label>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                  errors.district && touched.district ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select District</option>
                {TAMIL_NADU_DISTRICTS.map(district => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.district && touched.district && (
                <p className="text-red-600 text-sm mt-1 flex items-center animate-slide-down">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  {errors.district}
                </p>
              )}
            </div>
          </div>

          {/* State and Pincode Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* State Field */}
            <div>
              <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                id="state"
                value="Tamil Nadu"
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600"
              />
              <p className="text-xs text-gray-500 mt-1">
                Delivery available only in Tamil Nadu
              </p>
            </div>

            {/* Pincode Field */}
            <div>
              <label htmlFor="pincode" className="block text-sm font-semibold text-gray-700 mb-2">
                Pincode <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition ${
                  errors.pincode && touched.pincode ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="600001"
                maxLength="6"
                autoComplete="postal-code"
              />
              {errors.pincode && touched.pincode && (
                <p className="text-red-600 text-sm mt-1 flex items-center animate-slide-down">
                  <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                  {errors.pincode}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                6-digit Tamil Nadu pincode (starts with 6)
              </p>
            </div>
          </div>

          {/* Address Validation Section */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <button
              type="button"
              onClick={handleValidateAddress}
              disabled={validatingAddress || !formData.district || !formData.pincode}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-semibold"
            >
              {validatingAddress ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Validating Address...</span>
                </>
              ) : (
                <>
                  <MapPin className="w-5 h-5" />
                  <span>Validate Delivery Address</span>
                </>
              )}
            </button>
            
            <p className="text-xs text-gray-500 mt-2">
              Verify if your address is eligible for delivery
            </p>

            {/* Validation Result */}
            {addressValidation && (
              <div className={`mt-4 p-4 rounded-lg flex items-start space-x-3 animate-slide-down ${
                addressValidation.is_valid 
                  ? 'bg-green-50 border-2 border-green-200' 
                  : 'bg-red-50 border-2 border-red-200'
              }`}>
                {console.log("addressValidation",addressValidation)}
                {addressValidation.is_valid ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-green-900 mb-1">
                        ✓ Address Validated Successfully
                      </p>
                      <p className="text-sm text-green-800">
                        {addressValidation.message}
                      </p>
                      <p className="text-xs text-green-700 mt-2">
                        Your order can be delivered to this address
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-red-900 mb-1">
                        Address Validation Failed
                      </p>
                      <p className="text-sm text-red-800">
                        {addressValidation.message}
                      </p>
                      {addressValidation.is_in_state && (
                        <p className="text-xs text-red-700 mt-2 font-semibold">
                          ⚠ We only deliver to addresses within Tamil Nadu
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">
              Important Delivery Information
            </p>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Delivery available only within Tamil Nadu</li>
              <li>• Valid government ID required for age verification (21+)</li>
              <li>• Please ensure someone is available at the delivery address</li>
              <li>• Delivery typically takes 2-3 business days</li>
              <li>• You'll receive SMS/Email updates about your delivery</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-bold text-lg hover:from-red-700 hover:to-red-800 transition shadow-lg active:scale-95 flex items-center justify-center space-x-2"
      >
        <span>Continue to Payment</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Security Note */}
      <p className="text-center text-xs text-gray-500">
        🔒 Your information is secure and encrypted. We respect your privacy and will use 
        your details only for delivery purposes.
      </p>
    </form>
  );
};

export default AddressForm;