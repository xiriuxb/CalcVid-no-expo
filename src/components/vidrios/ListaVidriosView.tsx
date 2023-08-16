import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import AddVidrioModal from './AddVidrioModal';
import VidrioDetailComponent from './VidrioDetailComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import Vidrio from '../../models/Vidrio';

const ListaVidriosView = () => {
  const [listaVidrios, setListaVidrios] = useState<Vidrio[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [productToEdit, setProductToEdit] = useState<Vidrio | null>(null);

  useEffect(() => {
    if (isInitialLoad) {
      loadProducts();
      setIsInitialLoad(false);
    } else {
      storeProducts();
    }
  }, [listaVidrios, modalVisible]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setProductToEdit(null);
    setModalVisible(false);
  };

  const deleteProduct = (elementName: string) => {
    const newList = listaVidrios.filter((el: Vidrio) => el.name != elementName);
    setListaVidrios(newList);
  };

  const openModalToEdit = (productName: string) => {
    const p = listaVidrios.find((el: Vidrio) => el.name == productName);
    if (p) {
      setProductToEdit(p);
    }
    setModalVisible(true);
  };

  const loadProducts = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        setListaVidrios(JSON.parse(storedProducts));
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const storeProducts = async () => {
    try {
      await AsyncStorage.setItem('products', JSON.stringify(listaVidrios));
    } catch (error) {
      console.error('Error loading products:', error);
    }
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
            lista={listaVidrios}
            setLista={setListaVidrios}
            editProduct={productToEdit}></AddVidrioModal>
        )}
        {listaVidrios &&
          listaVidrios.map((vid: Vidrio) => {
            return (
              <VidrioDetailComponent
                vidrio={vid}
                deleteElement={deleteProduct}
                toEdit={openModalToEdit}
                key={vid.id}></VidrioDetailComponent>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default ListaVidriosView;
