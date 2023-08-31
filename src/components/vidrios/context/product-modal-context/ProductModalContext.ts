import {createContext} from 'react';

interface ProdModalContextTypes {
  productModalVisible: boolean;
  setProductModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  editProductId: string;
  setEditProductId: (id: string) => void;
}

export const ProductModalContext = createContext<ProdModalContextTypes | null>(
  null,
);
