# Révision — QCM (chapitres 01, 02, 03)


### Types ≠ valeurs

```ts
type User = { id: number };

console.log(User);
```

A. Affiche `{ id: number }` au runtime  
B. Compile et affiche `undefined`  
C. Erreur TypeScript : un type est utilisé comme une valeur  
D. Erreur JavaScript uniquement au runtime

---

### "Ça compile" ne veut pas dire "ça marche"

```ts
const x: number = Number("abc");
console.log(x);
```

A. TypeScript empêche ce code de compiler  
B. TypeScript garantit que `x` vaut un nombre "valide" (pas `NaN`)  
C. TypeScript garantit uniquement que `x` est un `number` (au sens du type), pas sa validité  
D. `Number("abc")` retourne une string

---

### 3) Le cast peut masquer un bug

```ts
function add(a: number, b: number) {
  return a + b;
}

add("1" as unknown as number, 2);
```

A. TypeScript refuse toujours de compiler  
B. TypeScript compile, mais le runtime peut produire un résultat inattendu  
C. TypeScript compile et garantit le résultat `3`  
D. Le cast convertit réellement `"1"` en `1` au runtime

---

## Chapitre 02 — Types & inférence

### 4) Inférence : `const` vs `let`

```ts
const env1 = "dev";
let env2 = "dev";
```

Quels sont les types inférés ?

A. `env1: string`, `env2: string`  
B. `env1: "dev"`, `env2: string`  
C. `env1: "dev"`, `env2: "dev"`  
D. `env1: never`, `env2: never`


---

### 5) `as const` sur un tableau

```ts
const METHODS = ["GET", "POST"] as const;
type Method = (typeof METHODS)[number];
```

Quel est le type de `Method` ?

A. `string`  
B. `"GET" | "POST"`  
C. `["GET", "POST"]`  
D. `readonly string[]`


---

### 6) `as const` sur un objet : readonly + littéraux

```ts
const obj = {
  foo: {
    bar: 42,
  },
} as const;

obj.foo.bar = 43;
```

A. Compile et modifie `bar`  
B. Erreur TypeScript car `bar` est `readonly`  
C. Erreur runtime uniquement  
D. `as const` n’a aucun effet sur les objets


---

## Chapitre 03 — Fonctions

### Paramètre optionnel

```ts
function upper(name?: string) {
  return name.toUpperCase();
}
```

A. Compile, car `name` est toujours une string  
B. Erreur TypeScript : `name` peut être `undefined`  
C. Erreur runtime uniquement  
D. `name?: string` signifie `name: string | null`

---

###  Annotation de retour : protection

```ts
function parsePort(value: string): number {
  if (value === "dev") return 3000;
  return "3000";
}
```

A. Compile, car `"3000"` est un nombre  
B. Erreur TypeScript : le retour doit être un `number`  
C. Compile, car TypeScript convertit automatiquement `"3000"` en `3000`  
D. Erreur seulement si `strict` est activé

---

### Objet d’options : valeurs autorisées

```ts
type SortBy = "rating" | "title";

function fetchMovies(options: { sortBy: SortBy }) {
  return options.sortBy;
}

fetchMovies({ sortBy: "releaseDate" });
```

A. Compile : `"releaseDate"` est un `string`  
B. Erreur TypeScript : `"releaseDate"` n’appartient pas à `"rating" | "title"`  
C. Compile : TypeScript infère automatiquement `"releaseDate"` dans l’union  
D. Erreur runtime uniquement

---

### Callback typé : contrat d’appel

```ts
function onDone(cb: (avg: number) => void) {
  cb("4.2");
}
```

A. Compile : `"4.2"` est convertible en nombre  
B. Erreur TypeScript : `cb` attend un `number`  
C. Compile uniquement avec `as const`  
D. Erreur runtime uniquement
