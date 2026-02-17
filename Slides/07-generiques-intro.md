---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — 7 Génériques (intro)"
---

# 7 — Génériques (intro)
## Réutiliser sans perdre la précision des types

---

# Objectif du chapitre

- Comprendre le problème que résolvent les génériques
- Utiliser `<T>` pour préserver une information (entrée → sortie)
- Écrire des fonctions génériques simples (`first`, `map`, `pair`)
- Repérer les génériques inutiles (bruit)
- Éviter le piège : "générique" ≠ "validation runtime"

---

# Problème : du code dupliqué

```ts
function firstNumber(arr: number[]) {
  return arr[0];
}

function firstString(arr: string[]) {
  return arr[0];
}
```

Le code est identique, seul le type change.

---

# Mauvaise solution : `any` (on perd l'info)

```ts
function first(arr: any[]) {
  return arr[0];
}

const n = first([1, 2, 3]); // any
```

`any` supprime la sécurité et fait perdre l'autocomplétion.

---

# Bonne solution : un générique préserve l'info

```ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const n = first([1, 2, 3]);       // number | undefined
const s = first(["a", "b"]);      // string | undefined
const u = first([{ id: 1 }]);     // { id: number } | undefined
```

---

# Inférence : `T` est presque toujours deviné

Dans la majorité des cas, on ne précise pas `T` : TypeScript l'infère à partir des arguments.

On le précise surtout quand il n'y a pas assez d'informations (ex: aucun argument).

```ts
function emptyArray<T>(): T[] {
  return [];
}

type User = { id: number; name: string };

const users = emptyArray<User>(); // User[]
```

---

# Lien entrée / sortie (point clé)

```ts
function wrap<T>(value: T) {
  return { value };
}

const a = wrap("x"); // { value: string }
const b = wrap(123); // { value: number }
```

`T` sert à "transporter" une info d'un bout à l'autre.

---

# Plusieurs types génériques (A, B…)

Quand deux entrées n'ont pas le même type :

```ts
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

const p = pair(1, "hello"); // [number, string]
```

---

# Exemple : `map` typé (entrée → sortie)

```ts
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const lengths = map(["a", "ab"], (s) => s.length); // number[]
```

---

# Les génériques sont déjà partout

```ts
type A = Array<number>;          // number[]
type B = Promise<string>;        // Promise<string>
type C = Record<string, number>; // dictionnaire
```

Idée : `Type<...>` signifie "un type paramétré par d'autres types".

---

# Anti-pattern : générique "décoratif"

Si `T` n'est pas réutilisé, il n'apporte souvent rien :

```ts
function toString<T>(value: T): string {
  return String(value);
}
```

Souvent, `unknown` suffit :

```ts
function toString(value: unknown): string {
  return String(value);
}
```

---

# Piège : "générique" ne veut pas dire "validation"

```ts
function parseJson<T>(text: string): T {
  return JSON.parse(text) as T;
}
```

Ce code n'a aucune validation runtime : `T` peut être faux.

---

# À retenir

- Un générique est utile s'il **préserve** une information de type (entrée → sortie)
- Si `T` n'est pas réutilisé, il est souvent inutile (bruit)
- Un générique ne remplace pas une validation runtime (API, JSON, formulaires)
