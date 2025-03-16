/**
 * Mockli - A simple mock creation test kit using the builder pattern.
 * 
 * @class Mockli
 * @template T - Type of the mock data structure (defaults to `Record<string, any>`)
 * 
 * @example
 * // Create a custom mock class
 * class UserMock extends Mockli {
 *   withUser(id: string, user?: Partial<UserDto>) {
 *     this.data.users = { ...this.data.users, [id]: { id, ...user } };
 *     return this;
 *   }
 * }
 * 
 * // Usage
 * const mock = new UserMock().withUser('123').build();
 */
class Mockli<T extends Record<string, any> = Record<string, any>> {
    protected data: T = {} as T;
  
    /**
     * Builds and returns the final mock data
     */
    build(): T {
      return this.data;
    }
  
    /**
     * Creates a new Mockli instance with merged functionality
     * @param mocklis Array of test kits to merge
     * 
     * @example
     * const mockli = Mockli.withMocklis([UserMock, ProductMock]);
     * mockli.withUser(123).withProduct(456).build();
     */
    static withMocklis<const K extends readonly any[]>(mocklis: K): MergeMockli<K> {
      return mocklis.reduce((acc, kit) => Object.assign(acc, kit), new Mockli());
    }
  }
  
  type MergeMockli<K extends readonly any[]> = K extends readonly [infer First, ...infer Rest]
    ? First & MergeMockli<Rest>
    : Mockli;
  
  /**
   * Type utilities for method chaining
   */
  type Chainable<T> = {
    [P in keyof T]: T[P] extends (...args: infer A) => any
      ? (...args: A) => Chainable<T>
      : T[P];
  };
  
  /**
   * Example User Mock
   * 
   * @example
   * class UserMock extends Mockli {
   *   withUser(id: number, user?: Partial<UserDto>) {
   *     this.data.users = { 
   *       ...this.data.users, 
   *       [id]: { id, name: `User ${id}`, ...user }
   *     };
   *     return this;
   *   }
   * }
   */
  
  /**
   * Example Product Mock
   * 
   * @example
   * class ProductMock extends Mockli {
   *   withProduct(id: number, product?: Partial<ProductDto>) {
   *     this.data.products = {
   *       ...this.data.products,
   *       [id]: { id, name: `Product ${id}`, ...product }
   *     };
   *     return this;
   *   }
   * }
   */
  
  export default Mockli;