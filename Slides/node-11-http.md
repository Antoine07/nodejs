---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/r)"
---

# 11 — Node.js
## Le module `node:http` (serveur HTTP)

---

## Pourquoi `node:http` ?

`node:http` est l’API bas niveau pour :
- recevoir des requêtes HTTP
- renvoyer des réponses (status, headers, body)

Des frameworks (Express, Fastify, Nest…) s’appuient souvent dessus.
Ici, l’objectif est de comprendre les fondamentaux.

---

## Rappels HTTP (essentiel)

Une requête HTTP = :
- **méthode** (verbe) : `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, …
- **URL** : `/`, `/health`, `/movies?limit=10`
- **headers** : `Content-Type`, `Authorization`, …
- **body** (optionnel) : surtout pour `POST/PUT/PATCH`

Une réponse HTTP = :
- **status code** : `200`, `201`, `400`, `404`, `500`, …
- **headers**
- **body**

---

## Les verbes HTTP (intention)

- `GET` : lire une ressource
- `POST` : créer / déclencher une action
- `PUT` : remplacer (souvent une ressource entière)
- `PATCH` : modifier partiellement
- `DELETE` : supprimer

En pratique, ce sont des conventions : votre API doit être cohérente.

---

## Créer un serveur HTTP (TypeScript)

Exemple minimal (ESM) :

```ts
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

function sendJson(res: ServerResponse, status: number, data: unknown) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const method = req.method ?? "GET";
  const url = req.url ?? "/";

  if (method === "GET" && url === "/health") {
    return sendJson(res, 200, { ok: true });
  }

  return sendJson(res, 404, { ok: false, error: "Not found" });
});

server.listen(3000, () => console.log("http://localhost:3000"));
```

---

## Routage (la base)

Le routage, ici, c’est :
- inspecter `req.method`
- inspecter `req.url`
- choisir une réponse

Dans un vrai projet, on extrait ça :
- `router.ts`
- handlers par route
- validation des entrées

---

## Query params (avec `URL`)

`req.url` est une string. Pour parser proprement :

```ts
const requestUrl = new URL(req.url ?? "/", "http://localhost");
const limit = Number(requestUrl.searchParams.get("limit") ?? "10");
```

Note : l’host dans `URL()` sert juste de base.

---

## Exemple : endpoint “GET /movies”

Idée :
- `GET /movies` retourne une liste
- `GET /movies?limit=2` limite le résultat

```ts
const movies = ["Twin Peaks", "Mulholland Drive", "Heat"];
// ...
if (method === "GET" && requestUrl.pathname === "/movies") {
  const limit = Number(requestUrl.searchParams.get("limit") ?? String(movies.length));
  return sendJson(res, 200, { items: movies.slice(0, limit) });
}
```

---

## Et pour `POST` ?

Pour `POST/PUT/PATCH`, il faut lire le body :
- streaming (`req.on("data")`)
- ou helpers utilitaires

Points importants :
- limites (taille max)
- `Content-Type`
- parsing JSON
- validation runtime (`zod`, etc.)

Dans ce chapitre, on se limite à `GET` pour se concentrer sur HTTP.
