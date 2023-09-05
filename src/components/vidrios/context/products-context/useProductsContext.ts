import {useContext} from 'react';
import {ProductsContext} from './ProductsContext';

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  const addProduct = context!.addProduct;
  const deleteProduct = context!.deleteProduct;
  const productsList = context!.productsList;
  const updateProduct = context!.updateProduct;
  const errorAtLoadingProducts = context!.errorAtLoadingProducts;
  if (!context) {
    throw new Error(
      'useProductsContext must be used within a SnackBarProvider',
    );
  }
  return {addProduct, deleteProduct, productsList, updateProduct, errorAtLoadingProducts};
};
