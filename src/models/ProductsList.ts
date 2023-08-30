import Product from './Product';

export default class ProductsList {
  productsMap: Map<string, Product>;

  constructor(productMap: Map<string, Product>) {
    this.productsMap = productMap;
  }

  getProductsArray() {
    return Array.from(this.productsMap.values());
  }

  getProduct(productId: string): Product | undefined {
    return this.productsMap.get(productId);
  }

  deleteProduct(productId: string) {
    if (!this.productsMap.has(productId)) {
      throw new Error(`Product with ID ${productId} does not exist.`);
    }
    this.productsMap.delete(productId);
    return this.productsMap;
  }

  updateProduct(productId: string, newProduct: Product) {
    if (!this.productsMap.has(productId)) {
      throw new Error(`Product with ID ${productId} does not exist.`);
    }
    const tempProduct = this.productsMap.get(productId);
    const updatedProduct = tempProduct!.editProduct(
      newProduct.name,
      newProduct.type,
      newProduct.height,
      newProduct.width,
      newProduct.totalPrice,
      newProduct.unityPrices,
    );
    this.productsMap.set(productId, updatedProduct);
    return this.productsMap;
  }

  addProduct(newProduct: Product) {
    if (this.productExistByName(newProduct.name)) {
      throw new Error('Duplicated name');
    }
    this.productsMap.set(newProduct.id, newProduct);
    return this.productsMap;
  }

  productExistByName(productName: string) {
    const exist = this.getProductsArray().some(
      (prod: Product) => prod.name.toUpperCase() === productName.toUpperCase(),
    );
    return exist;
  }
}
