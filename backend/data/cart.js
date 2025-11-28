export let cart = [];

export const addToCart = (product) => {
    let existing = cart.find(item => item.id === product.id);
    // console.log('existing', existing)

    if (existing) {
        existing.quantity += product.quantity;
        // console.log('cart', cart)
    } else {
        cart.push(product);
    }

    return cart;
}

export const clearCart = () => {
    cart = [];
    return cart;
}