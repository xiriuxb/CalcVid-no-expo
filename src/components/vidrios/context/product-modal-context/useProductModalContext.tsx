import {useContext} from 'react';
import {ProductModalContext} from './ProductModalContext';

export const useProductModalContext = () => {
  const context = useContext(ProductModalContext);
  if (!context) {
    throw new Error('useProductModalContext must be used within a Provider');
  }
  const editProductId = context.editProductId;
  const productModalVisible = context.productModalVisible;
  const setProductModalVisible = context.setProductModalVisible;
  const setEditProductId = context.setEditProductId;
  return {
    productModalVisible,
    setProductModalVisible,
    editProductId,
    setEditProductId,
  };
};
