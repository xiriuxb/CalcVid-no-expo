import React from 'react';
import {View} from 'react-native';
import {Route, Routes} from 'react-router-native';
import ListaView from './components/listas/WindowsListView';
import ListaVidriosView from './components/vidrios/ListaVidriosView';
import {AppBar} from './components/AppBar';
import WindowsListProvider from './components/listas/context/WindowsListProvider';
import {SnackBarProvider} from './components/snack-bar/SnackBarProvider';
const Main = () => {
  return (
    <View style={{flex: 1}}>
      <AppBar></AppBar>
      <SnackBarProvider>
        <WindowsListProvider>
          <Routes>
            <Route path="/" Component={ListaView} />
            <Route path="/vidrios" Component={ListaVidriosView} />
          </Routes>
        </WindowsListProvider>
      </SnackBarProvider>
    </View>
  );
};

export default Main;
