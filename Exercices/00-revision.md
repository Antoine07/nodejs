# Révision — QCM (chapitres 01, 02, 03 + Node)


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

---

## Chapitre Node 13 — Fichiers

### 1) Frontière runtime : type de `JSON.parse`

```ts
const raw = await readFile("./input.json", "utf-8");
const data: unknown = JSON.parse(raw);
```

Pourquoi typer `data` en `unknown` ?

A. Pour empêcher complètement les erreurs runtime  
B. Pour forcer une validation avant usage métier  
C. Parce que `JSON.parse` retourne toujours `never`  
D. Pour convertir automatiquement les champs en classes métier

---

### 2) Validation Zod

```ts
const parsed = Schema.safeParse(data);
```

Quel comportement est correct ?

A. `safeParse` throw toujours en cas d’erreur  
B. `safeParse` retourne un objet avec `success: true | false`  
C. `safeParse` modifie le fichier JSON sur disque  
D. `safeParse` garantit que le JSON source est bien formaté UTF-8

---

### 3) `readFile` et responsabilité

Dans le cours Node 13, `readFile` renvoie :

A. Un objet typé selon votre schéma métier  
B. Un `number` représentant la taille du fichier  
C. Une chaîne (si encodage texte demandé), à parser ensuite  
D. Directement un résultat validé par Zod

---

### 4) Pattern recommandé

Quel enchaînement correspond au pattern vu en cours ?

A. Domain lit le fichier, Application fait le calcul, Infrastructure affiche  
B. Application valide, Domain fait la DB, Infrastructure décide la TVA  
C. Infrastructure lit/valide, Domain applique la logique, Application orchestre  
D. Tout dans `index.ts` pour simplifier

---

## Annexe — Exécution JavaScript

### 1) Event loop : ordre d’exécution

```js
console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
console.log(4);
```

Quel affichage est correct ?

A. `1 2 3 4`  
B. `1 4 3 2`  
C. `1 3 4 2`  
D. `3 1 4 2`

---

### 2) Microtasks vs macrotasks

Laquelle est vraie ?

A. Les macrotasks passent toujours avant les microtasks  
B. Les microtasks sont vidées avant de passer à la macrotask suivante  
C. `setTimeout` est une microtask  
D. Une Promise `.then(...)` est une macrotask

---

### 3) Source de l’asynchronisme

Dans le cours, l’asynchronisme vient principalement :

A. Du compilateur TypeScript  
B. Du moteur JS seul, sans environnement  
C. De l’environnement d’exécution (Web APIs, Node/libuv, OS)  
D. De `console.log`

---

### 4) JavaScript et ECMAScript

Quel énoncé est correct ?

A. ECMAScript est un moteur d’exécution écrit en TypeScript  
B. JavaScript est une norme, ECMAScript un framework Node  
C. ECMAScript définit le langage, les moteurs l’implémentent  
D. V8 est la norme officielle du langage

---

## Architecture simple (TP Cart)

### 1) Injection de dépendance dans `Cart`

Pourquoi `Cart` reçoit un storage en paramètre ?

A. Pour que `Cart` choisisse dynamiquement sa base SQL interne  
B. Pour coupler fortement le domaine à PostgreSQL  
C. Pour découpler le domaine de l’implémentation de persistance  
D. Pour éviter d’écrire des interfaces TypeScript

---

### 2) Responsabilité du domaine

Dans le TP Cart, qui doit calculer le `total()` avec TVA ?

A. Le storage (`ArrayStorage` / `PgStorage`)  
B. Le domaine (`Cart`)  
C. Le script SQL  
D. Le conteneur Docker

---

### 3) Switch mémoire ↔ Postgres

Quel objectif est recherché par ce switch ?

A. Changer la persistance sans modifier la logique métier  
B. Éviter toute interface dans `types.ts`  
C. Déplacer les règles métier dans la DB  
D. Supprimer le dossier `Infrastructure/`

---

### 4) Organisation "clean simple"

Quelle structure est alignée avec le TP ?

A. `Domain/`, `Infrastructure/`, `Application/`  
B. `Controllers/`, `Templates/`, `Styles/`  
C. `Docker/`, `SQL/`, `Tests/` uniquement  
D. Un seul fichier `cart.ts` sans séparation
