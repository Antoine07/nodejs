# Exercice — `keyof` : implémenter `set` (immuable et typé)

## Contexte

On veut mettre à jour une propriété d’un objet **sans le muter** (approche immuable).

Exemple métier : activer un utilisateur.

## Types fournis

```ts
type User = {
  id: number;
  name: string;
  active: boolean;
};

const user: User = {
  id: 1,
  name: "Alice",
  active: false,
};
```

## Travail demandé

Implémentez une fonction générique :

```ts
function set<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  // ...
}
```

Contraintes :

- la fonction retourne un **nouvel objet** (ne pas modifier `obj`)
- la clé doit être **une clé valide** de `T`
- la valeur doit être **du bon type** pour cette clé

## Exemple attendu

```ts
const updated = set(user, "active", true);

console.log(user);
// { id: 1, name: "Alice", active: false }

console.log(updated);
// { id: 1, name: "Alice", active: true }
```

Vérifications à faire :

- `set(user, "active", "yes")` doit produire une erreur TypeScript
- `set(user, "unknownKey", true)` doit produire une erreur TypeScript
