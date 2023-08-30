import {View, Text, StyleSheet, Alert} from 'react-native';
import {Button, TouchableRipple} from 'react-native-paper';
import globalStyles from '../common/Styles';
import ItemsToSell from '../../models/ItemsToSell';
import {useContext} from 'react';
import ItemsToSellListContext from './context/WindowsListContext';
import ItemModalContext from './context/PieceModalContext';
import ItemDetailComponent from './GlassPieceDetailComponent';

interface props {
  itemsToSell: ItemsToSell;
}

const ItemsToSellDetailComponent = ({itemsToSell}: props) => {
  const {removeItemsToSell} = useContext(ItemsToSellListContext);
  const {setItemModalVisible} = useContext(ItemModalContext);

  const changeCurrentWindow = () => {
    setItemModalVisible(true, itemsToSell.id);
  };

  const handleDeleteWindow = () => {
    Alert.alert('Eliminar', '¿Desea eliminar el listado?', [
      {text: 'Cancelar', style: 'cancel'},
      {
        text: 'OK',
        style: 'default',
        onPress: () => {
          removeItemsToSell(itemsToSell.id);
        },
      },
    ]);
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
        <Text
          style={[
            {fontSize: 18, fontWeight: 'bold', justifyContent: 'flex-start'},
          ]}>
          {itemsToSell.name}
        </Text>
        <TouchableRipple onPress={handleDeleteWindow}>
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
        <Text>Alto x Ancho = Cant</Text>
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
});

export default ItemsToSellDetailComponent;
