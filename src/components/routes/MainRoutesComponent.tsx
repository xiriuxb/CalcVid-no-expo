import {Route, Routes} from 'react-router-native';
import ProductsView from '../vidrios/ProductsView';
import ListaView from '../listas/ItemsToSellListView';
import {ItemsToSellListProvider} from '../listas/context';
import {ProductModalProvider} from '../vidrios/context/product-modal-context';

const MainRoutesComponent = () => {
  return (
    <ItemsToSellListProvider>
      <ProductModalProvider>
        <Routes>
          <Route path="/" Component={ListaView} />
          <Route path="/products" Component={ProductsView} />
        </Routes>
      </ProductModalProvider>
    </ItemsToSellListProvider>
  );
};

export default MainRoutesComponent;
