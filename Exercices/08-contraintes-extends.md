# Exercice wrap

Créer une fonction `wrap` qui encapsule une valeur dans un objet et `unwrap` 

#  Exercice — Ducks typées et comportement générique

##  Objectif

Créer des canards avec des caractéristiques typées différentes,
et écrire des fonctions génériques capables de les manipuler sans perdre le typage.

---

## Interface générique `Duck`

Créer une interface générique `Duck<T>` avec :

* `name: string`
* `quack(): string`
* `features: T`

Contraindre `T` pour qu’il contienne au minimum :

* `legs: number`
* `canFly: boolean`


##  Créer deux canards différents

Un canard sauvage.
Un canard robot.

---

##  Fonction générique

Créer une fonction, elle doit retourner une phrase du type :

```
"Mallard says Quack Quack"
```

---

##  Accès typé aux features

Créer une fonction, elle doit retourner les `features` avec le type exact conservé.

Exemple :

```ts
const features = getFeatures(mallard);
// features doit être correctement typé
```

