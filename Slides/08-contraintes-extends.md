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

- Comprendre `extends` comme une **contrainte** (pas de l’héritage)
- Restreindre `T` quand on a besoin d’accéder à une propriété/méthode
- Écrire des helpers génériques “métier” (ex: `byId`, `lengthOf`)
- Savoir quand éviter une contrainte (API trop rigide)

---

# Problème réel : helper trop générique

```ts
function byId<T>(items: T[], id: number): T | undefined {
  return items.find((x) => x.id === id);
}
```

Erreur : `T` peut être n’importe quoi, donc TypeScript refuse l’accès à `.id`.

---

# Solution : contraindre sur la forme attendue

```ts
function byId<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((x) => x.id === id);
}
```

On dit : “`T` peut être n’importe quel type, **à condition** d’avoir `id: number`.”

---

# Exemple métier : réutiliser le helper sur plusieurs modèles

```ts
type Movie = { id: number; title: string };
type Screening = { id: number; movieId: number; startsAt: string };

const movies: Movie[] = [{ id: 1, title: "Heat" }];
const screenings: Screening[] = [{ id: 10, movieId: 1, startsAt: "20:30" }];

byId(movies, 1)?.title;
byId(screenings, 10)?.startsAt;
```

Le typage est préservé : `byId(movies, …)` retourne `Movie | undefined`.

---

# `extends` : contrainte, pas héritage

```ts
function echo<T extends string>(value: T): T {
  return value;
}

echo("hello"); // ok
// echo(123);  // erreur
```

Ici, `extends string` signifie : “`T` doit être une string (ou un littéral string)”.

---

# Autre cas métier : besoin de `.length`

```ts
function lengthOf<T extends { length: number }>(value: T) {
  return value.length;
}

lengthOf("hello");     // ok
lengthOf([1, 2, 3]);   // ok
// lengthOf(123);      // erreur
```

Le but n’est pas “d’être strict”, c’est d’autoriser une opération en sécurité.

---

# Exemple : `as const` pour satisfaire une contrainte (widening)

```ts
type Mode = "dev" | "prod";

function setMode<T extends Mode>(mode: T) {
  return mode;
}

const cfg1 = { mode: "dev" };
// setMode(cfg1.mode); // erreur : cfg1.mode est souvent inféré comme string

const cfg2 = { mode: "dev" } as const;
setMode(cfg2.mode); // ok
```

Sur un objet, un littéral peut être élargi en `string`. `as const` conserve `"dev"`.

---

# Quand éviter de contraindre ?

Évitez une contrainte si elle n’apporte rien (API plus rigide, sans gain).

```ts
function logValue<T>(value: T): void {
  console.log(value);
} // T n’est pas “transporté” ailleurs : `unknown` suffit souvent
```

---

# À retenir

- `extends` sert à **autoriser** une opération (accès propriété, méthode…)
- `extends` n’est pas de l’héritage runtime
- Une contrainte doit avoir une valeur : meilleure sécurité, meilleure DX
- Si le générique ne “sert” pas, un type concret ou `unknown` est souvent plus clair

---

# Exercices

`Exercices/08-contraintes-extends.md`
