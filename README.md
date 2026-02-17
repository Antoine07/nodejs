# TypeScript / Node — environnement de travail

## Environnement Docker (recommandé) — `starter/`

### Démarrer Node + PostgreSQL

Dans le docker compose vous avez plusieurs services donc plusieurs conteneurs qui chacun à une image exactement (c'est toujours le cas un conteneur = une image). Dans le service `app` vous avez l'image `node:24-alpine` elle est construite dans le fichier Dockerfile et une prête à l'emploi `postgres:17-alpine`.

Il n'y a pas d'image custom. 

## Méthode 

```bash
cd starter
docker compose up --build
```

Services :
- `app` : Node 24 + TypeScript (container `node-ts`, port hôte `3000`)
- `postgres` : PostgreSQL (container `db-postgres`, port hôte `5434` → conteneur `5432`)

### Lancer le type-check en parallèle 

Depuis `starter/` :

```bash
docker exec -it node-ts sh
# Dans le conteneur faite des npm run sandbox dev ...
```

Le principe de travail recommandé est :
- Terminal A : runtime 
- Terminal B : type-check 

###  Tester le serveur

Endpoints utiles le mini serveur pour travailler sur Node plus tard

```bash
http://localhost:3000
http://localhost:3000/health
http://localhost:3000/db
```


## ⚙️ Configuration TypeScript

En développement, tsx transpile le TypeScript en mémoire et exécute directement le JavaScript (pas de dossier dist).
tsc --noEmit sert uniquement à vérifier strictement les types, sans générer de fichiers.
Un build réel vers dist n'est produit que si l'on exécute tsc sans --noEmit.

* **Target** : `ES2022`
* **Module** : `ESNext`
* **Resolution** : `Bundler` (optimisé pour outils modernes type tsx/esbuild)
* **Root** : `src`
* **Build output** : `dist`

### Sécurité maximale

* `strict` activé
* `noUncheckedIndexedAccess`
* `exactOptionalPropertyTypes`
* `noImplicitReturns`

### Environnement

* Types Node activés
* Librairie `ES2022`
* `skipLibCheck` pour accélérer le build

---

## 🚀 Scripts

```json
"sandbox": "tsx watch src/Sandbox/index.ts",

// Garantir la cohérence des types sans produire de build.
"typecheck": "tsc --watch --pretty --noEmit"
```

### Fonctionnement

* `tsx watch` : exécution directe des fichiers TypeScript (sans build)
* `typecheck` : vérification stricte des types sans génération de JS

---

##  Architecture de compilation

* Développement : exécution via `tsx` (transpilation en mémoire)
* Vérification des types : `tsc --noEmit`
* Build possible vers `dist` via `tsc` si nécessaire

 `tsc --noEmit`

✔ Vérifier les types
❌ Ne générer aucun fichier JavaScript




## Base de données 

### Se connecter à la DB

Dans le conteneur Postgres, si vous souhaitez vous connecter à la base de données `db`.

```bash
docker exec -it db-postgres psql -U postgres -d db
```

### Créer les tables - pour le TP sur Cart ou Movie

Movie (films + salles + séances) :

```bash
docker exec -i db-postgres psql -U postgres -d db < TPs/Movie/schema.sql
```

Cart :

```bash
docker exec -i db-postgres psql -U postgres -d db < Corrections/Cart/schema.sql
```

## Remettre l'environnement "propre" (restart clean)

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







>Bon dev à tous !!! Et surtout bonne découverte de TypeScript/Node

