import {useContext} from 'react';
import {ItemModalContext} from './ItemModalContext';

export const useItemModalContext = () => {
  const context = useContext(ItemModalContext);
  if (!context) {
    throw new Error('useItemModal must be used within a SnackBarProvider');
  }
  return context;
};
