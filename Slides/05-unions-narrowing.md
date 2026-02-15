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

# Unions : un type, plusieurs formes possibles

```ts
type Id = string | number;

function toIdString(id: Id) {
  return String(id);
}
```

>Le vrai gain arrive quand les branches ont des comportements différents.

---

**Narrowing** : mécanisme par lequel TypeScript réduit automatiquement un type large vers un type plus précis en fonction d'un test (typeof, instanceof, in, comparaison stricte, discriminant, truthiness, ou type guard).

Nous ne verrons qu'ici : typeof, in, la comparaison stricte (===) sur des littéraux, et les unions discriminées (via une propriété comme state ou ok).

---

>Le narrowing permet de dire : "Dans cette branche, je suis sûr que c’est l’un des deux."

---

## 🎯 Donc la règle simple

>Vous faites du narrowing quand :
TypeScript ne peut pas garantir que la propriété existe.

>Sinon, inutile.

---

## Utile

```ts
function printEmail(email: string | null) {
  if (!email) {
    return "No email";
  }

  return email.toLowerCase(); // sûr
}
```

---

## Inutile

```ts
function double(n: number) {
  if (typeof n === "number") {
    return n * 2;
  }

  return 0;
}

// correction 
function double(n: number) {
  return n * 2;
}
```

---

# Narrowing avec `typeof`

```ts
function format(value: string | number) {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.trim();
}
```

>Dans chaque branche, TS "sait" le type exact.

---

# Narrowing avec `in`

```ts
type Admin = { role: "admin"; permissions: string[] };
type User = { role: "user"; plan: "free" | "pro" };
type Account = Admin | User;

function getLabel(a: Account) {
  if ("permissions" in a) {
    return `Admin (${a.permissions.length})`;
  }
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

# `as const` : obtenir un discriminant automatiquement

```ts
function parseAge(input: string) {
  const n = Number(input);

  if (Number.isNaN(n)) {
    return { ok: false, error: "INVALID_AGE" } as const;
  }

  return { ok: true, value: n } as const;
}

const r = parseAge("12");

if (r.ok) {
  r.value; // number
} else {
  r.error; // "INVALID_AGE"
}
```

`ok` devient un discriminant (`true`/`false`) qui permet un narrowing fiable.

---

`as const` permet d'obtenir un **type de retour précis sous forme d'union discriminée**, au lieu d'un objet flou avec des champs optionnels.

---

### Différence sur le type de retour

Sans `as const` :

```ts
// Type inféré
{
  ok: boolean;
  error?: string;
  value?: number;
}
```

Avec `as const` :

```ts
// Type inféré
| { readonly ok: false; readonly error: "INVALID_AGE" }
| { readonly ok: true;  readonly value: number }
```

👉 Ce n'est plus "un objet avec des propriétés optionnelles",
mais **deux formes strictes et exclusives**.

---

# États impossibles : exemple UI naïf

```ts
// anti-pattern : tout est optionnel / nullable
type Ui = {
  loading: boolean;
  data?: { items: string[] };
  error?: string;
};
```

>Problème : `loading=true` + `error` + `data` peut coexister.

---

# États impossibles : version robuste (union)

```ts
type Ui =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; data: { items: string[] } }
  | { state: "error"; message: string };
```

>Ici, certains combos sont *impossibles* par construction.

---

# Exemple : rendu UI sûr

```ts
function render(ui: Ui) {
  if (ui.state === "success") {
    return ui.data.items.join(", ");
  }
  if (ui.state === "error") {
    return ui.message;
  }
  return ui.state; // "idle" | "loading"
}
```

---

# Cas d'usage : réponses API

```ts
type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string } };

function unwrap<T>(r: ApiResult<T>) {
  if (!r.ok) throw new Error(r.error.message);
  return r.data;
}
```

## Exercice

`Exercice/05-unions-narrowing.md`