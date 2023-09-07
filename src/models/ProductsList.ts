import {Product} from './Product';

export class ProductsList {
  productsMap: Map<string, Product>;

  constructor(productMap: Map<string, Product>) {
    this.productsMap = productMap;
  }

  getProductsArray() {
    return Array.from(this.productsMap.values());
  }

  getProduct(productId: string) {
    const product = this.productsMap.get(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} does not exist.`);
    }
    return product;
  }

  deleteProduct(productId: string) {
    const deleted = this.productsMap.delete(productId);
    if (!deleted) {
      throw new Error(`Product with ID ${productId} does not exist.`);
    }
  }

  updateProduct(productId: string, newProduct: Product) {
    if (this.productExistByName(newProduct.name, productId)) {
      throw new Error('Duplicated name');
    }
    const tempProduct = this.getProduct(productId);
    tempProduct.name = newProduct.name;
    tempProduct.type = newProduct.type;
    tempProduct.unityPrices = newProduct.unityPrices;
    tempProduct.extraInfo = newProduct.extraInfo;
    this.productsMap.set(productId, tempProduct);
  }

  addProduct(newProduct: Product) {
    if (this.productExistByName(newProduct.name)) {
      throw new Error('Duplicated name');
    }
    this.productsMap.set(newProduct.id, newProduct);
  }

  productExistByName(productName: string, id?: string) {
    const exist = this.getProductsArray().some(
      (prod: Product) =>
        prod.name.toUpperCase() === productName.toUpperCase() && prod.id != id,
    );
    return exist;
  }
}
