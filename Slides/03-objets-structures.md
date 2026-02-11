---
marp: true
title: "TypeScript — Objets & structures"
theme: gaia
paginate: true
size: 16:9
---

<!-- _class: lead -->
# 3 — Objets & structures
## Décrire la forme des données

---

# Objectif du chapitre

- Savoir choisir `type` vs `interface`
- Gérer propriétés optionnelles et `readonly`
- Utiliser `Record` pour des dictionnaires
- Comprendre “dictionnaire” vs “objet structuré”

---

# `type` vs `interface` (pratique)

Deux outils proches, mais des usages classiques :
- `interface` : forme d’objet “extensible” (souvent pour des modèles)
- `type` : compositions, unions, aliases, utilitaires

Dans beaucoup d’équipes : **préférence `type` par défaut**, `interface` pour objets publics/OO.

---

# Exemple avec `type`

```ts
type User = {
  id: number;
  name: string;
  email?: string;
};
```

---

# Exemple avec `interface`

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}
```

Différence visible surtout dans l’extension et le “merging” des interfaces.

---

# Propriétés optionnelles

```ts
type Product = {
  id: string;
  title: string;
  discountPercentage?: number;
};

function getDiscountLabel(p: Product) {
  return p.discountPercentage ? `-${p.discountPercentage}%` : "—";
}
```

Optionnel ≠ présent. À gérer systématiquement.

---

# `readonly` : éviter des mutations involontaires

```ts
type Session = {
  readonly userId: string;
  readonly createdAt: Date;
  token: string;
};

const s: Session = { userId: "u1", createdAt: new Date(), token: "t" };
// s.userId = "u2"; // erreur
s.token = "t2"; // ok
```

---

# `Record<K, V>` : dictionnaire typé

```ts
type Roles = "admin" | "editor" | "user";

const permissions: Record<Roles, string[]> = {
  admin: ["*"],
  editor: ["write", "read"],
  user: ["read"],
};
```

Utile pour : mapping, lookup tables, i18n, feature flags.

---

# Dictionnaire vs objet structuré

Objet structuré :
```ts
type User = { id: number; name: string };
```

Dictionnaire :
```ts
type UsersById = Record<number, User>;
```

Question à se poser : “mes clés sont-elles connues à l’avance ?”

---

# DTO / données API : attention au “contrat”

```ts
type UserDTO = {
  id: number;
  name: string;
  created_at: string; // snake_case
};

type User = {
  id: number;
  name: string;
  createdAt: Date; // camelCase + Date
};
```

Souvent, on **sépare** DTO (API) et modèle métier (app).

---

# Exercice A (12 min) — modèle métier

1. Définis un type `OrderDTO` (donnée API) :
   - `id: string`
   - `total_cents: number`
   - `status: "paid" | "pending" | "failed"`
2. Définis un type `Order` (métier) :
   - `id: string`
   - `total: number` (euros)
   - `status: ...` (idem)
3. Écris `mapOrder(dto: OrderDTO): Order`

---

# Exercice B (10 min) — dictionnaire

À partir d’un tableau `User[]`, crée :
- un `Record<number, User>` indexé par `id`

Bonus :
- que se passe-t-il si deux users ont le même `id` ?
- quelle stratégie choisir (overwrite, erreur, tableau) ?

---

# Correction (extrait)

```ts
type OrderStatus = "paid" | "pending" | "failed";
type OrderDTO = { id: string; total_cents: number; status: OrderStatus };
type Order = { id: string; total: number; status: OrderStatus };

function mapOrder(dto: OrderDTO): Order {
  return { id: dto.id, total: dto.total_cents / 100, status: dto.status };
}
```

---

# À retenir

- Décrire la forme des données = base d’un code robuste.
- Optionnel et `readonly` évitent des bugs “invisibles”.
- `Record` = dictionnaires typés, très utile en vrai.
