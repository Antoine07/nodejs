---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/r)"
title: "TypeScript — Fonctions"
---

# 2 — Fonctions
## Le “contrat” : entrées → sortie

---

# Objectif du chapitre

- Typer les paramètres (et comprendre pourquoi)
- Comprendre le typage du retour (quand / pourquoi)
- Gérer optionnels, valeurs par défaut, objets d'options
- Savoir typer des callbacks et fonctions comme valeurs

---

# Paramètres typés

```ts
function add(a: number, b: number) {
  return a + b;
}

add(1, 2);
// add("1", 2); // erreur
```

Le contrat est explicite : `number` + `number` → `number`.

---

# Retour : souvent inféré

```ts
function toSlug(value: string) {
  return value.trim().toLowerCase().replaceAll(" ", "-");
}
// retour inféré : string
```

Annoter le retour peut être utile :
- pour un contrat public
- pour éviter une union “surprise”
- pour documenter une intention

---

# Retour : quand l'annotation protège

```ts
function parsePort(value: string): number {
  const n = Number(value);
  if (Number.isNaN(n)) return 3000; // fallback
  return n;
}
```

Si vous retournez parfois une string, l'erreur est immédiate.

---

# Paramètres optionnels

```ts
function greet(name?: string) {
  // name: string | undefined
  return `Hello ${name ?? "anonymous"}`;
}
```

`?` signifie : “peut être absent”.

---

# Valeurs par défaut

```ts
function paginate(page = 1, pageSize = 20) {
  return { page, pageSize };
}
```

Ici, `page` et `pageSize` sont `number`.

---

# Objets d'options (pattern très courant)

```ts
type FetchUsersOptions = {
  limit?: number;
  search?: string;
  activeOnly?: boolean;
};

function fetchUsers(options: FetchUsersOptions = {}) {
  const limit = options.limit ?? 20;
  const search = options.search ?? "";
  const activeOnly = options.activeOnly ?? false;
  return { limit, search, activeOnly };
}
```

---

# Fonctions fléchées (et typage)

```ts
const sum = (a: number, b: number) => a + b;

const log: (message: string) => void = (message) => {
  console.log(message);
};
```

Cas d'usage : handlers, callbacks, utilities.

---

# Fonctions comme valeurs : callbacks

```ts
function onClick(handler: (event: { x: number; y: number }) => void) {
  handler({ x: 10, y: 20 });
}

onClick((e) => {
  console.log(e.x, e.y);
});
```

Le typage du callback donne l'autocomplétion à l'appelant.

---

# Exemple “API handler”

```ts
type HttpMethod = "GET" | "POST";

type Request = { method: HttpMethod; body?: unknown };
type Response = { status: number; json: (data: unknown) => void };

type Handler = (req: Request) => Promise<Response> | Response;
```

Même dans un projet sans framework, ces types structurent la logique.

---

# Exercice A (10 min) — contrat clair

Écris une fonction :
- `normalizeEmail(email: string): string`
- elle doit `trim()`, `toLowerCase()`
- elle doit refuser une entrée vide (choisis une stratégie)

Contraintes :
- si tu choisis “refuser” via erreur : quel est le type de retour ?
- si tu choisis “refuser” via `null` : quel est le type de retour ?

---

# Exercice B (12 min) — options

Écris une fonction :

```ts
createUser(options)
```

Avec :
- `name` obligatoire
- `email` obligatoire
- `role` optionnel (`"admin" | "user"`, par défaut `"user"`)
- `newsletter` optionnel (par défaut `false`)

Objectif : *pas de paramètre positionnel fragile*.

---

# Correction (extrait)

```ts
type Role = "admin" | "user";
type CreateUserOptions = {
  name: string;
  email: string;
  role?: Role;
  newsletter?: boolean;
};

function createUser(options: CreateUserOptions) {
  return {
    ...options,
    role: options.role ?? "user",
    newsletter: options.newsletter ?? false,
  };
}
```

---

# À retenir

- Une fonction = un contrat : entrées typées → sortie typée.
- Les options en objet évitent les signatures “impossibles à lire”.
- Les callbacks typés donnent de la DX (et évitent des bugs).
