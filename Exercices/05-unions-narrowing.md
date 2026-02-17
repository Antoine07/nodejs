# Exercice — Tirage aléatoire asynchrone (union discriminée)

## Contexte

On souhaite simuler un service distant qui effectue un tirage aléatoire.

Objectif : modéliser un résultat **success / error** avec une **union discriminée** (discriminant `ok`).

## Travail demandé

### 1) Créer le type `DrawResult`

Créez un type `DrawResult` qui représente **exactement deux formes** :

- succès : `{ ok: true, value: number }`
- erreur : `{ ok: false, error: "TOO_SMALL" }`

### 2) Implémenter la fonction `draw`

Implémentez une fonction asynchrone :

```ts
async function draw(): Promise<DrawResult> {
  // ...
}
```

Comportement :

- attendre 500 ms (via `setTimeout`)
- générer un nombre aléatoire entre 0 et 10 (inclus)
- si le nombre est ≥ 5 → retourner `{ ok: true, value }`
- sinon → retourner `{ ok: false, error: "TOO_SMALL" }`

### 3) Utiliser la fonction et afficher

Appelez `draw()` puis affichez :

- `"Success: [value]"` si succès
- `"Error: [error]"` si erreur

## Contraintes

- ne pas utiliser `any`
- ne pas utiliser `as`

## Indice (typage)

Si le type de retour est bien `Promise<DrawResult>`, TypeScript vous aidera à faire du narrowing via :

```ts
if (result.ok) {
  // succès
} else {
  // erreur
}
```
