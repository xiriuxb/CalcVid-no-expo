import {createContext} from 'react';
import {CreateItemNoProdDto, Item, ItemsToSell} from '../../../../models';

interface ContextTypes {
  itemsToSellList: Map<string, ItemsToSell> | null;
  addItemsToSell: () => void;
  addItemToItemsToSell: (windowId: string, newItem: CreateItemNoProdDto) => void;
  removeItemsToSell: (id: string) => void;
  editItemInItemsToSell: (
    itemsToSellId: string,
    itemId: string,
    editedItem: CreateItemNoProdDto,
  ) => void;
  deleteItem: (itemsToSellId: string, itemId: string) => void;
  totals: {totalArea: number; totalItems: number; totalPrice: number};
  reloadTotals: () => void;
  updateItemsListName:(itemsToSellId: string, newName: string)=>void;
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
  updateItemsListName:()=>{}
});
