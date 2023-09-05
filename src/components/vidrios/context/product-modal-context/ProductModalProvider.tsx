import {useState, useRef} from 'react';
import {ProductModalContext} from './ProductModalContext';

export const ProductModalProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [productModalVisible, setProductModalVisible] = useState(false);
  const editProductId = useRef('');

  const setEditProductId = (id: string) => {
    editProductId.current = id;
  };

  return (
    <ProductModalContext.Provider
      value={{
        productModalVisible,
        setProductModalVisible,
        editProductId: editProductId.current,
        setEditProductId,
      }}>
      {children}
    </ProductModalContext.Provider>
  );
};
