const message: string = "Hello, TypeScript!";

function greeter(person: string) {
  return `Hello, ${person}!`;
}

const user = {
  firstName: "Jane",
  lastName: "Doe"
};


// Adding more ES6+ features to demonstrate the need for transpilation
const array = [1, 2, 3, 4, 5];
const squaredArray = array.map(n => n * n);

const asyncFunc = async () => {
  return await Promise.resolve("Hello, async/await!");
};
asyncFunc().then(console.log);

// Adding more features to illustrate the difference
class Person {
  constructor(public firstName: string, public lastName: string) {}

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const jane = new Person("Jane", "Doe");
//console.log(jane.getFullName());


// Simulate heavy computation
const largeArray: number[] = Array.from({ length: 10000000 }, (_, i) => i);
const sum: number = largeArray.reduce((acc, val) => acc + val, 0);

// Additional ES6+ features
const doubleArray = (arr: number[]) => arr.map((x) => x * 2);

const newPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved after 2 seconds");
  }, 2000);
});

newPromise.then(console.log).catch(console.error);