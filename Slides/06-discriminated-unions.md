---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/r)"
title: "TypeScript — 6 Types littéraux & discriminants"
---

# 6 — Types littéraux & discriminants
## Structurer des systèmes robustes

---

# Objectif du chapitre

- Utiliser les discriminated unions
- Écrire des `switch` exhaustifs
- Comprendre `never` comme garde de complétude
- Appliquer à des reducers / state machines

---

# Discriminated union : un champ “tag”

```ts
type Action =
  | { type: "increment"; by: number }
  | { type: "decrement"; by: number }
  | { type: "reset" };
```

Le champ `type` discrimine les variantes.

---

# Reducer typé

```ts
type State = { count: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.by };
    case "decrement":
      return { count: state.count - action.by };
    case "reset":
      return { count: 0 };
  }
}
```

Problème : TypeScript n’impose pas toujours l’exhaustivité par défaut.

---

# `never` : forcer l’exhaustivité

```ts
function assertNever(x: never): never {
  throw new Error("Unexpected value: " + String(x));
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.by };
    case "decrement":
      return { count: state.count - action.by };
    case "reset":
      return { count: 0 };
    default:
      return assertNever(action);
  }
}
```

Si on ajoute une action et qu’on oublie de gérer le `switch` → erreur TS.

---

# `never` : c’est quoi ?

- `never` = “ce cas ne doit pas exister”
- utile pour :
  - exhaustivité
  - fonctions qui ne retournent jamais (throw, infinite loop)
  - éliminer des branches impossibles

---

# State machine : exemple simple

```ts
type Machine =
  | { state: "idle" }
  | { state: "running"; startedAt: number }
  | { state: "stopped"; reason: "done" | "cancelled" };
```

Chaque état a ses champs, et uniquement ceux-là.

---

# Exercice A (12 min) — switch exhaustif

1. Crée un type `Route` :
   - `{ kind: "home" }`
   - `{ kind: "product"; id: string }`
   - `{ kind: "checkout" }`
2. Écris `toPath(route: Route): string`
3. Ajoute `assertNever` pour l’exhaustivité.

---

# Exercice B (10 min) — reducer

Modélise les actions d’un todo :
- `add` (text)
- `toggle` (id)
- `remove` (id)

Puis : écris `reducer(todos, action)` avec un `switch` exhaustif.

---

# À retenir

- Les discriminated unions rendent les branches simples et sûres.
- `switch` + `never` = refactor safe (si ça compile, c’est complet).
- Excellent pour reducers, state machines, logique métier.
