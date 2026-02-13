---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — 2 Types & inférence"
---

# Types & inférence
## Comprendre la base sans sur-typer

---

# Principe fondamental

> TypeScript n'est pas un concours d'annotations.
> C'est un système de modélisation.

L'objectif :
- sécurité
- lisibilité
- expressivité
- pas de bruit inutile

---

# Types primitifs essentiels

```ts
let a: string = "hello";
let b: number = 42;
let c: boolean = true;

let d: null = null;
let e: undefined = undefined;

let f: bigint = 9007199254740993n;
let g: symbol = Symbol("id");
```

En pratique :

- string, number, boolean → 95% des cas
- le reste est plus rare

---

# Tableaux, tuples, objets

```ts
const numbers: number[] = [1, 2, 3];

const pair: [string, number] = ["age", 20];

const user: { id: number; name: string } = {
  id: 1,
  name: "Ada",
};
```

Quand la structure devient importante → créer un `type`.

---

# L'inférence automatique

TypeScript devine souvent mieux que vous :

```ts
const name = "Ada";        // string
const count = 3;           // number
const enabled = true;      // boolean
const tags = ["ts", "js"]; // string[]
```

Ajouter :

```ts
const name: string = "Ada";
```

➡️ n'apporte rien.

---

# Pourquoi éviter le sur-typage ?

Sur-typer :

- alourdit la lecture
- rend le code plus fragile au refactor
- ajoute du bruit sans valeur

Objectif :

> Types utiles > types partout

---

# Quand annoter ?

Annoter est pertinent si :

- la variable n'a pas de valeur immédiate
- vous définissez un contrat public
- l'inférence est trop large
- vous documentez une intention métier

---

# Exemple : valeur sans initialisation

```ts
let total: number;
total = 10;
```

Sans annotation :

```ts
let total;
```

➡️ devient `any` si strict désactivé (dangereux)

---

# Contrat public

```ts
type User = {
  id: number;
  email: string;
};

function createUser(data: User): User {
  return data;
}
```

Ici, l'annotation est essentielle.

---

# Quand ne PAS annoter ?

Éviter :

```ts
const x: number = 1;
const y: string = "hello";
```

Éviter aussi :

```ts
let fn: Function;
let obj: object;
```

Ces types sont trop génériques pour être utiles.

---

# Valeurs vs Types

```ts
const status = "dev";
```

- `status` → valeur (runtime)

```ts
type Env = "dev" | "prod";
```

- `Env` → type (compile-time)

Important :

> Les types n'existent pas au runtime.

---

# Types littéraux

```ts
type Env = "dev" | "staging" | "prod";

function getApiBaseUrl(env: Env) {
  if (env === "prod") return "https://api.example.com";
  return "https://api.staging.example.com";
}
```

Avantage :

- Impossible d'écrire `"production"` par erreur.

---

# Inference subtile : const vs let

```ts
const env = "dev";
// type = "dev"

let env2 = "dev";
// type = string
```

Pourquoi ?

- `const` → valeur figée
- `let` → variable modifiable

---

# `as const` : figer une configuration

```ts
const config = {
  env: "dev",
  features: {
    newCheckout: true,
  },
} as const;
```

Effet :

- `env` devient type `"dev"`
- `newCheckout` devient type `true`

Très utile pour :

- configs
- routes
- états
- mapping constants

---

# Exemple : états UI robustes

```ts
type UiState = "idle" | "loading" | "success" | "error";

let state: UiState = "idle";
state = "loading";
// state = "loaded"; ❌ erreur
```

Les union types éliminent toute classe d'erreurs.

---

# Exercice — Inference

Pour chaque ligne, donne le type inféré :

```ts
const n = 10;
let s = "hello";
const arr = [1, 2, 3];
const mixed = [1, "a"];
const user = { id: 1, name: "Ada" };
```

Puis :

- lesquelles méritent une annotation ?
- pourquoi ?

---

# Exercice — Config robuste

1. Déclarez un type `Env` = `"dev" | "prod"`.
2. Déclarez un type `LogLevel` = `"debug" | "info" | "warn" | "error"`.
3. Déclarez un type `AppConfig` contenant `env`, `logLevel` et `features` (`newCheckout`, `betaBanner`).
4. Créez une constante `config` correctement typée.
5. Vérifiez que `env: "production"` provoque une erreur TypeScript.

*features = interrupteurs métier contrôlés par configuration.*

1. `newCheckout` → Active le nouveau processus de paiement à la place de l'ancien.
2. `betaBanner` → Affiche une bannière indiquant que l'application est en version bêta.

Objectif : zéro `string`, zéro `any`, autocomplétion active.
