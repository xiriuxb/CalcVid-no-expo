import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {Button, TouchableRipple} from 'react-native-paper';
import globalStyles from '../common/Styles';
import {ItemsToSell} from '../../models';
import ItemDetailComponent from './ItemDetailComponent';
import {useItemModalContext, useItemsToSellContext} from './context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native';
import {useRef, useState} from 'react';

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
  const {removeItemsToSell} = useItemsToSellContext();
  const {setItemModalVisible} = useItemModalContext();

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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={globalStyles.boldText}>M²: </Text>
          <Text style={globalStyles.sizedText}>
            {`${itemsToSell.totalArea().toFixed(2)}`}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={globalStyles.boldText}>TotalVidrios: </Text>
          <Text style={globalStyles.sizedText}>
            {itemsToSell.totalItems()}{' '}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={globalStyles.boldText}>PrecioTotal: </Text>
          <Text style={globalStyles.sizedText}>
            {itemsToSell.totalPrice().toFixed(2)}{' '}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: 'black',
        }}>
        <Text>Medidas = Cant</Text>
        <Text>Área</Text>
        <Text>Precios</Text>
        <Text>Accion</Text>
      </View>
      {Array.from(itemsToSell.items.values()).map(el => {
        return (
          <ItemDetailComponent
            item={el}
            key={el.id}
            itemsToSellId={itemsToSell.id}></ItemDetailComponent>
        );
      })}
      <Button mode="contained-tonal" onPress={changeCurrentWindow}>
        Añadir
      </Button>
    </View>
  );
};

const TopInfo = ({title, id}: {title: string; id: string}) => {
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const inputRef = useRef<any | null>(null);
  const {updateItemsListName} = useItemsToSellContext();

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
    updateItemsListName(id, inputValue);
    setIsEditTitle(!isEditTitle);
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
              onPress={() => handleUpdateName()}
              name="check"
              disabled={inputValue.length > 16}
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
    borderWidth: 1,
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
