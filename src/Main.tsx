import {View} from 'react-native';
import {AppBar} from './components/AppBar';
import GlassTypesProvider from './components/vidrios/context/GlassTypesProvider';
import MainRoutesComponent from './components/routes/MainRoutesComponent';
import SnackBarComponent from './components/snack-bar/SnackBar';
import {useSnackBar} from './components/snack-bar/SnackBarContext';
const Main = () => {
  const {snackMessage} = useSnackBar();
  return (
    <View style={{flex: 1}}>
      <AppBar></AppBar>
      <GlassTypesProvider>
        <MainRoutesComponent></MainRoutesComponent>
      </GlassTypesProvider>
      {snackMessage && <SnackBarComponent></SnackBarComponent>}
    </View>
  );
};

export default Main;
