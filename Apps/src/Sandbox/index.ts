
let data: unknown;

data = 1;

if (typeof data == "number") {
    data.toFixed(2);
}

type Role = "dev" | "admin";

let role: Role = "dev"; // string pas de type Role
// const role = "dev";

function setRole(r: Role) { }

setRole(role); // ❌

const priceJS = "10";
const totalJS = priceJS + 5; // "105"
console.log("JS total:", totalJS);

import { isPrime, isPrimePos } from "./Prime"

const primes = []
let n = 2
while (n < 10000000) {
    if (isPrime(n)) primes.push(n)

    n++
}

console.log(primes)

let pos = 1;
for (const prime of primes) {
    if (isPrimePos(prime, pos)) {
        console.log(prime, pos);
    }
    pos++;
}

(function () {
    // const préserve les types littéraux
    const n = "Ada";        // type = "Ada" sous type de string
    const count: number = 3;        // type = 3 sous type de number
    const enabled = true;   // type = true sous type de boolean

    function check(x: "Ada" | 3 | true | number) {
        console.log("ça marche", x);
    }
    check(n);        // ✅
    check(count);    // ✅
    check(enabled);  // ✅
    check(13);
})()
