import {useState, useEffect} from 'react';
import ItemsToSell from '../../../../models/ItemsToSell';
import ItemsToSellContext from './ItemsToSellContext';
import Item from '../../../../models/Item';

const ItemsToSellListProvider = ({children}: {children: React.ReactNode}) => {
  const [itemsToSellList, setItemsToSellList] = useState<
    Map<string, ItemsToSell>
  >(new Map());
  const [totals, setTotals] = useState({
    totalArea: 0,
    totalItems: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    totalSums();
  }, [itemsToSellList]);

  const addItemsToSell = () => {
    const newMap = new Map(itemsToSellList);
    const newItemsToSell = new ItemsToSell(
      `Ventana ${itemsToSellList.size + 1}`,
      new Map(),
    );
    newMap.set(newItemsToSell.id, newItemsToSell);
    setItemsToSellList(newMap);
  };

  const removeItemsToSell = (id: string) => {
    const newMap = new Map(itemsToSellList);
    newMap.delete(id);
    setItemsToSellList(newMap);
  };

  const totalSums = () => {
    const itemsInList = Array.from(itemsToSellList.values());
    const totals = itemsInList.reduce(
      (totals, vent) => {
        totals.totalArea += vent.totalArea();
        totals.totalItems += vent.totalItems();
        totals.totalPrice += vent.totalPrice();
        return totals;
      },
      {totalArea: 0, totalItems: 0, totalPrice: 0},
    );
    setTotals(totals);
  };

  const addItemToItemsToSell = (itemsToSellId: string, newItem: Item) => {
    const itemsToSell = itemsToSellList.get(itemsToSellId);
    itemsToSell?.setItemsToSell(itemsToSell.items.set(newItem.id, newItem));
    const newMap = new Map(itemsToSellList);
    newMap.set(itemsToSellId, itemsToSell!);
    setItemsToSellList(newMap);
  };

  const editItemInItemsToSell = (
    itemsToSellId: string,
    itemId: string,
    editedItem: Item,
  ) => {
    const itemsToSell = itemsToSellList.get(itemsToSellId);
    const newItemsToSell = itemsToSell!.editItem(
      itemId,
      editedItem.width,
      editedItem.height,
      editedItem.quantity,
      editedItem.product,
    );
    const newMap = new Map(itemsToSellList);
    newMap.set(itemsToSellId, newItemsToSell);
    setItemsToSellList(newMap);
  };

  const deleteItem = (itemsToSellId: string, itemId: string) => {
    const itemsToSell = itemsToSellList.get(itemsToSellId);
    const newItemsToSell = itemsToSell!.deleteItem(itemId);
    const newMap = new Map(itemsToSellList);
    newMap.set(itemsToSellId, newItemsToSell);
    setItemsToSellList(newMap);
  };

  return (
    <ItemsToSellContext.Provider
      value={{
        itemsToSellList,
        addItemsToSell,
        removeItemsToSell,
        totals,
        reloadTotals: totalSums,
        addItemToItemsToSell,
        editItemInItemsToSell,
        deleteItem,
      }}>
      {children}
    </ItemsToSellContext.Provider>
  );
};

export default ItemsToSellListProvider;
