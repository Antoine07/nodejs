---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/r)"
title: "Cours TypeScript — Index"
---

# Cours TypeScript
## Support de cours (slides)

---

# Plan

0. [Introduction : pourquoi TypeScript ?](./00-introduction.html)
1. [Types & inférence](./01-types-inference.html)
2. [Fonctions](./02-fonctions.html)
3. [Objets & structures](./03-objets-structures.html)
4. [Unions & narrowing](./04-unions-narrowing.html)
5. [Types littéraux & discriminants](./05-discriminated-unions.html)

---

# Plan (suite)

6. [Génériques (intro)](./06-generiques-intro.html)
7. [Contraintes : `extends`](./07-contraintes-extends.html)
8. [`keyof` et accès dynamique](./08-keyof-acces-dynamique.html)
9. [Typage du monde réel](./09-typage-monde-reel.html)
10. [Tooling & workflow](./10-tooling-workflow.html)
11. [Bonnes pratiques & anti-patterns](./11-bonnes-pratiques.html)
12. [Mise en pratique / TP fil rouge](./12-tp-fil-rouge.html)

---

# Build (HTML)

Pré-requis : Node.js.

1. Installer les dépendances à la racine :
   - `npm install`
2. Générer le HTML dans `docs/` :
   - `npm run slides:build`
3. Lancer un serveur Marp (optionnel) :
   - `npm run slides:watch`
