import {useEffect, useRef, useState, useContext} from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import Vidrio from '../../models/Vidrio';
import {Button, TextInput, TouchableRipple} from 'react-native-paper';
import globalStyles from '../common/Styles';
import SnackBarComponent from '../snack-bar/SnackBar';
import {useSnackBar} from '../snack-bar/SnackBarContext';
import GlassTypesContext from './context/GlassTypesContext';

interface props {
  modalVisible: boolean;
  closeModal: () => void;
  editProductId: string;
}

const AddVidrioModal = ({modalVisible, closeModal, editProductId}: props) => {
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
  // optional form
  const {snackMessage, showSnackMessage} = useSnackBar();
  const [showOptional, setShowOptional] = useState(false);
  const showOptionalBtnMessage = useRef('Más...');
  //contexts
  const glassTypeContext = useContext(GlassTypesContext);
  const listaVidrios = glassTypeContext!.listaVidrios;
  const addGlassType = glassTypeContext!.addGlassType;
  const updateGlassType = glassTypeContext!.updateGlassType;

  useEffect(() => {
    if (editProductId) {
      editMode.current = true;
      const editProduct = listaVidrios!.getGlassType(editProductId);
      if (editProduct) {
        onChangeName(`${editProduct.name}`);
        onChangeHeight(`${editProduct.height}`);
        onChangeWidth(`${editProduct.width}`);
        onChangeTotalPrice(`${editProduct.totalPrice}`);
        onChangePriceA(`${editProduct.meterPriceA}`);
        onChangePriceB(`${editProduct.meterPriceB}`);
        onChangePriceC(`${editProduct.meterPriceC}`);
      }
      return () => {
        editProductId = '';
      };
    }
  }, [editProductId]);

  const handleNextInput = (nextInputRef: React.MutableRefObject<any>) => {
    if (nextInputRef && nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };

  const handleOpenOptionalInputs = () => {
    showOptionalBtnMessage.current = showOptional ? 'Más...' : 'Menos...';
    setShowOptional(!showOptional);
  };

  const handleAddGlassType = () => {
    if (!priceA || !name) {
      showSnackMessage('Faltan datos', 3000);
      return;
    } else {
      const elementExists = listaVidrios!.glassExistByName(name.trim());
      if (elementExists) {
        showSnackMessage('Ya existe', 3000);
        return;
      } else {
        const vidrio = new Vidrio(
          name.trim(),
          parseInt(height),
          parseInt(width),
          parseFloat(totalPrice),
          parseFloat(priceA),
          parseFloat(priceB),
          parseFloat(priceC),
        );
        addGlassType(vidrio);
        showSnackMessage('Guardado', 500);
        cleanInputs();
        closeModal();
      }
    }
  };

  const updateproduct = () => {
    if (priceA === '' || name === '') {
      showSnackMessage('Faltan datos', 2000);
    } else {
      if (editProductId && editMode) {
        const mismoNombre = listaVidrios?.glassExistByName(name.trim());
        if (mismoNombre) {
          showSnackMessage('Ya existe ese nombre', 2000);
        } else {
          const newVidrio = new Vidrio(
            name,
            parseFloat(height),
            parseFloat(width),
            parseFloat(totalPrice),
            parseFloat(priceA),
            parseFloat(priceB),
            parseFloat(priceC),
          );
          updateGlassType(editProductId, newVidrio);
          showSnackMessage('Actualizado', 500);
          cleanInputs();
          closeModal();
        }
      }
    }
  };

  const atCancel = () => {
    cleanInputs();
    closeModal();
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
    if (editMode.current) {
      updateproduct();
    } else {
      handleAddGlassType();
    }
  };

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      {snackMessage && <SnackBarComponent></SnackBarComponent>}
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Nuevo vidrio</Text>
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

export default AddVidrioModal;

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
