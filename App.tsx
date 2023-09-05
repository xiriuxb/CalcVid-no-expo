import { useEffect } from 'react';
import {PaperProvider} from 'react-native-paper';
import {NativeRouter} from 'react-router-native';
import Main from './src/Main';
import {SnackBarProvider} from './src/components/snack-bar/SnackBarProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductsList } from './src/models';

function App(): JSX.Element {
  useEffect(() => {
    AsyncStorage.getItem('appFirstRun').then((value) => {
      if (value === null) {
        const map = new ProductsList(new Map());
        AsyncStorage.setItem('appFirstRun', 'true');
        AsyncStorage.setItem('products', JSON.stringify(Array.from(map.productsMap.entries())));
      }
    });
  }, []);

  return (
    <PaperProvider>
      <SnackBarProvider>
        <NativeRouter>
          <Main></Main>
        </NativeRouter>
      </SnackBarProvider>
    </PaperProvider>
  );
}

export default App;
