import {useContext, useMemo} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import Item from '../../models/Item';
import {TouchableRipple} from 'react-native-paper';
import globalStyles from '../common/Styles';
import ItemModalContext from './context/PieceModalContext';
import ItemsToSellListContext from './context/WindowsListContext';

const ItemDetailComponent = ({
  item,
  itemsToSellId,
}: {
  item: Item;
  itemsToSellId: string;
}) => {
  const {setItemModalVisible, setEditMode, setItemId} =
    useContext(ItemModalContext);
  const {deleteItem, reloadTotals} = useContext(ItemsToSellListContext);

  const changePrice = useMemo(() => {
    return () => {
      item.autoSetSelectedPrice();
      reloadTotals();
    };
  }, []);

  const createTwoButtonAlert = useMemo(() => {
    return () => {
      Alert.alert('Eliminar', '¿Quiere eliminar?', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteItem(itemsToSellId, item.id)},
      ]);
    };
  }, []);

  const openModalToEdit = useMemo(() => {
    return () => {
      setEditMode(true);
      setItemId(item.id);
      setItemModalVisible(true, itemsToSellId);
    };
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'black',
      }}>
      <View>
        <TouchableOpacity onPress={openModalToEdit}>
          <Text style={globalStyles.sizedText}>
            {`${item.width} x ${item.height} =${item.quantity} | ${item.product.name}`}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{textAlign: 'center'}}>
        {`${item.individualArea.toFixed(2)}\n${item.totalArea.toFixed(2)}`}
      </Text>

      <View style={{flexDirection: 'row'}}>
        <Text style={{alignSelf: 'center'}}>{item.selectedPrice} </Text>
        <TouchableOpacity onPress={changePrice}>
          <View>
            <Text style={globalStyles.sizedText}>
              {item.individualPrice().toFixed(2)}
            </Text>
            <Text style={globalStyles.sizedText}>
              {item.totalPrice.toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableRipple onPress={createTwoButtonAlert}>
        <Text style={[globalStyles.boldText, globalStyles.errorText]}>
          Eliminar
        </Text>
      </TouchableRipple>
    </View>
  );
};

export default ItemDetailComponent;
