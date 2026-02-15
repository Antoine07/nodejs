---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — 8 Contraintes : extends"
---

# 8 — Contraintes : `extends`
## Sécuriser les génériques

---

# Objectif du chapitre

- Comprendre `extends` comme *contrainte*, pas héritage
- Restreindre `T` pour autoriser certaines opérations
- Voir des cas réels : helpers, validation, APIs génériques

---

# `extends` : contrainte, pas héritage

```ts
function echo<T extends string>(value: T): T {
  return value;
}

echo("hello"); // ok
// echo(123);  // erreur
```

`T` est un type générique, mais **borné** à `string`.

---

# Exemple : `as const` pour satisfaire une contrainte

```ts
type Mode = "dev" | "prod";

function setMode<T extends Mode>(mode: T) {
  return mode;
}

const cfg1 = { mode: "dev" };
// setMode(cfg1.mode); // erreur : string n'est pas Mode

const cfg2 = { mode: "dev" } as const;
setMode(cfg2.mode); // ok
```

Sur un objet, `mode: "dev"` est souvent élargi en `string` : `as const` évite cet élargissement.

---

# Pourquoi contraindre ?

Sans contrainte :
```ts
function lengthOf<T>(value: T) {
  return value.length; // erreur : T n'a pas forcément length
}
```

Avec contrainte :

```ts
function lengthOf<T extends { length: number }>(value: T) {
  return value.length;
}
```

*T peut être n'importe quel type, à condition qu'il possède une propriété length de type number.*

---

# Contraindre sur une forme d'objet

```ts
function byId<T extends { id: number }>(arr: T[], id: number): T | undefined {
  return arr.find((x) => x.id === id);
}
```

Le helper devient réutilisable, mais reste sûr.

---

## 🎯 Pourquoi c'est puissant

>La fonction marche pour tout type ayant un id.

```ts
type User = { id: number; name: string };
type Product = { id: number; price: number };

const user = byId<User>(users, 1);
const product = byId<Product>(products, 42);

byId([{ name: "A" }], 1); // erreur 
```

Remarque vous n'êtes pas obligé de préciser le T explicitement, mais le type inféré doit satisfaire la contrainte `T extends { id: number }`.

---

# Cas réel : merger sécurisé

```ts
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const r = merge({ id: 1 }, { name: "Ada" }); // { id: number } & { name: string }
```

---

# Quand restreindre ?

Restreindre quand :
- vous utilisez une propriété/méthode sur `T`
- vous voulez limiter les entrées valides
- vous voulez améliorer le message d'erreur

---

# Exercices



`Exercices/08-contraintes-extends.md`
