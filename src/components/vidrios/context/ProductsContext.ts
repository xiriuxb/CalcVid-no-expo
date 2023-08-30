import {createContext} from 'react';
import {Product, ProductsList} from '../../../models';

export interface ContextTypes {
  productsList: ProductsList | null;
  addProduct: (newProduct: Product) => void;
  updateProduct: (productId: string, newProduct: Product) => void;
  deleteProduct: (productId: string) => void;
}

export const ProductsContext = createContext<ContextTypes | null>(null);
