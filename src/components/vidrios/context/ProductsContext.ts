import {createContext} from 'react';
import Product from '../../../models/Product';
import ProductList from '../../../models/ProductsList';

export interface ContextTypes {
  productsList: ProductList | null;
  addProduct: (newProduct: Product) => void;
  updateProduct: (productId: string, newProduct: Product) => void;
  deleteProduct: (productId: string) => void;
}

const ProductsContext = createContext<ContextTypes | null>(null);

export default ProductsContext;
