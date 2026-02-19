---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — Annexe : Exécution JavaScript"
---


## **Vue d'ensemble : comment JavaScript exécute du code**


---
## JavaScript est écrit en quoi ?

---

### JavaScript = une spécification

- Le langage est défini par **ECMAScript**
- C'est une **norme**, pas un programme
- Elle décrit la syntaxe et le comportement

---

### Le moteur JavaScript

Les moteurs qui exécutent JS sont écrits principalement en :

- **C++**

Exemples :

- **V8** (Chrome, Node.js)
- **SpiderMonkey** (Firefox)
- **JavaScriptCore** (Safari)

---

### Ce qui se passe réellement

```
code JS
     ↓
Moteur (C++)
     ↓
Code machine
     ↓
CPU
```

---

###  À retenir

> JavaScript est un langage standardisé (ECMAScript).
> Les moteurs qui l'exécutent sont écrits en C++.


---

**Concept clé :**
JavaScript est *single-thread* — il exécute le code **une seule ligne à la fois** dans une structure appelée **call stack**.
Quand la call stack est vide, l'**event loop** peut planifier la suite.

---

**Schéma logique :**

```
CALL STACK → EVENT LOOP → QUEUES (micro/macrotasks)
```

- **Call Stack** : exécution synchrone du script
- **Event Loop** : surveille quand la pile est vide
- **Queues** : listes de tâches asynchrones qui attendent d'être exécutées

---

<img src="./images/event-loop.png" width="800" />

---

# D'où vient l'asynchronisme ?

Le moteur JS exécute du code synchrone.
L'asynchronisme provient de l'**environnement d'exécution**.

---

# APIs asynchrones dans le navigateur

- `setTimeout`
- `fetch`
- événements DOM
- `XMLHttpRequest`

Ce sont des **Web APIs**.

---

# APIs asynchrones dans Node.js

- file system (`fs`)
- réseau
- timers
- I/O
- thread pool

Ce sont des APIs système via **libuv**.

---

# Event Loop : rôle

1. Une opération externe se termine.
2. Son callback (ou la continuation de Promise) est mis en file d'attente.
3. Si la call stack est vide, l'event loop injecte la prochaine tâche.
4. Le moteur l'exécute de façon synchrone.

---

## Promises et microtasks

- Les Promises sont natives JS.
- Les callbacks `.then/.catch/.finally` passent par la **microtask queue**.
- Cela reste vrai si la Promise est déjà résolue (`Promise.resolve(...)`) ou résolue après une opération externe.

---

```text
JS (V8 Engine)
    ↓
Appel fonction native fetch (binding C++)
    ↓
API réseau interne du navigateur (C/C++)
    ↓
Pile réseau / OS (socket TCP, DNS…)
    ↓
Réponse reçue
    ↓
Résolution de Promise (microtask)
    ↓
Event Loop
    ↓
Call Stack
    ↓
.then(...)
```

---

## **Microtasks vs Macrotasks**

**Deux types de files d'attente :**

### Microtasks

- Prioritaires
- Promises, `queueMicrotask`, `async/await`
- Si une microtask en ajoute une autre, elle s'exécute immédiatement
  **Traitées avant les macrotasks.**

---

### *Macrotasks*

- Tâches plus "lentes"
- `setTimeout`, événements DOM, I/O
- Traitées après toutes les microtasks

**Ordre d'exécution typique :**

1. Code synchrone
2. Vidage des microtasks
3. Une macrotask
4. Recommence

---

## **L'algorithme simplifié de l'Event Loop**

Version simplifiée :

```
- Exécuter le plus ancien macrotask
- Exécuter **toutes** les microtasks
- Rafraîchir l'affichage si nécessaire
- Si aucune macrotask, attendre une nouvelle tâche
- Revenir à (1)
```

---

Point important : **toutes les microtasks sont traitées avant d'aller à la prochaine macrotask.**

---

Exemple classique :

```js
console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
console.log(4);
```

Résultat :

```
1 4 3 2
```

Explication :

- `1` & `4` = synchrone
- `3` = microtask
- `2` = macrotask

---

###  Résumé 

- **Call Stack** → code synchrone
- **Microtasks** → hautes priorités après stack
- **Macrotasks** → plus lentes, traitées ensuite
- **Event Loop** orchestre tout cela

---

### Sources

- https://javascript.info/event-loop
- https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide
- https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
