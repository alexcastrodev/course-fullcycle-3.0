import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import * as yup from "yup";

export default class ProductYupValidator
  implements ValidatorInterface<ProductInterface> {
  validate(entity: Product): void {
    try {
      yup.object().shape({
        id: yup.string().required("Id is required"),
        name: yup.string().required("Name is required"),
        price: yup.number().required("Price is required").typeError(
          "Price is required",
        ).positive("Price must be greater than zero"),
      }).validateSync(entity, {
        abortEarly: false,
      });
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}
