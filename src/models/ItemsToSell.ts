import {Item} from './Item';
import {Product} from './Product';
import generateUniqueId from './generateUniqueId';

export class ItemsToSell {
  private _id: string;
  private _name: string;
  private _items: Map<string, Item>;
  constructor(name: string, items: Map<string, Item>) {
    this._id = generateUniqueId();
    this._name = name;
    this._items = items;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get items(): Map<string, Item> {
    return this._items;
  }

  setItemsToSell(newItems: Map<string, Item>): void {
    this._items = newItems;
  }

  totalItems() {
    return Array.from(this._items.values()).reduce(
      (acc, currentElement) => acc + currentElement.quantity,
      0,
    );
  }

  totalArea() {
    return Array.from(this._items.values()).reduce(
      (acc, currentElement) => acc + currentElement.totalArea,
      0,
    );
  }

  totalPrice() {
    return Array.from(this._items.values()).reduce(
      (acc, currentElement) => acc + currentElement.totalPrice,
      0,
    );
  }

  getItem(id: string) {
    return this.items.get(id);
  }

  //return the list because it needs to be updated
  editItem(
    itemId: string,
    width: number,
    height: number,
    quantity: number,
    product: Product,
  ) {
    const item = this._items.get(itemId);
    if (item) {
      item.editPiece(quantity, product, width, height);
      this._items.set(itemId, item);
      this.setItemsToSell(this._items);
      return this;
    } else {
      throw new Error('No existe el elemento');
    }
  }

  deleteItem(itemId: string) {
    const updatedItemMap = this._items;
    const exist = updatedItemMap.delete(itemId);
    if (exist) {
      this.setItemsToSell(updatedItemMap);
      return this;
    }
    throw new Error('No existe el elemento');
  }

  setName(newName: string) {
    this._name = newName;
  }
}
