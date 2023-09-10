import {useState} from 'react';
import {Button} from 'react-native-paper';
import {View, Text, StyleSheet, Alert} from 'react-native';
import globalStyles from '../common/Styles';
import {Product, ProductPriceCalculus, UnityPricesType} from '../../models';
import {useProductsContext} from './context/products-context';
import {useProductModalContext} from './context/product-modal-context';
import {useSnackBar} from '../snack-bar/SnackBarContext';
import TouchableShowMore from '../common/TouchableShowMore';

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

const pricesArr = (prices: UnityPricesType) => {
  return [
    {name: 'A', val: prices.priceA},
    {name: 'B', val: prices.priceB},
    {name: 'C', val: prices.priceC},
  ];
};

const ProductDetailComponent = ({product}: props) => {
  const [showDetails, setShowDetails] = useState(false);

  const {productListCrudOptions} = useProductsContext();
  const {setProductModalVisible, setEditProductId} = useProductModalContext();
  const {showSnackMessage} = useSnackBar();

  const handleToEdit = () => {
    setProductModalVisible(true);
    setEditProductId(product.id);
  };

  const handleDeleteProduct = () => {
    productListCrudOptions('deleted', product.id, undefined);
    showSnackMessage('Eliminado', 1000);
  };

  return (
    <View style={styles.ventana}>
      <TouchableShowMore
        showMore={showDetails}
        setShowMore={setShowDetails}
        style={showDetails?[styles.touchable,styles.shadow]:styles.touchable}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.name}>{product.name}</Text>
          <Text
            style={
              globalStyles.sizedText
            }>{`$ ${product.unityPrices.priceA}`}</Text>
        </View>
      </TouchableShowMore>
      {showDetails && (
        <View style={styles.ventana}>
          <Text style={globalStyles.sizedText}>
            <Text style={[globalStyles.boldText]}>Tipo: </Text>
            {product.type == ProductPriceCalculus.calculated
              ? 'Calculado'
              : product.type == ProductPriceCalculus.calculated_simple
              ? 'Calculado Simple'
              : 'No calculado'}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={globalStyles.boldText}>Precios (USD):</Text>
            <View style={{flexDirection: 'row'}}>
              {pricesArr(product.unityPrices).map(el => {
                return (
                  <View key={el.name}>
                    {!!el.val && (
                      <Text style={globalStyles.sizedText}>
                        <Text style={[globalStyles.boldText]}>
                          {' '}
                          | {el.name}:{' '}
                        </Text>
                        {el.val}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
          <Text style={globalStyles.sizedText}>
            <Text style={[globalStyles.boldText]}>Información extra: </Text>
            {product.extraInfo}
          </Text>
          <View style={[globalStyles.buttonGroup, globalStyles.centered]}>
            <Button
              textColor={'#d15656e0'}
              compact
              onPress={() => createTwoButtonAlert(() => handleDeleteProduct())}>
              Eliminar
            </Button>
            <Button
              textColor="#007bff"
              mode='elevated'
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
    borderRadius: 5,
    margin: 5,
  },
  name: {
    backgroundColor: '#20212400',
    paddingVertical: 10,
    fontSize: 18,
    color: 'black',
  },
  touchable: {
    backgroundColor: '#fff',
    borderRadius:5,
    borderColor:'#999',
    borderStyle:'solid',
    borderWidth:1
  },
  shadow:{
    elevation: 20,
    shadowColor: '#2b2b2b',
  }
});

export default ProductDetailComponent;
