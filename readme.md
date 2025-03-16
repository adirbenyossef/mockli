# Mockli

[![npm version](https://img.shields.io/npm/v/mockli)](https://www.npmjs.com/package/mockli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)

Simple, chainable mock creation test kit for TypeScript with zero dependencies.

## Features

- 🏗️ Builder pattern API
- 🔗 Method chaining
- 🧩 Composability with multiple test kits
- 🛡️ Full TypeScript support
- 📦 Zero external dependencies

## Installation

```bash
npm install mockli --save-dev
```

Requires TypeScript 4.1+ (comes with type definitions)

## Usage

### Basic Example

```typescript
// user.mockli.ts
import Mockli from 'mockli';

interface User {
  id: number;
  name: string;
  email?: string;
}

class UserMock extends Mockli {
  withUser(id: number, user?: Partial<User>) {
    this.data.users = { 
      ...this.data.users, 
      [id]: { id, name: `User ${id}`, ...user }
    };
    return this;
  }
}

// In your test
const mock = new UserMock()
  .withUser(1, { name: 'Alice' })
  .withUser(2)
  .build();

console.log(mock.users);
/* Output:
{
  '1': { id: 1, name: 'Alice' },
  '2': { id: 2, name: 'User 2' }
}
*/
```

### Composable Mocks

```typescript
// product.mockli.ts
import Mockli from 'mockli';

interface Product {
  id: number;
  name: string;
  price: number;
}

class ProductMock extends Mockli {
  withProduct(id: number, product?: Partial<Product>) {
    this.data.products = {
      ...this.data.products,
      [id]: { id, name: `Product ${id}`, price: 9.99, ...product }
    };
    return this;
  }
}

// Combined usage
const mockli = Mockli.withMocklis([new UserMock(), new ProductMock()]);

const mock = mockli
  .withUser(123)
  .withProduct(456, { userId: 123, price: 14.99 })
  .build();
```

## API

### `Mockli`

Core class providing builder pattern functionality.

**Methods:**

| Method        | Description                               |
|---------------|-------------------------------------------|
| `.build()`    | Returns final mock data object            |
| Static `.withMocklis(mocklis)` | Combines multiple mocks |

**Custom Methods:**
- Define chainable methods in your mocks that return `this`

### Type Safety

```typescript
interface MockData {
  users: Record<number, User>;
  products: Record<number, Product>;
}

class TypedMocklis extends Mockli<MockData> {
  withUser(id: number) {
    this.data.users[id] = { id, name: `User ${id}` };
    return this;
  }
  
  withProduct(id: number) {
    this.data.products[id] = { id, name: `Product ${id}`, price: 9.99 };
    return this;
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a PR with tests and documentation

## License

MIT © [Adir Ben Yosef]