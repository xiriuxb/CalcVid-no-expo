import {useState, useContext} from 'react';
import {ScrollView, View} from 'react-native';
import AddVidrioModal from './AddVidrioModal';
import VidrioDetailComponent from './VidrioDetailComponent';
import {Button} from 'react-native-paper';
import Vidrio from '../../models/Product';
import GlassTypesContext from './context/GlassTypesContext';

const ListaVidriosView = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState<string>('');
  const glassTypeContext = useContext(GlassTypesContext);

  const listaVidrios = glassTypeContext!.listaVidrios;

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setProductToEdit('');
    setModalVisible(false);
  };

  const openModalToEdit = (productId: string) => {
    setProductToEdit(productId);
    setModalVisible(true);
  };

  return (
    <View style={{flex: 1}}>
      <Button onPress={openModal} mode="contained-tonal" style={{margin: 4}}>
        Añadir
      </Button>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {modalVisible && (
          <AddVidrioModal
            modalVisible={modalVisible}
            closeModal={closeModal}
            editProductId={productToEdit}></AddVidrioModal>
        )}
        {listaVidrios!.getProductsArray().map((vid: Vidrio) => {
          return (
            <VidrioDetailComponent
              vidrio={vid}
              toEdit={openModalToEdit}
              key={vid.id}></VidrioDetailComponent>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ListaVidriosView;
