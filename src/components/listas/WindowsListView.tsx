import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TopStatus} from './TopStatus';
import WindowDetailComponent from './WindowDetailComponent';
import {ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import Ventana from '../../models/Ventana';
import AddGlassPieceModal from './AddGlassPieceModal';
import GlassPiece from '../../models/GlassPiece';

const ListaView = () => {
  const [listaVentanas, setListaVentanas] = useState([
    new Ventana('Ventana 1', []),
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [listaVidrios, setListaVidrios] = useState([]);
  const [selectedWindow, setSelectedWindow] = useState<Ventana>();

  useEffect(() => {
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

  const totalSums = () => {
    let sumArea: number = 0;
    let sumPrice: number = 0;
    let sumPieces: number = 0;
    listaVentanas.forEach((vent: Ventana) => {
      sumArea += vent.totalArea();
      sumPieces += vent.totalGlasses();
      sumPrice += vent.totalPriceA();
    });
    return {sumArea, sumPieces, sumPrice};
  };

  const addPieceToWindow = (newGlassPiece: GlassPiece) => {
    selectedWindow?.setGlassPieces([
      ...selectedWindow.glassPieces,
      newGlassPiece,
    ]);
    const updatedWindows = listaVentanas.map(el => {
      return el;
    }); //This is for update the WindowDetailComponent
    setListaVentanas(updatedWindows);
  };

  const changeModalVisible = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const addVentana = () => {
    setListaVentanas([
      ...listaVentanas,
      new Ventana(`Ventana ${listaVentanas.length + 1}`, []),
    ]);
  };
  return (
    <View>
      <TopStatus
        totalGlassPieces={totalSums().sumPieces}
        totalMeters={totalSums().sumArea}
        totalPrice={totalSums().sumPrice}></TopStatus>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {listaVentanas.map(ventana => {
          return (
            <WindowDetailComponent
              setSelectedWindow={setSelectedWindow}
              ventana={ventana}
              key={ventana.name}
              changeModalVisible={changeModalVisible}></WindowDetailComponent>
          );
        })}
      </ScrollView>
      {modalVisible && (
        <AddGlassPieceModal
          modalVisible={modalVisible}
          closeModal={closeModal}
          lista={listaVidrios}
          addGlassPiece={addPieceToWindow}></AddGlassPieceModal>
      )}
      <Button mode="contained-tonal" onPress={addVentana}>
        Nueva Ventana
      </Button>
    </View>
  );
};

export default ListaView;
