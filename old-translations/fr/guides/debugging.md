---
layout: ~/layouts/MainLayout.astro
title: Déboguer
description: Débogez Astro en utilisant le composant Debug
---

Astro fournit un certain nombre d'outils pour aider à déboguer votre code plus facilement et plus rapidement.

## Débogage avec `console.log()`

`console.log()` est une méthode "simple-mais-populaire" de débogage de votre code Astro. Lorsque vous écrivez votre une ligne `console.log`, il déterminera où votre sortie de débogage sera affichée.

### Front-matter

Une ligne `console.log()` dans le front-matter d'Astro sera toujours affichée dans le terminal lorsque qu'Astro est lancé via la commande de terminal. Car Astro est lancé sur le serveur, et jamais dans le navigateur.

```astro
---
const sum = (a, b) => a + b;

// Example: Affiche "4" dans le terminal
console.log(sum(2, 2));
---
```

### Scripts JS

Code qui est écrit ou importé dans une balise `<script>` d'Astro sera exécuté dans le navigateur. Toutes les lignes `console.log()` ou d'autres sorties de débogage seront affichées dans votre navigateur.

## Débogage des composants de framework

Les composants de framework (comme React et Svelte) sont uniques : Ils sont rendus sur le serveur par défaut, ce qui signifie que les sorties de débogage `console.log()` seront visibles dans le terminal lorsque Astro est lancé. Cependant, ils peuvent également être hydratés pour le navigateur, ce qui peut causer les sorties de débogage à également apparaître dans le navigateur.

Cela peut être utile pour déboguer les différences entre la sortie SSR et les composants hydratés dans le navigateur.

## Composant `<Debug />` d'Astro

Pour vous aider à déboguer vos composants d'Astro, Astro fournit un composant [`<Debug />`](/fr/reference/builtin-components#debug-) qui affiche directement n'importe quel valeur dans votre template HTML du composant. Cela est utile pour un débogage rapide dans le navigateur sans avoir à basculer entre votre terminal et votre navigateur.

```astro
---
import { Debug } from 'astro/components';
const sum = (a, b) => a + b;
---

<!-- Example: Affiche {answer: 6} dans le navigateur -->
<Debug answer={sum(2, 4)} />
```

Le composant Debug supporte une variété d'options de syntaxe pour un débogage plus flexible et concise :

```astro
---
import { Debug } from 'astro/components';
const sum = (a, b) => a + b;
const answer = sum(2, 4);
---
<!-- Example: Les trois exemples ci-dessous sont équivalents. -->
<Debug answer={sum(2, 4)} />
<Debug {{answer: sum(2, 4)}} />
<Debug {answer} />
```
