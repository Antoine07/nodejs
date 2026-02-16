---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — 4 Objets & structures"
---

# 4 — Objets & structures
## Décrire la forme des données

---

# Objectif du chapitre

- Savoir choisir `type` vs `interface`
- Gérer propriétés optionnelles et `readonly`
- Utiliser `Record` pour des dictionnaires
- Comprendre "dictionnaire" vs "objet structuré"

---

# `type` vs `interface` (pratique)

Deux outils proches, mais des usages classiques :
- `interface` : forme d'objet "extensible" (souvent pour des modèles)
- `type` : compositions, unions, aliases, utilitaires

Dans beaucoup d'équipes : **préférence `type` par défaut**, `interface` pour objets publics/OO.

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

Différence visible surtout dans l'extension et le "merging" des interfaces.

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

Question à se poser : "mes clés sont-elles connues à l'avance ?"

---

# DTO / données API : attention au "contrat"

🏷️ Définition : Un `DTO` est un objet dont le rôle est de transporter des données entre deux couches d'un système (API ↔ backend ↔ base de données), sans contenir de logique métier.

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

Souvent, on **sépare** DTO (Data Transfer Object) (API) et modèle métier (app).

DTO : permet de transporter des données entre différentes couches d'une application, sans contenir de logique métier complexe. 

---

## TP - réfléchir à deux

`TPs/tp-cart.md`
