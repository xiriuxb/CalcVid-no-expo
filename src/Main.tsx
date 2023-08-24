import React from 'react';
import {View} from 'react-native';
import {AppBar} from './components/AppBar';
import {SnackBarProvider} from './components/snack-bar/SnackBarProvider';
import GlassTypesProvider from './components/vidrios/context/GlassTypesProvider';
import MainRoutesComponent from './components/routes/MainRoutesComponent';
const Main = () => {
  return (
    <View style={{flex: 1}}>
      <AppBar></AppBar>
      <SnackBarProvider>
        <GlassTypesProvider>
          <MainRoutesComponent></MainRoutesComponent>
        </GlassTypesProvider>
      </SnackBarProvider>
    </View>
  );
};

export default Main;
