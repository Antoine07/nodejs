console.log("Node 24 + TypeScript prêt 🚀");


// extends = contrainte 
function echo<T extends string>(value: T): T {
    return value;
}

const x: "hello" = echo("hello"); // type "hello"
console.log(x)
console.log(x)

let a: string;

const value = JSON.parse('{"price":"12.50"}') as { price: number };

value.price.toFixed(2);
