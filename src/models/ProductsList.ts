import {Product} from './Product';

export class ProductsList {
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
  }

  updateProduct(productId: string, newProduct: Product) {
    if (!this.productsMap.has(productId)) {
      throw new Error(`Product with ID ${productId} does not exist.`);
    }
    const tempProduct = this.getProduct(productId);

    if (tempProduct){
      tempProduct.editProduct(
        newProduct.name,
        newProduct.type,
        newProduct.height,
        newProduct.width,
        newProduct.totalPrice,
        newProduct.unityPrices,
      );
      this.productsMap.set(productId, tempProduct);
    }
  }

  addProduct(newProduct: Product) {
    if (this.productExistByName(newProduct.name)) {
      throw new Error('Duplicated name');
    }
    this.productsMap.set(newProduct.id, newProduct);
  }

  productExistByName(productName: string) {
    const exist = this.getProductsArray().some(
      (prod: Product) => prod.name.toUpperCase() === productName.toUpperCase(),
    );
    return exist;
  }
}
