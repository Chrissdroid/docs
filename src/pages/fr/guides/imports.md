---
layout: ~/layouts/MainLayout.astro
title: Fichiers Statiques
description: Apprenez à importer différents types de contenu avec Astro.
---

Astro supporte la plupart des ressources statiques sans aucune configuration nécessaire. Vous pouvez utiliser la directive `import` n'importe où dans votre projet JavaScript (y compris votre *front matter* de composant Astro) et Astro inclura une copie construite, optimisée, de ce fichier statique dans votre build final. `@import` est également pris en charge dans les balises CSS et `<style>`.

## Types de fichiers supportés

Les types de fichiers suivants sont supportés par défaut par Astro :

- Composants Astro (`.astro`)
- Markdown (`.md`)
- JavaScript (`.js`, `.mjs`)
- TypeScript (`.ts`, `.tsx`)
- Packages NPM
- JSON (`.json`)
- JSX (`.jsx`, `.tsx`)
- CSS (`.css`)
- Modules CSS (`.module.css`)
- Images & éléments (`.svg`, `.jpg`, `.png`, etc.)

Si vous ne voyez pas le type de fichier que vous recherchez, consultez notre [Bibliothèque d'intégrations](https://astro.build/integrations/). Vous pouvez étendre Astro pour ajouter le support pour des types de fichiers différents, comme des composants Svelte et Vue.

Cette guide décrit comment les différents types d'assets sont construits par Astro, et comment les importer avec succès.

Souvenez-vous que vous pouvez aussi placer n'importe quel fichier statique dans le [répertoire `public/`](/fr/core-concepts/project-structure/#public) de votre projet, et Astro les copiera directement dans votre build final. Les fichiers `public/` ne sont pas compilés ou assemblés par Astro, ce qui signifie que tout type de fichier est supporté. Vous pouvez référencer un fichier `public/` par une URL d'accès direct dans vos modèles HTML.

## JavaScript

```js
import { getUser } from './user.js';
```

Le JavaScript peut être importé en utilisant la syntaxe ESM `import` & `export`. Cela fonctionne comme prévu, en se basant sur la façon de fonctionner par défaut de Node.js et des navigateurs.

## TypeScript

```js
import { getUser } from './user.ts';
import type { UserType } from './user.ts';
```

Astro inclut le support pour les fichiers TypeScript (`*.ts`) dans votre projet. TypeScript est automatiquement transposé en JavaScript, sans l'information de type.

Notez que Astro construit votre code TypeScript mais ne fait pas de vérification de type. La vérification de type doit être prise en charge à l'extérieur de Astro, soit par votre IDE ou par un travail séparé. Vous pouvez exécuter `tsc --noEmit` dans votre projet pour vérifier le code TypeScript avec la commande ILC officielle de TypeScript (nécessite le package `typescript`).

## JSX / TSX

```js
import { MyComponent } from './MyComponent.jsx';
```

Astro inclut le support pour les fichiers JSX (`*.jsx` et `*.tsx`) dans votre projet. La syntaxe JSX est automatiquement transposée en JavaScript.

Alors que Astro comprend la syntaxe JSX par défaut, vous aurez besoin d'inclure une intégration de framework pour les afficher, comme React, Preact et Solid. Consultez notre [Guide d'utilisation des intégrations](/fr/guides/integrations-guide) pour en savoir plus.

**Note: Astro ne supporte pas la syntaxe JSX dans les fichiers `.js`/`.ts`.** JSX ne sera géré que dans les fichiers qui se terminent par l'extension `.jsx` et `.tsx`.

## Packages NPM

```js
// Retourne les packages NPM React & React-DOM
import React from 'react';
import ReactDOM from 'react-dom';
```

Astro vous permet d'importer des packages NPM directement dans le navigateur. Même si un package a été publié en format legacy, Astro va convertir le package en ESM avant de le fournir au navigateur.

## JSON

```js
// Charge l'objet JSON via l'export par défaut
import json from './data.json';
```

Astro supporte l'importation directe des fichiers JSON dans votre application. Les fichiers importés retournent l'objet JSON complet dans l'import par défaut.

## CSS

```js
// Charge et intègre 'style.css' sur la page
import './style.css';
```

Astro supporte l'importation directe des fichiers CSS dans votre application. Les styles importés n'exposent aucun export, mais l'importation d'un fichier CSS le rendra automatiquement disponible sur la page. Cela fonctionne par défaut pour tous les fichiers CSS, et peut supporter les langages de compilation CSS comme Sass et Less via des plugins.

Si vous préférez ne pas écrire de CSS, Astro supporte également tous les librairies "CSS-in-JS" populaires (ex: styled-components) pour styliser vos éléments.

## Modules CSS

```jsx
// 1. Convertit les noms de classes './style.module.css' en valeurs uniques, portées.
// 2. Retourne un objet qui associe les noms de classes d'origine à leur valeur portée finale.
import styles from './style.module.css';

// Cet exemple utilise JSX, mais vous pouvez utiliser les modules CSS avec n'importe quel framework.
return <div className={styles.error}>Votre message d'erreur</div>;
```

Astro supporte les modules CSS en utilisant la convention de nommage `[name].module.css`. Comme tous les fichiers CSS, l'importation d'un fichier CSS le rendra disponible sur la page. Cependant, les modules CSS exportent un objet spécial nommé `styles` qui associe les noms de classes d'origine à des identifiants uniques.

Les modules CSS vous aident à garantir l'isolation et la portée des composants sur le frontend avec des noms de classes uniques pour vos feuilles de styles.

## Autres ressources

```jsx
import imgReference from './image.png'; // img === '/src/image.png'
import svgReference from './image.svg'; // svg === '/src/image.svg'
import txtReference from './words.txt'; // txt === '/src/words.txt'

// Cet exemple utilise JSX, mais vous pouvez utiliser des références d'importation avec n'importe quel framework.
<img src={imgReference} />;
```

Toutes les autres ressources non mentionnées ci-dessus peuvent être importées via l'`import` ESM et retournera une référence URL vers l'asset final construit. Cela peut être utile pour référencer des ressources non-JS par URL, comme créer un élément image avec un attribut `src` pointant vers cette image.

Il peut aussi être utile de placer des images dans le dossier `public/` comme expliqué sur la [page de structure du projet](/fr/core-concepts/project-structure/#public).

## WASM

```js
// Charge et initialise le fichier WASM demandé
const wasm = await WebAssembly.instantiateStreaming(fetch('/example.wasm'));
```

Astro supporte l'importation directe des fichiers WASM dans votre application en utilisant l'API [`WebAssembly`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly) du navigateur.

## Intégrations Node

Nous encourageons les utilisateurs d'Astro à éviter les intégrations Node.js (`fs`, `path`, etc) lorsque possible. Astro à comme objectif de rester compatible avec plusieurs environnements de développement JavaScript dans le futur. Cela inclut [Deno](https://deno.land/) et [Cloudflare Workers](https://workers.cloudflare.com/) qui ne supportent pas les modules intégrés Node.js tels que `fs`.

Notre objectif est de fournir des alternatives aux intégrations Node.js les plus courantes. Cependant, aucune alternative n'existe actuellement. Si vous avez _vraiment_ besoin de ces intégrations, nous n'allons pas vous arrêter. Astro supporte les intégrations Node.js en utilisant le préfixe `node:` de Node.js. Si vous souhaitez lire un fichier, par exemple, vous pouvez le faire de cette manière :

```astro
---
// Exemple : importation de l'intégration "fs/promises" de Node.js
import fs from 'node:fs/promises';

const url = new URL('../../package.json', import.meta.url);
const json = await fs.readFile(url, 'utf-8');
const data = JSON.parse(json);
---

<span>Version : {data.version}</span>
```
