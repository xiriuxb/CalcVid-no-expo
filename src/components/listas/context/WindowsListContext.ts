import {createContext} from 'react';
import Ventana from '../../../models/Ventana';
import GlassPiece from '../../../models/GlassPiece';
import Vidrio from '../../../models/Vidrio';

interface ContextTypes {
  listaVentanas: Ventana[];
  setListaVentanas: React.Dispatch<React.SetStateAction<Ventana[]>> | null;
  addVentana: () => void;
  totals: {totalArea: number; totalPieces: number; totalPrice: number};
  removeWindow: (id: string) => void;
  addPieceToWindow: (newGlassPiece: GlassPiece) => void;
  selectedWindow: string;
  setSelectedWindow: React.Dispatch<React.SetStateAction<string>> | null;
  listaVidrios: Vidrio[] | [];
  setListaVidrios: React.Dispatch<React.SetStateAction<Vidrio[]>> | null;
}

const WindowsListContext = createContext<ContextTypes>({
  listaVentanas: [new Ventana('Ventana 0', [])],
  setListaVentanas: null,
  addVentana: () => {},
  totals: {totalArea: 0, totalPieces: 0, totalPrice: 0},
  removeWindow: () => {},
  addPieceToWindow: () => {},
  selectedWindow: '',
  setSelectedWindow: null,
  listaVidrios: [],
  setListaVidrios: null,
});

export default WindowsListContext;
