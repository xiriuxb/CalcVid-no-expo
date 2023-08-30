import {TopStatus} from './TopStatus';
import {ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import ModalAuxComponent from './Modal';
import {ItemsToSell} from '../../models';
import ItemsToSellDetailComponent from './ItemsToSellDetailComponent';
import {useItemsToSellContext, ItemModalProvider} from './context';

const ListaView = () => {
  const {itemsToSellList, addItemsToSell} = useItemsToSellContext();

  return (
    <ItemModalProvider>
      <View style={{flex: 1}}>
        <TopStatus></TopStatus>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {Array.from(itemsToSellList!.values()).map(
            (itemsToSell: ItemsToSell) => {
              return (
                <ItemsToSellDetailComponent
                  itemsToSell={itemsToSell}
                  key={itemsToSell.id}></ItemsToSellDetailComponent>
              );
            },
          )}
        </ScrollView>
        <ModalAuxComponent></ModalAuxComponent>
        <View style={{marginVertical: 3, marginHorizontal: 10}}>
          <Button mode="contained-tonal" onPress={addItemsToSell}>
            Nueva Ventana
          </Button>
        </View>
      </View>
    </ItemModalProvider>
  );
};

export default ListaView;
