import {View, Text, StyleSheet} from 'react-native';
import globalStyles from '../common/Styles';

interface props {
  totalMeters: number;
  totalGlassPieces: number;
  totalPrice: number;
}

export const TopStatus = ({
  totalMeters,
  totalGlassPieces,
  totalPrice,
}: props) => {
  return (
    <View style={styles.container}>
      <Text style={globalStyles.sizedText}>
        <Text style={globalStyles.boldText}>Metros(m²):</Text>
        {totalMeters.toFixed(2)}
      </Text>
      <Text style={globalStyles.sizedText}>
        <Text style={globalStyles.boldText}>Vidrios:</Text>
        {totalGlassPieces}
      </Text>
      <Text style={globalStyles.sizedText}>
        <Text style={globalStyles.boldText}>Precio:</Text>{' '}
        {totalPrice.toFixed(2)}
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
