import {createContext} from 'react';
import ItemsToSell from '../../../models/ItemsToSell';
import Item from '../../../models/Item';

interface ContextTypes {
  itemsToSellList: Map<string, ItemsToSell> | null;
  addItemsToSell: () => void;
  addItemToItemsToSell: (windowId: string, newGlassPiece: Item) => void;
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

const ItemsToSellListContext = createContext<ContextTypes>({
  itemsToSellList: null,
  addItemsToSell: () => {},
  addItemToItemsToSell: () => {},
  removeItemsToSell: () => {},
  editItemInItemsToSell: () => {},
  deleteItem: () => {},
  totals: {totalArea: 0, totalItems: 0, totalPrice: 0},
  reloadTotals: () => {},
});

export default ItemsToSellListContext;
