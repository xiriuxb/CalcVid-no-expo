import {createContext} from 'react';
import Ventana from '../../../models/ItemsToSell';
import GlassPiece from '../../../models/Item';
import GlassTypeList from '../../../models/ProductsList';

interface ContextTypes {
  listaVentanas: Map<string, Ventana> | null;
  addVentana: () => void;
  addPieceToWindow: (windowId: string, newGlassPiece: GlassPiece) => void;
  removeWindow: (id: string) => void;
  editPieceInWindow: (
    windowId: string,
    glassPieceId: string,
    editedPiece: GlassPiece,
  ) => void;
  deletePiece: (windowId: string, glassPieceId: string) => void;
  totals: {totalArea: number; totalPieces: number; totalPrice: number};
}

const WindowsListContext = createContext<ContextTypes>({
  listaVentanas: null,
  addVentana: () => {},
  addPieceToWindow: () => {},
  removeWindow: () => {},
  editPieceInWindow: () => {},
  deletePiece: () => {},
  totals: {totalArea: 0, totalPieces: 0, totalPrice: 0},
});

export default WindowsListContext;
