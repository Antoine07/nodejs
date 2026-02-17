---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — 4 Objets & structures"
---

# 4 — Objets & structures
## Décrire la forme des données

---

# Objectif du chapitre

- Décrire des structures (objets) de manière claire
- Comprendre `type` vs `interface` (choix pratique)
- Gérer optionnels et invariants (`readonly`)
- Séparer DTO (API) et modèle métier
- Utiliser `Record` pour des dictionnaires typés

---

# Problème réel : objets “flous” en JavaScript

En JavaScript, un objet peut être “presque bon”… et casser plus tard.

```ts
const user = { id: 1, fullName: "Ada" };

function printUser(u: { id: number; name: string }) {
  return `${u.id} ${u.name.toUpperCase()}`;
}

printUser(user); // bug : la propriété s'appelle fullName
```

TypeScript aide à rendre la **forme** explicite.

---

# Décrire une forme : le minimum utile

```ts
type User = {
  id: number;
  name: string;
};

function printUser(u: User) {
  return `${u.id} ${u.name}`;
}
```

Idée : si la donnée a une forme, on la décrit.

---

# `type` vs `interface` (choix pratique)

Dans ce cours, règle simple :

- `type` : par défaut (aliases, unions, compositions)
- `interface` : contrat d’objet “public/OO” si besoin (ex: libs, extension)

Les deux décrivent une forme d’objet, mais `type` est plus polyvalent.

---

# Propriétés optionnelles : `?`

```ts
type User = {
  id: number;
  name: string;
  email?: string;
};

function formatEmail(u: User) {
  return u.email?.toLowerCase() ?? "(no email)";
}
```

`email?: string` signifie : la propriété peut être absente (`string | undefined`).

---

# `readonly` : protéger des invariants

Quand une donnée ne doit pas être modifiée après création :

```ts
type Session = {
  readonly userId: string;
  readonly createdAt: Date;
  token: string;
};

const s: Session = { userId: "u1", createdAt: new Date(), token: "t" };
// s.userId = "u2"; // erreur
s.token = "t2"; // ok
```

`readonly` documente une intention et évite des mutations accidentelles.

---

# `Partial<T>` : mise à jour partielle (cas métier : “édition”)

Cas concret : une page d’édition permet de modifier **une partie** d’un film (sans toucher à `id`).

```ts
type Movie = {
  id: number;
  title: string;
  rating: number;
};

type UpdateMovieInput = Partial<Omit<Movie, "id">>;

function applyMoviePatch(movie: Movie, patch: UpdateMovieInput): Movie {
  return { ...movie, ...patch };
}

applyMoviePatch({ id: 1, title: "Heat", rating: 4.5 }, { rating: 4.6 }); // ok
// applyMoviePatch(movie, { id: 2 }); // erreur
```

Idée : `Partial<T>` rend toutes les propriétés de `T` optionnelles (utile pour un “PATCH”).

---

# DTO (API) vs modèle métier (application)

Les données externes arrivent souvent au format JSON.

```ts
type UserDTO = {
  id: number;
  name: string;
  created_at: string; // snake_case + string
};

type User = {
  id: number;
  name: string;
  createdAt: Date; // camelCase + Date
};
```

Objectif : **découpler** votre code interne du format externe.

---

# Mapper : transformer le contrat externe

```ts
function mapUserDTO(dto: UserDTO): User {
  return {
    id: dto.id,
    name: dto.name,
    createdAt: new Date(dto.created_at),
  };
}
```

Résultat : votre domaine manipule des types “métiers” (ex: `Date`), même si l’API envoie des strings.

---

# `Record<K, V>` : dictionnaire typé

Quand vous voulez retrouver une donnée rapidement par clé :

```ts
type User = { id: number; name: string };
type UsersById = Record<number, User>;

function indexUsers(users: User[]): UsersById {
  const byId: UsersById = {};
  for (const u of users) byId[u.id] = u;
  return byId;
}
```

---

# Dictionnaire vs objet structuré

Objet structuré (clés connues, stable) :

```ts
type Config = { env: "dev" | "prod"; port: number };
```

Dictionnaire (clés dynamiques, nombreuses) :

```ts
type UsersById = Record<number, { id: number; name: string }>;
```

Question simple : “les clés sont-elles connues à l’avance ?”

---

# Exercice

`Exercices/04-objets-structures.md`
