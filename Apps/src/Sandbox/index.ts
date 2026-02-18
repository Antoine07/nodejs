

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