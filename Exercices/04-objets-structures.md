# Exercice — Construire un index de films

## Contexte

CinéConnect charge une liste de films depuis l'API.

Vous devez :

1. Transformer les données API (DTO)
2. Construire un dictionnaire pour un accès rapide par `id`

---

## Types fournis

```ts
type MovieDTO = {
  id: number;
  title: string;
  rating: number;
  release_year: number;
};

type Movie = {
  id: number;
  title: string;
  rating: number;
  releaseYear: number;
};
```

---

## Travail demandé

Implémentez une fonction :

```ts
mapMovie(dto: MovieDTO): Movie
```

* Transformer `release_year` → `releaseYear`

---

Implémentez une fonction :

```ts
indexMovies(movies: Movie[]): Record<number, Movie>
```

* Retourner un dictionnaire typé
* Clé = `movie.id`
* Valeur = l'objet `Movie`

---

## Exemple attendu

```ts
const moviesById = indexMovies(mappedMovies);

moviesById[42].title;
```

---

## Objectifs pédagogiques

* Séparer DTO / modèle métier
* Utiliser `Record<K, V>`
* Comprendre la différence :

  * tableau (`Movie[]`)
  * dictionnaire (`Record<number, Movie>`)
* Structurer des données pour optimiser l'accès

---

## Petit bonus (facultatif)

Rendre `id` et `releaseYear` `readonly` dans le modèle `Movie`.
