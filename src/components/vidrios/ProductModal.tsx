import {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import {Product, UnityPricesType} from '../../models';
import {Button, TextInput, TouchableRipple} from 'react-native-paper';
import globalStyles from '../common/Styles';
import {useSnackBar} from '../snack-bar/SnackBarContext';
import {useProductsContext} from './context/products-context';
import {useProductModalContext} from './context/product-modal-context';

const handleNextInput = (nextInputRef: React.MutableRefObject<any>) => {
  if (nextInputRef && nextInputRef.current) {
    nextInputRef.current.focus();
  }
};

const ProductModal = () => {
  // form
  const [name, onChangeName] = useState('');
  const [width, onChangeWidth] = useState('');
  const [height, onChangeHeight] = useState('');
  const [totalPrice, onChangeTotalPrice] = useState('');
  const [priceA, onChangePriceA] = useState('');
  const [priceB, onChangePriceB] = useState('');
  const [priceC, onChangePriceC] = useState('');
  //Textinput Refs
  const nameRef = useRef(null);
  const heightRef = useRef(null);
  const widthRef = useRef(null);
  const totalPricetRef = useRef(null);
  const priceARef = useRef(null);
  const priceBRef = useRef(null);
  const priceCRef = useRef(null);
  const editMode = useRef(false);
  const editProduct = useRef<Product | null>(null);
  // optional form
  const {showSnackMessage} = useSnackBar();
  const [showOptional, setShowOptional] = useState(false);
  const showOptionalBtnMessage = useRef('Más...');
  //contexts
  const {productsList, addProduct, updateProduct} = useProductsContext();
  const {editProductId, setProductModalVisible, setEditProductId} =
    useProductModalContext();

  useEffect(() => {
    if (editProductId) {
      editMode.current = true;
      editProduct.current = productsList!.getProduct(editProductId)!;
      if (editProduct) {
        onChangeName(`${editProduct.current.name}`);
        onChangeHeight(`${editProduct.current.height}`);
        onChangeWidth(`${editProduct.current.width}`);
        onChangeTotalPrice(`${editProduct.current.totalPrice}`);
        onChangePriceA(`${editProduct.current.unityPrices.priceA}`);
        onChangePriceB(`${editProduct.current.unityPrices.priceB}`);
        onChangePriceC(`${editProduct.current.unityPrices.priceC}`);
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

  const handleAddProduct = () => {
    if (!priceA || !name) {
      showSnackMessage('Faltan datos', 3000);
      return;
    } else {
      const elementExists = productsList!.productExistByName(name.trim());
      if (elementExists) {
        showSnackMessage('Ya existe', 3000);
        return;
      } else {
        const prices: UnityPricesType = {
          priceA: parseFloat(priceA),
          priceB: priceB ? parseFloat(priceB) : 0,
          priceC: priceC ? parseFloat(priceC) : 0,
        };
        const product = new Product(
          name.trim(),
          'calculated',
          prices,
          totalPrice ? parseFloat(totalPrice) : 0,
          height ? parseFloat(height) : 0,
          width ? parseFloat(width) : 0,
        );
        addProduct(product);
        showSnackMessage('Guardado', 500);
        atCancel();
      }
    }
  };

  const handleUpdateProduct = () => {
    if (priceA === '' || name === '') {
      showSnackMessage('Faltan datos', 2000);
    } else {
      const mismoNombre = productsList?.productExistByName(name.trim());
      if (mismoNombre && editProduct.current?.name != name) {
        showSnackMessage('Ya existe ese nombre', 2000);
      } else {
        const prices: UnityPricesType = {
          priceA: parseFloat(priceA),
          priceB: priceB ? parseFloat(priceB) : 0,
          priceC: priceC ? parseFloat(priceC) : 0,
        };
        const newProduct = new Product(
          name.trim(),
          'calculated',
          prices,
          totalPrice?parseFloat(totalPrice):0,
          height?parseFloat(height):0,
          width?parseFloat(width):0,
        );
        updateProduct(editProductId, newProduct);
        showSnackMessage('Actualizado', 500);
        atCancel();
      }
    }
  };

  const atCancel = () => {
    cleanInputs();
    setProductModalVisible(false);
  };

  const cleanInputs = () => {
    onChangeName('');
    onChangeHeight('');
    onChangeWidth('');
    onChangeTotalPrice('');
    onChangePriceA('');
    onChangePriceB('');
    onChangePriceC('');
    editMode.current = false;
  };

  const addOrUpdate = () => {
    if (editMode.current && editMode) {
      handleUpdateProduct();
    } else {
      handleAddProduct();
    }
  };

  return (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Nuevo priducto</Text>
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
          style={styles.input}
          value={priceA}
          onChangeText={onChangePriceA}
          keyboardType="numeric"
          label="Precio m² (a)*"
          error={!priceA}></TextInput>
        <TouchableRipple
          onPress={handleOpenOptionalInputs}
          style={{padding: 15}}>
          <Text style={{color: '#fff', textDecorationLine: 'underline'}}>
            {showOptionalBtnMessage.current}
          </Text>
        </TouchableRipple>
        <View style={showOptional ? styles.formContainer : {display: 'none'}}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              ref={heightRef}
              onSubmitEditing={() => handleNextInput(widthRef)}
              style={[styles.input, styles.inputHalf]}
              value={height}
              onChangeText={onChangeHeight}
              keyboardType="number-pad"
              label="Alto(cm)"
              returnKeyType="next"></TextInput>
            <TextInput
              ref={widthRef}
              onSubmitEditing={() => handleNextInput(totalPricetRef)}
              style={[styles.input, styles.inputHalf]}
              value={width}
              onChangeText={onChangeWidth}
              keyboardType="numeric"
              returnKeyType="next"
              label="Ancho(cm)"></TextInput>
          </View>

          <TextInput
            ref={totalPricetRef}
            onSubmitEditing={() => handleNextInput(priceBRef)}
            style={styles.input}
            value={totalPrice}
            onChangeText={onChangeTotalPrice}
            keyboardType="numeric"
            returnKeyType="next"
            label="Precio Lámina"></TextInput>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              ref={priceBRef}
              onSubmitEditing={() => handleNextInput(priceCRef)}
              style={[styles.input, styles.inputHalf]}
              value={priceB}
              onChangeText={onChangePriceB}
              keyboardType="numeric"
              returnKeyType="next"
              label="Precio m² (b)"></TextInput>
            <TextInput
              ref={priceCRef}
              style={[styles.input, styles.inputHalf]}
              value={priceC}
              onChangeText={onChangePriceC}
              keyboardType="numeric"
              label="Precio m² (c)"></TextInput>
          </View>
        </View>

        <View style={[globalStyles.buttonGroup, globalStyles.centered]}>
          <Button
            onPress={atCancel}
            mode="outlined"
            textColor="#fff"
            buttonColor="#d15656">
            Cancelar
          </Button>
          <Button
            onPress={addOrUpdate}
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
