import {useState, useEffect, memo} from 'react';
import {ItemsToSellContext} from './ItemsToSellContext';
import {Item, ItemsToSell, CreateItemNoProdDto} from '../../../../models';
import {useProductsContext} from '../../../vidrios/context/products-context';

const itemsListHasItem = (
  itemsList: ItemsToSell,
  productdto: CreateItemNoProdDto,
) => {
  const element = Array.from(itemsList.items.values()).find(el => {
    return (
      el.product.id == productdto.productId &&
      (el.height == productdto.height || el.height == productdto.width || !productdto.height) &&
      (el.width == productdto.width || el.width == productdto.height || !productdto.width)
    );
  });
  console.log('elemento', element);
  return element ? element : undefined;
};

export const ItemsToSellListProvider = memo(({
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
      const itemExist = itemsListHasItem(itemsToSell, dto);
      if (itemExist) {
        editItemInItemsToSell(itemsToSellId, itemExist.id, {
          ...dto,
          quantity: itemExist.quantity + dto.quantity,
        });
        return;
      }
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
    if (newName.trim().length > 16 || newName.trim().length < 1) {
      throw new Error('Invalid name');
    }
    const itemsToSell = itemsToSellList.get(itemsToSellId);
    if (!itemsToSell) {
      throw new Error('List does not exist');
    }
    itemsToSell.setName(newName);
    const newList = itemsToSellList.set(itemsToSellId, itemsToSell);
    setItemsToSellList(new Map(newList));
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
});
