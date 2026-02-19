---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — 0 Contexte de démarrage"
---


## **Vue d'ensemble : comment JavaScript exécute du code**

<img src="https://media2.dev.to/dynamic/image/width%3D1600%2Cheight%3D900%2Cfit%3Dcover%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F1v05yqyxbjfiepzphyph.png" width="800" />

---

![Image](https://media.licdn.com/dms/image/v2/D5612AQHIuZDc3cqPtg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1721189705579?e=2147483647\&t=7z1ivEBMlIOpeq4P2UUbbrj1T64ysIpkPv27efVvq60\&v=beta)


---

**Concept clé :**
JavaScript est *single-thread* — il exécute le code **une seule ligne à la fois** dans une structure appelée **call stack**.
➡️ Quand il n'y a plus de code synchrone à exécuter, l'Event Loop prend le relais.([javascript.info][1])

---

**Schéma logique :**

```
CALL STACK —> (sinon) EVENT LOOP —> QUEUES (micro/macrotasks)
```

* **Call Stack** : exécution synchrone du script
* **Event Loop** : surveille quand la pile est vide
* **Queues** : listes de tâches asynchrones qui attendent d'être exécutées

---

## **Microtasks vs Macrotasks**


<img src="https://media2.dev.to/dynamic/image/width%3D1600%2Cheight%3D900%2Cfit%3Dcover%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F1v05yqyxbjfiepzphyph.png" width="800" />

---

![Image](https://miro.medium.com/1%2AXVqPA2z1dTHJWm2TwIAsBw.gif)

**Deux types de files d'attente :**

### 🧠 *Microtasks*

- Prioritaires
- Promises, `queueMicrotask`, `async/await`
- Si une microtask en ajoute une autre, elle s'exécute immédiatement
  **Traitées *avant* les macrotasks.**([tr.javascript.info][2])

---

### *Macrotasks*

- Tâches plus “lentes”
- `setTimeout`, événements DOM, I/O
- Correspondent à la file décrite dans l'introduction de javascript.info
  **Traitées après toutes les microtasks.**([javascript.info][1])

**Ordre d'exécution typique :**

1. Code synchrone
2. Vidage des microtasks
3. Une macrotask
4. Recommence

---

## **L'algorithme simplifié de l'Event Loop**

![Image](https://media.licdn.com/dms/image/v2/D4D12AQExWD31PDbNSQ/article-inline_image-shrink_400_744/article-inline_image-shrink_400_744/0/1703925274828?e=2147483647\&t=HRusha4zIHfOEAzTjkVD0v31nTiYeurt9xsXupneCfM\&v=beta)

---

![Image](https://developer.ibm.com/developer/default/tutorials/learn-nodejs-the-event-loop/images/figure-1.png)

Voici une version simplifiée de l'algorithme décrit par javascript.info :([javascript.info][1])

```
1) Exécuter le plus ancien macrotask
2) Exécuter **toutes** les microtasks
3) Rafraîchir l'affichage si nécessaire
4) Si aucune macrotask, attendre une nouvelle tâche
5) Revenir à (1)
```

---

👉 Important : **toutes les microtasks sont traitées avant d'aller à la prochaine macrotask.**([DEV Community][3])

---

🎯 Exemple classique :

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

* `1` & `4` = synchrone
* `3` = microtask
* `2` = macrotask

---

###  Résumé 

* **Call Stack** → code synchrone
* **Microtasks** → hautes priorités après stack
* **Macrotasks** → plus lentes, traitées ensuite
* **Event Loop** orchestre tout cela
