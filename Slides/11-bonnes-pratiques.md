---
marp: true
title: "TypeScript — Bonnes pratiques & anti-patterns"
theme: gaia
paginate: true
size: 16:9
---

<!-- _class: lead -->
# 11 — Bonnes pratiques & anti-patterns
## TS lisible et durable

[← Retour à l’index](./index.html)

---

# Objectif du chapitre

- Savoir quand ne PAS typer
- Éviter `any` (et savoir quoi faire à la place)
- Éviter les types trop complexes
- Optimiser pour la lisibilité
- Utiliser les types comme documentation

---

# Quand ne PAS typer ?

Ne forcez pas :
- des types “parfaits” quand le code est volatile
- du typage “académique” qui ralentit l’équipe
- des types sur des scripts jetables

Priorité : **valeur livrée + sécurité raisonnable**.

---

# Éviter `any` : alternatives

- `unknown` + narrowing (chapitre 9)
- types littéraux / unions
- génériques (chapitre 6)
- `Record<string, ...>` pour dictionnaires

`any` doit être l’exception (et idéalement localisé).

---

# Anti-pattern : types trop complexes

Signaux d’alerte :
- 10+ niveaux d’utilitaires imbriqués
- erreurs TS incompréhensibles
- types impossibles à lire en review

Solution :
- simplifier le modèle
- ajouter des types intermédiaires nommés
- déplacer une partie au runtime (validation)

---

# Lisibilité > sophistication

Préférer :
```ts
type Status = "idle" | "loading" | "success" | "error";
```

Plutôt que :
```ts
type Status<T> = T extends never ? ... : ...
```

Si la sophistication n’apporte pas de gain concret, elle coûte en maintenance.

---

# Types comme documentation

Un bon type :
- raconte une histoire claire
- rend les usages “évidents”
- réduit le besoin de commentaires

Exemple :
```ts
type MoneyCents = number;
type Currency = "EUR" | "USD";
type Price = { amountCents: MoneyCents; currency: Currency };
```

---

# Patterns utiles

- Séparer DTO (API) et modèle métier
- Utiliser des unions discriminées pour les états
- Centraliser les types partagés (`types.ts`)
- Nommer les types : `OrderStatus`, `UserId`, `ApiResult<T>`

---

# Exercice (15 min) — refactor lisibilité

On te donne un type trop large :

```ts
type ApiUser = {
  id: any;
  profile: any;
  role: any;
};
```

1. Remplace `any` par des types utiles
2. Introduis des littéraux pour `role`
3. Rends `profile` explicite (au minimum)
4. Explique les compromis (ce que tu n’as pas typé, et pourquoi)

---

# À retenir

- TypeScript sert l’équipe : lisible, utile, maintenable.
- `any` est un dernier recours ; `unknown` est souvent meilleur.
- Modéliser des états explicites réduit la complexité du code.
