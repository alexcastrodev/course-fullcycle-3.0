class Customer_3 {
  #id: string;
  #name: string = "";
  #email: string = "";

  constructor(id: string, name: string, email: string) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.validate();
  }

  validate() {
    if (!this.#name) {
      throw new Error("Name is required");
    }

    if (!this.#email) {
      throw new Error("Email is required");
    }
  }
}

// A entity must always have self validation
// In this case we use validate, but we can use a library like yup, joi, etc
// But we CANT have a entity that can be created with invalid data

// For example, we cannot override business rules in the entity
