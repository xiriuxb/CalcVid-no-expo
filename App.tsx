import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {NativeRouter} from 'react-router-native';
import Main from './src/Main';

function App(): JSX.Element {
  return (
    <PaperProvider>
      <NativeRouter>
        <Main></Main>
      </NativeRouter>
    </PaperProvider>
  );
}

export default App;
