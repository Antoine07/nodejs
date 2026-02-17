---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — 5 Unions & narrowing"
---

# 5 — Unions & narrowing
## Rendre les états explicites

---

# Objectif du chapitre

- Écrire des unions (`A | B`) pour rendre les états explicites
- Faire du narrowing avec `typeof`, `in`, et `===`
- Modéliser des résultats “success / error” sans champs optionnels
- Rendre des états impossibles… impossibles

---

# Problème réel : résultat “flou”

```ts
type Result = {
  ok: boolean;
  value?: number;
  error?: string;
};
```

Problème : on peut avoir `ok=true` *et* `error`.

La lecture du code devient plus difficile : “quels champs existent vraiment ?”

---

# Solution : union de deux formes exclusives

```ts
type Result =
  | { ok: true; value: number }
  | { ok: false; error: string };
```

Ici, `ok` devient un **discriminant** : il permet de savoir quelle forme on a.

---

# Narrowing sur le discriminant

```ts
function print(r: Result) {
  if (r.ok) {
    return `value=${r.value}`;
  }
  return `error=${r.error}`;
}
```

Dans chaque branche, TypeScript connaît la forme exacte.

---

# Unions simples (primitives)

```ts
type Id = string | number;

function toIdString(id: Id) {
  return String(id);
}
```

Le gain est maximal dès que chaque branche a un comportement différent.

---

# Narrowing avec `typeof`

```ts
function format(value: string | number) {
  if (typeof value === "number") return value.toFixed(2);
  return value.trim();
}
```

---

# Narrowing avec `in`

```ts
type Admin = { role: "admin"; permissions: string[] };
type User = { role: "user"; plan: "free" | "pro" };
type Account = Admin | User;

function getLabel(a: Account) {
  if ("permissions" in a) return `Admin (${a.permissions.length})`;
  return `User (${a.plan})`;
}
```

---

# Narrowing avec `===` (littéraux)

```ts
type PaymentStatus = "paid" | "pending" | "failed";

function isFinal(status: PaymentStatus) {
  return status === "paid" || status === "failed";
}
```

---

# `as const` : conserver un discriminant dans un retour

```ts
function parseAge(input: string) {
  const n = Number(input);
  if (Number.isNaN(n)) return { ok: false, error: "INVALID_AGE" } as const;
  return { ok: true, value: n } as const;
}

const r = parseAge("12");

if (r.ok) r.value; // number
else r.error; // "INVALID_AGE"
```

`as const` aide à garder `ok` et `error` sous forme de littéraux.

---

# États impossibles (UI) : union discriminée

```ts
type Ui =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; data: { items: string[] } }
  | { state: "error"; message: string };
```

Certains combos deviennent impossibles (ex: `loading` + `error` + `data`).

---

# Exemple : rendu UI sûr

```ts
function render(ui: Ui) {
  switch (ui.state) {
    case "success":
      return ui.data.items.join(", ");
    case "error":
      return ui.message;
    default:
      return ui.state; // "idle" | "loading"
  }
}
```

---

# Cas d'usage : réponses API génériques

```ts
type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string } };
```

L'appelant doit gérer les deux branches : le code devient plus sûr et plus explicite.

---

# Exercice

`Exercices/05-unions-narrowing.md`
