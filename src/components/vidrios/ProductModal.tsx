import {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Product, UnityPricesType} from '../../models';
import {Button, TextInput, TouchableRipple} from 'react-native-paper';
import globalStyles from '../common/Styles';
import {useSnackBar} from '../snack-bar/SnackBarContext';
import {useProductsContext} from './context/products-context';
import {useProductModalContext} from './context/product-modal-context';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const handleNextInput = (nextInputRef: React.MutableRefObject<any>) => {
  if (nextInputRef && nextInputRef.current) {
    nextInputRef.current.focus();
  }
};

const productTypes = [
  {label: 'Calculado', value: 'calculated'},
  {label: 'No Calculado', value: 'unique'},
  {label: 'Calculado Simple', value: 'calculated-simple'},
];

const createInfoAlert = () => {
  const alertMessage = `
  Calculado: Significa que el precio de venta se calcula con dos medidas (largo y ancho). Por ejemplo, el precio de un pedazo de vidrio.
  El PVP debería ser el precio por metro cuadrado

  No calculado: El precio no se calcula, el precio es por unidad.

  Calculado Simple: EL PVP se calcula con una sola medida. Por ejemplo, un tubo.
`;
  Alert.alert('Información del tipo de producto', alertMessage);
};

const generateUnityPrices = (
  priceA: string,
  priceB: string,
  priceC: string,
) => {
  const prices: UnityPricesType = {
    priceA: parseFloat(priceA),
    priceB: priceB ? parseFloat(priceB) : 0,
    priceC: priceC ? parseFloat(priceC) : 0,
  };
  return prices;
};

const ProductModal = () => {
  // form
  const [productType, setProductType] = useState<
    'unique' | 'calculated-simple' | 'calculated'
  >('calculated');
  const [name, onChangeName] = useState('');
  const [priceA, onChangePriceA] = useState('');
  const [priceB, onChangePriceB] = useState('');
  const [priceC, onChangePriceC] = useState('');
  const [extraInfo, onChangeExtraInfo] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  //Textinput Refs
  const nameRef = useRef(null);
  const extraInfoRef = useRef(null);
  const priceARef = useRef(null);
  const priceBRef = useRef(null);
  const priceCRef = useRef(null);
  const editMode = useRef(false);
  const editProduct = useRef<Product | null>(null);
  // optional form
  const [showOptional, setShowOptional] = useState(false);
  const showOptionalBtnMessage = useRef('Más...');
  //contexts
  const {showSnackMessage} = useSnackBar();
  const {productsList, productListCrudOptions} = useProductsContext();
  const {editProductId, setProductModalVisible, setEditProductId} =
    useProductModalContext();

  useEffect(() => {
    if (editProductId) {
      editMode.current = true;
      editProduct.current = productsList!.getProduct(editProductId)!;
      if (editProduct) {
        onChangeName(`${editProduct.current.name}`);
        onChangeExtraInfo(`${editProduct.current.extraInfo}`);
        onChangePriceA(`${editProduct.current.unityPrices.priceA}`);
        onChangePriceB(`${editProduct.current.unityPrices.priceB}`);
        onChangePriceC(`${editProduct.current.unityPrices.priceC}`);
        setProductType(editProduct.current.type);
      }
      return () => {
        setEditProductId('');
      };
    }
  }, [editProductId]);

  const handleOpenOptionalInputs = () => {
    showOptionalBtnMessage.current = showOptional ? 'Más...' : 'Menos...';
    setShowOptional(!showOptional);
  };

  const handleAddOrUpdate = () => {
    if (!priceA || !name) {
      showSnackMessage('Faltan datos', 2000);
      return;
    }
    const prices = generateUnityPrices(priceA, priceB, priceC);
    const newProduct = new Product(name.trim(), productType, prices, extraInfo);
    if (editMode.current && editMode) {
      productListCrudOptions('changed',editProductId, newProduct);
    } else {
      productListCrudOptions('added',undefined,newProduct);
    }
    showSnackMessage('Guardado', 500);
    setProductModalVisible(false);
  };

  return (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.modalText}>Nuevo producto</Text>
          <TouchableOpacity onPress={() => createInfoAlert()}>
            <FontAwesome
              name="info-circle"
              size={22}
              color={'white'}
              style={{paddingTop: 3, paddingHorizontal: 4}}
            />
            <Text style={{color: 'white'}}>Info</Text>
          </TouchableOpacity>
        </View>
        <DropDownPicker
          style={[styles.input, {alignSelf: 'center'}]}
          items={productTypes}
          value={productType}
          setValue={setProductType}
          open={showDropDown}
          setOpen={setShowDropDown}></DropDownPicker>
        <TextInput
          ref={nameRef}
          onSubmitEditing={() => handleNextInput(priceARef)}
          style={styles.input}
          label="Nombre*"
          value={name}
          onChangeText={onChangeName}
          returnKeyType="next"
          error={!name}></TextInput>
        <TextInput
          returnKeyType="next"
          ref={priceARef}
          onSubmitEditing={() => {
            showOptional && handleNextInput(priceBRef);
          }}
          style={styles.input}
          value={priceA}
          onChangeText={onChangePriceA}
          keyboardType="numeric"
          label="Precio (A)*"
          error={!priceA}></TextInput>

        <TouchableRipple
          onPress={handleOpenOptionalInputs}
          style={{padding: 15}}>
          <Text style={{color: '#fff', textDecorationLine: 'underline'}}>
            {showOptionalBtnMessage.current}
          </Text>
        </TouchableRipple>
        {/* Optionals */}
        <View style={showOptional ? styles.formContainer : {display: 'none'}}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              ref={priceBRef}
              onSubmitEditing={() => handleNextInput(priceCRef)}
              style={[styles.input, styles.inputHalf]}
              value={priceB}
              onChangeText={onChangePriceB}
              keyboardType="numeric"
              returnKeyType="next"
              label="Precio (B)"></TextInput>
            <TextInput
              ref={priceCRef}
              style={[styles.input, styles.inputHalf]}
              onSubmitEditing={() => handleNextInput(extraInfoRef)}
              value={priceC}
              onChangeText={onChangePriceC}
              keyboardType="numeric"
              label="Precio (C)"></TextInput>
          </View>
          {/* Buttons */}
          <TextInput
            multiline
            maxLength={100}
            numberOfLines={4}
            ref={extraInfoRef}
            style={styles.input}
            value={extraInfo}
            onChangeText={onChangeExtraInfo}
            returnKeyType="next"
            label="Información extra"></TextInput>
        </View>

        <View style={[globalStyles.buttonGroup, globalStyles.centered]}>
          <Button
            onPress={() => setProductModalVisible(false)}
            mode="outlined"
            textColor="#fff"
            buttonColor="#d15656">
            Cancelar
          </Button>
          <Button
            onPress={handleAddOrUpdate}
            disabled={!name || !priceA}
            mode="outlined"
            textColor="#fff"
            buttonColor="#007bff">
            Guardar
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ProductModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: 300,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 17,
  },
  inputHalf: {
    width: 150,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
