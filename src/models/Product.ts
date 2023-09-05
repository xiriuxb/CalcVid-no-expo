import generateUniqueId from './generateUniqueId';

export interface UnityPricesType {
  priceA: number;
  priceB?: number;
  priceC?: number;
}

export class Product {
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
    if (!unityPrices.priceB || isNaN(unityPrices.priceB)) {
      unityPrices.priceB = 0;
    }
    if (!unityPrices.priceC || isNaN(unityPrices.priceC)) {
      unityPrices.priceC = 0;
    }

    this.id = generateUniqueId();
    this.type = type;
    this.name = name;
    this.height = isNaN(height) || !height ? 0 : height;
    this.width = isNaN(width) || !width ? 0 : width;
    this.totalPrice = isNaN(totalPrice) || !totalPrice ? 0 : totalPrice;
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
