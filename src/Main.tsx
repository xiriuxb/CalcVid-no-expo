import React from 'react';
import {View} from 'react-native';
import {Route, Routes} from 'react-router-native';
import ListaView from './components/listas/WindowsListView';
import ListaVidriosView from './components/vidrios/ListaVidriosView';
import {AppBar} from './components/AppBar';
const Main = () => {
  return (
    <View style={{flex: 1}}>
      <AppBar></AppBar>
      <Routes>
        <Route path="/" Component={ListaView} />
        <Route path="/vidrios" Component={ListaVidriosView} />
      </Routes>
    </View>
  );
};

export default Main;
