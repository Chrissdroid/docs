---
layout: ~/layouts/MainLayout.astro
title: Pages
description: Une introduction au pages Astro
---

Les **pages** sont des [composants Astro](/fr/core-concepts/astro-components) spécifiques qui vivent dans le sous-dossier `src/pages/`. Ils ont la responsabilité de gérer le routage, le chargement de données et la mise en page pour chaque page HTML de votre site web.

### Routage basé sur les fichiers
Astro met en place un système de routage basé sur les fichiers. Chaque fichier `.astro` dans le dossier `src/pages` est une page de votre site web, créant une route URL basée sur le chemin du fichier dans le dossier.

📚 Lire plus à propos du [Routage dans Astro](/fr/core-concepts/routing)

### Page HTML

Les pages Astro doivent retourner une réponse complète `<html>...</html>`, incluant `<head>` et `<body>`. (`<!doctype html>` est optionnel, et sera ajouté automatiquement.)

```astro
---
// Example: src/pages/index.astro
---
<html>
  <head>
    <title>Ma page d'accueil</title>
  </head>
  <body>
    <h1>Bienvenue sur mon site web !</h1>
  </body>
</html>
```

### Mettre en place un Layout de page

Pour éviter de répéter les mêmes éléments HTML sur chaque page, vous pouvez déplacer les éléments communs tels que `<head>` et `<body>` dans vos propres [composants Layout](/fr/core-concepts/layouts). Vous pouvez utiliser autant de composants de layout que vous le souhaitez.

```astro
---
// Example: src/pages/index.astro
import MySiteLayout from '../layouts/MySiteLayout.astro';
---
<MySiteLayout>
  <p>Le contenu de ma page, contenu dans un Layout !</p>
</MySiteLayout>
```

📚 Lire plus à propos des [composants Layout](/fr/core-concepts/layouts) dans Astro.

## Pages Markdown

Astro traite les fichiers Markdown (`.md`) dans le dossier `src/pages/` comme des pages de votre site web. Ces pages sont généralement utilisées pour des pages de blog et de documentation.

Les Layouts sont très utiles pour les [fichiers Markdown](#pages-markdown). Ils peuvent utiliser la propriété `layout` pour spécifier un [composant Layout](/fr/core-concepts/layouts) qui va entourer le contenu Markdown dans un fichier HTML `<html>...</html>` complet.

```md
---
# Example: src/pages/page.md
layout: '../layouts/MySiteLayout.astro'
title: 'Ma page Markdown'
---
# Titre

Ceci est ma page, écrite en **Markdown.**
```

📚 Lire plus à propos du [Markdown](/fr/guides/markdown-content) dans Astro.


## Pages non-HTML

> ⚠️ Cette fonctionnalité n'est actuellement supportée qu'avec l'argument de commande `--experimental-static-build` via l'<abbr title="Interface en ligne de commande">ILC</abbr>. Cette fonctionnalité peut être modifiée dans les prochaines semaines/mois, car le support de l'SSR est finalisé.

Pour les pages qui ne sont pas de l'HTML, comme le `.json` ou l'`.xml`, vous pouvez les générer à partir de fichiers `.js` et `.ts`.

Les fichiers générés sont basés sur le nom du fichier source, ex: `src/pages/data.json.ts` sera généré pour correspondre à la route `/data.json` dans votre build final.

📚 Allez voir notre annonce sur la [génération dynamique de routes de fichiers](https://astro.build/blog/astro-023/#dynamic-file-routes) dans Astro.

## Page d'erreur 404 customisée

Pour une page d'erreur 404 personnalisée, vous pouvez créer un fichier `404.astro` dans `/src/pages`.

Cela va générer une page `404.html`. La plupart des [services de déploiement](/fr/guides/deploy) la trouveront et l'utiliseront.