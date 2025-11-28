import { api } from "../../api/api";
import { setProducts, setCart } from "../slices/productsSlice";

export const getProducts = () => async(dispatch)=>{
    try {
        const response = await api.get('/products');
        dispatch(setProducts(response.data.data));
        // console.log(response.data.data);
    } catch (error) {
        console.log(error);
    }
}

export const addToCart = (product) => async(dispatch)=>{
    try {
        const response = await api.post('/cart', product);
        console.log('response', response.data);
        dispatch(setCart(response.data.data));
        // console.log(response.data.data);
    } catch (error) {
        console.log(error);
    }
}

export const getCart = () => async(dispatch)=>{
    try {
        const response = await api.get('/cart');
        dispatch(setCart(response.data.data));
        console.log('response', response.data.data);
        // console.log(response.data.data);
    } catch (error) {
        console.log(error);
    }
}

export const updateCart = (data) => async(dispatch)=>{
    try {
        // console.log('data', data);
        const response = await api.post(`/cart`, data);
        dispatch(setCart(response.data.data));
        console.log('updated cart response', response);
    } catch (error) {
        console.log(error);
    }
}