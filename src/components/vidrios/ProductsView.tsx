import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import AddProductModal from './ProductModal';
import {Product} from '../../models';
import ProductDetailComponent from './ProductDetailComponent';
import {useProductsContext} from './context';

const ProductsView = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState<string>('');

  const {productsList} = useProductsContext();

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
          <AddProductModal
            modalVisible={modalVisible}
            closeModal={closeModal}
            editProductId={productToEdit}></AddProductModal>
        )}
        {productsList!.getProductsArray().map((product: Product) => {
          return (
            <ProductDetailComponent
              product={product}
              toEdit={openModalToEdit}
              key={product.id}></ProductDetailComponent>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ProductsView;
