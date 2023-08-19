# Introductions

Good practice of Programming Oriented Object with SOLID principles.

## SOLID

SOLID is an acronym for the first five object-oriented design (OOD) principles by Robert C. Martin (also known as Uncle Bob).


Robert C. Martin, the author of the principles, talk about it in his book Agile Software Development, Principles, Patterns, and Practices, from 2002.

### Single Responsibility Principle - SRP

### Open/Closed Principle - OCP

### Liskov Substitution Principle - LSP

### Interface Segregation Principle - ISP

### Dependency Inversion Principle - DIP



# Single Responsibility Principle - SRP

A class should have a unique principal responsibility.

## Example

in the `SRP/SRPproblem.php` file, we have a class called Course that has many responsibilities:

- Persist data
- Create a Course description
- Get the course name
- Get the course description
- Set the course name

Many responsabilities in a class is a problem because:

- It is difficult to test
- It is difficult to reuse
- It is difficult to maintain

## Solution

- Create a class for each responsibility

for example create a db class connection, implements a interface to have the setters and getters.

# Open/Closed Principle - OCP

A class should be open for extension but closed for modification.

You must be able to extends a class to add a new behavior without modifying it.

example in the `OCP/OCPproblem.php` file, we have a class called Movie, and always we need to add a new type of movie we need to modify the class.

in the `OCP/OCPsolution.php` file, we have a class called Movie, and we can extends it to add a new type of movie without modifying the class.

# Liskov Substitution Principle - LSP

A class should be replaceable by its subclasses without breaking the application.

example in the `LSP/LSPproblem.php` file.

# Interface Segregation Principle - ISP

A client should never be forced to implement an interface that it doesn't use or clients shouldn't be forced to depend on methods they do not use.

example in the `ISP/ISPproblem.php` file.

# Dependency Inversion Principle - DIP

Entities must depend on abstractions not on concretions. It states that the high level module must not depend on the low level module, but they should depend on abstractions.

example in the `DIP/DIPproblem.php` file.