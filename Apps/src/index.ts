
import { z } from "zod";


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

try{
	value.price.toFixed(2);
}catch(e){
	console.log("error type string not number")
}

console.log(value)

// 1️⃣ Définir le schéma
const ValueSchema = z.object({
  price: z.coerce.number(), // accepte "12.50" et le convertit en 12.5
});


const v = ValueSchema.parse(value)

console.log("ici", v)

console.log(v.price.toFixed(2));


try{
    let name: string = "Alice";
    name = null; // ❌ erreur
}catch(e){
}


type Role = "dev" | "admin";
let role = "dev";
function setRole(r: Role) {}
setRole(role); // ❌ erreur


