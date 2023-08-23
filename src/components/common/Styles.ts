import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
  },
  centered: {
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  sizedText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});

export default globalStyles;
