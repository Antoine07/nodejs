---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — keyof et accès dynamique"
---

# `keyof` et accès dynamique
## Manipuler des clés en sécurité

---

# `keyof` : l'union des clés

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
  return user[key]; // erreur (ou any) : key peut être n'importe quoi
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
```

Cela signifie :

> "un objet dont **toutes les clés possibles de type string** ont une valeur number."

Donc TypeScript comprend :

```
clé possible = n'importe quel string
```

---

>`Record<string, number>` est équivalent à :

```ts
type Dict = {
  [key: string]: number;
};

```

---

>Les clés d'un Record sont `string | number | symbol`

---

#  Comparaison claire

## Clés connues

```ts
const obj = { a: 1, b: 2 };
type Keys = keyof typeof obj;
```

👉 `Keys` = `"a" | "b"`

Ensemble fini.

---

##  Record<string, number>

```ts
type Dict = Record<string, number>;
type Keys = keyof Dict;
```

👉 `Keys` = `string`

Pourquoi ?

Parce que l'objet peut contenir :

```ts
{ a: 1 }
{ x: 1 }
{ randomKey123: 1 }
{ anything: 1 }
```

Les clés ne sont pas finies.

---

# 🎯 Pourquoi c'est un piège ?

Beaucoup pensent que :

```ts
const d: Dict = { a: 1 };
```

implique :

```
keyof d === "a"
```

Mais non.

`Dict` dit :

> Cet objet peut avoir n'importe quelle clé string.

Donc TypeScript ne peut pas restreindre.

---

#  Exemple qui surprend

```ts
type Dict = Record<string, number>;

function get<K extends keyof Dict>(key: K) {}

get("hello");   // OK
get("anything"); // OK
```

Parce que `keyof Dict` = `string`.

Donc toutes les strings sont autorisées.

---

# Exercice — `set`

Écrire une fonction, elle retourne un nouvel objet avec la clé mise à jour.

```ts
console.log(user)
// { id: 1, name: 'Alice', active: false } 
console.log(updated)
// { id: 1, name: 'Alice', active: true }   
```