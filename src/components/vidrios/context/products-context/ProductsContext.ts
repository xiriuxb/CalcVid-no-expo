import {createContext} from 'react';
import {Product, ProductsList} from '../../../../models';

export interface ContextTypes {
  productsMap: ProductsList;
  productListCrudOptions: (
    crudFunc: 'added' | 'changed' | 'deleted',
    id: string | undefined,
    newProduct: Product | undefined,
  ) => void;
  errorAtLoadingProducts: boolean;
}

export const ProductsContext = createContext<ContextTypes | null>(null);
