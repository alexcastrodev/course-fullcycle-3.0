import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("product: Name is required");
  });

  it("should throw error when price is null", () => {
    expect(() => {
      const product = new Product("123", "Product 1", null);
    }).toThrowError("product: Price is required");
  });

  it("should throw error when price is empty", () => {
    expect(() => {
      const product = new Product("123", "Product 1", undefined);
    }).toThrowError("product: Price is required");
  });

  it("should throw error when name and price is empty", () => {
    expect(() => {
      const product = new Product("123", "", undefined);
    }).toThrowError("product: Name is required,product: Price is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Name", -1);
    }).toThrowError("Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
