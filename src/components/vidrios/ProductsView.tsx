import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Product} from '../../models';
import ProductDetailComponent from './ProductDetailComponent';
import {useProductsContext} from './context/products-context';
import {AddEditModalComponent} from './AddEditModal';
import {useProductModalContext} from './context/product-modal-context';
import React, { useEffect, useState } from 'react';

const ProductsView = () => {
  const {productModalVisible, setProductModalVisible} =
    useProductModalContext();

  const {productsMap, errorAtLoadingProducts} = useProductsContext();

  const [productsArrL,setProductArrL] = useState(productsMap.getProductsArray());

  const [searchValue, setSearchValue] = useState('')

  const filterArr = () =>{

  }

  useEffect(()=>{
    if(searchValue){
      const filtered = productsMap.getProductsArray().filter((pr)=>pr.name.toLowerCase().includes(searchValue.toLowerCase()))
      setProductArrL(filtered);
    } else {
      setProductArrL(productsMap.getProductsArray())
    }
  }, [searchValue])

  return (
    <View style={{flex: 1}}>
      <View style={styles.optionsBar}>
        <TextInput
        value={searchValue}
        onChangeText={(text)=>setSearchValue(text)}
          style={styles.searchInput}
          clearButtonMode="always"
          placeholder="Buscar"></TextInput>
        <Button
          onPress={() => {
            setProductModalVisible(true);
          }}
          mode="contained-tonal"
          disabled={errorAtLoadingProducts}
          style={{margin: 4}}>
          Añadir
        </Button>
      </View>
      {productModalVisible && <AddEditModalComponent></AddEditModalComponent>}
      {errorAtLoadingProducts ? (
        <ErrorAtLoadingComponent />
      ) : (
        <ScrollProductsMap productsMap={productsArrL} />
      )}
    </View>
  );
};

const ErrorAtLoadingComponent = React.memo(() => {
  return (
    <View>
      <Text>Error at loading products</Text>
    </View>
  );
});

const ScrollProductsMap = ({productsMap}: {productsMap: Product[]}) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {productsMap.length == 0 && (
        <View>
          <Text>No hay productos</Text>
        </View>
      )}
      {productsMap.length > 0 &&
        productsMap!.map((product: Product) => {
          return (
            <ProductDetailComponent
              product={product}
              key={product.id}></ProductDetailComponent>
          );
        })}
    </ScrollView>
  );
};

export default ProductsView;

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    borderColor: '#dedede',
    borderWidth: 1,
    borderRadius: 50,
    height: '80%',
    alignSelf: 'center',
  },
  optionsBar: {
    flexDirection: 'row',
    elevation: 50,
    backgroundColor: '#fff',
    shadowColor: '#000',
    paddingHorizontal: 5,
  },
});
