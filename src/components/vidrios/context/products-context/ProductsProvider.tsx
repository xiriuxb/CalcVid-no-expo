import {useState, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product, ProductsList} from '../../../../models';
import {useSnackBar} from '../../../snack-bar/SnackBarContext';
import {ProductsContext} from './ProductsContext';

const storeProducts = async (
  map: Map<string, Product>,
  onErrorCallback: () => void,
) => {
  const mapAsArray = Array.from(map.entries());
  try {
    await AsyncStorage.setItem('products', JSON.stringify(mapAsArray));
  } catch (error) {
    () => onErrorCallback();
  }
};

const getProductsFromStorage = async (onErrorCallback: () => void) => {
  try {
    const storedProducts = await AsyncStorage.getItem('products');
    if (storedProducts === null) {
      onErrorCallback();
    } else {
      const deserializedArray = JSON.parse(storedProducts);
      return new Map<string, Product>(deserializedArray);
    }
  } catch (e) {
    onErrorCallback();
  }
};

function tasksReducer(
  productsClass: ProductsList,
  action: {
    type: string;
    productData?: {id: string; newProd: Product | undefined};
    productsMap: Map<string, Product>;
  },
) {
  switch (action.type) {
    case 'added': {
      productsClass.addProduct(action.productData!.newProd!);
      return productsClass;
    }
    case 'changed': {
      productsClass.updateProduct(
        action.productData!.id,
        action.productData!.newProd!,
      );
      return productsClass;
    }
    case 'deleted': {
      productsClass.deleteProduct(action.productData!.id);
      return productsClass;
    }
    case 'setted': {
      return new ProductsList(action.productsMap);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const ProductsProvider = ({children}: {children: React.ReactNode}) => {
  const [productsList, setProductsList] = useState<Map<string, Product>>(
    new Map(),
  );
  const [listaClass, dispatch] = useReducer(
    tasksReducer,
    new ProductsList(productsList),
  );
  const [errorAtLoadingProducts, setErrorAtLoadingProducts] = useState(false);
  const {showSnackMessage} = useSnackBar();

  useEffect(() => {
    loadProductsList();
  }, []);

  useEffect(() => {
    dispatch({type: 'setted', productsMap: productsList});
  }, [productsList]);

  const loadProductsList = async () => {
    const val = await getProductsFromStorage(handleErrorAtListLoad);
    if (val != undefined) {
      setProductsList(new Map(val));
      dispatch({type: 'setted', productsMap: productsList});
    }
  };

  const handleErrorAtListLoad = () => {
    showSnackMessage('Error al cargar productos');
    setErrorAtLoadingProducts(true);
  };

  const handleCRUD = (
    crudFunc: 'added' | 'changed' | 'deleted',
    id: string = '-1',
    newProduct: Product | undefined,
  ) => {
    try {
      dispatch({
        type: crudFunc,
        productData: {id: id, newProd: newProduct},
        productsMap: productsList,
      });
      storeProducts(listaClass.productsMap, () => {
        showSnackMessage('error saving products');
      }).then(() => {
        setProductsList(new Map(listaClass.productsMap));
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      showSnackMessage(errorMessage);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        productsList: listaClass,
        productListCrudOptions: handleCRUD,
        errorAtLoadingProducts,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
