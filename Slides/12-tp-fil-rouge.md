---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/r)"
title: "TypeScript — TP fil rouge"
---

# 12 — Mise en pratique
## TP fil rouge : JS → TS (progressif)

---

# Objectif du TP

- Partir d’un problème réel (données + logique)
- Ajouter du typage progressivement (sans tout réécrire)
- Faire apparaître les erreurs “par design”
- Séparer :
  - validation runtime (données externes)
  - typage (contrats internes)

---

# Setup (référentiel)

Un projet de base existe dans `starter/`.

Commandes (dans `starter/`) :
- `npm install`
- `npm run dev` (runtime)
- `npm run typecheck` (type-check)

---

# Sujet : mini Todo “API”

On simule une API qui renvoie des todos.

Objectifs :
- parser la réponse `unknown` → type sûr
- modéliser les états UI
- écrire des helpers typés (get/pluck)

---

# Étape 1 — Modèle métier (types)

Créer les types :

```ts
type TodoId = string;
type Todo = { id: TodoId; text: string; done: boolean };
```

Puis : un type pour les réponses API :
- `ApiResult<T>` (chapitre 4)

---

# Étape 2 — Données externes (unknown → guard)

Écrire :
- `isTodo(value: unknown): value is Todo`
- `parseTodos(value: unknown): Todo[]` (throw ou result)

Tester avec des cas invalides :
- `done: "false"`
- `id` manquant
- `text` non-string

---

# Étape 3 — États UI (union discriminée)

Modéliser :

```ts
type Ui =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; todos: Todo[] }
  | { state: "error"; message: string };
```

Écrire `render(ui: Ui): string` avec un `switch` exhaustif (`never`).

---

# Étape 4 — Helpers génériques

Écrire des helpers réutilisables :
- `get<T, K extends keyof T>(obj: T, key: K): T[K]`
- `pluck<T, K extends keyof T>(arr: T[], key: K): Array<T[K]>`

Appliquer :
- `pluck(todos, "id")` → `TodoId[]`

---

# Étape 5 — Erreurs volontaires (pour apprendre)

Injecter volontairement ces bugs et observer TS :
- `done` devient `"yes" | "no"`
- `id` passe en `number`
- `text` devient optionnel

Objectif : voir *où* TypeScript vous stoppe.

---

# Bonus — Refactor JS → TS

1. Prendre une fonction “JS” existante :
   - beaucoup de `if`/`try`
   - aucune annotation
2. Ajouter d’abord les types aux frontières (inputs/outputs)
3. Ajouter ensuite les unions et guards

But : **ne pas sur-typer** ; typer là où ça réduit les bugs.

---

# Livrable attendu

Dans `starter/src/index.ts` :
- types (Todo, ApiResult, Ui)
- guards/parsing
- helpers génériques
- un petit scénario exécuté en console

Exemple de scénario :
- parse des todos depuis un JSON
- render d’un état `success`
- affichage des ids via `pluck`

---

# À retenir (philosophie)

- Partir d’un problème réel.
- Montrer ce que TS empêche.
- Séparer runtime / typage.
- Ne jamais introduire une notion sans usage.
