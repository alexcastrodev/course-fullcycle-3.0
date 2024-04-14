# Entity

In your example, src/entity/customers.ts is classified as an entity because it possesses a unique identifier (Id), which is a fundamental characteristic of entities in software development. This identifier serves as the primary means of distinguishing one instance of the entity from another.

Additionally, you describe this entity as "anemic," which typically refers to a design where the entity primarily acts as a data container without encapsulating much behavior or business logic. Anemic entities are often found in designs where business logic is implemented outside of the entity, usually in separate service classes.

In a rich domain model, entities not only contain data but also encapsulate the core business logic and rules that pertain to what they represent. This approach is central to domain-driven design (DDD), where the domain model is designed to be rich in behavior, making the software more aligned with the underlying business processes and more intuitive to modify and extend.

