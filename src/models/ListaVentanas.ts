import {ItemsToSell} from './ItemsToSell';
import generateUniqueId from './generateUniqueId';

export class WindowsList {
  id: string;
  list: ItemsToSell[];
  constructor() {
    this.id = generateUniqueId();
    this.list = [new ItemsToSell('Ventana 1', [])];
  }

  totalValues(): {totalArea: number; totalCost: number; totalPieces: number} {
    let totalCost = 0;
    let totalArea = 0;
    let totalPieces = 0;
    this.list.forEach((window: ItemsToSell) => {
      totalCost += window.totalPriceA();
      totalArea += window.totalArea();
      totalPieces += window.totalGlasses();
    });
    return {totalArea, totalCost, totalPieces};
  }

  setList(list: Ventana[]): void {
    this.list = list;
  }

  addWindow(): void {
    this.list = [
      ...this.list,
      new Ventana(`Ventana ${this.list.length + 1}`, new Map()),
    ];
  }

  getWindow(id: string): Ventana | undefined {
    return this.list.find((window: Ventana) => window.id === id);
  }
}
