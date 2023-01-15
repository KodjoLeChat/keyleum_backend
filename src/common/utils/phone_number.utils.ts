export class PhoneNumberUtils {
  static isValidPhoneNumber(phone: string): boolean {
    // Regular expression for vérify the international format
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return phoneRegex.test(phone);
  }
}
