import {createContext} from 'react';
import GlassTypeList from '../../../models/ProductsList';
import Vidrio from '../../../models/Product';

export interface ContextTypes {
  listaVidrios: GlassTypeList | null;
  addGlassType: (newGlass: Vidrio) => void;
  updateGlassType: (glassId: string, newGlass: Vidrio) => void;
  deleteGlassType: (glassId: string) => void;
}

const GlassTypesContext = createContext<ContextTypes | null>(null);

export default GlassTypesContext;
