import {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Product from '../../../models/Product';
import ProductsList from '../../../models/ProductsList';
import ProductsContext from './GlassTypesContext';
import {useSnackBar} from '../../snack-bar/SnackBarContext';

const ProductsProvider = ({children}: {children: React.ReactNode}) => {
  const [productsList, setProductsList] = useState<Map<string, Product>>(
    new Map(),
  );

  const listaClass = useRef(new ProductsList(productsList));

  const {showSnackMessage} = useSnackBar();

  useEffect(() => {
    loadProductsList();
  }, []);

  const loadProductsList = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        const deserializedArray = JSON.parse(storedProducts);
        const reconstructedMap = new Map<string, Product>(deserializedArray);
        listaClass.current = new ProductsList(reconstructedMap);
        setProductsList(reconstructedMap);
      }
    } catch (error) {
      showSnackMessage('Error loading products: ' + error);
    }
  };

  const storeProducts = async (map: Map<string, Product>) => {
    const mapAsArray = Array.from(map.entries());
    try {
      await AsyncStorage.setItem('products', JSON.stringify(mapAsArray));
    } catch (error) {
      showSnackMessage('Error storing products: ' + error);
    }
  };

  const addProduct = (newProduct: Product) => {
    listaClass.current.addProduct(newProduct);
    setProductsList(listaClass.current.productsMap);
    storeProducts(listaClass.current.productsMap);
  };

  const updateProduct = (id: string, newProduct: Product) => {
    const updatedList = listaClass.current.updateProduct(id, newProduct);
    setProductsList(updatedList);
    storeProducts(updatedList);
  };

  const deleteProduct = (id: string) => {
    const updatedList = listaClass.current.deleteProduct(id);
    setProductsList(updatedList);
    storeProducts(updatedList);
  };

  return (
    <ProductsContext.Provider
      value={{
        productsList: listaClass.current,
        addProduct,
        updateProduct,
        deleteProduct,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
