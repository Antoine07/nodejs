# Exercice 1 — Calcul de moyenne

Implémentez :

```ts
computeAverageScore(...)
```

Contraintes :

* Paramètre : `scores: number[]`
* Retour : `number`
* Si le tableau est vide → retourner `0`
* Arrondir la moyenne à 1 décimale

Exemple attendu :

```ts
computeAverageScore([4, 5, 3]); // 4.0
```

Objectif :

* typer paramètres et retour
* écrire un algorithme simple
* respecter un contrat clair

---

# Exercice 2 — Filtrer et trier des films

Types fournis :

```ts
type Movie = {
  id: number;
  title: string;
  rating: number;
};
```

Implémentez :

```ts
filterAndSortMovies(...)
```

Contraintes :

* Paramètre `movies: Movie[]`
* Paramètre `minRating: number`
* Paramètre `sortBy: "rating" | "title"`
* Retour : `Movie[]`

La fonction doit :

1. garder les films avec `rating >= minRating`
2. trier :

   * par note décroissante si `"rating"`
   * par ordre alphabétique si `"title"`

Objectif :

* utiliser un union type
* guider l’algorithme par le typage
* garder une signature propre
