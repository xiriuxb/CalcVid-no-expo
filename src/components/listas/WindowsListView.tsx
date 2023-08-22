import {useState, useEffect, useContext} from 'react';
import {TopStatus} from './TopStatus';
import WindowDetailComponent from './WindowDetailComponent';
import {ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import AddGlassPieceModal from './AddGlassPieceModal';
import WindowsListContext from './context/WindowsListContext';
import PieceModalProvider from './context/PieceModalProvider';
import PieceModalContext from './context/PieceModalContext';
import ModalAuxComponent from './Modal';

const ListaView = () => {
  const {listaVentanas, addVentana} = useContext(WindowsListContext);

  useEffect(() => {
    console.log('List Dibujada');
  }, []);

  return (
    <PieceModalProvider>
      <View style={{flex: 1}}>
        <TopStatus></TopStatus>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {listaVentanas.map(ventana => {
            return (
              <WindowDetailComponent
                ventana={ventana}
                key={ventana.id}></WindowDetailComponent>
            );
          })}
        </ScrollView>
        <ModalAuxComponent></ModalAuxComponent>
        <Button mode="contained-tonal" onPress={addVentana}>
          Nueva Ventana
        </Button>
      </View>
    </PieceModalProvider>
  );
};

export default ListaView;
