---
marp: true
title: "TypeScript — Unions & narrowing"
theme: gaia
paginate: true
size: 16:9
---

<!-- _class: lead -->
# 4 — Unions & narrowing
## Rendre les états explicites

[← Retour à l’index](./index.html)

---

# Objectif du chapitre

- Créer des unions (`A | B`)
- Réduire (narrow) avec `typeof`, `in`, `===`
- Modéliser des états impossibles
- Éviter des erreurs “par design”

---

# Unions : un type, plusieurs formes possibles

```ts
type Id = string | number;

function toIdString(id: Id) {
  return String(id);
}
```

Le vrai gain arrive quand les branches ont des comportements différents.

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

Dans chaque branche, TS “sait” le type exact.

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

# États impossibles : exemple UI naïf

```ts
// anti-pattern : tout est optionnel / nullable
type Ui = {
  loading: boolean;
  data?: { items: string[] };
  error?: string;
};
```

Problème : `loading=true` + `error` + `data` peut coexister.

---

# États impossibles : version robuste (union)

```ts
type Ui =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; data: { items: string[] } }
  | { state: "error"; message: string };
```

Ici, certains combos sont *impossibles* par construction.

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

# Cas d’usage : réponses API

```ts
type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string } };

function unwrap<T>(r: ApiResult<T>) {
  if (!r.ok) throw new Error(r.error.message);
  return r.data;
}
```

---

# Exercice A (12 min) — `ApiResult<T>`

1. Crée `ApiResult<T>` comme ci-dessus.
2. Écris `mapResult<T, U>(r: ApiResult<T>, fn: (t: T) => U): ApiResult<U>`
3. Écris un exemple avec :
   - succès (`data`)
   - erreur (`error`)

---

# Exercice B (10 min) — état UI

Modélise un upload :
- `idle`
- `uploading` (progression `0..100`)
- `done` (url)
- `error` (message)

Puis : écris une fonction `getBannerText(state): string`.

---

# À retenir

- Les unions modélisent “le monde réel” (variable, imprévisible).
- Le narrowing rend les branches sûres et lisibles.
- Les états impossibles = moins de bugs, moins de `if` partout.
