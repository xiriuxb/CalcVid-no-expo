import {useState, useEffect, useRef} from 'react';
import GlassTypesContext from './GlassTypesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Vidrio from '../../../models/Product';
import GlassTypeList from '../../../models/ProductsList';

const GlassTypesProvider = ({children}: {children: React.ReactNode}) => {
  const [listaVidrios, setListaVidrios] = useState<Map<string, Vidrio>>(
    new Map(),
  );

  const listaClass = useRef(new GlassTypeList(listaVidrios));

  useEffect(() => {
    loadListaVidrios();
  }, []);

  const loadListaVidrios = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        const deserializedArray = JSON.parse(storedProducts);
        const reconstructedMap = new Map<string, Vidrio>(deserializedArray);
        listaClass.current = new GlassTypeList(reconstructedMap);
        setListaVidrios(reconstructedMap);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const storeProducts = async (map: Map<string, Vidrio>) => {
    const mapAsArray = Array.from(map.entries());
    try {
      await AsyncStorage.setItem('products', JSON.stringify(mapAsArray));
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const addGlassType = (newGlassType: Vidrio) => {
    const updatedList = listaClass.current.addProduct(newGlassType);
    setListaVidrios(updatedList);
    storeProducts(updatedList);
  };

  const updateGlassType = (id: string, newGlassType: Vidrio) => {
    const updatedList = listaClass.current.updateProduct(id, newGlassType);
    setListaVidrios(updatedList);
    storeProducts(updatedList);
  };

  const deleteGlassType = (id: string) => {
    const updatedList = listaClass.current.deleteProduct(id);
    setListaVidrios(updatedList);
    storeProducts(updatedList);
  };

  return (
    <GlassTypesContext.Provider
      value={{
        listaVidrios: listaClass.current,
        addGlassType,
        updateGlassType,
        deleteGlassType,
      }}>
      {children}
    </GlassTypesContext.Provider>
  );
};

export default GlassTypesProvider;
