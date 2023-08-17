import {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import globalStyles from '../common/Styles';
import WindowsListContext from './context/WindowsListContext';

export const TopStatus = () => {
  const context = useContext(WindowsListContext);
  return (
    <View style={styles.container}>
      <Text style={globalStyles.sizedText}>
        <Text style={globalStyles.boldText}>Metros(m²):</Text>
        {context.totals.totalArea.toFixed(2)}
      </Text>
      <Text style={globalStyles.sizedText}>
        <Text style={globalStyles.boldText}>Vidrios:</Text>
        {context.totals.totalPieces}
      </Text>
      <Text style={globalStyles.sizedText}>
        <Text style={globalStyles.boldText}>Precio:</Text>{' '}
        {context.totals.totalPrice.toFixed(2)}
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
