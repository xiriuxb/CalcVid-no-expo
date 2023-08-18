import {View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useSnackBar} from './SnackBarContext';

const SnackBarComponent = () => {
  const {snackMessage, hideSnackMessage, snackDuration} = useSnackBar();
  return (
    <View
      style={{position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 100}}>
      <Snackbar
        visible={!!snackMessage}
        duration={snackDuration}
        onDismiss={hideSnackMessage}
        action={{
          label: 'Ocultar',
          onPress: hideSnackMessage,
        }}>
        {snackMessage}
      </Snackbar>
    </View>
  );
};

export default SnackBarComponent;
