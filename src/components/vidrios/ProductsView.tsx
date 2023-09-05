import {ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {Product, ProductsList} from '../../models';
import ProductDetailComponent from './ProductDetailComponent';
import {useProductsContext} from './context/products-context';
import {AddEditModalComponent} from './AddEditModal';
import {useProductModalContext} from './context/product-modal-context';
import React from 'react';

const ProductsView = () => {
  const {productModalVisible, setProductModalVisible} =
    useProductModalContext();

  const {productsList, errorAtLoadingProducts} = useProductsContext();

  return (
    <View style={{flex: 1}}>
      <Button
        onPress={() => {
          setProductModalVisible(true);
        }}
        mode="contained-tonal"
        disabled = {errorAtLoadingProducts}
        style={{margin: 4}}>
        Añadir
      </Button>
      {productModalVisible && <AddEditModalComponent></AddEditModalComponent>}
      {errorAtLoadingProducts ? <ErrorAtLoadingComponent/>:<ScrollProductsList productsList={productsList}/>}
    </View>
  );
};

const ErrorAtLoadingComponent = React.memo(()=>{
  return <View><Text>Error at loading products</Text></View>
})

const ScrollProductsList = ({productsList}:{productsList:ProductsList})=>{
return(<ScrollView contentContainerStyle={{flexGrow: 1}}>

  {productsList.productsMap.size ==0 && <View><Text>No hay productos</Text></View>}
  {productsList.productsMap.size >0 && productsList!.getProductsArray().map((product: Product) => {
    return (
      <ProductDetailComponent
        product={product}
        key={product.id}></ProductDetailComponent>
    );
  })}
</ScrollView>)
}

export default ProductsView;
