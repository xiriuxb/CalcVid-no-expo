import {Route, Routes} from 'react-router-native';
import WindowsListProvider from '../listas/context/WindowsListProvider';
import ListaView from '../listas/WindowsListView';
import ListaVidriosView from '../vidrios/ListaVidriosView';

const MainRoutesComponent = () => {
  return (
    <WindowsListProvider>
      <Routes>
        <Route path="/" Component={ListaView} />
        <Route path="/products" Component={ListaVidriosView} />
      </Routes>
    </WindowsListProvider>
  );
};

export default MainRoutesComponent;
