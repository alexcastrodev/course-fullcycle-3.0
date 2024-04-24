import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";

describe("Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: true,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = ProductFactory.create("a", "gopro", 100);
    productRepository.create(
      new Product(product.id, product.name, product.price),
    );

    const usecase = new UpdateProductUseCase(productRepository);
    const newPrice = 1000;

    const input = {
      id: product.id,
      name: product.name,
      price: newPrice,
    };

    const result = await usecase.execute(input);

    const output = {
      id: product.id,
      name: product.name,
      price: newPrice,
    };

    expect(result).toEqual(output);
  });
});
