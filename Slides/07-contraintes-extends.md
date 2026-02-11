---
marp: true
title: "TypeScript — Contraintes : extends"
theme: gaia
paginate: true
size: 16:9
---

<!-- _class: lead -->
# 7 — Contraintes : `extends`
## Sécuriser les génériques

[← Retour à l’index](./index.html)

---

# Objectif du chapitre

- Comprendre `extends` comme *contrainte*, pas héritage
- Restreindre `T` pour autoriser certaines opérations
- Voir des cas réels : helpers, validation, APIs génériques

---

# `extends` : contrainte, pas héritage

```ts
function echo<T extends string>(value: T): T {
  return value;
}

echo("hello"); // ok
// echo(123);  // erreur
```

`T` est un type générique, mais **borné** à `string`.

---

# Pourquoi contraindre ?

Sans contrainte :
```ts
function lengthOf<T>(value: T) {
  return value.length; // erreur : T n’a pas forcément length
}
```

Avec contrainte :
```ts
function lengthOf<T extends { length: number }>(value: T) {
  return value.length;
}
```

---

# Contraindre sur une forme d’objet

```ts
function byId<T extends { id: number }>(arr: T[], id: number): T | undefined {
  return arr.find((x) => x.id === id);
}
```

Le helper devient réutilisable, mais reste sûr.

---

# Cas réel : merger sécurisé

```ts
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const r = merge({ id: 1 }, { name: "Ada" }); // { id: number } & { name: string }
```

---

# Quand restreindre ?

Restreindre quand :
- vous utilisez une propriété/méthode sur `T`
- vous voulez limiter les entrées valides
- vous voulez améliorer le message d’erreur

Ne restreignez pas “par réflexe” : ça peut rendre les APIs rigides.

---

# Exercice A (12 min) — `withId`

Écris :

```ts
withId<T extends { id: string }>(value: T): T
```

Objectif : accepter n’importe quel objet qui a `id: string`, et le retourner.

Puis : crée 2 types et teste :
- `User { id: string; name: string }`
- `Order { id: string; total: number }`

---

# Exercice B (12 min) — `pickLonger`

Écris :

```ts
pickLonger<T extends { length: number }>(a: T, b: T): T
```

Elle retourne l’argument qui a la plus grande `length`.

Test :
- strings
- arrays
- objets `{ length: number; value: ... }`

---

# À retenir

- `extends` borne un générique : “T doit avoir…”
- Ce n’est pas de l’héritage : c’est une contrainte.
- Contraindre = plus de sécurité + meilleure DX.
