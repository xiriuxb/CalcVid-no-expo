import {createContext} from 'react';

interface ProductModalTypes {
  productModalVisible: boolean;
  setProductModalVisible: () => void;
  editProductId: string;
}

export const ProductModalContext = createContext<ProductModalTypes | null>(
  null,
);
