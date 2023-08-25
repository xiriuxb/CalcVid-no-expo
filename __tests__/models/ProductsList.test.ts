import Product from '../../src/models/Product';
import ProductList from '../../src/models/ProductsList';

it('should add a product to the list and retrieve it successfully', () => {
  const productList = new ProductList(new Map());
  const product = new Product('Product 1', 'unique', 10, 20, 100, {
    priceA: 12,
    priceB: 12,
    priceC: 0,
  });
  productList.addProduct(product);
  const retrievedProduct = productList.getProduct(product.id);
  expect(retrievedProduct).toEqual(product);
});

// it('should update a product in the list and retrieve it successfully', () => {
//   const productList = new ProductList(new Map());
//   const product = new Product('Product 1', 'unique', 10, 20, 100, {
//     priceA: 12,
//     priceB: 12,
//     priceC: 0,
//   });
//   productList.addProduct(product);
//   const updProduct = new Product('Product Upd', 'unique', 10, 20, 100, {
//     priceA: 14,
//     priceB: 12,
//     priceC: 0,
//   });
//   productList.updateProduct(product.id, updProduct);
//   expect(updProduct).toEqual(productList.getProduct(product.id));
// });

it('should delete a product from the list and verify that it was removed', () => {
  const productList = new ProductList(new Map());
  const product = new Product('Product 1', 'unique', 10, 20, 100, {priceA: 10});
  productList.addProduct(product);
  productList.deleteProduct(product.id);
  const retrievedProduct = productList.getProduct(product.id);
  expect(retrievedProduct).toBeUndefined();
});

it('should return undefined when trying to retrieve a non-existent product', () => {
  const productList = new ProductList(new Map());
  const retrievedProduct = productList.getProduct('non-existent-id');
  expect(retrievedProduct).toBeUndefined();
});

it('should not change the map when trying to update a non-existent product', () => {
  const productList = new ProductList(new Map());
  const updatedProduct = new Product(
    'Updated Product',
    'calculated',
    15,
    25,
    150,
    {priceA: 1},
  );
  const updateNonExistentProduct = () => {
    productList.updateProduct('non-existent-id', updatedProduct);
  };
  expect(updateNonExistentProduct).toThrow(Error);
});

it('should not change the map when trying to delete a non-existent product', () => {
  const productList = new ProductList(new Map());
  const deleteNotExistentProduct = () => {
    productList.deleteProduct('non-existent-id');
  };
  expect(deleteNotExistentProduct).toThrow(Error);
});

it('should add multiple products to the list and retrieve the array', () => {
  const productList = new ProductList(new Map());
  const product1 = new Product('Product 1', 'unique', 10, 20, 100, {priceA: 1});
  const product2 = new Product('Product 2', 'calculated', 15, 25, 150, {
    priceA: 1,
  });
  const product3 = new Product('Product 3', 'unique', 12, 18, 120, {priceA: 1});

  productList.addProduct(product1);
  productList.addProduct(product2);
  productList.addProduct(product3);

  const productsArray = productList.getProductsArray();

  expect(productsArray).toEqual([product1, product2, product3]);
});

it('should throw an error if try to add a product with the same name as an existent', () => {
  const productList = new ProductList(new Map());
  const product1 = new Product('Product 1', 'unique', 10, 20, 100, {priceA: 1});
  productList.addProduct(product1);
  const product2 = new Product('Product 1', 'unique', 10, 20, 100, {priceA: 1});
  const addProductSameName = () => {
    productList.addProduct(product2);
  };
  expect(addProductSameName).toThrow(Error);
});
