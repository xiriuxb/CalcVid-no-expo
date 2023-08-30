import {Route, Routes} from 'react-router-native';
import ProductsView from '../vidrios/ProductsView';
import ListaView from '../listas/ItemsToSellListView';
import {ItemsToSellListProvider} from '../listas/context';

const MainRoutesComponent = () => {
  return (
    <ItemsToSellListProvider>
      <Routes>
        <Route path="/" Component={ListaView} />
        <Route path="/products" Component={ProductsView} />
      </Routes>
    </ItemsToSellListProvider>
  );
};

export default MainRoutesComponent;
