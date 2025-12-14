export const formatCurrency = (amount) => {
  return `₹${parseFloat(amount).toFixed(2)}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

export const generateOrderNumber = () => {
  const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const random = Math.random().toString(36).substr(2, 9).toUpperCase();
  return `ORD-${date}-${random}`;
};

export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

export const calculateCartItemCount = (cartItems) => {
  return cartItems.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
};