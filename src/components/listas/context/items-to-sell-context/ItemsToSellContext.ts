import {createContext} from 'react';
import {Item, ItemsToSell} from '../../../../models';

interface ContextTypes {
  itemsToSellList: Map<string, ItemsToSell> | null;
  addItemsToSell: () => void;
  addItemToItemsToSell: (windowId: string, newItem: Item) => void;
  removeItemsToSell: (id: string) => void;
  editItemInItemsToSell: (
    itemsToSellId: string,
    itemId: string,
    editedItem: Item,
  ) => void;
  deleteItem: (itemsToSellId: string, itemId: string) => void;
  totals: {totalArea: number; totalItems: number; totalPrice: number};
  reloadTotals: () => void;
}

export const ItemsToSellContext = createContext<ContextTypes>({
  itemsToSellList: null,
  addItemsToSell: () => {},
  addItemToItemsToSell: () => {},
  removeItemsToSell: () => {},
  editItemInItemsToSell: () => {},
  deleteItem: () => {},
  totals: {totalArea: 0, totalItems: 0, totalPrice: 0},
  reloadTotals: () => {},
});
