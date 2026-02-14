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

On utilisera `pnpm` déjà présent dans le `starter/`

---

###  Remarque importante dans le docker compse

Pourquoi monter `/app/node_modules` dans Docker ?

Quand on monte le code local :

```
- .:/app
```

Docker remplace tout le dossier `/app` du container
➡️ y compris `node_modules`

Résultat : les dépendances installées lors du build disparaissent.

---

####  Solution pour nos dépendances

Ajouter un volume dédié, c'est un volume séparée, les dépendances restent dans le conteneur, **pas d'écrasmenent.**

```
- /app/node_modules
```

👉 En dev : code synchronisé + dépendances protégées.


---

## Application 

Récupérez le `starter/` pour travailler.


```bash
docker compose build --no-cache
docker compose up -d 
```

Pensez à vous connecter dans votre conteneur : `docker exec -it node-ts sh`

Terminal 1 :
```bash
npm run dev # exécute les scripts
```

Terminal 2 :
```bash
npm run typecheck # debug TypeScript
```

---

<img src="./images/configuration.png" width="800" />

---

## Règles de travail pendant le cours

- **Toujours** laisser `typecheck` tourner pendant les exercices
- Typer d'abord les **frontières** (inputs/outputs), pas chaque variable
- Si une donnée vient de l'extérieur : `unknown` jusqu'à validation

---

## En annexe quelques commandes Docker utiles

`docker compose down -v` → Arrête les containers et supprime aussi les volumes (donc les données persistées).

`docker compose build --no-cache` → Reconstruit les images Docker sans utiliser le cache.

`docker compose up -d` → Lance les services définis dans le docker-compose en tache de fond.

`docker system prune -a` → Supprime containers arrêtés, images inutilisées et cache Docker.

`docker volume prune` → Supprime tous les volumes Docker non utilisés (perte possible de données).
