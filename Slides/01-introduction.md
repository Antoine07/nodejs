---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/r)"
title: "TypeScript — 1 Introduction"
---

# 1 — Introduction
## Pourquoi TypeScript ?

JavaScript est :
- flexible
- permissif
- très puissant

---

## En production…

Cette flexibilité entraîne :
- des bugs silencieux
- des erreurs tardives
- des comportements inattendus

---

## JavaScript : ce qui casse en production

Les bugs sont souvent :
- silencieux (pas de crash immédiat)
- contextuels (données rares, cas limites)
- découverts trop tard

---

## Bug silencieux : donnée API "presque" correcte

```js
const apiResponse = { price: "12.50" };

function formatPrice(price) {
  return (price + 1).toFixed(2);
}

formatPrice(apiResponse.price);
```

Problèmes possibles :

- concaténation au lieu d'addition
- crash au **runtime**
- difficile à détecter en tests

---

## Version robuste en TypeScript

```ts
function parsePrice(value: string): number {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error("Invalid price");
  }
  return parsed;
}

const result = formatPrice(parsePrice(apiResponse.price));
```

---

## Bug silencieux : champ optionnel non géré

```js
function sendEmail(user) {
  return user.email.toLowerCase();
}
```

Le bug apparaît :

- après une migration
- avec un compte incomplet
- sur un cas marginal

---

## Version robuste en TypeScript

```ts
type User = {
  email?: string;
};

function sendEmail(user: User): string {
  if (!user.email) {
    throw new Error("Email manquant");
  }

  return user.email.toLowerCase();
}
```

---

## Ce que fait TypeScript

TypeScript :

- ajoute des **types statiques**
- vérifie le code **avant l'exécution**
- détecte :

  - propriétés manquantes
  - mauvais types
  - incohérences de retour
- améliore la DX

---

## 🏷️ Définition — Typage statique

Les types sont vérifiés avant l'exécution du programme.

Les erreurs sont détectées à la compilation.

---

## Ce que TypeScript ne fait PAS

TypeScript :

- ne valide pas les données externes
- ne remplace pas les tests
- ne supprime pas les erreurs runtime

Il complète :

- les tests
- la validation runtime
- l'observabilité

---

<!-- _class: lead -->

**TypeScript n'empêche pas d'écrire du JavaScript.**
**Il empêche d'écrire du JavaScript faux.**

---

## Types = analyse statique

```ts
const n: number = 42;
```

- Les types annotés n'existent pas au runtime
- Le code généré reste du JavaScript

---

## "Ça compile" ≠ "C'est sûr"

```ts
const value = JSON.parse('{"price":"12.50"}') as { price: number };

value.price.toFixed(2); // 💥 runtime error
```

Le compilateur fait confiance.
Les données peuvent mentir.

---

## ⚖️ Compile-time ≠ Runtime

```ts
try {
  let name: string = "Alice";
  name = null; // ❌ erreur TypeScript
} catch (e) {
  console.log("Jamais exécuté");
}
```

Les erreurs de type sont bloquées **avant exécution**.

---

## try/catch fonctionne uniquement au runtime

```ts
try {
  JSON.parse("invalid json"); // 💥 erreur JS
} catch (e) {
  console.log("Erreur capturée");
}
```

---

## 🧱 Frontière du système

Deux mondes :

**Interne (contrôlé)**

- fonctions
- variables locales
- transformations

**Externe (incertain)**
- API
- JSON.parse
- formulaires
- process.env

TypeScript protège très bien le monde interne.
Le monde externe doit être validé.

---

## Solution robuste en production

```ts
import { z } from "zod";

const Schema = z.object({
  price: z.coerce.number(),
});

const value = Schema.parse(JSON.parse('{"price":"12.50"}'));

value.price.toFixed(2);
```

> TypeScript vérifie votre code.
> Zod vérifie vos données.

---

## Types primitifs

```ts
let count: number = 0;
let name: string = "Alice";
let active: boolean = true;
```

Attention à `null` et `undefined` selon la configuration.

---

## `any` : le piège

```ts
let data: any;

data.foo.bar();
data.toUpperCase();
```

Aucune sécurité.

---

## `unknown` : alternative sûre

Contrairement à `any`, TypeScript ne vous laisse rien faire tant que vous n'avez pas vérifié.

```ts
let data: unknown;

if (typeof data === "string") {
  data.toUpperCase();
}
```

---

## Objets : définir un contrat

```ts
type User = {
  id: number;
  email: string;
};

function sendEmail(user: User): string {
  return user.email.toLowerCase();
}
```

---

## Propriétés optionnelles

```ts
type User = {
  id: number;
  email?: string;
};

user.email?.toLowerCase();
```

---

## Fonctions typées

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Erreur détectée immédiatement :

```ts
add("42", 8); // ❌ erreur
```

---

## Fonctions fléchées et inférence

```ts
const add = (a: number, b: number) => a + b;
```

TypeScript infère automatiquement le type de retour.

---

## Quand dépendre de l'inférence

Excellente pour le code local :

```ts
const tags = ["ts", "js"];
const user = { id: 1, name: "Ada" };
const ids = [user].map((u) => u.id);
```

Mais aux frontières, il faut être explicite et valider.

---

## Limites de l'inférence

- contrats publics
- objets vides
- `let` élargit les littéraux
- unions implicites

---

## Exemple — let élargit

```ts
type Role = "dev" | "admin";

let role = "dev";

function setRole(r: Role) {}

setRole(role); // ❌
```

Solution :

```ts
const role = "dev";
```

---

## Unions implicites

```ts
let value: string | number;

if (Math.random() > 0.5) {
  value = "hello";
} else {
  value = 42;
}
```

TypeScript combine les types possibles.

---

## null et strictNullChecks

```ts
let value: string = null; // interdit en strict mode
```

---

## Exemple API réaliste

```ts
type ApiUser = {
  id: number;
  email: string | null;
};

if (user.email !== null) {
  user.email.toLowerCase();
}
```

---

## TypeScript remplace quoi ?

- documentation obsolète
- QA manuelle
- tests triviaux

---

## Il ne remplace pas :

- logique métier
- tests complexes
- validation runtime

---

## Positionnement mental

TypeScript est :

- un outil de communication
- une documentation vivante
- un garde-fou collectif

---

<!-- _class: lead -->

# Exercices

---

## Exercice 1 — Identifier les bugs

Donnez 3 exemples de bugs silencieux déjà rencontrés :

- TypeScript peut-il aider ?
- Si non, que faut-il ajouter ?

---

## Exercice 2 — Corriger le type

```ts
type Product = {
  id: number;
  price: number;
};
```

L'API renvoie parfois `price: string`.
Proposez une solution correcte.

---

## Exercice 3 — Supprimer `any`

```ts
function process(data: any) {
  return data.value.toUpperCase();
}
```

- remplacez `any`
- sécurisez l'accès à `value`

---

## Exercice 4 — Union type

Créez un type pour l'état d'un formulaire :

- idle
- loading
- success
- error

Implémentez une fonction `render`.

---

## Exercice 5 — Refactor contrôlé

Ajoutez une propriété `role` à un type `User` :

- `"admin"` | `"user"`
- identifiez les impacts dans le code
