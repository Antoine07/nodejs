

// function first(arr: any[]) {
//     return arr[0];
// }



function first<T>(arr: T[]): T | undefined {
    return arr[0];
}

const n = first([1, 2, 3]);       // number | undefined
const s = first(["a", "b"]);      // string | undefined
const u = first([{ id: 1 }]);     // { id: number } | undefined

function wrap<T>(value: T) {
    return { value };
}

const a = wrap("x");

console.log(a)

function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
    return arr.map(fn);
}

const lengths = map(["a", "ab"], (s) => s.length); // number[]


type User = {
    name: string;
    notes: number[];
}

const users: User[] = [
    { name: "Alan", notes: [12, 11, 10] },
    { name: "Alice", notes: [6, 19, 20] },
    { name: "Sophie", notes: [7, 10, 11] },
]

console.log(
    map(users, u => ({ avg: (u.notes.reduce((acc, n) => acc + n)) / u.notes.length }))
)

function toString(value: unknown): string {
    return String(value);
}

toString({})

function parseJson<T>(text: string): T {
    return JSON.parse(text) as T;
}
//   const n = parseJson<number>('{"x":1}'); // faux 

// function byId<T >(items: T[], id: number): T | undefined {
//     return items.find((x) => x.id === id);
//   }

(function () {

    type Movie = { id: number; title: string; rating: number };
    type MovieKey = keyof Movie;

    const movies = { id: 1, title: "La nuit du 12", rating: 18 }

    function getMovieField<K extends MovieKey>(movie: Movie, key: K) {
        return movie[key]; // pas safe : key peut être n'importe quoi
    }

    console.log(getMovieField(movies, "id"))

    function get<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
    }

    console.log(get(movies, "id"))
})();

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_PATH = join(__dirname, "./");

const raw = await readFile(`${DATA_PATH}/persons.json`, "utf-8");

const data: unknown = JSON.parse(raw);

import { z } from "zod"

const Schema = z.object({
    name: z.string().min(1),
    tape: z.array(z.number()).min(1),
});

const parsed = Schema.safeParse(data);

if (parsed.success) console.log(parsed.data.name);


import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

function sendJson(res: ServerResponse, status: number, data: unknown): void {
    res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(data));
}

const movies = ["Heat", "Alien", "Arrival"];


const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    const rawUrl = req.url ?? "/";
    const path = rawUrl.split("?", 2)[0] ?? "/";
    const segments = path.split("/").filter(Boolean);

    if (method === "GET" && path === "/health") {
        return sendJson(res, 200, { ok: true });
    }

    if (method === "GET" && path === "/movies") {
        const [_, queryString = ""] = rawUrl.split("?", 2);
        const params = new URLSearchParams(queryString);
        const limit = Number(params.get("limit") ?? String(movies.length));

        return sendJson(res, 200, { items: movies.slice(0, limit) });
    }

    if (method === "GET" && segments[0] === "movies" && segments[2] === "screenings") {
        const movieId = Number(segments[1]);
        if (Number.isNaN(movieId)) return sendJson(res, 400, { error: "Invalid movieId" });
      
        return sendJson(res, 200, { movieId, items: movies[movieId] });
      }

    return sendJson(res, 404, { ok: false, error: "Not Found" });
});

server.listen(3001, "0.0.0.0", () => {
    console.log("http://localhost:3001")
});


function ff(arr: any[]) {
    return arr[0];
  }

  function fff<T>(arr: T[])  {
     return arr[0];
  }

const aa : Array<string> = []


type Mode = "dev" | "prod";

function setMode<T extends Mode>(mode: T) {
  return mode;
}


const cfg1 = { mode: "dev" } as const;

setMode(cfg1.mode)


const k = "orange"

const product = {
    [k] : "manger"
}

console.log(product)