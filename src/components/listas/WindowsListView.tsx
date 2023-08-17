import {useState, useEffect, useContext} from 'react';
import {TopStatus} from './TopStatus';
import WindowDetailComponent from './WindowDetailComponent';
import {ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import AddGlassPieceModal from './AddGlassPieceModal';
import WindowsListContext from './context/WindowsListContext';

const ListaView = () => {
  const {listaVentanas, addVentana, listaVidrios} =
    useContext(WindowsListContext);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log('List Dibujada');
  }, []);

  const changeModalVisible = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={{flex: 1}}>
      <TopStatus></TopStatus>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {listaVentanas.map(ventana => {
          return (
            <WindowDetailComponent
              ventana={ventana}
              key={ventana.id}
              changeModalVisible={changeModalVisible}></WindowDetailComponent>
          );
        })}
      </ScrollView>
      {modalVisible && (
        <AddGlassPieceModal
          modalVisible={modalVisible}
          closeModal={closeModal}></AddGlassPieceModal>
      )}
      <Button mode="contained-tonal" onPress={addVentana}>
        Nueva Ventana
      </Button>
    </View>
  );
};

export default ListaView;
