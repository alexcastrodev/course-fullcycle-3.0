import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const globalPrice = 1000;
const products = new Array(2).fill(null).map((_, index) =>
  ProductFactory.create("a", `go pro ${index}`, globalPrice)
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
  };
};

describe("Unit test for listing customer use case", () => {
  it("should list a customer", async () => {
    const productRepository = MockRepository();
    const productListUseCase = new ListProductUseCase(productRepository);

    const output = await productListUseCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(products[0].id);
    expect(output.products[0].name).toBe(products[0].name);
    expect(output.products[0].price).toBe(globalPrice);
    expect(output.products[1].id).toBe(products[1].id);
    expect(output.products[1].name).toBe(products[1].name);
    expect(output.products[1].price).toBe(globalPrice);
  });
});
