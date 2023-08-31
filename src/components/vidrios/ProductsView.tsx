import {ScrollView, View} from 'react-native';
import {Button} from 'react-native-paper';
import {Product} from '../../models';
import ProductDetailComponent from './ProductDetailComponent';
import {useProductsContext} from './context/products-context';
import {AddEditModalComponent} from './AddEditModal';
import {useProductModalContext} from './context/product-modal-context';

const ProductsView = () => {
  const {productModalVisible, setProductModalVisible, setEditProductId} =
    useProductModalContext();

  const {productsList} = useProductsContext();

  return (
    <View style={{flex: 1}}>
      <Button
        onPress={() => {
          setProductModalVisible(true);
        }}
        mode="contained-tonal"
        style={{margin: 4}}>
        Añadir
      </Button>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {productModalVisible && <AddEditModalComponent></AddEditModalComponent>}
        {productsList!.getProductsArray().map((product: Product) => {
          return (
            <ProductDetailComponent
              product={product}
              key={product.id}></ProductDetailComponent>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ProductsView;
