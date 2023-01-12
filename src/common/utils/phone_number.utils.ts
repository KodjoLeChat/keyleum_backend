export class PhoneNumberUtils {
  static isValidPhoneNumberForChad(phoneNumber: string): boolean {
    const phoneNumberRegex = /^\+235[0-9]{8,10}$/;
    return phoneNumberRegex.test(phoneNumber);
  }
}
