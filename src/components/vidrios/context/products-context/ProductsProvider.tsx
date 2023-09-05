import {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Product, ProductsList} from '../../../../models';
import {useSnackBar} from '../../../snack-bar/SnackBarContext';
import {ProductsContext} from './ProductsContext';

const storeProducts = async (map: Map<string, Product>, onErrorCallback:()=>void) => {
  const mapAsArray = Array.from(map.entries());
  try {
    await AsyncStorage.setItem('products', JSON.stringify(mapAsArray));
  } catch (error) {
    ()=>onErrorCallback()
  }
};

const getProductsFromStorage = async (onErrorCallback:()=>void) => {
  try{
    const storedProducts = await AsyncStorage.getItem('products');
    if (storedProducts === null) {
      onErrorCallback()
    } else {
      const deserializedArray = JSON.parse(storedProducts);
      return new Map<string, Product>(deserializedArray);
    }
  } catch (e){
    onErrorCallback()
  }
}

export const ProductsProvider = ({children}: {children: React.ReactNode}) => {
  const [productsList, setProductsList] = useState<Map<string, Product>>(
    new Map(),
  );
  const [errorAtLoadingProducts,setErrorAtLoadingProducts] = useState(false)

  const [listaClass,setListaClass] = useState(new ProductsList(productsList))

  const {showSnackMessage} = useSnackBar();

  useEffect(() => {
    loadProductsList();
  }, []);

  useEffect(() => {
    setListaClass(new ProductsList(productsList))
  }, [productsList]);

  const loadProductsList =async ()=>{
    const val = await getProductsFromStorage(handleErrorAtListLoad)
      if(val!=undefined){
        setProductsList(new Map(val));
        setListaClass( new ProductsList(new Map(val)));
      }
  }

  const handleErrorAtListLoad = ()=>{
    showSnackMessage('Error al cargar productos');
    setErrorAtLoadingProducts(true);
  }

  const addProduct = (newProduct: Product) => {
    listaClass.addProduct(newProduct)
    storeProducts(listaClass.productsMap,()=> {showSnackMessage('error loading products')})
    .then(()=>{
      setProductsList(new Map(listaClass.productsMap))
    });
    showSnackMessage('Añadido', 1000)
  };

  const updateProduct = (id: string, newProduct: Product) => {
    listaClass.updateProduct(id, newProduct);
    storeProducts(listaClass.productsMap,()=> {showSnackMessage('error loading products')})
    .then(()=>{
      setProductsList(new Map(listaClass.productsMap))
    });
    showSnackMessage('Actualizado', 1000)
  };

  const deleteProduct = (id: string) => {
    listaClass.deleteProduct(id);
    storeProducts(listaClass.productsMap,()=> {showSnackMessage('error loading products')})
    .then(()=>{
      setProductsList(new Map(listaClass.productsMap))
    });
    showSnackMessage('Eliminado', 1000)
  };

  return (
    <ProductsContext.Provider
      value={{
        productsList: listaClass,
        addProduct,
        updateProduct,
        deleteProduct,
        errorAtLoadingProducts
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
