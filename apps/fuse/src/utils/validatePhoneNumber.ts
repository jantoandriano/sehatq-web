export function validatePhoneNumber(phoneNumber: string): boolean {
  const re = /^(\+{0,1}62|0)8\d{8,12}$/;
  return re.test(phoneNumber);
}
