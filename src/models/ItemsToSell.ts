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

  addItem(newItem:Item){
    this._items.set(newItem.id,newItem);
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
    const items = this.items.get(id);
    if(!items){
      throw new Error('Item not found')
    }
    return items;
  }

  //return the list because it needs to be updated
  editItem(
    itemId: string,
    product: Product,
    quantity: number,
    width: number = 1,
    height: number=1,
  ) {
    const item = this.getItem(itemId);
      item.editPiece(quantity, product, width, height);
      this._items.set(itemId, item);
      this.setItemsToSell(this._items);
  }

  deleteItem(itemId: string) {
    const updatedItemMap = this._items;
    const exist = updatedItemMap.delete(itemId);
    if (!exist) {
      throw new Error('No existe el elemento');
    }
  }

  setName(newName: string) {
    this._name = newName;
  }

  getItemsArray(){
    return Array.from(this._items.values());
  }

  orderItems(orderBy:'productType'|'productName'){
    const arr = this.getItemsArray();
    const ordered = arr.reduce((orderedMap,curr)=>{
      const order = orderBy === 'productType' ? curr.product.type.toString() : curr.product.name;
      const exist = orderedMap.get(order);
      if(exist){
        exist.items.set(curr.id,curr);
        orderedMap.set(order,exist);
      } else {
        const itemMap = new ItemsToSell(order,new Map())
        itemMap.items.set(curr.id,curr);
        orderedMap.set(order,itemMap);
      }
      return orderedMap;
    },new Map<string,ItemsToSell>());
    return ordered;
  }

}
