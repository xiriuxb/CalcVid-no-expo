import {Product, ProductPriceCalculus} from './Product';
import generateUniqueId from './generateUniqueId';

export interface CreateItemNoProdDto {
  productId: string;
  quantity: number;
  width?: number;
  height?: number;
}

export class Item {
  id: string;
  height: number;
  width: number;
  quantity: number;
  product: Product;
  selectedPrice: 'A' | 'B' | 'C';

  constructor(
    product: Product,
    quantity: number,
    height: number = 1,
    width: number = 1,
  ) {
    this.selectedPrice = 'A';
    this.id = generateUniqueId();
    this.product = product;
    this.quantity = quantity ? quantity : 1;

    this.height = height;
    this.width = width;
  }

  get individualArea(): number {
    switch (this.product.type) {
      case ProductPriceCalculus.calculated_simple:
        return this.height / 100;
      case ProductPriceCalculus.calculated:
        return (Math.ceil(this.width / 10) * Math.ceil(this.height / 10)) / 100;
      default:
        return 1;
    }
  }

  get totalArea(): number {
    if (this.product.type != ProductPriceCalculus.not_calculated) {
      return this.individualArea * this.quantity;
    }
    return 0;
  }

  setSelectedPrice(price: 'A' | 'B' | 'C') {
    this.selectedPrice = price;
  }

  autoSetSelectedPrice() {
    switch (this.selectedPrice) {
      case 'A':
        if (this.product.unityPrices.priceB != 0) {
          this.selectedPrice = 'B';
        }
        break;
      case 'B':
        if (this.product.unityPrices.priceC != 0) {
          this.selectedPrice = 'C';
        } else {
          this.selectedPrice = 'A';
        }
        break;
      default:
        this.selectedPrice = 'A';
        break;
    }
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
    width: number = 1,
    height: number = 1,
  ) {
    this.quantity = quantity;
    this.product = product;
    this.width = width;
    this.height = height;
  }
}
