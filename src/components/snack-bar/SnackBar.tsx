import {View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useSnackBar} from './SnackBarContext';

const SnackBarComponent = () => {
  const {snackMessage, hideSnackMessage, snackDuration} = useSnackBar();

  return (
    <View
      style={{
        position: 'relative',
        height: 60,
      }}>
      <Snackbar
        visible={!!snackMessage}
        duration={snackDuration}
        onDismiss={hideSnackMessage}
        style={{top: 0}}
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
