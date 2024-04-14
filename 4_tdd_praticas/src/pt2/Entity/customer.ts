// This is part of business logic

import { Address } from "./address";

export class Customer {
  #id: string;
  #name: string;
  #email: string;
  #adress!: Address;

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

  get address() {
    return this.#adress;
  }

  set address(address: Address) {
    this.#adress = address;
  }
}
