import { api } from "../../api/api";
import { setProducts } from "../slices/productsSlice";

export const getProducts = () => async(dispatch)=>{
    try {
        const response = await api.get('/products');
        dispatch(setProducts(response.data.data));
        console.log(response.data.data);
    } catch (error) {
        console.log(error);
    }
}