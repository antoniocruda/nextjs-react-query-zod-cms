/**
 * Format given string to capitalize the first letter
 * of the word
 * 
 * @param   word    The string to be formatted.
 * 
 * @return string
 */
export function capitalize(word: string): string {
    return word[0].toUpperCase() + word.substring(1);
}

/**
 * Extracts the initial letters for the first name and last name of the user.
 * 
 * @param   name    The name of the user which composes of the first name and last name.
 */
export function extractInitials(name: string): string {
    const namePcs = name.split(' ');
    if (namePcs.length === 1 || namePcs[namePcs.length - 1].length === 0) {
        return namePcs[0].charAt(0);
    }
    else if (namePcs.length > 1) {
        return `${namePcs[0].charAt(0)}${namePcs[namePcs.length - 1].charAt(0)}`;
    }

    return '';
}

/**
 * Escape spacial characters from the given string.
 * 
 * @param   str    The string needed to escape.
 */
 export function escapeString(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Format given string to capitalize the first letter
 * of the word
 * 
 * @param   word    The string to be formatted.
 * 
 * @return string
 */
export function ucfirst(word: string): string {
    const text = word.toLowerCase().split('_').map((str) => {
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
    });

    return text.join(' ');
}

/**
 * Generates a random string
 * 
 * @param   length    The length of the generated string
 * 
 * @return string
 */
export function generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);

    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(array[i] % charactersLength);
    }

    return randomString;
}
