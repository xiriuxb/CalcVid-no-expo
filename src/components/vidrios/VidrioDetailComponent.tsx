import {useState, useContext} from 'react';
import {Button} from 'react-native-paper';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
  Alert,
} from 'react-native';
import globalStyles from '../common/Styles';
import Product from '../../models/Product';
import ProductsContext from './context/GlassTypesContext';

interface props {
  product: Product;
  toEdit: (productName: string) => void;
}

const ProductDetailComponent = ({product, toEdit}: props) => {
  const [showDetails, setShowDetails] = useState(false);

  const productsContext = useContext(ProductsContext);
  const deleteProduct = productsContext!.deleteProduct;

  const onTouch = () => {
    setShowDetails(!showDetails);
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Eliminar', 'Quiere eliminar el producto', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteProduct(product.id)},
    ]);

  return (
    <View style={styles.ventana}>
      <TouchableNativeFeedback onPress={onTouch}>
        <Text style={styles.name}>{product.name}</Text>
      </TouchableNativeFeedback>
      {showDetails && (
        <View style={styles.ventana}>
          {/* <Text style={globalStyles.sizedText}>
            <Text style={[globalStyles.boldText]}>UUID </Text>
            {product.id}
          </Text> */}
          <Text style={globalStyles.sizedText}>
            <Text style={[globalStyles.boldText]}>Tipo: </Text>
            {product.type}
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
          <View style={[globalStyles.buttonGroup, globalStyles.centered]}>
            <Button textColor={'#d15656'} onPress={createTwoButtonAlert}>
              Eliminar
            </Button>
            <Button
              textColor="white"
              buttonColor="#007bff"
              onPress={() => toEdit(product.id)}>
              {' '}
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
