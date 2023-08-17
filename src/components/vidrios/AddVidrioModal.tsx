import {useEffect, useRef, useState, useContext} from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import Vidrio from '../../models/Vidrio';
import {Button, Snackbar, TextInput} from 'react-native-paper';
import globalStyles from '../common/Styles';
import WindowsListContext from '../listas/context/WindowsListContext';

interface props {
  modalVisible: boolean;
  closeModal: () => void;
  editProduct: Vidrio | null;
}

const AddVidrioModal = ({modalVisible, closeModal, editProduct}: props) => {
  const [name, onChangeName] = useState('');
  const [width, onChangeWidth] = useState('');
  const [height, onChangeHeight] = useState('');
  const [totalPrice, onChangeTotalPrice] = useState('');
  const [priceA, onChangePriceA] = useState('');
  const [priceB, onChangePriceB] = useState('');
  const [priceC, onChangePriceC] = useState('');
  const nameRef = useRef(null);
  const heightRef = useRef(null);
  const widthRef = useRef(null);
  const totalPricetRef = useRef(null);
  const priceARef = useRef(null);
  const priceBRef = useRef(null);
  const priceCRef = useRef(null);
  const snackMessage = useRef('');
  const [snackVisible, setSnackVisible] = useState(false);
  const editMode = useRef(false);
  const {listaVidrios, setListaVidrios} = useContext(WindowsListContext);

  useEffect(() => {
    if (editProduct) {
      editMode.current = true;
      onChangeName(`${editProduct.name}`);
      onChangeHeight(`${editProduct.height}`);
      onChangeWidth(`${editProduct.width}`);
      onChangeTotalPrice(`${editProduct.totalPrice}`);
      onChangePriceA(`${editProduct.meterPriceA}`);
      onChangePriceB(`${editProduct.meterPriceB}`);
      onChangePriceC(`${editProduct.meterPriceC}`);
      return () => {
        editProduct = null;
      };
    }
  }, [editProduct]);

  const hideSnackBar = () => {
    setSnackVisible(false);
  };

  const handleNextInput = (nextInputRef: React.MutableRefObject<any>) => {
    if (nextInputRef && nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };

  const addVidrioToList = () => {
    if (!priceA || !name) {
      snackMessage.current = 'Faltan datos';
      setSnackVisible(true);
      return;
    } else {
      const elementExists = listaVidrios.find(el => el.name === name);
      if (elementExists) {
        snackMessage.current = 'Ya existe';
        setSnackVisible(true);
        return;
      } else {
        const vidrio = new Vidrio(
          name,
          parseInt(height),
          parseInt(width),
          parseFloat(totalPrice),
          parseFloat(priceA),
          parseFloat(priceB),
          parseFloat(priceC),
        );
        const a = [...listaVidrios, vidrio];
        if (setListaVidrios) {
          setListaVidrios(a);
        }
        cleanInputs();
        closeModal();
      }
    }
  };

  const updateproduct = () => {
    if (priceA === '' || name === '') {
      snackMessage.current = 'Faltan datos';
      setSnackVisible(true);
    } else {
      if (editProduct && editMode) {
        const mismoNombre = listaVidrios.filter(
          el => el.name === name && el.id != editProduct?.id,
        );
        if (mismoNombre.length > 0) {
          snackMessage.current = 'Ya existe ese nombre';
          setSnackVisible(true);
        } else {
          const updatedList: Vidrio[] = listaVidrios.map(el => {
            if (el.id === editProduct?.id) {
              return {
                ...editProduct,
                name: name,
                width: parseFloat(width),
                height: parseFloat(height),
                totalPrice: parseFloat(totalPrice),
                meterPriceA: parseFloat(priceA),
                meterPriceB: parseFloat(priceB),
                meterPriceC: parseFloat(priceC),
              };
            }
            return el;
          });
          if (setListaVidrios) {
            setListaVidrios(updatedList);
          }
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
    console.log('trfyghu');
    if (editMode.current) {
      updateproduct();
    } else {
      addVidrioToList();
    }
  };

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Nuevo vidrio</Text>
        <TextInput
          ref={nameRef}
          onSubmitEditing={() => handleNextInput(heightRef)}
          style={styles.input}
          label="Nombre*"
          value={name}
          onChangeText={onChangeName}
          returnKeyType="next"
          error={!name}></TextInput>
        <TextInput
          ref={heightRef}
          onSubmitEditing={() => handleNextInput(widthRef)}
          style={styles.input}
          value={height}
          onChangeText={onChangeHeight}
          keyboardType="number-pad"
          label="Alto"
          returnKeyType="next"></TextInput>
        <TextInput
          ref={widthRef}
          onSubmitEditing={() => handleNextInput(totalPricetRef)}
          style={styles.input}
          value={width}
          onChangeText={onChangeWidth}
          keyboardType="numeric"
          returnKeyType="next"
          label="Ancho"></TextInput>
        <TextInput
          ref={totalPricetRef}
          onSubmitEditing={() => handleNextInput(priceARef)}
          style={styles.input}
          value={totalPrice}
          onChangeText={onChangeTotalPrice}
          keyboardType="numeric"
          returnKeyType="next"
          label="Precio Lámina"></TextInput>
        <TextInput
          returnKeyType="next"
          ref={priceARef}
          onSubmitEditing={() => handleNextInput(priceBRef)}
          style={styles.input}
          value={priceA}
          onChangeText={onChangePriceA}
          keyboardType="numeric"
          label="Precio m² (a)*"
          error={!priceA}></TextInput>
        <TextInput
          ref={priceBRef}
          onSubmitEditing={() => handleNextInput(priceCRef)}
          style={styles.input}
          value={priceB}
          onChangeText={onChangePriceB}
          keyboardType="numeric"
          returnKeyType="next"
          label="Precio m² (b)"></TextInput>
        <TextInput
          ref={priceCRef}
          style={styles.input}
          value={priceC}
          onChangeText={onChangePriceC}
          keyboardType="numeric"
          label="Precio m² (c)"></TextInput>
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
            mode="outlined"
            textColor="#fff"
            buttonColor="#007bff">
            Guardar
          </Button>
        </View>
      </View>
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
        <Snackbar
          visible={snackVisible}
          duration={3000}
          onDismiss={hideSnackBar}
          action={{
            label: 'Ocultar',
            onPress: hideSnackBar,
          }}>
          {snackMessage.current}
        </Snackbar>
      </View>
    </Modal>
  );
};

export default AddVidrioModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 200,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 17,
  },
});
