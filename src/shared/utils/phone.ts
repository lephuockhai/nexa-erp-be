export const validatePhone = (phone: string): boolean => {
  const regex = /^(((\+84|84|0084){1})|0)(3|5|7|8|9)+([0,9]{8})$/;
  return regex.test(phone);
};
