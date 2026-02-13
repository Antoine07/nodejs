# TypeScript / Node — workspace

Ce dépôt contient :
- des slides (`Slides/` → `docs/`)
- un `starter/` minimal Node 24 + TypeScript
- une app d’exemple avec PostgreSQL (`Apps/`, notamment `src/Cart_v1/`)

## Slides

Générer le HTML dans `docs/` :

```bash
npm run slides:build
```

## Starter 

### Local (sans Docker)

```bash
cd starter
npm install
```

Terminal A (runtime) :
```bash
npm run dev
```

Terminal B (type-check) :
```bash
npm run typecheck
```

### Docker (option)

```bash
cd starter
docker compose up --build
```

Ouvrir un shell dans le conteneur :
```bash
docker exec -it node-ts sh
```

Arrêter et supprimer les ressources Docker du starter :
```bash
docker compose down -v --remove-orphans
```

Note : `starter/` utilise `container_name: node-ts`.

##  `starter/` 

### Démarrer les conteneurs

```bash
cd starter
docker compose up --build
```

Ouvrir un shell dans le conteneur Node :
```bash
docker exec -it node-ts sh
```

### Se connecter à PostgreSQL

Dans le conteneur Postgres :
```bash
docker exec -it cart-postgres psql -U postgres -d cart
```

Depuis la machine hôte (port mappé en `5434:5432`) :
```bash
psql -h localhost -p 5434 -U postgres -d cart
```

### Créer les tables (schema SQL)

Le schéma est dans `TPs/Cart/schema.sql`.

Depuis la racine du dépôt :
```bash
docker exec -i cart-postgres psql -U postgres -d cart < TPs/Cart/schema.sql
```

### Remettre les conteneurs "propres" (restart clean)

Arrêt + suppression conteneurs + volumes du projet `starter/` :
```bash
cd starter
docker compose down -v --remove-orphans
```

Rebuild sans cache (si nécessaire) :
```bash
docker compose build --no-cache
docker compose up
```

Si des noms de conteneurs restent bloqués :
```bash
docker rm -f node-ts cart-postgres 2>/dev/null || true
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

```bash
docker exec -it cart-postgres psql -U postgres -d postgres -c "CREATE DATABASE cineconnect;"
```
