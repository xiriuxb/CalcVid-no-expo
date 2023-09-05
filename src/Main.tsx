import {View} from 'react-native';
import {AppBar} from './components/AppBar';
import MainRoutesComponent from './components/routes/MainRoutesComponent';
import SnackBarComponent from './components/snack-bar/SnackBar';
import {useSnackBar} from './components/snack-bar/SnackBarContext';
import {ProductsProvider} from './components/vidrios/context/products-context';
const Main = () => {
  const {snackMessage} = useSnackBar();
  return (
    <View style={{flex: 1}}>
      <ProductsProvider>
      <AppBar></AppBar>
        <MainRoutesComponent></MainRoutesComponent>
      </ProductsProvider>
      {snackMessage && <SnackBarComponent></SnackBarComponent>}
    </View>
  );
};

export default Main;
