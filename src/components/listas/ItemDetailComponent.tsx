import {useMemo} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {Item, ProductPriceCalculus} from '../../models/';
import globalStyles from '../common/Styles';
import {useItemModalContext, useItemsToSellContext} from './context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ItemDetailComponent = ({
  item,
  itemsToSellId,
}: {
  item: Item;
  itemsToSellId: string;
}) => {
  const {setItemModalVisible, setEditMode, setItemId} = useItemModalContext();
  const {deleteItem, reloadTotals} = useItemsToSellContext();

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={openModalToEdit}>
          <Text style={globalStyles.sizedText}>
            {`${
              item.product.type === ProductPriceCalculus.calculated
                ? `${item.width} x `
                : ''
            }${
              item.product.type != ProductPriceCalculus.not_calculated
                ? `${item.height} =`
                : ''
            }${item.quantity} | ${item.product.name}`}
          </Text>
        </TouchableOpacity>
        {item.product.type != ProductPriceCalculus.not_calculated && (
          <Text style={{textAlign: 'center'}}>
            {`${item.individualArea.toFixed(2)}\n${item.totalArea.toFixed(2)}`}
          </Text>
        )}
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
      </View>

      <TouchableOpacity onPress={createTwoButtonAlert}>
        <FontAwesome
          name="trash"
          size={17}
          color={'red'}
          style={{paddingTop: 6, paddingHorizontal: 5}}
        />
        <Text style={{color: 'white'}}>Info</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemDetailComponent;
