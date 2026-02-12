---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/r)"
title: "TypeScript — 7 Génériques (intro)"
---

# 7 — Génériques (intro)
## Réutiliser sans perdre le typage

---

# Objectif du chapitre

- Comprendre pourquoi les génériques existent
- Utiliser `<T>` pour lier entrée / sortie
- Identifier les génériques inutiles (anti-pattern)

---

# Pourquoi les génériques ?

Sans génériques :
```ts
function first(arr: any[]) {
  return arr[0];
}
```

Problème : on perd l’information. `first([1,2,3])` retourne `any`.

---

# Avec génériques : préserver l’info

```ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const n = first([1, 2, 3]);       // number | undefined
const s = first(["a", "b"]);      // string | undefined
const u = first([{ id: 1 }]);     // { id: number } | undefined
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

`T` sert à “transporter” une info d’un bout à l’autre.

---

# Anti-pattern : générique inutile

```ts
// Mauvais : T ne sert à rien (on ne le réutilise pas)
function logValue<T>(value: T): void {
  console.log(value);
}
```

Ici, un simple `unknown` est souvent suffisant :
```ts
function logValue(value: unknown): void {
  console.log(value);
}
```

---

# Message clé

**Un générique doit servir à préserver une information.**

---

# Exemple : `map` typé (entrée → sortie)

```ts
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const lengths = map(["a", "ab"], (s) => s.length); // number[]
```

---

# Exercice A (12 min) — `first`

1. Écris `first<T>(arr: T[]): T | undefined`
2. Écris `last<T>(arr: T[]): T | undefined`
3. Teste avec :
   - `number[]`
   - `string[]`
   - `{ id: number }[]`

---

# Exercice B (10 min) — `pair`

Écris une fonction :

```ts
pair<A, B>(a: A, b: B): [A, B]
```

Puis utilise-la pour créer :
- `[string, number]`
- `[boolean, { id: string }]`

---

# À retenir

- Les génériques sont un outil de réutilisation *sans perdre la précision*.
- Si `T` n’apporte aucune info → c’est souvent un mauvais signe.
- L’objectif : garder une DX forte et éviter `any`.
