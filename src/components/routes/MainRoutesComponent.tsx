import {Route, Routes} from 'react-router-native';
import WindowsListProvider from '../listas/context/items-to-sell-context/ItemsToSellProvider';
import ProductsView from '../vidrios/ProductsView';
import ListaView from '../listas/ItemsToSellListView';

const MainRoutesComponent = () => {
  return (
    <WindowsListProvider>
      <Routes>
        <Route path="/" Component={ListaView} />
        <Route path="/products" Component={ProductsView} />
      </Routes>
    </WindowsListProvider>
  );
};

export default MainRoutesComponent;
