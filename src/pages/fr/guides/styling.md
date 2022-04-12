---
layout: ~/layouts/MainLayout.astro
title: CSS et Stylisation
description: Apprenez à utiliser les composants de style avec Astro.
setup: |
  import Since from '../../../components/Since.astro';
---

Astro à été conçu pour rendre la création de style et l'écriture de CSS facile. Écrivez votre propre CSS directement dans un composant Astro ou importez une bibliothèque de style préférée comme [Tailwind][tailwind]. Les langages de style avancés comme [Sass][sass] et [Less][less] sont également supportés.

## Stylisation dans Astro

Styliser un composant Astro est aussi facile que d'ajouter une balise `<style>` à votre template de composant ou de page. Quand vous placez une balise `<style>` dans un composant Astro, Astro détectera le CSS et chargera vos styles pour vous, automatiquement.

```astro
<style>
  h1 { color: red; }
</style>
```

### Portée des styles

Les règles CSS `<style>` d'Astro sont automatiquement **portées au composant par défaut**. Ces styles sont compilés en arrière-plan pour ne s'appliquer qu'à l'HTML écrit à l'intérieur du même composant. Le CSS que vous écrivez dans un composant Astro est automatiquement encapsulé dans ce composant.

```diff
<style>
-  h1 { color: red; }
+  h1.astro-HHNQFKH6 { color: red; }
-  .text { color: blue; }
+  .text.astro-HHNQFKH6 { color: blue; }
</style>
```

Les styles portés ne se propagent pas et ne n'affectent pas le reste de votre site. Dans Astro, c'est quelque chose de courrant d'utiliser des sélecteurs de basse-précision comme `h1 {}` ou `p {}` car ils seront compilés avec des encapsulations dans la sortie finale.

Les styles portés ne s'appliquent pas à d'autres composants Astro contenus dans votre template. Si vous avez besoin de styliser un composant enfant, envisagez de placer ce composant dans une `<div>` (ou d'autres éléments) que vous pourrez ensuite customiser.

#### Styles globaux

Comme nous recommandons les styles portés pour la plupart des composants, vous pourriez éventuellement trouver une raison valide de écrire du CSS global, non porté. Vous pouvez désactiver l'encapsulation automatique de CSS avec l'attribut `<style is:global>`.

```html
<style is:global>
  /* Non porté, livré directement au navigateur.
     S'applique à tous les <h1> dans votre site. */
  h1 { color: red; }
</style>
```

Vous pouvez aussi mélanger les règles CSS globales et portées dans la même balise `<style>` en utilisant le sélecteur `:global()`. Cela devient un modèle puissant pour appliquer des styles CSS à des enfants de votre composant.

```astro
<style>
  /* Porté à ce composant seulement. */
  h1 { color: red; }
  /* Mixé : Applique seulement aux éléments enfants `h1` de ce composant. */
  article :global(h1) {
    color: blue;
  }
</style>
<h1>Titre</h1>
<article><slot /></article>
```

Ceci est une bonne façon de styliser des éléments comme des articles de blog, ou des documents avec un contenu CMS qui se trouve en dehors de Astro. Mais soyez prudent : les composants dont l'apparence varie selon si oui ou non ils ont un certain parent composant peut être difficile à débugger.

Les styles portés devraient être utilisés aussi souvent que possible. Les styles globaux devraient être utilisés uniquement lorsque nécessaire.

### CSS Variables
### Variables CSS

<Since v="0.21.0" />

La balise `<style>` d'Astro peut référencer n'importe quelle variable CSS disponible sur la page. Vous pouvez aussi passer des variables CSS directement depuis le *front-matter* de votre composant en utilisant la directive `define:vars`.

```astro
---
const foregroundColor = "rgb(221 243 228)";
const backgroundColor = "rgb(24 121 78)";
---
<style define:vars={{ foregroundColor, backgroundColor }}>
  h1 {
    background-color: var(--backgroundColor);
    color: var(--foregroundColor);
  }
</style>
<h1>Bonjour</h1>
```

Toute variable front-matter *sérialisable* est supportée, y compris les propriétés passées à votre composant via `Astro.props`.

## Styles externes

Il y a deux façons de résoudre des feuilles de styles globales externes : un import ESM pour les fichiers situés dans le code source de votre projet, et un lien absolu pour les fichiers dans le répertoire `public/` ou hébergés en dehors de votre projet.

📚 En savoir plus sur l'utilisation des [ressources statiques](/fr/guides/imports) situées dans `public/` ou `src/`.

### Importer une feuille de styles

Vous pouvez importer des feuilles de styles dans le *front-matter* de votre composant Astro en utilisant la syntaxe d'import ESM. Les imports CSS fonctionnent comme tous les autres imports ESM, et doivent être référencés comme relatifs au composant.

```astro
---
// Astro va automatiquement fusionner et optimiser ce CSS pour vous
// Cela fonctionne aussi pour des fichiers préprocesseurs comme .scss, .styl, etc.
import '../styles/utils.css';
---
<html><!-- Votre page ici --></html>
```

Les imports CSS via ESM sont supportés dans n'importe quel fichier JavaScript, y compris dans les composants JSX comme React & Preact. Cela peut être utile pour écrire des styles granulaires, par composant, pour vos composants React.

### Charger une feuille de styles externe

Vous pouvez aussi utiliser l'élément `<link>` pour charger une feuille de styles sur la page. Cela devrait être un chemin absolu vers un fichier CSS situé dans le répertoire `/public`, ou une URL vers un site web externe. Les valeurs relative "href" sur les balises `<link>` ne sont pas supportées.

```html
<head>
  <!-- En local: /public/styles/global.css -->
  <link rel="stylesheet" href="/styles/global.css" />
  <!-- Externe  -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.24.1/themes/prism-tomorrow.css">
</head>
```

Parce que cette approche utilise le répertoire `public/`, il saute les transformations CSS, la fusion et l'optimisation que fournit Astro. Si vous avez besoin de ces transformations, utilisez la méthode d'[importation une feuille de styles](#importer-une-feuille-de-styles) ci-dessus.

## Intégrations CSS

Astro fournit le support pour ajouter les bibliothèques CSS populaires, les outils et les frameworks de votre projet comme PostCSS, Tailwind et plus encore !

📚 Consultez le [Guide d'intégrations](/fr/guides/integrations-guide/) pour les instructions d'installation, d'importation et de configuration de ces intégrations.

## Préprocesseurs CSS

Astro supporte les préprocesseurs CSS comme [Sass][sass], [Stylus][stylus], et [Less][less] via [Vite][vite-preprocessors].

### Sass

```bash
npm install -D sass
```

Utilisez `<style lang="scss">` ou `<style lang="sass">` dans les fichiers `.astro`.

### Stylus

```bash
npm install -D stylus
```

Utilisez `<style lang="styl">` ou `<style lang="stylus">` dans les fichiers `.astro`.

### Less

```bash
npm install -D less
```

Utilisez `<style lang="less">` dans les fichiers `.astro`.

> Vous pouvez aussi utiliser tous les préprocesseurs CSS ci-dessus aussi bien dans les frameworks JS que dans d'autres! Assurez-vous de suivre les patterns recommandés par chacun des frameworks :

- **React** / **Preact**: `import Styles from './styles.module.scss';`
- **Vue**: `<style lang="scss">`
- **Svelte**: `<style lang="scss">`

De plus, PostCSS est supporté sous une [intégration](/fr/guides/integrations-guide/).

---

## Frameworks et bibliothèques

### 📘 React / Preact

Les fichiers `.jsx` supportent aussi les CSS globaux et les modules CSS. Pour activer le dernier, utilisez l'extension `.module.css` (ou `.module.scss`/`scss` si vous utilisez Sass).

```js
import './global.css'; // inclus du CSS global
import Styles from './styles.module.css'; // Utilise les modules CSS (doit se terminer par `.module.css`, `.module.scss`, ou `.module.sass`!)
```

### 📗 Vue

Vue Astro supporte les mêmes méthodes que `vue-loader` :

- [vue-loader - CSS Portés][vue-scoped]
- [vue-loader - Modules CSS][vue-css-modules]

### 📕 Svelte

Svelte fonctionne aussi à la perfection dans Astro : [Documentation de Style sur Svelte][svelte-style].

[less]: https://lesscss.org/
[sass]: https://sass-lang.com/
[stylus]: https://stylus-lang.com/
[svelte-style]: https://svelte.dev/docs#style
[tailwind]: https://tailwindcss.com
[vite-preprocessors]: https://vitejs.dev/guide/features.html#css-pre-processors
[vue-css-modules]: https://vue-loader.vuejs.org/guide/css-modules.html
[vue-scoped]: https://vue-loader.vuejs.org/guide/scoped-css.html
