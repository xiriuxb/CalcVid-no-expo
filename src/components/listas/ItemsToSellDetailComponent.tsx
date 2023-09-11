import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {Button, TouchableRipple} from 'react-native-paper';
import globalStyles from '../common/Styles';
import {ItemsToSell} from '../../models';
import {useItemModalContext, useItemsToSellContext} from './context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {useSnackBar} from '../snack-bar/SnackBarContext';
import ItemListByCatComponent from './items-details/ItemListByCatComponent';

interface props {
  itemsToSell: ItemsToSell;
}

const handleDeleteWindow = (onOkCallback: () => void) => {
  Alert.alert('Eliminar', '¿Desea eliminar la lista?', [
    {text: 'Cancelar', style: 'cancel'},
    {
      text: 'OK',
      style: 'default',
      onPress: () => {
        onOkCallback();
      },
    },
  ]);
};

const ItemsToSellDetailComponent = ({itemsToSell}: props) => {
  const {removeItemsToSell, itemsToSellList} = useItemsToSellContext();
  const {setItemModalVisible} = useItemModalContext();
  const [orderedItems, setOrderedItems] = useState<Map<string, ItemsToSell>>(
    new Map(),
  );

  useEffect(() => {
    setOrderedItems(itemsToSell.orderItems('productType'));
  }, [itemsToSellList]);

  const changeCurrentWindow = () => {
    setItemModalVisible(true, itemsToSell.id);
  };

  return (
    <View style={styles.ventana}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 2,
        }}>
        <TopInfo title={itemsToSell.name} id={itemsToSell.id}></TopInfo>
        <TouchableRipple
          onPress={() =>
            handleDeleteWindow(() => removeItemsToSell(itemsToSell.id))
          }>
          <Text style={[globalStyles.boldText, globalStyles.errorText]}>
            Eliminar
          </Text>
        </TouchableRipple>
      </View>
        <Button mode="contained-tonal" onPress={changeCurrentWindow}>
          Añadir
        </Button>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={globalStyles.boldText}>Total Productos: </Text>
          <Text style={globalStyles.sizedText}>
            {itemsToSell.totalItems()}{' '}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={globalStyles.boldText}>Precio Total: </Text>
          <Text style={globalStyles.sizedText}>
            $ {itemsToSell.totalPrice().toFixed(2)}{' '}
          </Text>
        </View>
      </View>
      {Array.from(orderedItems.values()).map(el => {
        return (
          <ItemListByCatComponent
            key={el.id}
            itemsArray={el}
            itemsToSellId={itemsToSell.id}
          />
        );
      })}
    </View>
  );
};

const TopInfo = ({title, id}: {title: string; id: string}) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const inputRef = useRef<any | null>(null);
  const {updateItemsListName} = useItemsToSellContext();
  const {showSnackMessage} = useSnackBar();

  const handleEditListName = () => {
    setIsEditTitle(!isEditTitle);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleOnCloseInput = () => {
    setInputValue(title);
    setIsEditTitle(!isEditTitle);
  };

  const handleUpdateName = () => {
    try {
      updateItemsListName(id, inputValue);
      setIsEditTitle(!isEditTitle);
    } catch (e: any) {
      showSnackMessage(e);
    }
  };

  return (
    <View style={{flexDirection: 'row'}}>
      {!isEditTitle && <Text style={globalStyles.title}>{title}</Text>}
      {isEditTitle && (
        <View style={styles.container}>
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            value={inputValue}
            onSubmitEditing={handleUpdateName}
            blurOnSubmit={false}
            onChangeText={setInputValue}></TextInput>
        </View>
      )}
      {!isEditTitle && (
        <TouchableOpacity onPress={() => handleEditListName()}>
          <FontAwesome
            name="pencil"
            size={18}
            style={{paddingTop: 3, paddingHorizontal: 4}}></FontAwesome>
        </TouchableOpacity>
      )}
      {isEditTitle && (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <FontAwesome
              name="close"
              size={18}
              color={'red'}
              onPress={() => handleOnCloseInput()}
              style={{paddingTop: 3, paddingHorizontal: 6}}></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome
              onPress={handleUpdateName}
              name="check"
              disabled={
                inputValue.trim().length > 16 || inputValue.trim().length < 1
              }
              size={18}
              style={{paddingTop: 3, paddingHorizontal: 6}}></FontAwesome>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ventana: {
    padding: 5,
    borderColor: '#000',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1.2,
    margin: 5,
  },
  buttonIcon: {
    width: 32,
    height: 32,
  },
  container: {
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  textInput: {
    padding: 0,
    margin: 0,
    fontSize: 16,
  },
});

export default ItemsToSellDetailComponent;
