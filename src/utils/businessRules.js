export const MAX_COMPARE = 3;
export const DELIVERY_FEE = 250;
export const FREE_DELIVERY_THRESHOLD = 200000;
export const MAX_PER_ORDER = 5;

export function validateQuantity(quantity, stock) {
    if (!Number.isInteger(quantity) || quantity < 1) return { valid: false, message: "Quantity must be at least 1." };
    if (quantity > MAX_PER_ORDER) return { valid: false, message: `You can order at most ${MAX_PER_ORDER} units of one phone.` };
    if (quantity > stock) return { valid: false, message: `Only ${stock} unit(s) are currently available.` };
    return { valid: true, message: "" };
}
export function calculateOrder(subtotal) {
    const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
    return { subtotal, delivery, total: subtotal + delivery };
}
export function canCompare(items) {
    return items.length <= MAX_COMPARE;
}
