import { Sequelize } from "sequelize-typescript";
import FindProductUseCase from "./find.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    await productRepository.create(new Product("123", "John", 100));

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "John",
      price: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
