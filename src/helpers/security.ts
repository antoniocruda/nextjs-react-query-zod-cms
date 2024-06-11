export function generateSecurePassword(length: number) {
    const allowsChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*_+=?<>';

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    let generatedPassword = '';
    for (let i = 0; i < length; i += 1) {
        const idx = array[i] % allowsChars.length;
        generatedPassword += allowsChars[idx]; 
    }

    return generatedPassword;
}

export function randomNumberBetween(min: number, max: number) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);

    return min + (array[0] % (max - min));
}