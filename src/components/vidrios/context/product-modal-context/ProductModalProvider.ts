import {useState, useRef} from 'react';

export const ProductModalProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [productModalVisible, setProductModalVisible] = useState(false);
  const editProductId = useRef('');
  return;
};
