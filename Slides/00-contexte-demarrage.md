---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — 0 Contexte de démarrage"
---

# Contexte de démarrage
## Comment on va travailler pour découvrir TypeScript

---

## Objectif

Mettre en place un environnement *simple* pour :
- exécuter le code (runtime)
- vérifier les types en continu (type-check)
- itérer vite pendant le cours

---

## Le projet `starter/`

On utilise le dossier `starter/` comme terrain de jeu :
- Node.js + TypeScript
- `tsx` pour exécuter en dev
- `tsc` pour vérifier les types

---

## Dans le dossier stater

```bash
cd starter
npm install
```

Terminal 1 :
```bash
npm run dev
```

Terminal 2 :
```bash
npm run typecheck
```

---

## Dans le dossier starter : Docker 

Depuis `starter/` :

```bash
docker compose up --build -d
```

Ouvrir un shell dans le conteneur :

```bash
docker exec -it node-ts sh
```

Puis (dans le conteneur) spliter votre terminal
- `npm run dev`
- `npm run exo`
- `npm run typecheck`

---

## Quelques commandes Docker utiles

`docker compose down -v` → Arrête les containers et supprime aussi les volumes (donc les données persistées).

`docker compose build --no-cache` → Reconstruit les images Docker sans utiliser le cache.

`docker compose up -d` → Lance les services définis dans le docker-compose en tache de fond.

`docker system prune -a` → Supprime containers arrêtés, images inutilisées et cache Docker.

`docker volume prune` → Supprime tous les volumes Docker non utilisés (perte possible de données).

---

## Pourquoi `dev` ET `typecheck` ?

Dans `starter/package.json` :

```json
"exo": "tsx watch src/Exercices/index.ts",
"dev" : "tsx watch src/index.ts",
"typecheck": "tsc --watch --pretty  src/index.ts",
```

- `dev` exécute le programme (ça peut "tourner" même si le typage est mauvais)
- `typecheck` empêche de se mentir : erreurs TS visibles immédiatement
- `exo`  exécute le programme
---

## Double écran / split VS Code (recommandé)

But : éviter "ça tourne donc c'est bon".

- Split de l'éditeur (ou 2 écrans) pour garder le code visible
- 2 terminaux en parallèle :
  - terminal A : `npm run dev`
  - terminal B : `npm run typecheck`

---

<img src="./images/configuration.png" width="800" />

---

## Règles de travail pendant le cours

- **Toujours** laisser `typecheck` tourner pendant les exercices
- Typer d'abord les **frontières** (inputs/outputs), pas chaque variable
- Si une donnée vient de l'extérieur : `unknown` jusqu'à validation

