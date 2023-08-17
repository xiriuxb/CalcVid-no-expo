import {useState, useEffect} from 'react';
import Ventana from '../../../models/Ventana';
import WindowsListContext from './WindowsListContext';
import GlassPiece from '../../../models/GlassPiece';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Vidrio from '../../../models/Vidrio';

const WindowsListProvider = ({children}: {children: React.ReactNode}) => {
  const [listaVentanas, setListaVentanas] = useState([
    new Ventana('Ventana 1', []),
  ]);
  const [totals, setTotals] = useState({
    totalArea: 0,
    totalPieces: 0,
    totalPrice: 0,
  });
  const [selectedWindow, setSelectedWindow] = useState('');
  const [listaVidrios, setListaVidrios] = useState<Vidrio[] | []>([]);

  useEffect(() => {
    totalSums();
  }, [listaVentanas]);

  useEffect(() => {
    console.log('List de vidrios cargada');
    loadListaVidrios();
  }, []);

  const loadListaVidrios = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        setListaVidrios(JSON.parse(storedProducts));
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const addVentana = () => {
    setListaVentanas([
      ...listaVentanas,
      new Ventana(`Ventana ${listaVentanas.length + 1}`, []),
    ]);
  };

  const removeWindow = (id: string) => {
    const removed = listaVentanas.filter((window: Ventana) => window.id != id);
    setListaVentanas(removed);
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

  const addPieceToWindow = (newGlassPiece: GlassPiece) => {
    const updated = listaVentanas.map((window: Ventana) => {
      if (window.id === selectedWindow) {
        window.setGlassPieces([...window.glassPieces, newGlassPiece]);
      }
      return window;
    });
    setListaVentanas(updated);
  };

  return (
    <WindowsListContext.Provider
      value={{
        listaVentanas,
        setListaVentanas,
        addVentana,
        totals,
        removeWindow,
        addPieceToWindow,
        selectedWindow,
        setSelectedWindow,
        listaVidrios,
        setListaVidrios,
      }}>
      {children}
    </WindowsListContext.Provider>
  );
};

export default WindowsListProvider;
