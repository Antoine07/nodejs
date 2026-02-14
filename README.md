# TypeScript / Node — environnement de travail

Ce dépôt contient :
- des slides (`Slides/` → `docs/`)
- des TPs (`TPs/`)
- un starter **dockerisé** (`starter/`) pour travailler avec Node 24 + TypeScript + PostgreSQL

L’objectif principal est d’installer un environnement reproductible pour faire les exercices du cours.

## Prérequis

- Docker + Docker Compose (Docker Desktop convient)
- (Option) Node.js si génération des slides en local

## Slides (option)

Générer le HTML dans `docs/` :

```bash
npm install
npm run slides:build
```

## Environnement Docker (recommandé) — `starter/`

### 1) Démarrer Node + PostgreSQL

```bash
cd starter
docker compose up --build
```

Services :
- `app` : Node 24 + TypeScript (container `node-ts`, port hôte `3000`)
- `postgres` : PostgreSQL (container `db-postgres`, port hôte `5434` → conteneur `5432`)

### 2) Lancer le type-check en parallèle (2e terminal)

Depuis `starter/` :

```bash
docker compose exec app pnpm typecheck
```

Le principe de travail recommandé est :
- Terminal A : runtime (container `app` via `docker compose up`)
- Terminal B : type-check (commande ci-dessus)

### 3) Tester le serveur

Endpoints utiles :

```bash
http://localhost:3000
http://localhost:3000/health
http://localhost:3000/db
```

### 4) Shell dans le conteneur (option)

```bash
docker compose exec app sh
```

## Structure du projet

- `starter/` : starter Node 24 + TS + HTTP + DB
- `TPs/` : sujets + squelettes de TPs (Cart / Movie)
- `Corrections/` : corrections d’exercices + code de référence

## Base de données (PostgreSQL)

### Se connecter à la DB

Dans le conteneur Postgres :

```bash
docker exec -it db-postgres psql -U postgres -d db
```

Depuis la machine hôte :

```bash
psql -h localhost -p 5434 -U postgres -d db
```

### Créer les tables (SQL)

Movie (films + salles + séances) :

```bash
docker exec -i db-postgres psql -U postgres -d db < TPs/Movie/schema.sql
```

Cart :

```bash
docker exec -i db-postgres psql -U postgres -d db < Corrections/Cart/schema.sql
```

## Remettre l’environnement “propre” (restart clean)

Depuis `starter/` :

Arrêt + suppression conteneurs + volumes :

```bash
docker compose down -v --remove-orphans
```

Rebuild sans cache (si nécessaire) :

```bash
docker compose build --no-cache
docker compose up
```

Si des noms de conteneurs restent bloqués :

```bash
docker rm -f node-ts db-postgres 2>/dev/null || true
```

Nettoyage (attention : peut supprimer des ressources Docker non liées au projet) :

```bash
docker volume prune
docker builder prune
```

Nettoyage "agressif" (attention : supprime aussi des images) :

```bash
docker system prune -a
```
