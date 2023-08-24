import Vidrio from './Vidrio';

export default class GlassTypeList {
  glassTypes: Map<string, Vidrio>;

  constructor(glassTypes: Map<string, Vidrio>) {
    this.glassTypes = glassTypes;
  }

  getGlassTypesArray() {
    return Array.from(this.glassTypes.values());
  }

  getGlassType(glassId: string): Vidrio | undefined {
    return this.glassTypes.get(glassId);
  }

  deleteGlassType(glassId: string) {
    const tempMap = this.glassTypes;
    tempMap.delete(glassId);
    return tempMap;
  }

  updateGlassType(glassId: string, newGlass: Vidrio) {
    const tempGlass = this.glassTypes.get(glassId);
    if (tempGlass) {
      const updatedGlass = tempGlass.editGlass(
        newGlass.name,
        newGlass.height,
        newGlass.width,
        newGlass.totalPrice,
        newGlass.meterPriceA,
        newGlass.meterPriceB,
        newGlass.meterPriceC,
      );
      this.glassTypes.set(glassId, updatedGlass);
      return this.glassTypes;
    }
    return this.glassTypes;
  }

  addGlassType(newGlass: Vidrio) {
    this.glassTypes.set(newGlass.id, newGlass);
    return this.glassTypes;
  }

  glassExistByName(glassName: string) {
    const exist = this.getGlassTypesArray().find(
      (glass: Vidrio) => glass.name.toUpperCase() === glassName.toUpperCase(),
    );
    return exist ? true : false;
  }
}
