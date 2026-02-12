---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/r)"
title: "TypeScript — 2 Types & inférence"
---

# 2 — Types & inférence
## Comprendre la base sans sur-typer

---

# Objectif du chapitre

- Connaître les types primitifs
- Comprendre l'inférence automatique
- Savoir quand annoter / quand laisser inférer
- Distinguer valeurs vs types
- Utiliser les types littéraux et `as const` (cas réels)

---

# Types primitifs (les essentiels)

```ts
let a: string = "hello";
let b: number = 42;
let c: boolean = true;

let d: null = null;
let e: undefined = undefined;

let f: bigint = 9007199254740993n;
let g: symbol = Symbol("id");
```

---

# Tableaux, tuples, objets

```ts
const numbers: number[] = [1, 2, 3];
const pair: [string, number] = ["age", 20];

const user: { id: number; name: string } = { id: 1, name: "Ada" };
```

---

# Inférence : TypeScript devine souvent mieux que vous

```ts
const name = "Ada";        // string
const count = 3;           // number
const enabled = true;      // boolean
const tags = ["ts", "js"]; // string[]
```

Annoter ici ajoute du bruit… sans apporter d'info.

---

# Quand annoter ?

Annoter est utile quand :
- la variable est déclarée sans valeur immédiate
- le type est un “contrat” public (API, module, lib)
- l'inférence est trop large (ex: `any`, `unknown`, `string`)
- on veut documenter une intention (ex: union, littéral)

---

# Quand NE PAS annoter ?

Éviter :
- les annotations redondantes
- les types “évidents” (ex: `const x: number = 1`)
- les types trop génériques (ex: `object`, `Function`)

Objectif : **types utiles > types partout**.

---

# Valeurs vs types (une confusion fréquente)

```ts
const status = "dev";

// status est une *valeur*
// "dev" peut aussi être un *type littéral*
type Env = "dev" | "prod";
```

- Valeur : existe au runtime
- Type : existe uniquement au type-check

---

# Types littéraux (très utiles)

```ts
type Env = "dev" | "staging" | "prod";

function getApiBaseUrl(env: Env) {
  if (env === "prod") return "https://api.example.com";
  return "https://api.staging.example.com";
}
```

Avantage : *impossible* d'appeler `getApiBaseUrl("production")` par erreur.

---

# Piège : l'inférence “élargit” parfois trop

```ts
const env = "dev";
// env: string (souvent) ? Non : ici, env est "dev" (const).

let env2 = "dev";
// env2: string (car let => variable modifiable)
```

---

# `as const` : figer une config

```ts
const config = {
  env: "dev",
  features: {
    newCheckout: true,
  },
} as const;

// config.env a le type "dev" (et pas string)
// config.features.newCheckout a le type true (et pas boolean)
```

Cas d'usage : config, états, flags, routes.

---

# Exemple : états UI avec littéraux

```ts
type UiState = "idle" | "loading" | "success" | "error";

let state: UiState = "idle";
state = "loading";
// state = "loaded"; // erreur : "loaded" n'existe pas
```

---

# Exercice A (8 min) — inférence

Pour chaque ligne, écris le type inféré :

```ts
const n = 10;
let s = "hello";
const arr = [1, 2, 3];
const mixed = [1, "a"];
const user = { id: 1, name: "Ada" };
```

Puis : lesquelles méritent une annotation, et pourquoi ?

---

# Exercice B (10 min) — config

Écris une config typée pour :
- `env`: `"dev" | "prod"`
- `logLevel`: `"debug" | "info" | "warn" | "error"`
- `features`: `{ newCheckout: boolean; betaBanner: boolean }`

Objectif : éviter `string` partout, et garder l'autocomplétion.

---

# Correction (extraits)

```ts
type Env = "dev" | "prod";
type LogLevel = "debug" | "info" | "warn" | "error";

const config = {
  env: "dev" as Env,
  logLevel: "debug" as LogLevel,
  features: { newCheckout: true, betaBanner: false },
};
```

Alternative souvent meilleure : `as const` + extraction de types (chapitres suivants).

---

# À retenir

- L'inférence est votre alliée : n'ajoutez pas du bruit.
- Annoter = utile quand on définit un contrat, pas quand on répète.
- Littéraux + `as const` rendent les configs et états robustes.
