import generateUniqueId from './generateUniqueId';

export interface UnityPricesType {
  priceA: number;
  priceB?: number;
  priceC?: number;
}

export class Product {
  id: string;
  type: 'unique' | 'calculated-simple' | 'calculated';
  name: string;
  unityPrices: UnityPricesType;
  extraInfo: string;

  constructor(
    name: string,
    type: 'unique' | 'calculated-simple' | 'calculated',
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

  editProduct(
    name: string,
    type: 'unique' | 'calculated-simple' | 'calculated',
    unityPrices: UnityPricesType,
    extraInfo: string,
  ) {
    this.name = name;
    this.type = type;
    this.unityPrices = unityPrices;
    this.extraInfo = extraInfo;
  }
}
