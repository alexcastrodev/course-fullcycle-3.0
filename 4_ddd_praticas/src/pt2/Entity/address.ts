export class Address {
  constructor(
    private street: string,
    private city: string,
    private state: string,
    private zip: string,
  ) {
    this.validate();
  }

  validate() {
    if (!this.street) {
      throw new Error("Street is required");
    }

    if (!this.city) {
      throw new Error("City is required");
    }

    if (!this.state) {
      throw new Error("State is required");
    }

    if (!this.zip) {
      throw new Error("Zip is required");
    }
  }

  toString(): string {
    return `${this.street}, ${this.city}, ${this.state}, ${this.zip}`;
  }
}
