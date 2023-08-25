import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {NativeRouter} from 'react-router-native';
import Main from './src/Main';
import {SnackBarProvider} from './src/components/snack-bar/SnackBarProvider';

function App(): JSX.Element {
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
