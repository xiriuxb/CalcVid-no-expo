import { useEffect, useState } from 'react';
import {PaperProvider} from 'react-native-paper';
import {NativeRouter} from 'react-router-native';
import Main from './src/Main';
import {SnackBarProvider} from './src/components/snack-bar/SnackBarProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductsList } from './src/models';
import { Text, View } from 'react-native';

function App(): JSX.Element {
  const [creatingList, setCreatingList] = useState(false)
  useEffect(() => {
    runOnFirst()
  }, []);
  
  const runOnFirst=()=>{
    AsyncStorage.getItem('appFirstRun').then((value) => {
      if (value === null) {
        setCreatingList(true)
        const map = new ProductsList(new Map());
        AsyncStorage.setItem('appFirstRun', 'true');
        AsyncStorage.setItem('products', JSON.stringify(Array.from(map.productsMap.entries()))).then(()=>{setCreatingList(false)});
      }
    });
  }

  return (
    <PaperProvider>
      <SnackBarProvider>
        <NativeRouter>
          {creatingList ? <View><Text>Creando archivos necesarios</Text></View>:<Main></Main>}
        </NativeRouter>
      </SnackBarProvider>
    </PaperProvider>
  );
}

export default App;
