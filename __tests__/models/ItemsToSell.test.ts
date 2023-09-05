import Item from '../../src/models/Item';
import ItemsToSell from '../../src/models/ItemsToSell';
import Product from '../../src/models/Product';

it('should create an instance of ItemsToSell with a name and a Map of Items', () => {
  const itemsMap = new Map();
  const item1 = new Item(
    new Product('Product 1', 'unique', {priceA: 12}),
    1,
    10,
    10,
  );
  const item2 = new Item(
    new Product('Product 2', 'calculated', {priceA: 11}),
    2,
    20,
    20,
  );
  itemsMap.set(item1.id, item1);
  itemsMap.set(item2.id, item2);

  const itemsToSell = new ItemsToSell('Items To Sell', itemsMap);

  expect(itemsToSell.name).toBe('Items To Sell');
  expect(itemsToSell.items).toBe(itemsMap);
});

it('should retrieve the id, name, and items of an instance of ItemsToSell', () => {
  const itemsMap = new Map();
  const item1 = new Item(
    new Product('Product 1', 'unique', {priceA: 2}),
    1,
    10,
    10,
  );
  const item2 = new Item(
    new Product('Product 2', 'calculated', {priceA: 4}),
    2,
    20,
    20,
  );
  itemsMap.set(item1.id, item1);
  itemsMap.set(item2.id, item2);

  const itemsToSell = new ItemsToSell('Items To Sell', itemsMap);

  expect(itemsToSell.id).toBeDefined();
  expect(itemsToSell.name).toBe('Items To Sell');
  expect(itemsToSell.items).toBe(itemsMap);
});

it('should calculate the total number of items in an instance of ItemsToSell', () => {
  const itemsMap = new Map();
  const item1 = new Item(
    new Product('Product 1', 'unique', {priceA: 3}),
    1,
    10,
    10,
  );
  const item2 = new Item(
    new Product('Product 2', 'calculated', {priceA: 4}),
    2,
    20,
    20,
  );
  itemsMap.set(item1.id, item1);
  itemsMap.set(item2.id, item2);

  const itemsToSell = new ItemsToSell('Items To Sell', itemsMap);

  expect(itemsToSell.totalItems()).toBe(3);
});

it('should calculate the total area of all items in an instance of ItemsToSell', () => {
  const itemsMap = new Map();
  const item1 = new Item(
    new Product('Product 1', 'unique', {priceA: 3}),
    1,
    10,
    10,
  );
  const item2 = new Item(
    new Product('Product 2', 'calculated', {priceA: 12}),
    2,
    20,
    20,
  );
  itemsMap.set(item1.id, item1);
  itemsMap.set(item2.id, item2);

  const itemsToSell = new ItemsToSell('Items To Sell', itemsMap);

  expect(itemsToSell.totalArea()).toBe(0.08);
});

it('should calculate the total price of all items in an instance of ItemsToSell', () => {
  const itemsMap = new Map();
  const item1 = new Item(
    new Product('Product 1', 'unique', {priceA: 3}),
    1,
    10,
    10,
  );
  const item2 = new Item(
    new Product('Product 2', 'calculated', {priceA: 12}),
    2,
    20,
    20,
  );
  itemsMap.set(item1.id, item1);
  itemsMap.set(item2.id, item2);

  const itemsToSell = new ItemsToSell('Items To Sell', itemsMap);

  expect(itemsToSell.totalPrice()).toBe(3.96); // totalPrice is not implemented in the provided code
});

// Tests that a specific Item can be retrieved from an instance of ItemsToSell
it('should retrieve a specific Item from an instance of ItemsToSell', () => {
  const itemsMap = new Map();
  const item1 = new Item(
    new Product('Product 1', 'unique', {priceA: 23}),
    1,
    10,
    10,
  );
  const item2 = new Item(
    new Product('Product 2', 'calculated', {priceA: 21}),
    2,
    20,
    20,
  );
  itemsMap.set(item1.id, item1);
  itemsMap.set(item2.id, item2);

  const itemsToSell = new ItemsToSell('Items To Sell', itemsMap);

  const retrievedItem = itemsToSell.getItem(item1.id);

  expect(retrievedItem).toBe(item1);
});

it('should edit an item', () => {
  const prod1 = new Product('Product 1', 'unique', {priceA: 23});
  const itemsMap = new Map();
  const item1 = new Item(prod1, 1, 10, 10);
  const item2 = new Item(
    new Product('Product 2', 'calculated', {priceA: 21}),
    2,
    20,
    20,
  );
  itemsMap.set(item1.id, item1);
  itemsMap.set(item2.id, item2);

  const itemsToSell = new ItemsToSell('Items To Sell', itemsMap);

  itemsToSell.editItem(item1.id, 11, 11, 2, prod1);

  const retrievedItem = itemsToSell.getItem(item1.id);

  expect(retrievedItem?.height).toBe(11);
});
