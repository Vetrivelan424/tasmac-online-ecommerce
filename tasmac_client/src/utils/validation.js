export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  return re.test(phone);
};

export const validatePincode = (pincode) => {
  const re = /^[6][0-4]\d{4}$/;
  return re.test(pincode);
};

export const validateName = (name) => {
  return name && name.trim().length >= 3;
};

export const validateAddress = (address) => {
  return address && address.trim().length >= 5;
};

export const validateForm = (formData) => {
  const errors = {};

  if (!validateName(formData.name)) {
    errors.name = 'Name must be at least 3 characters';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid 10-digit mobile number';
  }

  if (!validateAddress(formData.street)) {
    errors.street = 'Address must be at least 5 characters';
  }

  if (!formData.city || formData.city.trim().length === 0) {
    errors.city = 'City is required';
  }

  if (!formData.district || formData.district.trim().length === 0) {
    errors.district = 'Please select a district';
  }

  if (!validatePincode(formData.pincode)) {
    errors.pincode = 'Please enter a valid Tamil Nadu pincode';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const TAMIL_NADU_DISTRICTS = [
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
  'Tirunelveli', 'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi',
  'Dindigul', 'Thanjavur', 'Ranipet', 'Sivaganga', 'Karur',
  'Kanchipuram', 'Tiruvannamalai', 'Krishnagiri', 'Namakkal',
  'Cuddalore', 'Virudhunagar', 'Ramanathapuram', 'Tirupattur',
  'Perambalur', 'Ariyalur', 'Kallakurichi', 'Nilgiris',
  'Pudukkottai', 'Nagapattinam', 'Viluppuram', 'Dharmapuri',
  'Kanyakumari', 'Mayiladuthurai', 'Tenkasi', 'Theni', 'Chengalpattu'
];

export const PRODUCT_CATEGORIES = [
  'All', 'Whisky', 'Rum', 'Brandy', 'Vodka', 'Gin', 'Beer', 'Wine'
];

export const PAYMENT_METHODS = [
  { value: 'COD', label: 'Cash on Delivery' },
  { value: 'Card', label: 'Credit/Debit Card' },
  { value: 'UPI', label: 'UPI Payment' }
];
