import {View, Text, StyleSheet} from 'react-native';
import globalStyles from '../common/Styles';
import {useItemsToSellContext} from './context';

export const TopStatus = () => {
  const {totals} = useItemsToSellContext();
  return (
    <View style={styles.container}>
      <Text style={globalStyles.sizedText}>
        <Text style={globalStyles.boldText}>Metros(m²):</Text>
        {totals.totalArea.toFixed(2)}
      </Text>
      <Text style={globalStyles.sizedText}>
        <Text style={globalStyles.boldText}>Vidrios:</Text>
        {totals.totalItems}
      </Text>
      <Text style={globalStyles.sizedText}>
        <Text style={globalStyles.boldText}>Precio:</Text>{' '}
        {totals.totalPrice.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderBottomStyle: 'solid',
  },
});
