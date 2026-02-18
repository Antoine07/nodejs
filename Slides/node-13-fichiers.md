---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "Node.js — 13 Fichiers (ultra simple)"
---

# 13 — Fichiers (ultra simple)
## Lire un JSON proprement en TypeScript

---

# Objectif

- Lire un fichier JSON
- Comprendre la frontière runtime
- Valider avec `zod`

Idée : TypeScript seul ne valide pas le contenu du fichier.

---

# Étape 1 : lire le fichier

```ts
import { readFile } from "node:fs/promises";

const raw = await readFile("./input.json", "utf-8");
```

`readFile` retourne une string, pas un type métier.

---

# Étape 2 : parser en `unknown`

```ts
const data: unknown = JSON.parse(raw);
```

Pourquoi `unknown` ?
- on ne fait pas confiance à la frontière
- on valide avant usage métier

---

# Étape 3 : valider avec Zod

```ts
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1),
  tape: z.array(z.number()).min(1),
});

const parsed = Schema.safeParse(data);
```

- `success: true` -> données sûres
- `success: false` -> erreur explicite

---

# La solution pour gérer la frontière 

```ts
import { z } from "zod"
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_PATH = join(__dirname, "./");
const raw = await readFile(`${DATA_PATH}/persons.json`, "utf-8");
const data: unknown = JSON.parse(raw);
const Schema = z.object({
    name: z.string().min(1),
    tape: z.array(z.number()).min(1),
});
const parsed = Schema.safeParse(data);

if (parsed.success) console.log(parsed.data.name)
```

--- 

# Pattern recommandé

1. Infrastructure : lit + parse + valide
2. Domain : reçoit déjà des données valides
3. Application : orchestre et affiche

Message clé :

> Frontière validée, logique métier simplifiée.

---

#  TP

`TPs/PipelineMini/tp-pipeline-mini.md`
