class Customer_2 {
  #id: string;
  #name: string = "";
  #email: string = "";
  #active: boolean = false;

  constructor(id: string) {
    this.#id = id;
  }
}

// THIS IS VERY WRONG
const customer = new Customer_2("123");

// The entity cant validate business rules
// DATA always should be consistent
