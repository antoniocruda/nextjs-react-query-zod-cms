/**
 * Validates if the given email string is valid.
 * 
 * @param   email   The email string to test
 * 
 * @return True if email is valid and false otherwise.
 */
export function validateEmail(email: string) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
}

/**
 * Validates if the given mobile number string is valid.
 * 
 * @param   mobileNumber   The mobile number string to test
 * 
 * @return True if mobile number is valid and false otherwise.
 */
export function validateMobileNumber(mobileNumber: string) {
    return (/^\+?\d{2,15}$/.test(mobileNumber));
}
