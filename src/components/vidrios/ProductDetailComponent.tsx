import {useState} from 'react';
import {Button} from 'react-native-paper';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  Alert,
} from 'react-native';
import globalStyles from '../common/Styles';
import {Product} from '../../models';
import {useProductsContext} from './context/products-context';
import {useProductModalContext} from './context/product-modal-context';

interface props {
  product: Product;
}

const createTwoButtonAlert = (onOkCallback: (id: any) => void) => {
  Alert.alert('Eliminar', 'Quiere eliminar el producto', [
    {
      text: 'Cancelar',
      style: 'cancel',
    },
    {text: 'OK', onPress: onOkCallback},
  ]);
};

const ProductDetailComponent = ({product}: props) => {
  const [showDetails, setShowDetails] = useState(false);

  const {deleteProduct} = useProductsContext();
  const {setProductModalVisible, setEditProductId} = useProductModalContext();

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleToEdit = () => {
    setProductModalVisible(true);
    setEditProductId(product.id);
  };

  return (
    <View style={styles.ventana}>
      <TouchableNativeFeedback onPress={handleShowDetails}>
        <Text style={styles.name}>{product.name}</Text>
      </TouchableNativeFeedback>
      {showDetails && (
        <View style={styles.ventana}>
          <Text style={globalStyles.sizedText}>
            <Text style={[globalStyles.boldText]}>Tipo: </Text>
            {product.type == 'calculated'?'Calculado':'No calculado'}
          </Text>
          <Text style={globalStyles.sizedText}>
            <Text style={[globalStyles.boldText]}>Precio (m²) A: </Text>
            {product.unityPrices.priceA}
          </Text>
          <Text style={globalStyles.sizedText}>
            <Text style={[globalStyles.boldText]}>Precio (m²) B: </Text>
            {product.unityPrices.priceB}
          </Text>
          <Text style={globalStyles.sizedText}>
            <Text style={[globalStyles.boldText]}>Precio (m²) C: </Text>
            {product.unityPrices.priceC}
          </Text>
          <Text style={globalStyles.sizedText}>
            <Text style={[globalStyles.boldText]}>Información extra: </Text>
            {product.extraInfo}
          </Text>
          <View style={[globalStyles.buttonGroup, globalStyles.centered]}>
            <Button
              textColor={'#d15656'}
              onPress={() =>
                createTwoButtonAlert(() => deleteProduct(product.id))
              }>
              Eliminar
            </Button>
            <Button
              textColor="white"
              buttonColor="#007bff"
              onPress={() => handleToEdit()}>
              Editar
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ventana: {
    borderColor: '#000',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    margin: 5,
    padding: 3,
  },
  name: {
    backgroundColor: '#20212400',
    padding: 13,
    fontSize: 20,
    color: 'black',
  },
});

export default ProductDetailComponent;
