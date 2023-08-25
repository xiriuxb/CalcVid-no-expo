import Product from './Product';
import generateUniqueId from './generateUniqueId';

export default class Item {
  id: string;
  height: number;
  width: number;
  quantity: number;
  product: Product;
  selectedPrice: 'A' | 'B' | 'C';

  constructor(
    product: Product,
    quantity: number = 1,
    height: number,
    width: number,
  ) {
    this.selectedPrice = 'A';
    this.id = generateUniqueId();
    this.product = product;
    this.quantity = quantity;
    if (product.type == 'calculated') {
      this.height = height;
      this.width = width;
    } else {
      this.width = 1;
      this.height = 1;
    }
  }

  get individualArea(): number {
    if (this.product.type === 'calculated') {
      return (Math.ceil(this.width / 10) * Math.ceil(this.height / 10)) / 100;
    }
    return 1;
  }

  get totalArea(): number {
    if (this.product.type === 'calculated') {
      return this.individualArea * this.quantity;
    }
    return 0;
  }

  setSelectedPrice(price: 'A' | 'B' | 'C') {
    this.selectedPrice = price;
  }

  individualPrice() {
    const priceLookup = {
      A: this.product.unityPrices.priceA,
      B: this.product.unityPrices.priceB!,
      C: this.product.unityPrices.priceC!,
    };
    return this.individualArea * priceLookup[this.selectedPrice];
  }

  get totalPrice(): number {
    return this.individualPrice() * this.quantity;
  }

  editPiece(
    quantity: number,
    product: Product,
    width: number,
    height: number,
  ): Item {
    this.quantity = quantity;
    this.product = product;
    this.width = width;
    this.height = height;
    return this;
  }
}
