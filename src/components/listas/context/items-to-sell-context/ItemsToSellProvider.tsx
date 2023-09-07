import {useState, useEffect} from 'react';
import {ItemsToSellContext} from './ItemsToSellContext';
import {Item, ItemsToSell, CreateItemNoProdDto} from '../../../../models';
import {useProductsContext} from '../../../vidrios/context/products-context';

export const ItemsToSellListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [itemsToSellList, setItemsToSellList] = useState<
    Map<string, ItemsToSell>
  >(new Map());
  const [totals, setTotals] = useState({
    totalArea: 0,
    totalItems: 0,
    totalPrice: 0,
  });

  const {productsList} = useProductsContext();

  useEffect(() => {
    totalSums();
  }, [itemsToSellList]);

  const addItemsToSell = () => {
    const newItemsToSell = new ItemsToSell(
      `Lista ${itemsToSellList.size + 1}`,
      new Map(),
    );
    itemsToSellList.set(newItemsToSell.id, newItemsToSell);
    setItemsToSellList(new Map(itemsToSellList));
  };

  const removeItemsToSell = (id: string) => {
    itemsToSellList.delete(id);
    setItemsToSellList(new Map(itemsToSellList));
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

  const getItemsList = (id: string) => {
    const itemsToSell = itemsToSellList.get(id);
    if (!itemsToSell) {
      throw new Error('Lista de items no existe.');
    }
    return itemsToSell;
  };

  const addItemToItemsToSell = (
    itemsToSellId: string,
    dto: CreateItemNoProdDto,
  ) => {
    try {
      const itemsToSell = getItemsList(itemsToSellId);
      const product = productsList.getProduct(dto.productId);
      const newItem = new Item(product, dto.quantity, dto.height, dto.width);
      itemsToSell.items.set(newItem.id, newItem);
      itemsToSellList.set(itemsToSellId, itemsToSell);
      setItemsToSellList(new Map(itemsToSellList));
    } catch (e) {
      console.log(e);
    }
  };

  const editItemInItemsToSell = (
    itemsToSellId: string,
    itemId: string,
    dto: CreateItemNoProdDto,
  ) => {
    try {
      const itemsToSell = getItemsList(itemsToSellId);
      const product = productsList.getProduct(dto.productId);
      itemsToSell.editItem(
        itemId,
        product,
        dto.quantity,
        dto.width,
        dto.height,
      );
      itemsToSellList.set(itemsToSellId, itemsToSell);
      setItemsToSellList(new Map(itemsToSellList));
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = (itemsToSellId: string, itemId: string) => {
    const itemsToSell = itemsToSellList.get(itemsToSellId);
    const newItemsToSell = itemsToSell!.deleteItem(itemId);
    const newMap = new Map(itemsToSellList);
    newMap.set(itemsToSellId, newItemsToSell);
    setItemsToSellList(newMap);
  };

  const updateItemsListName = (itemsToSellId: string, newName: string) => {
    const itemsToSell = itemsToSellList.get(itemsToSellId);
    if (itemsToSell) {
      itemsToSell.setName(newName);
      const newList = itemsToSellList.set(itemsToSellId, itemsToSell);
      setItemsToSellList(new Map(newList));
    } else {
      console.error('no existe');
    }
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
        updateItemsListName,
      }}>
      {children}
    </ItemsToSellContext.Provider>
  );
};
