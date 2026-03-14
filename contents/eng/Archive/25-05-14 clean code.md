---
title: "Clean Code & Architecture"
date: "2025-05-14"
template: "post"
draft: false
path: "/cheatsheet/25-05-14/"
description: "This post was written to understand the core concepts of Clean Code, SOLID principles, and Clean Architecture. It is a personal study note summarizing the relevant parts from Gemini 2.5 Pro Deep Research results. While I did review and revise the content, please keep in mind that much of it originates from Deep Research output."
category: "Cheat Sheet"
---

> This post was written to understand the core concepts of Clean Code, SOLID principles, and Clean Architecture. It is a personal study note summarizing the relevant parts from **<u>Gemini 2.5 Pro Deep Research results</u>**. While I did review and revise the content, please keep in mind that much of it originates from Deep Research output.

### Table of Contents

1. **Introduction: Why Should We Pursue 'Cleanliness'?**
   - The importance of code readability
   - The two values of software
   - Goals and structure of this study guide
2. **Clean Code: The Art of Writing Readable and Maintainable Code**
   - Meaningful Names: Making the intent of code clear
   - Functions: Small, Do One Thing, and Clearly
   - Comments: Let the code speak, supplement only when necessary
   - Formatting: Balancing consistency and readability
   - Objects and Data Structures: Finding the right balance
   - Error Handling: Robust and predictable code
   - Boundaries: Clean interaction with external elements
3. **SOLID Principles: The Cornerstones of Robust and Flexible Design**
   - SRP (Single Responsibility Principle)
   - OCP (Open/Closed Principle)
   - LSP (Liskov Substitution Principle)
   - ISP (Interface Segregation Principle)
   - DIP (Dependency Inversion Principle)
4. **Clean Architecture: Design That Reveals System Intent**
   - The essence of architecture: Beyond tools
   - Use Case-Driven Architecture
   - The Dependency Rule and architectural boundaries
   - The value of deferring key decisions
   - The role of programming paradigms

### 1. Introduction: Why Should We Pursue 'Cleanliness'?

##### 1.1. The Importance of Code Readability

Code is read far more often than it is written. Clear and understandable code is important for fellow developers, your future self, and maintenance personnel alike. Clean code is the product of skilled engineers, and it maximizes system maintainability. Highly readable code facilitates bug fixes and feature additions/modifications, improving overall team productivity and helping new team members onboard more quickly.

##### 1.2. The Two Values of Software

Software possesses two values:

1. **Behavior**: The functionality that meets current user requirements (secondary value)
2. **Maintainability/Flexibility**: The ability to adapt flexibly to ever-changing requirements and environments (primary value)

Most software initially satisfies its requirements well, but becomes harder to modify over time. From a long-term perspective, securing "ease of change" is the key to project success, and clean code is the most effective means to achieve this. Clear, modular, and well-structured code reduces the cost and risk of change.

##### 1.3. Goals and Structure of This Study Guide

This guide systematically covers how to write clean code, SOLID principles for robust and flexible design, and methods for building clean architecture that clearly reveals system intent.

- **Part 1: Clean Code**: Techniques for writing readable and maintainable code
- **Part 2: SOLID Principles**: Core principles of object-oriented design
- **Part 3: Clean Architecture**: How to clarify the overall system structure and intent

### 2. Clean Code: The Art of Writing Readable and Maintainable Code

Clean code goes beyond merely working code -- it is code that others can easily read, understand, and modify.

##### 2.1. Meaningful Names: Making the Intent of Code Clear

Names for variables, functions, classes, and so on are powerful communication tools and serve as the first documentation of your code.

- **Searchability**: Use names that are easy to search, like `MAX_CLASSES_PER_STUDENT`. Magic numbers like `7` make searching difficult. For example, making an API URL `/unaccess` rather than `/un/access` makes it easier to search for and associate with a variable name like `unAccess`, and also simplifies renaming.
- **Clarity**: Well-chosen names reduce the need for comments and improve code comprehension. Ambiguous or generic names (e.g., single numeric literals) hinder maintenance. Choosing meaningful, specific, and searchable names is essential.

##### 2.2. Functions: Small, Do One Thing, and Clearly

Function design determines the overall quality of code.

**[Core Principles: Size, Single Responsibility, Abstraction Level]**

- **Small, then smaller**: Make functions as small as possible. Ideally, keep them to just a few lines, and blocks within `if`, `else`, `while` statements should ideally be one line long.
- **Do one thing (Single Responsibility)**: A function should perform only steps at a single level of abstraction beneath its name. All statements in a function should be at the same abstraction level. (e.g., `getHtml()` is high-level, `String pagePathName = PathParser.render(pagepath);` is mid-level, `.append("\n")` is low-level). Mixing multiple abstraction levels makes code hard to understand.
- **Extract functions**: If a function is too long (e.g., 20+ lines), consider extracting it into a separate **class**. Following the "Extract Till You Drop" philosophy, continuously decomposing functions naturally leads to single responsibility, making naming and testing easier. This is the process of clearly defining logical units.

**[Function Argument Guidelines]**

Ideally, minimize the number of arguments.

- **Ideal argument count**: 0 (niladic) > 1 (monadic) > 2 (dyadic). Avoid 3 (triadic), and **never use 4 or more without a special reason**. Arguments increase cognitive load.
- Monadic function examples:
  - Question: `boolean fileExists("MyFile")`
  - Transform and return: `InputStream fileOpen("MyFile")`
  - Event: `passwordAttemptFailedNtimes(int attempts)` (changes system state)
- **Avoid flag arguments**: Passing a `boolean` value signals that the function does more than one thing. Avoid it and split the function if needed.
- **Dyadic functions**: Appropriate when two arguments express a single logical value with a natural ordering (e.g., `Point p = new Point(0,0)`). Names like `assertEquals(expected, actual)` where the order isn't self-evident can lead to mistakes.
- **Argument objects**: When 2-3 arguments are needed, consider wrapping them in an independent class (argument object). (e.g., `makeCircle(Point center, double radius)` instead of `makeCircle(double x, double y, double radius)`)
- **Input parameters**: Parameters should primarily be used for input (Innies); avoid modifying them for output (Outies). Directly changing the state of input parameters is not recommended.

The purpose of each argument must be clear. Flag arguments or arguments used for output obscure the function's intent.

**[Side Effects, Command-Query Separation (CQS), Switch Statement Handling]**

- **Minimize side effects**: A function should not secretly perform operations beyond its stated functionality. (e.g., a `checkPassword` function that internally calls `Session.initialize()`). This can cause temporal coupling. Either clarify the function name or separate the responsibilities.
- **Command-Query Separation (CQS)**: Functions that change object state (commands) should not return values, and functions that return information (queries) should not change state. (e.g., `set("username", "unclebob")` returning a `boolean` violates CQS. Instead, separate them: `if (attributeExists("username")) { setAttribute("username", "unclebob"); }`)
- **Handling Switch statements**: `Switch` statements are hard to keep small and tend to violate SRP and OCP. Where possible, use polymorphism to hide `Switch` statements in low-level classes and avoid repeated usage. (e.g., for payroll calculation by employee type, use an abstract `Employee` class with concrete subclasses each implementing `calculatePay`, along with an abstract factory)

**[Other Function Design Principles]**

- **Stepdown Rule**: Code should read like a top-down narrative. **Place public methods at the top and called private methods at the bottom**, showing important concepts first and implementation details later.
- **Watch for temporal coupling**: Functions that must be called in a specific order (e.g., `open(), execute(), done()`) reduce flexibility and increase error potential. Use patterns like the Strategy pattern to **manage or eliminate order dependencies**.
- **Tell, Don't Ask**: **Tell** objects to perform work rather than asking about their internal state and making decisions externally. (e.g., use `if(member.isExpired())` instead of `if(member.getExpiredDate().getTime() < System.currentTime())`)
- **Law of Demeter**: "Don't talk to strangers." A module should only interact with its immediate neighbors. Avoid "train wreck" code like `ctxt.getOptions().getScratchDir().getAbsolutePath()`. (However, the Law of Demeter may not apply if ctxt, Options, and ScratchDir are simple data structures)
- **Early returns**: Return as early as possible when conditions are met or errors occur, to clarify the code flow.
- **`try` as a role/function**: A `try` block represents the single role of "attempting an operation that may throw an exception," so ideally place only **a single method call** inside it for clarity.

##### 2.3. Comments: Let the Code Speak, Supplement Only When Necessary

The best comment is code that needs no comments. Strengthen the expressiveness of the code itself.

Code with comments:

```
// Check to see if the employee is eligible for full benefits
if ((employee.flags & HOURLY_FLAG) && (employee.age > 65))
```

Code with clear intent without comments:

```
if (employee.isEligibleForFullBenefits())
```

The latter is far clearer. Closing brace comments, large banner comments, and author information comments are examples of bad comments that should be avoided. If a comment is necessary, place it as close as possible to the code it describes.

Comments can sometimes be a "smell" indicating shortcomings in the code. Before writing a comment, first consider whether there is a way to make the code clearer. Comments that explain "what" the code does are often stopgaps for unclear code.

##### 2.4. Formatting: Balancing Consistency and Readability

Consistent code formatting (coding conventions) is a form of communication and a duty of professional developers. Code readability and consistent style continuously affect code quality.

- **Vertical whitespace**: Visually separate logical code blocks (between methods, between variable declarations and methods, around control statement blocks, etc.)
- **Vertical density**: Related code should be placed vertically close together to express logical association.

Consistent formatting contributes to team productivity and code quality. Standardized formatting (using auto-formatter tools) reduces friction and lets you focus on logic.

##### 2.5. Objects and Data Structures: Finding the Right Balance

**[Data Abstraction, Data/Object Asymmetry, DTO]**

- **Data abstraction**: `private` variables exist to reduce external dependencies. Providing `public getter/setter` for every `private` variable can undermine encapsulation. Rather than exposing data in detail, **express it as abstract concepts**. (e.g., `getPercentFuelRemaining()` instead of `getGallonsOfGasoline()`)
- **Objects vs. Data Structures**
  - **Objects**: Hide internal data and expose only methods that operate on it.
  - **Data structures**: Expose internal data directly and provide little to no behavior (functions).
  - Example (shapes):
    - Procedural: `Square`, `Rectangle`, `Circle` (data structures) + `Geometry` class (area calculation `area()` function). Adding a new shape requires modifying all functions in `Geometry`.
    - Object-oriented: `Shape` interface + each shape class implements `area()`. Adding a new shape is easy, but adding a new function (e.g., `perimeter()`) requires modifying all shape classes.
  - Choose wisely based on the situation.
- **DTO (Data Transfer Object)**: A **class with only public variables and no functions**. Useful for database communication, message parsing, etc. The bean structure (private variables + public getter/setter) can be "pseudo-encapsulation." The Active Record pattern, which adds DB navigation functions to DTOs, can create hybrid structures that require caution.

**[Class Cohesion, Getter/Setter Usage]**

- **High cohesion (Max Cohesive)**: Methods within a class should use most of the member variables and be closely related. `Getter/setter` methods themselves tend to have low cohesion.
- **Avoid indiscriminate `getter/setter`**: Remember the "Tell, Don't Ask" principle. Excessive `getter/setter` usage leads to pulling data from objects and processing logic externally. Minimize their use.
- Providing fuel information for a car object as `getPercentFuelRemaining` instead of `gallonsOfGas` helps with extensibility and adherence to the Dependency Inversion Principle (DIP/IoC).

The distinction between objects and data structures should be intentional. Indiscriminate `getter/setter` degrades objects into data structures. DTOs should have a clear purpose of "data transfer."

##### 2.6. Error Handling: Robust and Predictable Code

**[Exceptions, Null Handling, Special Case Objects]**

- **Use exceptions**: Using exceptions is preferable to returning error codes. Error codes force callers into verification and branching logic, leading to nested `if` statements. Exceptions separate normal code from error handling code for cleaner results. Extract the contents of `try/catch` blocks into separate functions for simplification.
- **Avoid returning `null`**: Returning `null` pushes null-checking responsibility onto callers. Missing checks can cause `NullPointerException`. Instead, throw exceptions or return Special Case Objects (Null Object Pattern).
- **Avoid passing `null`**: Unless an API explicitly expects `null`, avoid passing `null` to methods. Check for `null` parameters within methods and throw `InvalidArgumentException` or use `assert`.
- **Use `Optional<T>` carefully**: Using `isPresent()` like a null check provides little benefit. Leverage `orElse(defaultValue)` or `orElseThrow()`. When returning collections, returning an empty collection (`Collection<T>`) is more concise than `Optional<Collection<T>>`.
- **When `null` is not an error**: Returning `null` when failing to find an element in a collection can be a valid result.
- **Special case objects**: When creating a stack of size 0, instead of raising an error, return a special stack object where `isEmpty()` returns `true`, `getSize()` returns `0`, and `push()/pop()` throw exceptions.

Exceptions help with flow separation, while avoiding null returns and using special case objects reduce repetitive null checks. A consistent error handling strategy is important.

##### 2.7. Boundaries: Clean Interaction with External Elements

Managing boundaries with external libraries, frameworks, and other components affects system stability and maintainability.

- **Encapsulate external code**: Instead of using interfaces like `java.util.Map` directly, hide boundary interfaces within the system through encapsulation. (e.g., a `Sensors` class that uses `Map` internally but exposes only the interface needed by the program). This minimizes the impact of external interface changes, improves code comprehension, and reduces the possibility of misuse. (This doesn't mean encapsulating every `Map` usage. Be careful not to pass boundary interfaces directly throughout the system)
- **Working with code that doesn't yet exist**: When integrating with external modules that don't have an interface yet or are under development, define the interface you need first, proceed with development, and then use the Adapter Pattern to connect with the actual external API.

Boundary handling protects the system internals from external changes. Reducing coupling with external code through patterns like Adapter and Facade minimizes the ripple effect when external libraries are changed or replaced.

### 3. SOLID Principles: The Cornerstones of Robust and Flexible Design

SOLID principles are five fundamental principles of object-oriented programming and design popularized by Robert C. Martin, helping to create software that is understandable, flexible, and maintainable.

Poor design emits "Design Smells":

- **Rigidity**: Difficult to change; a small change requires cascading modifications.
- **Fragility**: Modifying one part causes unexpected problems in seemingly unrelated areas.
- **Immobility**: Difficult to reuse specific parts in other systems.

These stem from poor dependency management or responsibility allocation. The core of object orientation is protecting higher-level modules from lower-level implementation details through Inversion of Control (IoC) and effectively managing dependencies. SOLID provides the guidelines for this.

| **Smell** | **Description** | **Common Cause** | **SOLID Solution Direction** |
| --------- | --------------- | ----------------- | ---------------------------- |
| Rigidity | Difficult to change; one change demands cascading changes | Excessive dependencies, long build/test times | DIP, OCP |
| Fragility | A change in one module causes unexpected problems in unrelated modules | Strong coupling between modules, SRP violation | SRP, ISP |
| Immobility | Difficult to reuse modules in other systems | Strong coupling with databases, UI, frameworks, etc. | DIP, ISP |

##### 3.1. SRP (Single Responsibility Principle)

> "A module should have one, and only one, reason to change."

A 'module' (class/function) should be responsible to only one 'actor' or stakeholder -- that is, it should have only one reason to change, tied to a single actor.

- **Example**: If an `Employee` class has methods for CFO payroll calculation (`calculatePay`), COO work hour reporting (`reportHours`), and CTO data persistence (`save`), it violates SRP. A change in one team's requirements can affect another team's code. (e.g., if `calculatePay` and `reportHours` share a common internal method `regularHours`, a CFO team decision to change `regularHours` could break the COO team's `reportHours`)

- **Solutions**
  - Separate data and methods (e.g., `EmployeeData` class + separate `PayCalculator`, `HourReporter`, `EmployeeSaver` classes for each responsibility)
  - Facade Pattern
  - Separate dependent code by actor

SRP defines "one thing" from the perspective of "users (actors)" to minimize the ripple effect of changes.

##### 3.2. OCP (Open/Closed Principle)

> "Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification."

When adding or changing features, the system should accommodate changes by adding new code rather than modifying existing code.

- **Example**: A `FinancialReportGenerator` module depends on a `FinancialDataGateway` interface, and actual data access is handled by a concrete class like `FinancialDataMapper` that implements this interface. When adding a new data source (`CloudDataMapper`), only a new implementation needs to be added -- the `FinancialReportGenerator` code requires no modification. (To protect `FinancialReportGenerator` from changes in `FinancialDataMapper`, have `FinancialDataMapper` depend on `FinancialDataGateway` while `FinancialReportGenerator` uses `FinancialDataGateway`)

- **Practical Challenges**
  - At the topmost level (main partition), branching statements for dependency injection may be needed (frameworks sometimes automate this).
  - The difficulty of perfectly predicting future extensions ("crystal ball problem").
  - Alternative: Agile Design (minimal design, fast feature delivery, continuous refactoring and design evolution based on feedback).

OCP is primarily achieved through abstraction (interfaces, abstract classes). Abstract the parts that are likely to change, and design concrete implementations to depend on abstractions.

##### 3.3. LSP (Liskov Substitution Principle)

> "Objects of a superclass (or interface) should be replaceable with objects of its subclasses (or implementing classes) without breaking the program's behavior."

LSP provides the foundation for correctly supporting the polymorphism that OCP requires.

- **Example**: A `Billing` application uses objects of the `License` interface type. The subtypes `PersonalLicense` and `BusinessLicense` that implement `License` must be perfectly substitutable for the `License` type (`Billing` should behave identically regardless of which subtype the object is).

- **Signs of LSP Violation**
  - A subtype overrides a supertype method and does nothing, or changes behavior in a way that violates the contract.
  - A new exception is thrown that is only meaningful for a specific subtype.
  - Using `instanceof` to check the type before downcasting.

LSP means that subtypes must adhere to the "behavioral contract" of the supertype, ensuring reliable polymorphism. (The classic Square/Rectangle problem is a common example of LSP violation)

##### 3.4. ISP (Interface Segregation Principle)

> "Clients should not be forced to depend on methods they do not use."

Interfaces should be split into small, cohesive units tailored to client needs.

- **Example**: An `OPS` interface provides `op1, op2, op3`. `User1` uses only `op1`. If `OPS` is a single interface, `User1` depends on `op2` and `op3` at the source code level. If `op2` changes, `User1` also needs recompilation/redeployment.

- **Solution**: Split into client-specific interfaces (`U1Ops`, `U2Ops`, `U3Ops`). `User1` depends only on `U1Ops` and `op1`.

"Fat classes" or "fat interfaces" should be split and isolated according to client needs. Directly passing broad interfaces like `HashMap` as arguments is risky. Wrap them in classes that expose only the necessary functionality when needed.

ISP makes interfaces small and cohesive from the client's perspective, reducing unnecessary dependencies and increasing flexibility and robustness.

##### 3.5. DIP (Dependency Inversion Principle)

> 1. High-level modules should not depend on low-level modules. Both should depend on abstractions.
> 2. Abstractions should not depend on details. Details should depend on abstractions.

A system with maximized flexibility has source code dependencies that point only toward abstractions (e.g., interfaces), not toward concrete implementations. (However, depending on stable platform concrete classes like `java.lang.String` is acceptable.) What must be avoided is direct dependency on volatile concrete elements.

- **DIP Coding Guidelines in Practice**
  - Reference abstract interfaces instead of directly referencing volatile concrete classes (abstract factory pattern can enforce this).
  - Avoid inheriting from volatile concrete classes.
  - Avoid overriding concrete functions (doing so makes it impossible to remove the dependency on that concrete function).

The abstract factory pattern is frequently used when creating volatile concrete objects.

Example: An Application module uses a ConcreteImpl implementation through a Service interface. Application calls the makeSvc method of the ServiceFactory interface. The ServiceFactoryImpl class creates a ConcreteImpl instance in makeSvc and returns it as a Service type.

The control flow (Application -> ConcreteImpl) and source code dependency direction (Application -> Service interface, ServiceFactoryImpl -> ConcreteImpl) can be "inverted."

Complete elimination of DIP violations may be impossible, but they can be gathered and isolated within a small number of concrete components such as the `main` function or factory implementations. The core of object-oriented design is protecting high-level modules from low-level module changes through IoC.

### 4. Clean Architecture: Design That Reveals System Intent

Clean Architecture is a set of principles and patterns that clearly reveal a system's "intent" (what it does). It is not tied to specific technologies, and it protects and emphasizes core business logic and use cases.

##### 4.1. The Essence of Architecture: Beyond Tools

Software architecture is not about the programming language, framework, or development tools used. These are merely implementation tools. True architecture is the set of fundamental decisions that are hard to change or should not be changed, and it forms the foundation of system development.

Great architecture should clearly reveal the system's "usage" (the value it provides to users, how they interact with it -- i.e., use cases). When looking at the architecture, the system's purpose (e.g., "an accounting system") should be apparent before the technology stack. "Intent" rather than technical details should drive the architecture.

##### 4.2. Use Case-Driven Architecture

Traditional MVC web systems often hide core use cases and expose only the "delivery mechanism," making the system's business value unclear.

Clean Architecture places use cases at the center. Use cases contain the core business logic and should exist independently of UI, DB, and frameworks. They should function as complete, self-contained units. (e.g., a web accounting system architecture should clearly describe accounting-related aspects)

Use cases are the system's essential algorithms that interpret input data and generate output data. Architecture should be designed to protect use cases from external changes. The delivery mechanism and infrastructure are secondary and should be coupled as plugins that do not contaminate core use case logic.

##### 4.3. The Dependency Rule and Architectural Boundaries

- **The Dependency Rule**: All source code dependencies must point inward -- from low-level implementation details toward high-level abstract policies. This is an architecture-level extension of DIP.
- **Layer Structure**
  - **Inner**: Domain Models (Entities), Use Cases -- core business logic
  - **Middle**: Interface Adapters (Presenters, Controllers, Gateways, etc.)
  - **Outer**: Frameworks & Drivers (UI, DB, External Interfaces, etc.) -- concrete technology elements

Inner circles (domain, use cases) must not know about outer circles (presentation, DB, etc.). Business logic should not depend on the type of UI or database. Outer circle elements depend on inner circle interfaces.

Data formats should be isolated when crossing boundaries and converted into forms appropriate for each layer. Database objects should not be passed directly to the UI layer.

The Dependency Rule keeps domain logic and use cases stable and independent, improving testability and maintainability.

##### 4.4. The Value of Deferring Key Decisions

Good architecture should be designed so that important technical decisions -- such as the choice of framework, application server, UI technology, or database system -- can be deferred as long as possible.

Instead of the common practice of starting with database schema design at the beginning of a project, focus first on core use cases and business logic.

- **Benefits of deferring technical decisions**
  - Enables optimal technology selection based on more information.
  - Prevents early lock-in to specific technologies, improving long-term adaptability and flexibility.
  - The core system can be developed independently of details, allowing decisions to be delayed until they are truly necessary and enough information is available.

##### 4.5. The Role of Programming Paradigms

Structured, object-oriented, and functional programming paradigms contribute to architecture's control flow management, dependency management, and data immutability maintenance.

- **Functional programming**: Principles of pure functions, immutable data, and minimizing side effects help build predictable, easily testable systems that are strong in concurrency handling.
- **Limitations of testing**: Edsger Dijkstra said, "Testing shows the presence, not the absence of bugs." Perfect quality assurance through testing alone is impossible; robust design principles and architecture must be used to reduce the possibility of errors and increase reliability.

Each paradigm provides powerful tools and principles for architectural design. Structured programming provides control flow discipline, object-oriented programming provides dependency management through DIP, and functional programming provides the benefits of immutability and reduced side effects.
