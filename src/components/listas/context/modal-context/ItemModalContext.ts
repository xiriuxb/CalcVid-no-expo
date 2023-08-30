import {createContext} from 'react';

interface ContextTypes {
  itemModalVisible: boolean;
  setItemModalVisible: (visible: boolean, currentWindowId?: string) => void;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  itemId: string;
  setItemId: (id: string) => void;
  itemsToSellId: string;
}

export const ItemModalContext = createContext<ContextTypes>({
  itemModalVisible: false,
  setItemModalVisible: () => {},
  editMode: false,
  setEditMode: () => {},
  itemId: '',
  setItemId: () => {},
  itemsToSellId: '',
});
