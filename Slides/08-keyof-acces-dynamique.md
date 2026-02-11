---
marp: true
title: "TypeScript — keyof et accès dynamique"
theme: gaia
paginate: true
size: 16:9
---

<!-- _class: lead -->
# 8 — `keyof` et accès dynamique
## Manipuler des clés en sécurité

[← Retour à l’index](./index.html)

---

# Objectif du chapitre

- Comprendre `keyof`
- Utiliser `T[K]`
- Écrire `K extends keyof T`
- Construire des helpers (`get`, `pluck`) sans perdre le typage
- Éviter les pièges courants

---

# `keyof` : l’union des clés

```ts
type User = { id: number; name: string; email?: string };

type UserKey = keyof User;
// "id" | "name" | "email"
```

---

# Accès dynamique naïf (pas safe)

```ts
type User = { id: number; name: string };
const u: User = { id: 1, name: "Ada" };

function get(user: User, key: string) {
  return user[key]; // erreur (ou any) : key peut être n’importe quoi
}
```

---

# `K extends keyof T` : version safe

```ts
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const u = { id: 1, name: "Ada" };
const id = get(u, "id");     // number
const name = get(u, "name"); // string
// get(u, "age"); // erreur
```

---

# `pluck` : extraire une colonne

```ts
function pluck<T, K extends keyof T>(arr: T[], key: K): Array<T[K]> {
  return arr.map((item) => item[key]);
}

const users = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Linus" },
];

const ids = pluck(users, "id");     // number[]
const names = pluck(users, "name"); // string[]
```

---

# Piège : index signatures trop larges

```ts
type Dict = Record<string, number>;
const d: Dict = { a: 1 };

// keyof Dict = string (trop large)
```

Avec un dictionnaire, on ne peut pas obtenir un ensemble fini de clés.
Normal : les clés sont “dynamiques”.

---

# Cas d’usage : refactor safe

Si vous renommez `name` → `fullName` :
- `pluck(users, "name")` devient une erreur
- vous corrigez à la compilation, pas en prod

---

# Exercice A (12 min) — `set`

Écris :

```ts
function set<T, K extends keyof T>(obj: T, key: K, value: T[K]): T
```

Elle retourne un nouvel objet (immutabilité) avec la clé mise à jour.

---

# Exercice B (12 min) — mapping typé

Écris une fonction :

```ts
mapValues<T extends object, K extends keyof T, U>(
  obj: T,
  key: K,
  fn: (value: T[K]) => U
): U
```

But : transformer `obj[key]` en autre chose, en gardant la sécurité.

---

# À retenir

- `keyof` + `T[K]` = base du typage dynamique sûr.
- Les helpers deviennent “refactor safe”.
- Attention : dictionnaires (`Record<string, ...>`) ⇒ clés non finies.
