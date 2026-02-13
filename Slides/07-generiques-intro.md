---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — 7 Génériques (intro)"
---

# Génériques (intro)
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

`Ici T est inutile car il ne lie pas l'entrée à la sortie. De plus il n'est pas contraint (notion qu'on verra plus loin). Le typage ici ajoute du bruit...`.

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

# à retenir

**Un générique doit servir à préserver une information.**

---

# Exemple : `map` typé (entrée → sortie)

```ts
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const lengths = map(["a", "ab"], (s) => s.length); // number[]
```
