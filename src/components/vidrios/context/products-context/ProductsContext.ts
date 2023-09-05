import {createContext} from 'react';
import {Product, ProductsList} from '../../../../models';

export interface ContextTypes {
  productsList: ProductsList;
  addProduct: (newProduct: Product) => void;
  updateProduct: (productId: string, newProduct: Product) => void;
  deleteProduct: (productId: string) => void;
  errorAtLoadingProducts: boolean;
}

export const ProductsContext = createContext<ContextTypes | null>(null);
