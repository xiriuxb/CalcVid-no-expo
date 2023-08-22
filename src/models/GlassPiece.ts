import Vidrio from './Vidrio';
import generateUniqueId from './generateUniqueId';

export default class GlassPiece {
  id: string;
  height: number;
  width: number;
  quantity: number;
  glassType: Vidrio;

  constructor(
    height: number,
    width: number,
    quantity: number,
    glassType: Vidrio,
  ) {
    this.id = generateUniqueId();
    this.height = height;
    this.width = width;
    this.quantity = quantity ? quantity : 1;
    this.glassType = glassType;
  }

  individualArea(): number {
    return (Math.ceil(this.width / 10) * Math.ceil(this.height / 10)) / 100;
  }

  totalArea(): number {
    return this.individualArea() * this.quantity;
  }

  individualPriceA(): number {
    return this.individualArea() * this.glassType.meterPriceA;
  }

  individualPriceB(): number {
    return (
      this.glassType.meterPriceB &&
      this.individualArea() * this.glassType.meterPriceB
    );
  }

  individualPriceC(): number {
    return (
      this.glassType.meterPriceC &&
      this.individualArea() * this.glassType.meterPriceC
    );
  }

  totalPriceA(): number {
    return this.individualPriceA() * this.quantity;
  }

  totalPriceB(): number {
    return (
      this.glassType.meterPriceB && this.individualPriceB() * this.quantity
    );
  }

  totalPriceC(): number {
    return (
      this.glassType.meterPriceC && this.individualPriceC() * this.quantity
    );
  }

  editPiece(
    width: number,
    height: number,
    quantity: number,
    glassType: Vidrio,
  ) {
    this.width = width;
    this.height = height;
    this.quantity = quantity;
    this.glassType = glassType;
    return this;
  }
}
