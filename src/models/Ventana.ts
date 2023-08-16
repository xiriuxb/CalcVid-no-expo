import GlassPiece from './GlassPiece';
import generateUniqueId from './generateUniqueId';

export default class Ventana {
  id: string;
  name: string;
  glassPieces: GlassPiece[];
  constructor(name: string, glassPieces: GlassPiece[]) {
    this.id = generateUniqueId();
    this.name = name;
    this.glassPieces = glassPieces;
  }

  setGlassPieces(newGlassPieces: GlassPiece[]): void {
    this.glassPieces = newGlassPieces;
  }

  totalGlasses() {
    return this.glassPieces.reduce(
      (acc, currentElement) => acc + currentElement.quantity,
      0,
    );
  }

  totalArea() {
    return this.glassPieces.reduce(
      (acc, currentElement) => acc + currentElement.totalArea(),
      0,
    );
  }

  totalPriceA() {
    return this.glassPieces.reduce(
      (acc, currentElement) => acc + currentElement.totalPriceA(),
      0,
    );
  }

  totalPriceB() {
    return this.glassPieces.reduce(
      (acc, currentElement) => acc + currentElement.totalPriceB(),
      0,
    );
  }

  totalPriceC() {
    return this.glassPieces.reduce(
      (acc, currentElement) => acc + currentElement.totalPriceC(),
      0,
    );
  }
}
