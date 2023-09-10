import {useState, useEffect, useReducer, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product, ProductsList} from '../../../../models';
import {useSnackBar} from '../../../snack-bar/SnackBarContext';
import {ProductsContext} from './ProductsContext';

const storeProducts = async (map: Map<string, Product>) => {
  const mapAsArray = Array.from(map.entries());
  try {
    await AsyncStorage.setItem('products', JSON.stringify(mapAsArray));
  } catch (error) {
    throw new Error('Error at loading products');
  }
};

const getProductsFromStorage = async () => {
  try {
    const storedProducts = await AsyncStorage.getItem('products');
    if (storedProducts === null) {
      throw new Error('Error at loading products');
    } else {
      const deserializedArray = JSON.parse(storedProducts);
      return new Map<string, Product>(deserializedArray);
    }
  } catch (e) {
    throw new Error('Error at loading products');
  }
};

export const ProductsProvider = ({children}: {children: React.ReactNode}) => {
  const [listClass, setListClass] = useState(new ProductsList(new Map()));
  const firsExecutionRef = useRef<boolean>(true);
  const [errorAtLoadingProducts, setErrorAtLoadingProducts] = useState(false);
  const {showSnackMessage} = useSnackBar();

  useEffect(() => {
    loadProductsList();
  }, []);

  useEffect(() => {
    if (firsExecutionRef.current) {
      firsExecutionRef.current = false;
    } else {
      try {
        storeProducts(listClass.productsMap);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        showSnackMessage(errorMessage);
      }
    }
  }, [listClass]);

  const loadProductsList = async () => {
    try {
      const val = await getProductsFromStorage();
      firsExecutionRef.current = true; //this is for avoid the execution of StoreProducts the first time the list os loaded
      if (val != undefined) {
        setListClass(new ProductsList(val));
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      showSnackMessage(errorMessage);
      setErrorAtLoadingProducts(true);
    }
  };

  const handleCRUD = (
    crudFunc: 'added' | 'changed' | 'deleted',
    id: string = '-1',
    newProduct: Product | undefined,
  ) => {
    try {
      const crudFunctions = {
        added: () => handleAddProduct(newProduct!),
        changed: () => handleUpdateProduct(id,newProduct!),
        deleted: () => handleDeleteProduct(id),
      };
      return crudFunctions[crudFunc]();
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      throw new Error(errorMessage);
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    const updatedClass = new ProductsList(listClass.productsMap);
    updatedClass.addProduct(newProduct!);
    setListClass(updatedClass);
  };

  const handleUpdateProduct = (prodId:string, newProduct: Product) => {
    const updatedClass = new ProductsList(listClass.productsMap);
    updatedClass.updateProduct(prodId,newProduct!);
    setListClass(updatedClass);
  };

  const handleDeleteProduct = (prodId:string,) => {
    const updatedClass = new ProductsList(listClass.productsMap);
    updatedClass.deleteProduct(prodId);
    setListClass(updatedClass);
  };

  return (
    <ProductsContext.Provider
      value={{
        productsMap: listClass,
        productListCrudOptions: handleCRUD,
        errorAtLoadingProducts,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
