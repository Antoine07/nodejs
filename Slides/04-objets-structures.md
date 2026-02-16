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

# `type` vs `interface` (pratique)

Deux outils proches, mais des usages classiques :
- `interface` : forme d'objet "extensible" (souvent pour des modèles), contrat structurel extensible
- `type` : compositions, unions, aliases, utilitaires, outil de composition avancée

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

## Merging

```ts
interface User {
  id: number;
}

interface User {
  name: string;
}
```

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
Voici une version plus claire, plus structurée et plus pédagogique.

---

# DTO / API : respecter le **contrat de données**

## 🎯 Idée centrale

Un **DTO (Data Transfer Object)** sert uniquement à **transporter des données entre deux couches** :

* Frontend ↔ API
* API ↔ Backend
* Backend ↔ Base de données

Il **ne contient aucune logique métier**.

---

### DTO (contrat externe API)

```ts
type UserDTO = {
  id: number;
  name: string;
  created_at: string; // format JSON + snake_case
};
```

Caractéristiques :

- Respecte le format réseau
- Compatible JSON
- Pas de Date native
- Pas de logique

---

### Modèle métier (interne application)

```ts
type User = {
  id: number;
  name: string;
  createdAt: Date; // camelCase + type métier
};
```

Caractéristiques :

- Typage riche (`Date`)
- Convention interne (camelCase)
- Peut contenir de la logique

---

##  Pourquoi les séparer ?

###  L’API est un contrat externe

Vous ne la contrôlez pas toujours.

###  Le métier évolue différemment

Votre application peut avoir des règles, des transformations, des validations.

---

###  Le format réseau ≠ format métier

- JSON → string
- App → Date
- snake_case → camelCase

---

## Exemple de transformation

```ts
function mapUserDTO(dto: UserDTO): User {
  return {
    id: dto.id,
    name: dto.name,
    createdAt: new Date(dto.created_at),
  };
}
```

👉 On transforme le contrat externe en modèle interne.

---

# ⚠ Le point clé

> Le DTO définit un **contrat technique**
> Le modèle métier définit une **structure métier**

Les mélanger crée :

- Couplage fort avec l’API
- Dette technique
- Bugs subtils liés aux formats

---

## TP - réfléchir à deux

`TPs/tp-cart.md`
