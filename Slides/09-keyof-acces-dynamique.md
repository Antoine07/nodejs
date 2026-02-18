---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — 9 `keyof` et accès dynamique"
---

# 9 — `keyof` et accès dynamique
## Manipuler des clés en sécurité

---

# Objectif du chapitre

- Comprendre `keyof` (union de clés)
- Écrire un `get` typé : `T[K]`
- Écrire un `pluck` typé (extraire une "colonne")
- Comprendre le piège des index signatures (`Record<string, ...>`)

---

# Problème réel : clé dynamique "pas safe"

Cas métier : un tableau (UI) veut afficher une colonne choisie par l'utilisateur.

```ts
type Movie = { id: number; title: string; rating: number };

function getMovieField(movie: Movie, key: string) {
  return movie[key]; // pas safe : key peut être n'importe quoi
}
```

Si `key = "raiting"`, l'erreur arrive trop tard (voire en silence).

---

# `keyof` : union des clés d'un objet

```ts
type Movie = { id: number; title: string; rating: number };
type MovieKey = keyof Movie;
// "id" | "title" | "rating"
```

Objectif : restreindre `key` à un ensemble fini de clés valides.

---

# Solution pour le problème précédent

```ts
type Movie = { id: number; title: string; rating: number };
type MovieKey = keyof Movie;

function getMovieField<K extends MovieKey>(movie: Movie, key: K) {
    return movie[key]; // pas safe : key peut être n'importe quoi
}
```

---

# `K extends keyof T` : accès dynamique typé

```ts
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const m = { id: 1, title: "Heat", rating: 4.5 };
const title = get(m, "title"); // string
// get(m, "raiting"); // erreur
```

Point clé : le type de retour n'est pas "au hasard", c'est `T[K]`.

---

# Exemple métier : `pluck` (extraire une colonne)

```ts
function pluck<T, K extends keyof T>(items: T[], key: K): Array<T[K]> {
  return items.map((item) => item[key]);
}

const movies = [
  { id: 1, title: "Heat", rating: 4.5 },
  { id: 2, title: "Alien", rating: 4.7 },
];

const titles = pluck(movies, "title");  // string[]
const ratings = pluck(movies, "rating"); // number[]
```

---

# Exemple métier : `set` typé 

Cas métier : un bouton active/désactive un utilisateur (sans mutation).

```ts
function set<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  return { ...obj, [key]: value };
}

type User = { id: number; name: string; active: boolean };

const user: User = { id: 1, name: "Alice", active: false };
const updated = set(user, "active", true);
```

`value: T[K]` empêche `set(user, "active", "yes")`.

---

# Piège : `Record<string, number>`

```ts
type Metrics = Record<string, number>;
type Keys = keyof Metrics; // string
```

Ici, `keyof` vaut `string` car **toutes les clés** (n'importe quelle string) sont possibles.

---

# Comparaison : clés finies vs clés infinies

Clés finies (objet "structuré") :

```ts
const obj = { a: 1, b: 2 };
type Keys = keyof typeof obj; // "a" | "b"
```

Clés infinies (dictionnaire) :

```ts
type Dict = Record<string, number>;
type Keys = keyof Dict; // string
```

---

# À retenir

- `keyof T` = union des clés de `T`
- `T[K]` = type de la propriété `K` dans `T`
- `K extends keyof T` = "clé valide" (refactor-safe)
- `Record<string, ...>` = dictionnaire à clés "illimitées" (`keyof` → `string`)

---

# TP

`TPs/TuringMinu/tp-turing-mini.md`
