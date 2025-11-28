import express from 'express';
import { products } from '../data/product.js';
export const productsRouter = express.Router();

productsRouter.get('/',  (req, res) => {
  res.status(200).json({ 
    success: true,
    message: 'Products fetched successfully',
    data: products
  });
});

export default productsRouter;