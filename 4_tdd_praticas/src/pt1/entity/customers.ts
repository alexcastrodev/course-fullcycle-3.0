class Customer {
  #id: string;
  #name: string;
  #email: string;

  constructor(id: string, name: string, email: string) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }
}
