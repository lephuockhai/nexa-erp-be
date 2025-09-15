export const generateOTP = (lengOTP: number): string => {
  const digits = '123456789';
  let otp = '';
  for (let i = 0; i < lengOTP; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
};
