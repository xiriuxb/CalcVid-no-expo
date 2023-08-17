import {useRef, useState, useContext} from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import {Button, Snackbar, TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import GlassPiece from '../../models/GlassPiece';
import Vidrio from '../../models/Vidrio';
import globalStyles from '../common/Styles';
import WindowsListContext from './context/WindowsListContext';

const listForDropdown = (list: Vidrio[]) => {
  return list.map((el: Vidrio) => {
    return {label: el.name, value: el.name};
  });
};

interface props {
  modalVisible: boolean;
  closeModal: () => void;
}

const AddGlassPieceModal = ({modalVisible, closeModal}: props) => {
  const [quantity, setQuantity] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const quantityRef = useRef(null);
  const widthRef = useRef(null);
  const heightRef = useRef(null);
  const [snackVisible, setSnackVisible] = useState(false);
  const snackMessage = useRef('a');
  const [tipoVidrio, setTipoVidrio] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const tipoVidrioObject = useRef<Vidrio>();
  const {addPieceToWindow, listaVidrios} = useContext(WindowsListContext);

  const hideSnackBar = () => {
    setSnackVisible(false);
  };

  const handleNextInput = (nextInputRef: React.MutableRefObject<any>) => {
    if (nextInputRef && nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };

  const handleAddPiece = () => {
    setTipoVidrioObject();
    if (!width || !height || !tipoVidrio) {
      snackMessage.current = 'Faltan datos';
      setSnackVisible(true);
      return;
    }
    if (tipoVidrioObject.current) {
      const newPiece = new GlassPiece(
        parseFloat(height),
        parseFloat(width),
        parseFloat(quantity),
        tipoVidrioObject.current,
      );
      addPieceToWindow(newPiece);
    }
  };

  const setTipoVidrioObject = () => {
    const vidrio = listaVidrios.find(el => el.name == tipoVidrio);
    tipoVidrioObject.current = vidrio;
  };

  const updateproduct = () => {};

  const atCancel = () => {};

  const cleanInputs = () => {};

  const addOrUpdate = () => {};

  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Nuevo</Text>
        <DropDownPicker
          placeholder="Tipo de vidrio"
          listMode="MODAL"
          style={[styles.input, {zIndex: 50, alignSelf: 'center'}]}
          mode="BADGE"
          items={listForDropdown(listaVidrios)}
          value={tipoVidrio}
          setValue={setTipoVidrio}
          itemKey="label"
          open={showDropDown}
          setOpen={setShowDropDown}></DropDownPicker>
        <TextInput
          ref={heightRef}
          onSubmitEditing={() => handleNextInput(widthRef)}
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          keyboardType="number-pad"
          label="Alto"
          returnKeyType="next"
          error={!height}></TextInput>
        <TextInput
          ref={widthRef}
          onSubmitEditing={() => handleNextInput(quantityRef)}
          style={styles.input}
          value={width}
          onChangeText={setWidth}
          keyboardType="numeric"
          label="Ancho"
          returnKeyType="next"
          error={!width}></TextInput>
        <TextInput
          ref={quantityRef}
          style={styles.input}
          label="Cantidad"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          keyboardAppearance="dark"></TextInput>
        <View style={[globalStyles.buttonGroup, globalStyles.centered]}>
          <Button
            onPress={closeModal}
            mode="outlined"
            textColor="#fff"
            buttonColor="#d15656">
            Cerrar
          </Button>
          <Button
            onPress={handleAddPiece}
            mode="outlined"
            textColor="#fff"
            buttonColor="#007bff">
            Añadir
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

export default AddGlassPieceModal;

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
