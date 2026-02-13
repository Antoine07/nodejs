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

# Objectif du chapitre

- Typer les paramètres (et comprendre pourquoi)
- Comprendre le typage du retour (quand / pourquoi)
- Gérer optionnels, valeurs par défaut, objets d'options
- Savoir typer des callbacks et fonctions comme valeurs

---

# Paramètres typés

```ts
function add(a: number, b: number) {
  return a + b;
}

add(1, 2);
// add("1", 2); // erreur
```

Le contrat est explicite : `number` + `number` → `number`.

---

# Retour : souvent inféré

```ts
function toSlug(value: string) {
  return value.trim().toLowerCase().replaceAll(" ", "-");
}
// retour inféré : string
```

Annoter le retour peut être utile :
- pour un contrat public
- pour éviter une union "surprise" (voir la slide qui suit pour un rappel)
- pour documenter une intention

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

# Retour : quand l'annotation protège

```ts
function parsePort(value: string): number {
  const n = Number(value);
  if (Number.isNaN(n)) return 3000; // fallback
  return n;
}
```

Si vous retournez parfois une string, l'erreur est immédiate.

---

# Paramètres optionnels

```ts
function greet(name?: string) {
  // name: string | undefined
  return `Hello ${name ?? "anonymous"}`;
}
```

`?` signifie : "peut être absent".

---

# Valeurs par défaut

```ts
function paginate(page = 1, pageSize = 20) {
  return { page, pageSize };
}
```

Ici, `page` et `pageSize` sont `number`.

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

## Ce que TypeScript garantit

- `data.average` est un `number`
- impossible d'accéder à une propriété inexistante
- contrat clair entre la logique métier et l'UI

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

## Ce que ces types apportent

- `HttpMethod` limite les valeurs possibles
- `Request` structure l'entrée
- `Response` impose une forme cohérente
- `Handler` définit un contrat clair (sync ou async)

---

## Pourquoi c'est important

Même sans framework :

- l'architecture est explicite
- les responsabilités sont claires
- les frontières (body: unknown) sont identifiées

> Les types structurent la logique avant même d'écrire l'implémentation.

---
Parfait — voici une version compacte, claire et directement intégrable en **2 slides**.

---


Exercices : `Exercices/03-functions.md` 
