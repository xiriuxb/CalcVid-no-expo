import generateUniqueId from './generateUniqueId';

interface UnityPricesType {
  priceA: number;
  priceB?: number;
  priceC?: number;
}

export default class Product {
  id: string;
  type: 'unique' | 'calculated';
  name: string;
  height: number;
  width: number;
  totalPrice: number;
  unityPrices: UnityPricesType;

  constructor(
    name: string,
    type: 'unique' | 'calculated',
    unityPrices: UnityPricesType,
    totalPrice: number = 0,
    height: number = 0,
    width: number = 0,
  ) {
    if (!unityPrices.priceB) {
      unityPrices.priceB = 0;
    }
    if (!unityPrices.priceC) {
      unityPrices.priceC = 0;
    }

    this.id = generateUniqueId();
    this.type = type;
    this.name = name;
    this.height = height;
    this.width = width;
    this.totalPrice = totalPrice;
    this.unityPrices = unityPrices;
  }

  editProduct(
    name: string,
    type: 'unique' | 'calculated',
    height: number,
    width: number,
    totalPrice: number,
    unityPrices: UnityPricesType,
  ) {
    this.name = name;
    this.type = type;
    this.height = height;
    this.width = width;
    this.totalPrice = totalPrice;
    this.unityPrices = unityPrices;
    return this;
  }
}
