import express from 'express';
import { productsRouter } from './routes/products.routes.js';
import { cartRouter } from './routes/cart.routes.js';
import cors from 'cors';


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors('http://localhost:5173'));

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});