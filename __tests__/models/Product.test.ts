import Product from '../../src/models/Product';

it('should create a new instance of Product with valid parameters', () => {
  const product = new Product(
    'Test Product',
    'unique',
    {
      priceA: 10,
      priceB: 20,
      priceC: 30,
    },
    100,
    10,
    20,
  );

  expect(product.id).toBeDefined();
  expect(product.type).toBe('unique');
  expect(product.name).toBe('Test Product');
  expect(product.height).toBe(10);
  expect(product.width).toBe(20);
  expect(product.totalPrice).toBe(100);
  expect(product.unityPrices).toEqual({priceA: 10, priceB: 20, priceC: 30});
});

it('should edit an existing Product instance with valid parameters', () => {
  const product = new Product(
    'Test Product',
    'unique',
    {
      priceA: 10,
      priceB: 20,
      priceC: 30,
    },
    100,
    10,
    20,
  );
  product.editProduct('Edited Product', 'calculated', 15, 25, 200, {
    priceA: 15,
    priceB: 25,
    priceC: 35,
  });
  expect(product.name).toBe('Edited Product');
  expect(product.type).toBe('calculated');
  expect(product.height).toBe(15);
  expect(product.width).toBe(25);
  expect(product.totalPrice).toBe(200);
  expect(product.unityPrices).toEqual({priceA: 15, priceB: 25, priceC: 35});
});

it('should create a new instance of Product with height and width equal to 0', () => {
  const product = new Product(
    'Test Product',
    'unique',
    {
      priceA: 10,
      priceB: 20,
      priceC: 30,
    },
    100,
    0,
    0,
  );
  expect(product.height).toBe(0);
  expect(product.width).toBe(0);
});

it('should create a new instance of Product with totalPrice equal to 0', () => {
  const product = new Product(
    'Test Product',
    'unique',
    {
      priceA: 10,
      priceB: 20,
      priceC: 30,
    },
    0,
    10,
    20,
  );
  expect(product.totalPrice).toBe(0);
});

it('should edit an existing Product instance with totalPrice equal to 0', () => {
  const product = new Product(
    'Test Product',
    'unique',
    {
      priceA: 10,
      priceB: 20,
      priceC: 30,
    },
    100,
    10,
    20,
  );
  product.editProduct('Edited Product', 'calculated', 15, 25, 0, {
    priceA: 15,
    priceB: 25,
    priceC: 35,
  });
  expect(product.totalPrice).toBe(0);
});
