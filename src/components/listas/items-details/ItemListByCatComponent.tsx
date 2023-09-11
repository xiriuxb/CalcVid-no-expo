import {Text, TouchableOpacity, View} from 'react-native';
import {ItemsToSell, ProductPriceCalculus} from '../../../models';
import ItemDetailComponent from '../ItemDetailComponent';
import {useEffect, useRef, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import globalStyles from '../../common/Styles';

const ItemListByCatComponent = ({
  itemsArray,
  itemsToSellId,
}: {
  itemsArray: ItemsToSell;
  itemsToSellId: string;
}) => {
  const productType = useRef(parseInt(itemsArray.name)).current;
  const [ored, setOred] = useState<ItemsToSell[]>([]);
  useEffect(() => {
    const ordered = Array.from(itemsArray.orderItems('productName').values());
    setOred(ordered);
  }, [itemsArray]);

  return (
    <View
      style={{
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        margin: 1,
        padding: 3,
      }}>
      <ExtraDetails
        area={itemsArray.totalArea()}
        items={itemsArray.totalItems()}
        cost={itemsArray.totalPrice()}
        name={productType.toString()}
        itemsMap={ored}></ExtraDetails>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            borderRightWidth: 1,
            paddingHorizontal: 4,
          }}>
          <Text>
            {productType != ProductPriceCalculus.not_calculated
              ? `Medidas(cm) = `
              : ''}
            Cant.
          </Text>
          {productType != ProductPriceCalculus.not_calculated && (
            <Text>
              {productType == ProductPriceCalculus.calculated
                ? 'Área(m²)'
                : 'Long(m)'}
            </Text>
          )}
          <Text>Precios</Text>
        </View>
        <Text> Del </Text>
      </View>
      {itemsArray.getItemsArray().map(el => {
        return (
          <ItemDetailComponent
            item={el}
            key={el.id}
            itemsToSellId={itemsToSellId}></ItemDetailComponent>
        );
      })}
    </View>
  );
};

export default ItemListByCatComponent;

const ExtraDetails = ({
  itemsMap,
  area,
  items,
  cost,
  name,
}: {
  itemsMap: ItemsToSell[];
  area: number;
  items: number;
  cost: number;
  name: string;
}) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowExtra = () => {
    setShowMore(!showMore);
  };

  return (
    <View style={{borderColor: '#dedede', borderWidth: 1, borderRadius:5, padding:4}}>
      <TouchableOpacity
        onPress={() => handleShowExtra()}
        style={{
          flexDirection: 'row',
          padding: 4,
          backgroundColor: '#42233454',
          borderRadius: 4,
        }}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            {name != ProductPriceCalculus.not_calculated.toString() && (
              <Text>{`m²: ${area.toFixed(2)}`}</Text>
            )}
            <Text>{`Productos: ${items}`}</Text>
            <Text>{`Precio: ${cost.toFixed(2)}`}</Text>
          </View>
        </View>
        {name != ProductPriceCalculus.not_calculated.toString() && (
          <FontAwesome
            name={showMore ? 'chevron-up' : 'chevron-down'}
            style={{
              paddingTop: 3,
              paddingHorizontal: 7,
              alignContent: 'center',
            }}></FontAwesome>
        )}
      </TouchableOpacity>
      {showMore &&
        name != ProductPriceCalculus.not_calculated.toString() &&
        itemsMap.map(el => {
          return (
            <View
              key={el.id}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={globalStyles.boldText}>{el.name}</Text>
              <Text style={globalStyles.sizedText}>{`Area: ${el
                .totalArea()
                .toFixed(2)}`}</Text>
              <Text
                style={
                  globalStyles.sizedText
                }>{`Items: ${el.totalItems()}`}</Text>
              <Text style={globalStyles.sizedText}>{`Precio: ${el
                .totalPrice()
                .toFixed(2)}`}</Text>
            </View>
          );
        })}
    </View>
  );
};
