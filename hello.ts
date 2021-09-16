const ts: string = true

function add(a: number, b: number): number {
  return a + b;
}

// 🚀  Functions

const getFullName = (firstName: string, lastName: string): string => {
  return firstName + lastName;
};

const printPage = (): void => {
  window.print();
};

type User = {
  id: string;
  email: string;
};

const getUserById = (id: string): Promise<User> => {
  return Promise.resolve({
    id,
    email: "pawi@pawi.pl",
  });
};

// 🚀  Klasy i interfejsy

class Person {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHello() {
    console.log(`Siema, jestem ${this.name}`);
  }
}

const person1 = new Person("Pawi");
person1.sayHello();

// console.log(person1.name);
// Property 'name' is private and only accessible within class 'Person'.(2341)

interface ICar {
  readonly brand: string;
  readonly model: string;
  mileage: number;
  notes?: string;
}

//vs

type Car = {
  readonly brand: string;
  readonly model: string;
  mileage: number;
  notes?: string;
};

const carFromInterface: ICar = {
  brand: "Audi",
  model: "A4",
  mileage: 100000,
  notes: "super auto",
};

const carFromType: Car = {
  brand: "Audi",
  model: "A4",
  mileage: 100000,
};

// Property 'mileage' is missing in type
// '{ brand: string; model: string; }'
// but required in type 'ICar'.(2741)
// const car: ICar = {
//   brand: 'Audi',
//   model: 'A4'
// }

//🚀  Konwersja typu

type Fish = {
  swim: Function;
}
type Bird = {
  fly: Function
}

declare function getSmallPet() : Fish | Bird

let pet = getSmallPet();
let fishPet = pet as Fish;
let birdPet = pet as Bird;
 
if (fishPet.swim) {
  fishPet.swim();
} else if (birdPet.fly) {
  birdPet.fly();
}

// 🚀  Typy generyczne

// const fn = (x) => x
// const fn = (x: any) => x
// const fn = <T> (x: T): T => x
// cosnt fn = <T> (x: T) => x

class Queue<T> {
  private array: Array<T> = [];

  push(el: T) {
    return this.array.push(el);
  }

  pop(): T | undefined {
    return this.array.pop();
  }

  getArray(): Array<T> {
    return this.array;
  }
}

const strQ = new Queue<string>();
strQ.push("a");
strQ.push("b");
// strQ.push(1)

const intQ = new Queue<number>();
intQ.push(1);
intQ.push(2);
// intQ.push('a')

// 🚀  Inferencje typów

let city = "Gliwice";

function getRandomInt(b: Boolean) {
  if (b) return 1;
  else return Math.random();
}

// 🚀  Unie

declare let userStatus: "active" | "pending";
declare let currency: "PLN" | "EUR";
declare let brand: "nike" | "adidas" | "puma";

// 🚀  Utlity Types

// Partial<Type>
// Readonly<Type>
// Required<Type>
// Pick<Type, Keys>
// Omit<Type, Keys>

interface Todo {
  title: string;
  description: string;
  isNew?: Boolean;
}

const editTodo: Partial<Todo> = {
  title: "edited title",
};

const newTodo: Required<Todo> = {
  title: "new title",
  description: "new desc",
  isNew: true,
};

const reaonlyTodo: Readonly<Todo> = {
  title: "readonly",
  description: "readonly",
};

// reaonlyTodo.title = "hmm...";

const pickedTodo: Pick<Todo, "title"> = {
  title: "picked",
};

const omitTodo: Omit<Todo, "description"> = {
  title: "omit",
};

// 🐛 🐛 🐛 Problemy

const getUsers = () => {
  return fetch('/api/getUsers').then(response => response.json()) //kto wie co tutaj przyjdzie???
}

// TS pozwala na koercje na stringach...
let str = 'Siema siema...'
str + 100 //hmm...

// W JS mozna dzielic przez 0 => infinity, TS tez z tym nic nie robi

// TS nie ogarnia ze funkcja przyjmuje obiekty z większą ilością propsów niż powinny

type Form = {
  firstName: string;
  lastName: string;
};
declare function renderForm(f: Form): void;

renderForm({
  firstName: "Pawel",
  lastName: "Nackiewicz",
  job: "developer",
});

const person = {
  firstName: "Pawel",
  lastName: "Nackiewicz",
  job: "developer",
};

renderForm(person);

// TS nie ogarnia ze element tablicy o danym indeksie nie istnieje

const arr: Array<number> = [1,2,3]

console.log(arr[10])