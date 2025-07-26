
import React from "react"

// 1. Object creation
const obj = { name: "Asif", age: 25 }
console.log("Object literal:", obj)

// 2. Constructor function
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.greet = function () {
    console.log(`Hello, my name is ${this.name}`)
}
const person1 = new Person("Rakib", 30)
person1.greet()

// 3. ES6 Class
class Animal {
    constructor(type) {
        this.type = type
    }
    speak() {
        console.log(`This is a ${this.type}`)
    }
}
const dog = new Animal("Dog")
dog.speak()

// 4. Inheritance
class Dog extends Animal {
    constructor(name) {
        super("Dog")
        this.name = name
    }
    speak() {
        console.log(`${this.name} says Woof!`)
    }
}
const myDog = new Dog("Buddy")
myDog.speak()

// 5. Encapsulation (private fields)
class BankAccount {
    #balance = 0
    constructor(owner) {
        this.owner = owner
    }
    deposit(amount) {
        this.#balance += amount
    }
    getBalance() {
        return this.#balance
    }
}
const account = new BankAccount("Asif")
account.deposit(100)
console.log("Balance:", account.getBalance())

// 6. Polymorphism
class Bird {
    speak() {
        console.log("Bird chirps")
    }
}
class Parrot extends Bird {
    speak() {
        console.log("Parrot talks")
    }
}
const birds = [new Bird(), new Parrot()]
birds.forEach(b => b.speak())

// 7. Static methods
class MathUtil {
    static add(a, b) {
        return a + b
    }
}
console.log("Static add:", MathUtil.add(2, 3))

// 8. Getters and Setters
class Rectangle {
    constructor(width, height) {
        this._width = width
        this._height = height
    }
    get area() {
        return this._width * this._height
    }
    set width(w) {
        this._width = w
    }
}
const rect = new Rectangle(5, 10)
console.log("Area:", rect.area)
rect.width = 7
console.log("New area:", rect.area)

// 9. Prototype chain
console.log("Prototype of person1:", Object.getPrototypeOf(person1))

// 10. Object.create
const proto = { greet() { console.log("Hello from proto") } }
const obj2 = Object.create(proto)
obj2.greet()

// 11. Factory function
function createCar(model) {
    return {
        model,
        drive() { console.log(`${model} is driving`) }
    }
}
const car = createCar("Tesla")
car.drive()

// 12. Mixins
const canFly = {
    fly() { console.log("Flying!") }
}
const birdObj = Object.assign({}, canFly, { name: "Eagle" })
birdObj.fly()

// 13. Class fields & arrow methods
class Counter {
    count = 0
    inc = () => { this.count++ }
}
const counter = new Counter()
counter.inc()
console.log("Counter:", counter.count)

// 14. instanceof
console.log("Is myDog instance of Dog?", myDog instanceof Dog)
console.log("Is myDog instance of Animal?", myDog instanceof Animal)

// 15. Abstraction (simple example)
class Shape {
    getArea() {
        throw new Error("getArea() must be implemented")
    }
}
class Circle extends Shape {
    constructor(radius) {
        super()
        this.radius = radius
    }
    getArea() {
        return Math.PI * this.radius * this.radius
    }
}
const circle = new Circle(3)
console.log("Circle area:", circle.getArea())

const page = () => {
    return (
        <div>
            <h1>JavaScript OOP Concepts Demo</h1>
            <ul>
                <li>Check the console for OOP examples and outputs.</li>
            </ul>
        </div>
    )
}

export default page
