import generateUniqueId from './generateUniqueId';

export interface UnityPricesType {
  priceA: number;
  priceB?: number;
  priceC?: number;
}

export enum ProductPriceCalculus{
  'calculated',
  'calculated_simple',
  'not_calculated'
}

export class Product {
  id: string;
  type: ProductPriceCalculus;
  name: string;
  unityPrices: UnityPricesType;
  extraInfo: string;

  constructor(
    name: string,
    type: ProductPriceCalculus,
    unityPrices: UnityPricesType,
    extraInfo: string,
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
    this.unityPrices = unityPrices;
    this.extraInfo = extraInfo;
  }
}
