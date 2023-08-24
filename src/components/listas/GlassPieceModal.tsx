import {useRef, useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import GlassPiece from '../../models/GlassPiece';
import Vidrio from '../../models/Vidrio';
import globalStyles from '../common/Styles';
import WindowsListContext from './context/WindowsListContext';
import {useSnackBar} from '../snack-bar/SnackBarContext';
import SnackBarComponent from '../snack-bar/SnackBar';
import PieceModalContext from './context/PieceModalContext';
import GlassTypesContext from '../vidrios/context/GlassTypesContext';

const listForDropdown = (list: Vidrio[]) => {
  return list.map((el: Vidrio) => {
    return {label: el.name, value: el.id, labelStyle: {fontSize: 17}};
  });
};

const createGlassPiece = (
  width: string,
  height: string,
  quantity: string,
  glass: Vidrio,
): GlassPiece => {
  return new GlassPiece(
    parseFloat(height),
    parseFloat(width),
    parseFloat(quantity),
    glass,
  );
};

const GlassPieceModal = () => {
  //form
  const [quantity, setQuantity] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  //input refs
  const quantityRef = useRef<any | null>(null);
  const widthRef = useRef<any | null>(null);
  const heightRef = useRef<any | null>(null);
  //others
  const [tipoVidrio, setTipoVidrio] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const tipoVidrioObject = useRef<Vidrio>();
  //contexts
  const {addPieceToWindow, listaVentanas, editPieceInWindow} =
    useContext(WindowsListContext);
  const glassTypesContext = useContext(GlassTypesContext);
  const listaVidrios = glassTypesContext!.listaVidrios;
  const {snackMessage, showSnackMessage} = useSnackBar();
  const {
    setPieceModalVisible,
    pieceModalVisible,
    editMode,
    windowId,
    setEditMode,
    glassPieceId,
  } = useContext(PieceModalContext);

  useEffect(() => {
    if (editMode) {
      const selectedPiece = listaVentanas!
        .get(windowId)
        ?.getPiece(glassPieceId);
      setQuantity(selectedPiece!.quantity.toString());
      setWidth(selectedPiece!.width.toString());
      setHeight(selectedPiece!.height.toString());
      setTipoVidrio(selectedPiece!.glassType.name);
      setTipoVidrioObject();
    } else {
      setQuantity('');
      setHeight('');
      setWidth('');
    }
  }, [listaVentanas]);

  const handleNextInput = (nextInputRef: React.MutableRefObject<any>) => {
    if (nextInputRef && nextInputRef.current && !editMode) {
      nextInputRef.current.focus();
    } else {
      nextInputRef.current.focus();
    }
  };

  const handleCloseModal = () => {
    setEditMode(false);
    setPieceModalVisible(false);
  };

  const handleCreateOrUpdate = () => {
    setTipoVidrioObject();
    if (!editMode) {
      handleAddPiece();
      return;
    }
    updateproduct();
  };

  const handleAddPiece = () => {
    const newPiece = createGlassPiece(
      width,
      height,
      quantity,
      tipoVidrioObject.current!,
    );
    addPieceToWindow(windowId, newPiece);
    showSnackMessage('Agregado', 500);
    if (widthRef && widthRef.current) {
      heightRef.current.focus();
      heightRef.current.clear();
    }
  };

  const setTipoVidrioObject = () => {
    const vidrio = listaVidrios!.getGlassType(tipoVidrio);
    if (tipoVidrio) {
      tipoVidrioObject.current = vidrio;
    } else {
      showSnackMessage('Ocurrió un error');
    }
  };

  const updateproduct = () => {
    const newPiece = createGlassPiece(
      width,
      height,
      quantity,
      tipoVidrioObject.current!,
    );
    editPieceInWindow(windowId, glassPieceId, newPiece);
    setPieceModalVisible(false);
  };

  const handleFocusPicker = () => {
    if (widthRef.current) {
      widthRef.current.blur();
    }
    if (heightRef.current) {
      heightRef.current.blur();
    }
    if (quantityRef.current) {
      quantityRef.current.blur();
    }
  };

  return (
    <Modal visible={pieceModalVisible} animationType="fade" transparent={true}>
      {snackMessage && <SnackBarComponent></SnackBarComponent>}
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Nuevo</Text>
        <DropDownPicker
          onOpen={handleFocusPicker}
          placeholder="Tipo de vidrio"
          listMode="FLATLIST"
          style={[styles.input, {zIndex: 50, alignSelf: 'center'}]}
          mode="BADGE"
          items={listForDropdown(listaVidrios!.getGlassTypesArray())}
          value={tipoVidrio}
          setValue={setTipoVidrio}
          labelProps={{style: {fontSize: 17, color: '#000'}}}
          itemKey="label"
          onClose={() => {
            setTimeout(() => {
              handleNextInput(heightRef);
            }, 50);
          }}
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
            onPress={handleCloseModal}
            mode="outlined"
            textColor="#fff"
            buttonColor="#d15656">
            Cerrar
          </Button>
          <Button
            onPress={handleCreateOrUpdate}
            mode="outlined"
            textColor="#fff"
            buttonColor="#007bff"
            disabled={!width || !height || !tipoVidrio}>
            {!editMode ? 'Añadir' : 'Guardar'}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default GlassPieceModal;

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
  dropDownItem: {
    fontSize: 17,
  },
});
