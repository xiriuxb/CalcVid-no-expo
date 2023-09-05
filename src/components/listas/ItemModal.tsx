import {useRef, useState, useEffect, useMemo} from 'react';
import {View, StyleSheet, Modal, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {Item, Product} from '../../models';
import globalStyles from '../common/Styles';
import {useSnackBar} from '../snack-bar/SnackBarContext';
import {useItemModalContext, useItemsToSellContext} from './context';
import {useProductsContext} from '../vidrios/context/products-context';

const listForDropdown = (list: Product[]) => {
  return list.map((el: Product) => {
    return {
      label: el.name,
      value: el.id,
      labelStyle: {
        fontSize: 20,
        borderColor: 'black',
        borderBottomWidth: 1,
      },
    };
  });
};

const createItem = (
  width: string,
  height: string,
  quantity: string,
  product: Product,
): Item => {
  return new Item(
    product,
    parseFloat(quantity),
    parseFloat(height),
    parseFloat(width),
  );
};

const handleNextInput = (
  nextInputRef: React.MutableRefObject<any>,
  isEdit: boolean,
) => {
  if (nextInputRef && nextInputRef.current && !isEdit) {
    nextInputRef.current.focus();
  } else {
    nextInputRef.current.focus();
  }
};

const ItemModal = () => {
  //form
  const [quantity, setQuantity] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  //input refs
  const quantityRef = useRef<any | null>(null);
  const widthRef = useRef<any | null>(null);
  const heightRef = useRef<any | null>(null);
  //others
  const [tipoVidrioId, setTipoVidrioId] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  //contexts
  const {addItemToItemsToSell, itemsToSellList, editItemInItemsToSell} =
    useItemsToSellContext();
  const {productsList} = useProductsContext();
  const {showSnackMessage} = useSnackBar();
  const {setItemModalVisible, editMode, itemsToSellId, setEditMode, itemId} =
    useItemModalContext();

  useEffect(() => {
    if (editMode) {
      const selectedPiece = itemsToSellList!
        .get(itemsToSellId)
        ?.getItem(itemId);
      setQuantity(selectedPiece!.quantity.toString());
      setWidth(selectedPiece!.width.toString());
      setHeight(selectedPiece!.height.toString());
      setTipoVidrioId(selectedPiece!.product.id);
    } else {
      setQuantity('');
      setHeight('');
      setWidth('');
    }
  }, [editMode]);

  const getTipoVidrioObject = (prodId: string) => {
    const vidrio = productsList!.getProduct(prodId);
    if (vidrio) {
      return vidrio;
    } else {
      showSnackMessage('Producto no encontrado', 600);
    }
  };

  const handleCloseModal = () => {
    setEditMode(false);
    setItemModalVisible(false);
  };

  const handleCreateOrUpdate = () => {
    if (!editMode) {
      handleAddPiece();
      return;
    }
    updateproduct();
  };

  const handleAddPiece = () => {
    const product = getTipoVidrioObject(tipoVidrioId);
    if (product) {
      const newPiece = createItem(width, height, quantity, product);
      addItemToItemsToSell(itemsToSellId, newPiece);
      showSnackMessage('Agregado', 500);
    }
    if (widthRef && widthRef.current) {
      heightRef.current.focus();
      heightRef.current.clear();
    }
  };

  const updateproduct = () => {
    const product = getTipoVidrioObject(tipoVidrioId);
    if (product) {
      const newPiece = createItem(width, height, quantity, product);
      editItemInItemsToSell(itemsToSellId, itemId, newPiece);
      setItemModalVisible(false);
    }
  };

  const handleFocusPicker = useMemo(() => {
    return () => {
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
  }, []);

  return (
    <Modal animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Nuevo</Text>
        <DropDownPicker
          onOpen={handleFocusPicker}
          containerProps={{style: {width: 300}}}
          placeholder="Tipo de vidrio"
          listMode="FLATLIST"
          style={[styles.input, {alignSelf: 'center'}]}
          mode="BADGE"
          items={listForDropdown(productsList!.getProductsArray())}
          value={tipoVidrioId}
          setValue={setTipoVidrioId}
          labelProps={{style: {fontSize: 17, color: '#000'}}}
          itemKey="label"
          onClose={() => {
            setTimeout(() => {
              handleNextInput(heightRef, editMode);
            }, 0);
          }}
          open={showDropDown}
          setOpen={setShowDropDown}></DropDownPicker>
        <TextInput
          ref={heightRef}
          onSubmitEditing={() => handleNextInput(widthRef, editMode)}
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          keyboardType="number-pad"
          label="Alto"
          returnKeyType="next"
          error={!height}></TextInput>
        <TextInput
          ref={widthRef}
          onSubmitEditing={() => handleNextInput(quantityRef, editMode)}
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
            disabled={!width || !height || !tipoVidrioId}>
            {!editMode ? 'Añadir' : 'Guardar'}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ItemModal;

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
