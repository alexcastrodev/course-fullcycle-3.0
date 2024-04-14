class Customer_1 {
  #id: string;
  #name: string;
  #email: string;
  #active: boolean = false;

  constructor(id: string, name: string, email: string) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
  }

  // This method represent a intent to change the name of the customer
  // but it can cause a side effect in the system, because is not a single setter
  changeName(name: string) {
    // Can have some validations here
    // ..
    this.#name = name;
  }

  // #active by himself is a flag that can be used to check if the customer is active or not
  // But we dont have context why this flag is being used
  activate() {
    // I can activate by doing something, for example send a email, or a sms, or a notification
    this.#active = true;
  }

  deactivate() {
    // I can deactivate by changing a flag, deleting some data, etc
    this.#active = false;
  }
}
