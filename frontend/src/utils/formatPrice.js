export const formatPrice = (price, currency = 'USD') => {
  if (currency === 'INR') {
    return `Rs. ${price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  }
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
  });
};
