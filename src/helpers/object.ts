/**
 * Alias for Object.prototype.hasOwnProperty
 * 
 * @param   obj    The object where the prop will be checked to.
 * @param   prop   The property to be checked in the object.
 * 
 * @return True if prop exists as property in obj.
 */
export function hasProp(obj: unknown, prop: PropertyKey): boolean {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}