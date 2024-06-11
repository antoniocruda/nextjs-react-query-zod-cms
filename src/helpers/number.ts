/**
 * Format given number as currency with the peso sign
 * 
 * @param   value   The number to be formatted.
 * 
 * @return string
 */
export function numToPeso(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
    }).format(value);
}
