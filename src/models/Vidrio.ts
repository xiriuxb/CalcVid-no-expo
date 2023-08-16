import generateUniqueId from './generateUniqueId';

export default class Vidrio {
  id: string;
  name: string;
  height: number;
  width: number;
  totalPrice: number;
  meterPriceA: number;
  meterPriceB: number;
  meterPriceC: number;

  constructor(
    name: string,
    height: number,
    width: number,
    totalPrice: number,
    meterPriceA: number,
    meterPriceB: number,
    meterPriceC: number,
  ) {
    this.id = generateUniqueId();
    this.name = name;
    this.height = height ? height : 0;
    this.width = width ? width : 0;
    this.totalPrice = totalPrice ? totalPrice : 0;
    this.meterPriceA = meterPriceA;
    this.meterPriceB = meterPriceB ? meterPriceB : 0;
    this.meterPriceC = meterPriceC ? meterPriceC : 0;
  }
}
