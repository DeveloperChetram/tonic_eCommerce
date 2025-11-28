export let cart = [];

let lastClearTime = Date.now();

export const addToCart = (product) => {
    const now = Date.now();
    // 24 hours = 24 * 60 * 60 * 1000 milliseconds = 86400000 ms
    if (now - lastClearTime > 86400000) {
        cart.length = 0; // Clear cart
        lastClearTime = now;
    }

    let existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    return cart;
}

export const clearCart = () => {
    cart = [];
    return cart;
}