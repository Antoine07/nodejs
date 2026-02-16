---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — 3 Fonctions"
---

# 3 — Fonctions
## Le "contrat" : entrées → sortie

---

## Point technique rappel

Ici TypeScript infère une union de types `(flag: boolean) => string | number`

```ts
function getLabel(flag: boolean) {
  if (flag) {
    return "admin";
  }
  return 0;
}
```

---

# `as const` : figer un tuple de retour

Sans `as const`, un tableau de retour devient souvent un "tableau de mélange" (`(A | B)[]`).

```ts
function safeNumber(input: string) {
  const n = Number(input);
  if (Number.isNaN(n)) return [null, "Not a number"] as const;
  return [n, null] as const;
}

const [value, error] = safeNumber("42");
```

Avec `as const`, TypeScript garde un **tuple** (`[number, null]` ou `[null, string]`).

---


## Objet nommé 

```ts
type FetchMoviesOptions = {
  userId: number;                    // obligatoire
  page: number;                      // obligatoire
  sortBy: "rating" | "releaseDate";  // obligatoire

  search?: string;                   // optionnel
  genre?: "action" | "drama" | "comedy" | "thriller";
  pageSize?: number;                 // optionnel
};

function fetchMovies({
  userId,
  page,
  sortBy,
  search,
  genre,
  pageSize = 20,
}: FetchMoviesOptions) {
  return { userId, page, sortBy, search, genre, pageSize };
}
```

---

### Appel clair

```ts
fetchMovies({
  userId: 42,
  page: 1,
  sortBy: "rating",
  genre: "drama",
});
```

---

# Fonctions fléchées (et typage)

```ts
const sum = (a: number, b: number) => a + b;

const log: (message: string) => void = (message) => {
  console.log(message);
};
```

Cas d'usage : handlers, callbacks, utilities.

---

# Fonctions comme valeurs 

Quand un utilisateur note un film, on veut exécuter une action après succès.

```ts
type Rating = {
  movieId: number;
  userId: number;
  score: number;
};

function rateMovie(
  rating: Rating,
  onSuccess: (data: { average: number }) => void
) {
  const result = { average: 4.2 };
  onSuccess(result);
}
```

---

## Utilisation

```ts
rateMovie(
  { movieId: 1, userId: 42, score: 5 },
  (data) => {
    console.log(data.average);
  }
);
```

---

> Le typage du callback définit précisément ce que la fonction renvoie à l'appelant.

---

# Exemple "API handler"

🏷️ Définition : une API handler est une fonction qui : reçoit une requête (request) et et retourne une réponse (response)

```ts
type HttpMethod = "GET" | "POST";

type Request = {
  method: HttpMethod;
  body?: unknown; // donnée externe
};

type Response = {
  status: number;
  json: (data: unknown) => void;
};

type Handler = (req: Request) => Promise<Response> | Response;
```

---


Exercices : `Exercices/03-functions.md` 
