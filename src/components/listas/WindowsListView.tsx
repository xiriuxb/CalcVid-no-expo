import {useContext} from 'react';
import {TopStatus} from './TopStatus';
import {ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import PieceModalProvider from './context/PieceModalProvider';
import ModalAuxComponent from './Modal';
import ItemsToSellListContext from './context/WindowsListContext';
import ItemsToSell from '../../models/ItemsToSell';
import ItemsToSellDetailComponent from './WindowDetailComponent';

const ListaView = () => {
  const {itemsToSellList, addItemsToSell} = useContext(ItemsToSellListContext);

  return (
    <PieceModalProvider>
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
    </PieceModalProvider>
  );
};

export default ListaView;
