import express from 'express';
import { cart } from '../data/cart.js';
import { addToCart } from '../data/cart.js';
import { clearCart } from '../data/cart.js';
export const cartRouter = express.Router();

cartRouter.post('/', (req, res) => {
    try {
        const {
            id,
            name,
            price,
            description,
            image,
            category,
            rating,
            origin,

            quantity = 1
        } = req.body

        const product = {
            id,
            name,
            price,
            description,
            image,
            category,
            rating,
            origin,
            quantity
        }

        console.log(product)

        const updatedCart = addToCart(product)
        console.log('updatedCart', updatedCart)

        res.status(200).json({
            success: true,
            message: 'Product added successfully',
            addedProduct: product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add product',
            error: error.message,
        });
    }
});

cartRouter.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Cart fetched successfully',
        data: cart,
        status: 'success'
    });
});

cartRouter.delete('/', (req, res) => {
    clearCart();
    res.status(200).json({
        success: true,
        message: 'Cart cleared successfully',
        data: cart,
        status: 'success'
    });
});
