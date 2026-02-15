
# Exercice — Tirage aléatoire asynchrone

On souhaite simuler un service distant qui effectue un tirage aléatoire

1. Créer un type `DrawResult` :

2. Implémenter une fonction :

* attendre 500 ms (via `setTimeout`)
* générer un nombre aléatoire entre 0 et 10
* si le nombre est ≥ 5 → retourner `{ ok: true, value: number }`
* sinon → retourner `{ ok: false, error: "TOO_SMALL" }`

4. Utiliser la fonction et afficher :

* `"Success: [value]"` si succès
* `"Error: [error]"` si erreur

⚠️ Ne pas utiliser `any` ni `as`.