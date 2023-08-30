import {View} from 'react-native';
import {AppBar} from './components/AppBar';
import MainRoutesComponent from './components/routes/MainRoutesComponent';
import SnackBarComponent from './components/snack-bar/SnackBar';
import {useSnackBar} from './components/snack-bar/SnackBarContext';
import ProductsProvider from './components/vidrios/context/ProductsProvider';
const Main = () => {
  const {snackMessage} = useSnackBar();
  return (
    <View style={{flex: 1}}>
      <AppBar></AppBar>
      <ProductsProvider>
        <MainRoutesComponent></MainRoutesComponent>
      </ProductsProvider>
      {snackMessage && <SnackBarComponent></SnackBarComponent>}
    </View>
  );
};

export default Main;
