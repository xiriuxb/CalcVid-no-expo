import {useContext} from 'react';
import {TopStatus} from './TopStatus';
import WindowDetailComponent from './WindowDetailComponent';
import {ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import WindowsListContext from './context/WindowsListContext';
import PieceModalProvider from './context/PieceModalProvider';
import ModalAuxComponent from './Modal';
import Ventana from '../../models/ItemsToSell';

const ListaView = () => {
  const {listaVentanas, addVentana} = useContext(WindowsListContext);

  return (
    <PieceModalProvider>
      <View style={{flex: 1}}>
        <TopStatus></TopStatus>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {Array.from(listaVentanas!.values()).map((ventana: Ventana) => {
            return (
              <WindowDetailComponent
                ventana={ventana}
                key={ventana.id}></WindowDetailComponent>
            );
          })}
        </ScrollView>
        <ModalAuxComponent></ModalAuxComponent>
        <View style={{marginVertical: 3, marginHorizontal: 10}}>
          <Button mode="contained-tonal" onPress={addVentana}>
            Nueva Ventana
          </Button>
        </View>
      </View>
    </PieceModalProvider>
  );
};

export default ListaView;
