# Mini TP — "Machine de Turing" (version web/dev) — génériques + architecture

Ce mini TP utilise une version **très simplifiée** d'une machine de Turing, adaptée au développement web :
- un **ruban** (tape) = un tableau de valeurs
- une **tête** (head) = un index (pointeur)
- une **règle** (rule) = une fonction qui transforme la valeur courante
- `step()` applique une transformation et avance la tête
- `run()` répète jusqu'à la fin du ruban

Objectif : pratiquer TypeScript (génériques + contrats) et une architecture lisible, comme sur le TP panier.

## Contraintes (importantes)

- Le code doit être organisé, architecturé.
- Le **Domain** ne doit dépendre d'aucune API .
- `strict: true` doit passer.
- Interdits : `any`.
- Les méthodes publiques doivent avoir des types clairs (contrats).

## Théorie (très courte)

Une machine de Turing "classique" manipule un ruban et applique des transitions.  
Ici, on garde le cœur de l'idée (ruban + tête + étape), sans la complexité "gauche/droite/écriture/états".

Message clé :

> On sépare la **logique** (Domain) de la façon dont on **récupère** les données (Infrastructure) et du **scénario** d'exécution (Application).

## Emplacement

Le mini projet est dans `Apps/src/Turing/` :

## Travail demandé

- `Machine<T>` doit exposer (méthode publique):
  - `step(): void`
  - `run(): void`
  - `getTape(): T[]` (copie, pas la référence interne)
- `Rule<T>` doit exposer :
  - `transform(value: T): T`

Objectif : un contrat simple, générique, et réutilisable.

### implémentation

- `TuringMachine<T>` reçoit :
  - `tape: T[]`
  - `rule: Rule<T>`
  - `pointer` (optionnel, par défaut `0`)
- `step()` :
  - lève une erreur si le ruban est vide
  - si `pointer` est à la fin → ne fait rien
  - sinon :
    - applique `rule.transform` sur la case courante
    - écrit le résultat dans le ruban
    - avance le pointeur de 1
- `run()` :
  - exécute `step()` jusqu'à la fin du ruban
- `getTape()` :
  - retourne une copie du ruban (`[...]`)

### scénario (démonstration)

Créez **au moins 3 règles** et démontrez que la machine est générique :

1) `number` : doubler (`n => n * 2`)
2) `string` : normaliser (ex: trim + lowercase)
3) `object` : transformer un DTO vers un modèle (ex: `{ release_year }` → `{ releaseYear }`)

À chaque exemple :
- affichez le ruban initial
- lancez `run()`
- affichez le ruban final

## Livrables

- Le code est proprement séparé 
- Le Domain est générique et indépendant
- Le script Application démontre 3 rubans de types différents
- `strict: true` passe sans `any`

