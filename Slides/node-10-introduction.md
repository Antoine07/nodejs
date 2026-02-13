---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "Node.js — 10 Introduction (Node 24)"
---

# 10 — Node.js (Node 24)
## Introduction et contexte

---

## C'est quoi Node.js ?

Node.js est un **runtime JavaScript** :
- il exécute du JavaScript **hors navigateur**
- il s'appuie sur **V8** (moteur JS) + **libuv** (I/O non bloquantes)
- il donne accès à des APIs système : fichiers, réseau, processus, etc.

Node.js n'est **pas** un langage : c'est une plateforme d'exécution pour JavaScript.

---

## Un peu d'historique 

- 2009 : Ryan Dahl présente Node.js (I/O non bloquantes, event loop)
- npm devient l'écosystème de packages de référence
- Node s'impose côté serveur et tooling (build, tests, scripts, CLIs)

Avec Node 24, l'écosystème est "moderne" : ESM, APIs Web, TypeScript via tooling, etc.

---

## Pourquoi Node a "gagné" (dans beaucoup de stacks)

- même langage (JS/TS) côté front et back
- **I/O** très efficaces (réseau, DB, fichiers)
- énorme écosystème (npm)
- très bon pour :
  - APIs HTTP
  - CLIs
  - jobs (cron, workers)
  - scripts/outillage

---

## Runtime vs Type-check (rappel important)

TypeScript :
- vérifie **avant l'exécution** (compile-time)
- n'existe pas au runtime

Node :
- exécute du JavaScript
- ne "comprend" pas les types

Conclusion : un projet TS a besoin d'un **workflow** (exécution + type-check).

---

## Modules : CommonJS vs ESM (ECMAScript Modules)

Deux systèmes existent :

CommonJS (historique) :
```js
const fs = require("node:fs");
module.exports = {};
```

ESM (moderne) :
```ts
import { readFile } from "node:fs/promises";
export const x = 1; 
```

Dans ce repo, vous verrez souvent `type: "module"` (ESM).

---

## APIs utiles "de base" en Node

Quelques modules standards fréquents :
- `node:fs` / `node:fs/promises` (fichiers)
- `node:path` (paths)
- `node:process` (argv, env, exit code)
- `node:crypto` (hash, random, signatures…)
- `node:http` (serveur HTTP bas niveau)

---

## Event loop 

Node exécute JavaScript sur **un thread principal**.

Le modèle :
- vous lancez des opérations d'I/O (réseau/DB/fichiers)
- Node attend leurs résultats sans bloquer le thread JS
- quand une opération termine, son callback/promise se résout

Résultat : très bon pour du serveur **I/O-bound**.

🏷️ Définition: **I/O-bound** est une tâche qui passe plus de temps à attendre (réseau, disque, base de données) qu'à faire des calculs.

---

## Quand Node est un bon choix

- API HTTP / microservices
- BFF (Backend For Frontend)
- ingestion / jobs
- tooling dev (scripts, build, lint)
- temps réel (WebSocket, SSE) via libs

🏷️ Définition: Ingestion est l'action d'importer des données dans un système depuis une source externe.

🏷️ Définition: Job, tâche automatisée, exécutée en arrière-plan, pour effectuer un traitement spécifique.

---

## Quand il faut être vigilant

- CPU-bound (🏷️ calcul lourd) : le thread JS peut être saturé
  - solutions : worker threads, queues, services dédiés
- validation des entrées : TypeScript ne suffit pas (runtime)
- dépendances : taille + sécurité (audit)
