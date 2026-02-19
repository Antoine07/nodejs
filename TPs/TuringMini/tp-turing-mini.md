# Mini TP — Turing + entrées fichiers validées (Zod)

Ce TP reprend la logique de `TuringMini`, mais l'entrée de la machine vient de fichiers JSON.
Le but est de garder un Domain simple et de traiter proprement la frontière "fichier" avec validation runtime.

## Objectif pédagogique

- Consolider les génériques TypeScript avec `Machine`, `Rule`, `TuringMachine`.
- Comprendre la séparation logique métier / lecture fichier / orchestration.
- Valider des données externes avec `zod` avant exécution.
- Utiliser des variables d'environnement dans Docker Compose pour piloter les fichiers traités.

## Théorie à retenir

- Le Domain ne doit gérer que la logique de transformation du ruban.
- La validation runtime est donc obligatoire avant d'instancier la machine.
- L'Application orchestre: lire une liste de fichiers, valider, exécuter, gérer les erreurs sans interrompre toute la boucle.

## Travail demandé (aligné avec `Apps/src/TuringInput`)

1. Conserver les contrats métier `Machine<T>` et `Rule<T>`.
2. Conserver la classe `TuringMachine<T>` et son comportement:
- `step()` lève une erreur si le ruban est vide.
- `step()` ne fait rien si le pointeur est déjà à la fin.
- Sinon, la valeur courante est transformée, réécrite, puis le pointeur avance.
- `run()` répète jusqu'à la fin.
- `getTape()` renvoie une copie.

3. Dans l'application:
- définir un schéma d'entrée avec `name` non vide et `tape` tableau de nombres non vide,
- définir une règle de transformation numérique (doubler),
- boucler sur chaque fichier déclaré dans `MACHINE_FILES`,
- charger + valider + exécuter la machine,
- afficher le résultat,
- en cas d'erreur, afficher le fichier concerné et continuer avec le suivant.

## Résultat attendu

- Un fichier valide est traité et le ruban final est affiché.
- Un fichier invalide (champ manquant, type incorrect, etc.) produit une erreur explicite.
- Le traitement continue sur les autres fichiers.



## Critères d'évaluation

- Noms et comportements alignés avec `TuringMini`.
- Validation runtime effective avant exécution métier.
- Gestion d'erreur claire et robuste par fichier.
- Pilotage par `MACHINE_FILES` opérationnel en environnement Docker Compose.
