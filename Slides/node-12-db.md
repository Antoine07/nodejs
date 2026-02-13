---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "Node.js — Connexion PostgreSQL (pg)"
---

#  Base de données (PostgreSQL)
## Connexion propre avec Node 24 + TypeScript (`pg`)

---

## Principe : la DB est une frontière

La base de données est :
- **externe** (I/O, réseau)
- **imprévisible** (timeouts, indisponibilité, données inattendues)
- **non typée** par défaut (résultats SQL → runtime)

Conclusion :
- on **isole** la DB dans un module dédié (`db/`)
- on **valide** ce qui rentre / sort (schémas, mapping)
- on **n'injecte pas** `Pool` partout : on passe par des repositories

---

## Notion de frontière et d'infrastructure

Votre domaine (logique métier, typé, prévisible)
↔
Un système externe (I/O, réseau, instable)

---

## Setup : Docker Postgres - normalement tout est en place

Typiquement, un `docker-compose.yml` fournit :
- un service `postgres`
- un service `app` avec des variables d'environnement DB

Variables courantes :
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

---


## Installation des dépendances Node

> Les dépendances sont ajoutées au projet (mise à jour de `package.json` et `package-lock.json`) avant le build Docker.

Dans un projet Node / TypeScript :

```bash
npm install pg
```

Typage (selon version) :

```bash
npm install -D @types/pg
```

---

## Exemple : `db/config.ts` 

```ts
export type DbConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

function required(value: string | undefined, name: string): string {
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export function getDbConfig(env: Record<string, string | undefined> = process.env) {
  return {
    host: required(env.DB_HOST, "DB_HOST"),
    port: Number(env.DB_PORT ?? "5432"),
    user: required(env.DB_USER, "DB_USER"),
    password: required(env.DB_PASSWORD, "DB_PASSWORD"),
    database: required(env.DB_NAME, "DB_NAME"),
  } satisfies DbConfig;
}
```

---

## Exemple : `db/pool.ts` (Pool unique)

```ts
import { Pool } from "pg";
import { getDbConfig } from "./config.js";

const config = getDbConfig();

export const pool = new Pool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
});
```

Pourquoi un `Pool` ?
- réutilise des connexions
- gère la concurrence
- évite d'ouvrir/fermer à chaque requête

---

## SQL : requêtes paramétrées (sécurité)

Ne jamais concaténer l'entrée utilisateur dans du SQL.

```ts
// ✅ paramétré
await pool.query("select * from movies where name = $1", [name]);

// ❌ injection possible
await pool.query(`select * from movies where name = '${name}'`);
```

---

## Repository : "art et manière"

Objectif : éviter de mélanger :
- HTTP (req/res)
- SQL
- règles métier

Approche :
- HTTP handler → appelle un repository
- repository → fait la query + mappe le résultat

---

## Exemple : `MovieRepository`

```ts
import type { Pool } from "pg";

export type MovieRow = { name: string; price: number };

export class MovieRepository {
  constructor(private readonly pool: Pool) {}

  async list(): Promise<MovieRow[]> {
    const result = await this.pool.query("select name, price from movies order by name asc");
    return result.rows.map((r) => ({ name: String(r.name), price: Number(r.price) }));
  }
}
```

Note : on mappe au runtime (`String/Number`) car SQL n'est pas typé par défaut.

---

## Brancher au serveur HTTP (GET)

```ts
import { createServer } from "node:http";
import { pool } from "./db/pool.js";
import { MovieRepository } from "./repositories/movieRepository.js";

const repo = new MovieRepository(pool);

const server = createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/movies") {
    const items = await repo.list();
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    return res.end(JSON.stringify({ items }));
  }

  res.writeHead(404).end();
});

server.listen(3000);
```

---

## Erreurs : ne pas exposer la DB

À faire :
- log côté serveur (message + contexte)
- réponse HTTP générique (`500`) sans détails sensibles

À éviter :
- renvoyer le message SQL complet au client
- exposer host/user/stacktrace

---

## Healthcheck DB (très utile)

Endpoint interne :
- `GET /health/db` fait un `select 1`
- si OK → `200`
- sinon → `503`

Cela aide :
- Docker / orchestrateurs
- supervision
- diagnostics

---

## À retenir

- Un `Pool` unique, configuration centralisée, échec rapide si env incomplet.
- Queries paramétrées, mapping runtime.
- Repositories pour séparer HTTP et SQL.
- Commencer en `GET`, puis étendre vers `POST/PUT/PATCH/DELETE` avec validation du body.

