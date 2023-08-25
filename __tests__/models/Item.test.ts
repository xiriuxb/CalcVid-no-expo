import Item from '../../src/models/Item';
import Product from '../../src/models/Product';

it('should calculate the individual area correctly for an Item with a Product of type calculated', () => {
  const unityPrices = {priceA: 10, priceB: 20, priceC: 30};
  const product = new Product(
    'Product 3',
    'calculated',
    unityPrices,
    0,
    10,
    10,
  );
  const item = new Item(product, 1, 10, 10);
  expect(item.individualArea).toBe(0.01);
});

it('should calculate the total area correctly for an Item with a Product of type calculated', () => {
  const unityPrices = {priceA: 10, priceB: 20, priceC: 30};
  const product = new Product(
    'Product 4',
    'calculated',
    unityPrices,
    0,
    10,
    10,
  );
  const item = new Item(product, 2, 10, 10);
  expect(item.totalArea).toBe(0.02);
});

it('should create an Item with valid parameters and calculate individual area, total area, individual price, and total price correctly', () => {
  const product = new Product('Product A', 'unique', {priceA: 12}, 10, 0, 0);
  const item = new Item(product, 2, 20, 30);

  expect(item.individualArea).toBe(1);
  expect(item.totalArea).toBe(0);
  expect(item.individualPrice()).toBe(12);
  expect(item.totalPrice).toBe(24);
});

it('show individual price with price B', () => {
  const product = new Product(
    'Product A',
    'unique',
    {
      priceA: 12,
      priceB: 11,
    },
    10,
    0,
    0,
  );
  const item = new Item(product, 2, 20, 30);
  item.setSelectedPrice('B');
  expect(item.individualPrice()).toBe(11);
});

it('show total price with price B', () => {
  const product = new Product(
    'Product A',
    'unique',
    {
      priceA: 12,
      priceB: 11,
    },
    10,
    0,
    0,
  );
  const item = new Item(product, 2, 20, 30);
  item.setSelectedPrice('B');
  expect(item.totalPrice).toBe(22);
});
