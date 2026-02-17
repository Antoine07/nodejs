---
marp: true
theme: default
paginate: true
class: lead
header: "[index](https://antoine07.github.io/ts)"
title: "TypeScript — 1 Introduction"
---

# Question

Que pouvez-vous dire du code suivant ?

```ts
let point = [3, 4] as const;
 
function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}
 
distanceFromOrigin(point);

```