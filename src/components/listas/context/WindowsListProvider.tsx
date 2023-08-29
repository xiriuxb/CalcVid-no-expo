import {useState, useEffect} from 'react';
import ItemsToSell from '../../../models/ItemsToSell';
import WindowsListContext from './WindowsListContext';
import Item from '../../../models/Item';

const WindowsListProvider = ({children}: {children: React.ReactNode}) => {
  const [listaVentanas, setListaVentanas] = useState<Map<string, ItemsToSell>>(
    new Map(),
  );
  const [totals, setTotals] = useState({
    totalArea: 0,
    totalPieces: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    console.log('totals');
    totalSums();
  }, [listaVentanas]);

  const addVentana = () => {
    const newMap = new Map(listaVentanas);
    const newVentana = new ItemsToSell(
      `Ventana ${listaVentanas.size + 1}`,
      new Map(),
    );
    newMap.set(newVentana.id, newVentana);
    setListaVentanas(newMap);
  };

  const removeWindow = (id: string) => {
    const newMap = new Map(listaVentanas);
    newMap.delete(id);
    setListaVentanas(newMap);
  };

  const totalSums = () => {
    const itemsInList = Array.from(listaVentanas.values());
    const totals = itemsInList.reduce(
      (totals, vent) => {
        totals.totalArea += vent.totalArea();
        totals.totalPieces += vent.totalItems();
        totals.totalPrice += vent.totalPrice();
        return totals;
      },
      {totalArea: 0, totalPieces: 0, totalPrice: 0},
    );
    setTotals(totals);
  };

  const addPieceToWindow = (windowId: string, newGlassPiece: Item) => {
    const window = listaVentanas.get(windowId);
    window?.setItemsToSell(window.items.set(newGlassPiece.id, newGlassPiece));
    const newMap = new Map(listaVentanas);
    newMap.set(windowId, window!);
    setListaVentanas(newMap);
  };

  const editPieceInWindow = (
    windowId: string,
    glassPieceId: string,
    editedPiece: Item,
  ) => {
    const window = listaVentanas.get(windowId);
    const newWindow = window!.editItem(
      glassPieceId,
      editedPiece.width,
      editedPiece.height,
      editedPiece.quantity,
      editedPiece.product,
    );
    const newMap = new Map(listaVentanas);
    newMap.set(windowId, newWindow);
    setListaVentanas(newMap);
  };

  const deletePiece = (windowId: string, glassPieceId: string) => {
    const window = listaVentanas.get(windowId);
    const newWindow = window!.deleteItem(glassPieceId);
    const newMap = new Map(listaVentanas);
    newMap.set(windowId, newWindow);
    setListaVentanas(newMap);
  };

  return (
    <WindowsListContext.Provider
      value={{
        listaVentanas,
        addVentana,
        removeWindow,
        totals,
        reloadTotals: totalSums,
        addPieceToWindow,
        editPieceInWindow,
        deletePiece,
      }}>
      {children}
    </WindowsListContext.Provider>
  );
};

export default WindowsListProvider;
