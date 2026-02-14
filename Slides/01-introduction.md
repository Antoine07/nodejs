---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — 1 Introduction"
---

#  Introduction

## Brève introduction historique 1/3

TypeScript est créé en 2012 chez Microsoft, sous l'impulsion d'Anders Hejlsberg (également créateur de C#).

Objectif initial :

> Apporter de la structure et de la sécurité à JavaScript pour des applications de grande taille.

---

## Brève introduction historique 2/3

À l'époque :

- JavaScript devient dominant (Node.js, frameworks front)
- Les applications grossissent
- Les bugs liés au typage dynamique deviennent coûteux

TypeScript propose alors :

- un sur-ensemble de JavaScript
- compatible à 100 %
- compilé en JavaScript standard

---

## Brève introduction historique 3/3

Aujourd'hui, TypeScript est devenu le standard de fait pour le développement JavaScript professionnel.

---


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

## Bug possible : donnée API "presque" correcte

```js
const apiResponse = { price: "12.50" };

function formatPrice(price) {
  return (price + 1).toFixed(2);
}

formatPrice(apiResponse.price);
```

Problème :

- crash au **runtime**

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
  return user.email?.toLowerCase();
}

sendEmail({ name: "John" })
sendEmail({ email: 12345 })
```

user.email est absent ?. empêche l'erreur

La fonction retourne undefined
Aucun crash, aucun message

👉 L'email n'est pas envoyé… et personne ne le sait.

---

## Version robuste en TypeScript

Même si on peut valider en js pur, le crash arrive au runtime, avec TypeScript la vérification des types se fait avant ...

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
- améliore la DX, `DX: expérience développeur`.

---

## 🏷️ Définition — Typage statique

Les types sont vérifiés au moment de la compilation, pas au runtime, donc avant l'exécution du programme.

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

tsc (compilateur TypeScript)

👉 Avec TypeScript, il y a un compilateur en plus par rapport à JavaScript pur.

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

## Compile-time ≠ Runtime

```ts
try {
  let name: string = "Alice";
  name = null; // ❌ erreur TypeScript avant le runtime
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

La gestion des `null` et `undefined` par rapport à notre configuration `tsconfig` est strict. 

```ts
active = null ; // erreur typescript 

let active : boolean | null ; // marche avec active = null
```

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

##  Identifier les bugs

Donnez 1 exemples de bugs silencieux.

- TypeScript peut-il aider ?
- Si non, que faut-il ajouter ?
