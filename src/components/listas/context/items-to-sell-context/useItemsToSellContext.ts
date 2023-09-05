import {useContext} from 'react';
import {ItemsToSellContext} from './ItemsToSellContext';
export const useItemsToSellContext = () => {
  const context = useContext(ItemsToSellContext);
  if (!context) {
    throw new Error('useItemsToSell must be used within a Provider');
  }
  return context;
};
