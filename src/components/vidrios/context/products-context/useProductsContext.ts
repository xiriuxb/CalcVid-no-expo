import {useContext} from 'react';
import {ProductsContext} from './ProductsContext';

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  const productsList = context!.productsList;
  const errorAtLoadingProducts = context!.errorAtLoadingProducts;
  const productListCrudOptions = context!.productListCrudOptions;
  if (!context) {
    throw new Error(
      'useProductsContext must be used within a SnackBarProvider',
    );
  }
  return { productsList, errorAtLoadingProducts, productListCrudOptions};
};
