import {useContext} from 'react';
import {ProductsContext} from './ProductsContext';

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  const productsMap = context!.productsMap;
  const errorAtLoadingProducts = context!.errorAtLoadingProducts;
  const productListCrudOptions = context!.productListCrudOptions;
  if (!context) {
    throw new Error(
      'useProductsContext must be used within a SnackBarProvider',
    );
  }
  return { productsMap, errorAtLoadingProducts, productListCrudOptions};
};
