# Exercice wrap

Créer une fonction `wrap` qui encapsule une valeur dans un objet et `unwrap` 

#  Exercice — Ducks typées et comportement générique

##  Objectif

Créer des canards avec des caractéristiques typées différentes,
et écrire des fonctions génériques capables de les manipuler sans perdre le typage.

---

##   Interface de base

On vous donne :

```ts
interface Duck<T> {
  name: string;
  quack(): string;
  features: T;
}
```

---

##  Créer deux canards différents

Un canard sauvage : 

```ts
const mallard: Duck<{
  billType: string;
  legs: number;
}> = { ... };
```

Un canard robot :

```ts
const roboDuck: Duck<{
  metal: boolean;
  batteryLevel: number;
}> = { ... };
```

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

---

##  Contrainte avancée

Créer une fonction elle doit :

* fonctionner uniquement si `features` contient `legs`
* retourner `true` si `legs > 0`

Test :

```ts
hasLegs(mallard);  // OK
hasLegs(roboDuck); // ❌ erreur TypeScript
```

