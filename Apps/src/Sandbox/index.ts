
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


const config = {
    mode: "prod"
} as const;


const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"] as const;

type HttpMethod = (typeof HTTP_METHODS)[number];

function request(method: HttpMethod, path: string) {
    return `${method} ${path}`;
}

request("GET", "/health"); // ok
// request("PATCH", "/health"); // erreur


import {
    createServer,
    type IncomingMessage,
    type ServerResponse,
} from "node:http";


const server = createServer(
    (req: IncomingMessage, res: ServerResponse): void => {

        const method = req.method; // string | undefined

        if (!method || !HTTP_METHODS.includes(method as any)) {
            res.statusCode = 405;
            res.end("Method Not Allowed");
            return
        }

        res.end(`OK: ${method}`);
    }
);

server.listen(3001, () => {
    console.log("Server running on http://localhost:3000");
});


(function () {
    const n = 10;  // 10 sous type number
    let s = "hello"; // string
    const arr = [1, 2, 3]; // number[]
    const mixed = [1, "a"]; // (number | sting)[]
    const user = { id: 1, name: "Ada" }; // { id : number, name : string }


    const t: [string, number] = ["k", 1];

    type User = {
        id: number;
        name: string;
    };

    const u: User = {
        id: 1,
        name: "Ada",
    };

})()


function safeNumber(input: string) {
    const n = Number(input);
    if (Number.isNaN(n)) return [null, "Not a number"] as const;
    return [n, null] as const;
}

type Machin = {
    a: number, b: string
}

const a: Partial<Machin> = {
    a: 1
}


function computeAverageScore(n: number[], precision: number = 2) {
    if (n.length == 0) throw new Error("Tableau vide")

    const s = n.reduce((acc, x) => x + acc, 0);

    return (s / n.length).toFixed(precision)
}

type Movie = {
    id: number;
    title: string;
    rating: number;
};

function filterAndSortMovies(
    movies: Movie[],
    minRating: number,
    sortBy: "rating" | "title"
): Movie[] {
    // retourne une nouvelle référence 
    const filtered = movies.filter(m => m.rating > minRating)

    return filtered.sort((a, b) => {
        if (sortBy == "rating") return a.rating - b.rating

        return a.title.localeCompare(b.title)
    })
}

const movies: Movie[] = [
    { id: 1, title: "Inception", rating: 8.8 },
    { id: 2, title: "Avatar", rating: 7.8 },
    { id: 3, title: "Interstellar", rating: 8.6 },
];

console.log(filterAndSortMovies(movies, 8, "rating"));
console.log(filterAndSortMovies(movies, 7, "title"));

console.log(movies)

interface User {
    id: number;
}

interface User {
    name: string;
}

function g(user : User){}

g({id : 1, name : "Alan"})