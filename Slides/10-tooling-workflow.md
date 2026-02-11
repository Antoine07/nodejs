---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/r)"
title: "TypeScript — Tooling & workflow"
---

# 10 — Tooling & workflow
## Pourquoi “ça compile quand même”

---

# Objectif du chapitre

- Comprendre `tsc` vs `tsx` vs Node
- Séparer type-check et runtime
- Mettre en place un workflow “2 terminaux”
- Comprendre le rôle de l’IDE (VS Code)

---

# `tsc` : le compilateur TypeScript

Rôles possibles :
- type-check (`tsc --noEmit`)
- compilation TS → JS (`tsc` avec `outDir`)

Important : `tsc` ne lance pas votre app. Il vérifie/compile.

---

# `tsx` : exécuter TS au runtime (dev)

Avec `tsx`, vous pouvez faire :
- `tsx src/index.ts`
- `tsx watch src/index.ts`

Mais :
- ça peut “tourner” même si le code a des erreurs de types,
  selon votre workflow et vos scripts.

---

# Node.js : exécute du JavaScript

Node n’exécute pas les types.
- Les types n’existent pas au runtime
- Si vous bypass le type-check, vous pouvez livrer du code “incorrect”

---

# Type-check vs runtime : exemple

```ts
// Erreur TS : property 'toFixed' does not exist on type 'string'
const price: string = "12";
console.log(price.toFixed(2));
```

Si vous lancez avec un outil qui n’arrête pas sur les erreurs TS,
vous pouvez quand même atteindre un crash runtime.

---

# Workflow recommandé : 2 terminaux

Terminal 1 (dev) :
- `npm run dev` (ex: `tsx watch ...`)

Terminal 2 (typecheck) :
- `npm run typecheck` (ex: `tsc --watch --noEmit`)

But : feedback immédiat + pas d’illusions.

---

# Exemple : `starter/` (fourni)

Dans `starter/package.json` :
- `dev`: `tsx watch src/index.ts`
- `typecheck`: `tsc --watch --pretty src/index.ts`

Objectif : **TypeScript ne protège que si on l’exécute.**

---

# VS Code (ou autre IDE)

L’IDE apporte :
- autocomplétion
- quick fixes
- navigation
- erreurs en temps réel

Mais : l’IDE ne remplace pas le CI.

---

# CI / pipeline

Au minimum :
- `tsc --noEmit` dans la CI
- lint (optionnel)
- tests (optionnel mais recommandé)

La CI est la garantie que “ça passe” pour tout le monde.

---

# Exercice (10 min) — rendre le type-check obligatoire

Dans un projet Node/TS :
1. Ajoute un script `typecheck` qui fait `tsc --noEmit`
2. Ajoute un script `dev` qui lance ton serveur
3. Explique pourquoi les deux doivent exister (et ne pas être confondus)

---

# À retenir

- `tsc` = vérifie/compile, `tsx` = exécute en dev, Node = runtime JS.
- Si vous ne lancez pas le type-check, vous perdez la protection TS.
- “Deux terminaux” évite les faux sentiments de sécurité.
