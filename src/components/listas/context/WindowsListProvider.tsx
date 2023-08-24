import {useState, useEffect} from 'react';
import Ventana from '../../../models/Ventana';
import WindowsListContext from './WindowsListContext';
import GlassPiece from '../../../models/GlassPiece';

const WindowsListProvider = ({children}: {children: React.ReactNode}) => {
  const [listaVentanas, setListaVentanas] = useState<Map<string, Ventana>>(
    new Map(),
  );
  const [totals, setTotals] = useState({
    totalArea: 0,
    totalPieces: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    totalSums();
  }, [listaVentanas]);

  const addVentana = () => {
    const newMap = new Map(listaVentanas);
    const newVentana = new Ventana(`Ventana ${listaVentanas.size + 1}`, []);
    newMap.set(newVentana.id, newVentana);
    setListaVentanas(newMap);
  };

  const removeWindow = (id: string) => {
    const newMap = new Map(listaVentanas);
    newMap.delete(id);
    setListaVentanas(newMap);
  };

  const totalSums = () => {
    let sumArea: number = 0;
    let sumPrice: number = 0;
    let sumPieces: number = 0;
    listaVentanas.forEach((vent: Ventana) => {
      sumArea += vent.totalArea();
      sumPieces += vent.totalGlasses();
      sumPrice += vent.totalPriceA();
    });
    setTotals({
      totalArea: sumArea,
      totalPieces: sumPieces,
      totalPrice: sumPrice,
    });
  };

  const addPieceToWindow = (windowId: string, newGlassPiece: GlassPiece) => {
    const window = listaVentanas.get(windowId);
    window?.setGlassPieces([...window.glassPieces, newGlassPiece]);
    const newMap = new Map(listaVentanas);
    newMap.set(windowId, window!);
    setListaVentanas(newMap);
  };

  const editPieceInWindow = (
    windowId: string,
    glassPieceId: string,
    editedPiece: GlassPiece,
  ) => {
    const window = listaVentanas.get(windowId);
    const newWindow = window!.editGlassPiece(
      glassPieceId,
      editedPiece.width,
      editedPiece.height,
      editedPiece.quantity,
      editedPiece.glassType,
    );
    const newMap = new Map(listaVentanas);
    newMap.set(windowId, newWindow);
    setListaVentanas(newMap);
  };

  const deletePiece = (windowId: string, glassPieceId: string) => {
    const window = listaVentanas.get(windowId);
    const newWindow = window!.deleteGlassPiece(glassPieceId);
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
        addPieceToWindow,
        editPieceInWindow,
        deletePiece,
      }}>
      {children}
    </WindowsListContext.Provider>
  );
};

export default WindowsListProvider;
