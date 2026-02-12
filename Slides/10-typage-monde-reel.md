---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/r)"
title: "TypeScript — 10 Typage du monde réel"
---

# 10 — Typage du monde réel
## Gérer l’imprévisible (données externes)

---

# Objectif du chapitre

- Comprendre `unknown` vs `any`
- Écrire des type guards
- Parser/valider les entrées (JSON, formulaires, API)
- Séparer runtime vs typage

---

# `any` : désactive TypeScript

```ts
let value: any = "hello";
value.toFixed(); // compile (mais faux)
```

`any` propage l’absence de sécurité.

---

# `unknown` : on ne sait pas (et c’est OK)

```ts
let value: unknown = "hello";
// value.toFixed(); // erreur : unknown

if (typeof value === "string") {
  value.toLowerCase(); // ok
}
```

`unknown` force le narrowing avant usage.

---

# Type guard : fonction qui prouve un type

```ts
type User = { id: number; name: string };

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.id === "number" && typeof v.name === "string";
}
```

---

# Parser JSON : ne jamais “caster” à l’aveugle

```ts
function parseJson(input: string): unknown {
  return JSON.parse(input);
}

const data = parseJson('{"id":1,"name":"Ada"}');

if (isUser(data)) {
  console.log(data.name); // safe
}
```

---

# Pattern “parse or throw”

```ts
function parseUser(value: unknown): { ok: true; data: User } | { ok: false; error: string } {
  if (!isUser(value)) return { ok: false, error: "Invalid user" };
  return { ok: true, data: value };
}
```

On combine runtime validation + type safety.

---

# Entrées utilisateur : toujours suspectes

Exemples :
- `FormData.get()` → `FormDataEntryValue | null`
- `localStorage.getItem()` → `string | null`
- query params → `string | null`
- API → `unknown`

Règle : **entrée externe = `unknown` jusqu’à validation**.

---

# Exercice A (15 min) — guard `isOrder`

Crée :

```ts
type Order = { id: string; total: number; status: "paid" | "pending" | "failed" };
function isOrder(value: unknown): value is Order
```

Test avec :
- un objet valide
- un objet avec `total: "12"` (string)
- `null`
- `{}` vide

---

# Exercice B (15 min) — parse API

Écris :

```ts
function parseOrders(value: unknown): Order[]
```

Règles :
- si ce n’est pas un tableau d’`Order`, tu lances une erreur
- sinon tu retournes le tableau typé

Bonus : retourne un `ApiResult<Order[]>` plutôt que `throw`.

---

# À retenir

- `any` = pas de protection. `unknown` = protection par défaut.
- TS ne valide pas les données : c’est à vous de le faire au runtime.
- Guards / parsing = pont entre le monde réel et les types.
