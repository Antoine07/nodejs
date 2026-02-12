---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/r)"
title: "TypeScript — Introduction et bases avancées"
---

# TypeScript
## Introduction et bases avancées
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

## Docker lancer les conteneurs

Téléchargez le starter et lancez le en local, puis travailler avec deux écrans en lançant `dev` et `typecheck`, voir le détails dans les slides qui suivent.

---

## setup `starter/` : runtime vs type-check

Dans `starter/package.json` :

```json
"dev": "tsx watch src/index.ts",
"typecheck": "tsc --watch --pretty  src/index.ts"
```

- `dev` exécute le code (runtime)
- `typecheck` vérifie les types (analyse statique)

>Message clé : TypeScript ne protège que si on lance le type-check.

---


## Double écran / split VS Code (recommandé)

But : éviter “ça tourne donc c’est bon”.

- Split de l’éditeur (ou 2 écrans) pour garder le code visible
- 2 terminaux en parallèle :
  - terminal A : `npm run dev`
  - terminal B : `npm run typecheck`
- Dans VS Code : split editor + split terminal (même résultat sur un seul écran)

---

<img src="./images/configuration.png" width="800" />

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
- crash au **runtime** (éxecution du programme)
- difficile à détecter en tests


---

## Exemple de version robuste en production en TS

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

## Bug silencieux en JS pure : champ optionnel non géré

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

## Version robuste de l'exemple précédent en TS

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
- améliore fortement la DX (Developer Experience)

---

## Ce que TypeScript ne fait PAS

TypeScript :

- ne valide pas les données externes
- ne remplace pas les tests
- ne supprime pas les erreurs runtime ( à l'exécution)

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

- Les types n'existent pas au runtime
- Le code généré reste du JavaScript

---

## "Ça compile" ≠ "C'est sûr"

```ts
const value = JSON.parse('{"price":"12.50"}') as { price: number };

value.price.toFixed(2);
```

Le compilateur fait confiance.
Les données peuvent mentir.

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

- aucune vérification
- désactive TypeScript localement

---

## `unknown` : alternative sûre

```ts
let data: unknown;

if (typeof data === "string") {
  data.toUpperCase();
}
```

- oblige à vérifier
- protège contre les abus

---

## Objets : définir un contrat

```ts
type User = {
  id: number;
  email: string;
};
```

```ts
function sendEmail(user: User) {
  user.email.toLowerCase();
}
```

---

## Propriétés optionnelles

```ts
type User = {
  id: number;
  email?: string;
};
```

```ts
user.email.toLowerCase(); // erreur TS
```

TypeScript force à gérer l'absence.

Solution (exemple) : 
```ts
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
return "42";
```

---

## Fonctions fléchées et inférence

```ts
const add = (a: number, b: number) => a + b;
```

Le type de retour est inféré automatiquement.

```ts
// TypeScript en déduit :
const add: (a: number, b: number) => number
```

---

## ✅ Quand on peut dépendre uniquement de l'inférence

Dès que TypeScript voit **la valeur**, il infère très bien.

Cas typiques (code interne) :
- variables locales initialisées (`const x = ...`)
- objets/arrays construits sur place
- transformations (`map`, `filter`, `reduce`)
- retours “évidents” (une seule forme, pas de branches)

---

## Exemples :
```ts
const tags = ["ts", "js"]; // string[]
const user = { id: 1, name: "Ada" }; // { id: number; name: string }
const ids = [user].map((u) => u.id); // number[]
```

Idée : l'inférence est excellente pour le **code local**, pas pour les **frontières**.

---

## ❗ Quand éviter de dépendre uniquement de l'inférence 1/2

- quand tu définis un **contrat** :
  - paramètres de fonctions
  - types exportés (API publique d'un module)
  - callbacks/handlers (ce que l'appelant doit fournir)
- quand l'inférence peut être **trop large** ou **trompeuse** :
  - tableaux/objets vides (`[]`, `{}`) ⇒ type flou
  - `let` élargit les littéraux (`"dev"` devient `string`)
  - unions implicites qui apparaissent via des branches (`string | number | null`)

---

## ❗ Quand éviter de dépendre uniquement de l'inférence 2/2

- quand tu manipules le **monde réel** :
  - `JSON.parse`, réponses API, formulaires ⇒ `unknown` jusqu'à validation
  - `process.env.*` ⇒ `string | undefined` (il faut parser/valider)

---


## Tableaux et génériques

```ts
const ids: number[] = [1, 2, 3];
```

```ts
ids.push("4"); // erreur
```

---

## Union types : gérer plusieurs cas

```ts
type Status = "loading" | "success" | "error";
```

```ts
function render(status: Status) {}
```

Impossible de passer une valeur non prévue.

---

## `null`, `undefined` et `strictNullChecks`

Avec `strictNullChecks: true` :

```ts
let value: string = null; // interdit
```

Oblige à écrire du code explicite et sûr.

---

## Exemple réaliste : API

```ts
type ApiUser = {
  id: number;
  email: string | null;
};
```

```ts
if (user.email !== null) {
  user.email.toLowerCase();
}
```

---

## Le vrai pouvoir : le refactor

Modifier un type central :

- révèle tous les impacts
- évite les oublis
- sécurise les évolutions

Le compilateur devient un allié.

---

## TypeScript remplace quoi ?

Il remplace :

- la documentation obsolète
- beaucoup de QA manuelle
- certains tests triviaux

---

## Il ne remplace pas :

- la logique métier
- les tests complexes
- la validation **runtime**

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
