---
layout: ~/layouts/MainLayout.astro
title: Composants Framework
description: Apprennez à utiliser React, Svelte, etc.. avec Astro
---

Construisez votre site Astro sans sacrifier votre framework favori. Astro supporte un large choix de frameworks comme [React](https://reactjs.org/), [Preact](https://preactjs.com/), [Svelte](https://svelte.dev/), [Vue](https://vuejs.org/), [SolidJS](https://www.solidjs.com/), [AlpineJS](https://alpinejs.dev/) et [Lit](https://lit.dev/).

## Installation d'intégrations

**Nouveau dans la version 0.25 !**

Astro peut être installé avec des intégrations pour React, Preact, Svelte, Vue, SolidJS et Lit. Une ou plusieurs de ces intégrations peuvent être installées et configurées dans votre projet.

Afin de configurer Astro pour utiliser ces frameworks, d'abord, installez son intégration et toutes ses dépendances associées :

```bash
npm install --save-dev @astrojs/react react react-dom
```

Ensuite, importez et ajoutez la fonction à votre liste d'intégrations dans `astro.config.mjs` :

```js
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import preact from '@astrojs/preact';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import solid from '@astrojs/solid-js';
import lit from '@astrojs/lit';

export default defineConfig({
	integrations: [react(), preact(),svelte(), vue(), solid() , lit()],
});
```

⚙️ Consultez le [Guide d'Intégrations](/fr/guides/integrations-guide) pour plus de détails sur l'installation et la configuration d'intégrations Astro.

## Utilisation des composants de framework

Utilisez vos composants de framework JavaScript dans vos pages Astro, layouts et composants comme des composants Astro ! Tous vos composants peuvent vivre ensemble dans `/src/components`, ou peuvent être organisés de la manière que vous le souhaitez.

Pour utiliser un composant de framework, importez-le à partir de son chemin relatif, y compris l'extension de fichier, dans le script du composant. Ensuite, utilisez le composant avec d'autres composants, des éléments HTML et des expressions similaire au JSX dans le modèle du composant.

```astro
---
import MyReactComponent from '../components/MyReactComponent.jsx';
---
<html>
  <body>
    <h1>Utilisez des composants React directement dans Astro !</h1>
    <MyReactComponent />
  </body>
</html>
```

## Hydratation des composants interactifs

Un composant de framework peut être hydraté en utilisant une directive `client:*`. C'est un attribut de composant pour définir comment votre composant devrait être **rendu** et **hydraté**. Il décrit si votre composant devrait être rendu à l'heure de la construction, et quand votre composant de JavaScript devrait être chargé par le navigateur, côté client.

La plupart des directives rendront le composant sur le serveur à la compilation. Le JS du composant sera envoyé au client en fonction de la directive spécifiée. Le composant sera hydraté quand son JS aura terminé l'importation.

```astro
---
// Exemple: hydratation des composants de framework dans le navigateur.
import InteractiveButton from '../components/InteractiveButton.jsx';
import InteractiveCounter from '../components/InteractiveCounter.jsx';
---
<!-- Le JS du composant commencera à importer au chargement de la page -->
<InteractiveButton client:load />

<!-- Le JS du composant ne sera pas envoyé au client tant que l'utilisateur
     ne défile pas vers le bas et que le composant est visible sur la page -->
<InteractiveCounter client:visible />
```

>⚠️ Tout le JS de rendu nécessaire au framework (par exemple React, Svelte) est téléchargé avec la page. Les directives `client:*` définissent seulement quand le JS du composant est importé et quand le composant est hydraté.

### Directives d'hydratation disponibles

Il y a plusieurs directives d'hydratation disponibles pour les composants de framework : `client:load`, `client:idle`, `client:visible`, `client:media={QUERY}` et `client:only=" "`.

📚 Allez voir notre [page de référence des directives](/fr/reference/directives-reference#composants-de-frameworks) pour une description complète de ces directives, et de leur utilisation.

## Mixer des frameworks

Un **composant Astro** peut importer et afficher des composants de plusieurs frameworks.

⚠️ *Notez que les composants doivent être importés avec leurs extensions de fichier.*

```astro
// src/pages/MyAstroPage.astro
---
// Exemple: Mixer des composants de framework sur la même page.
import MyReactComponent from '../components/MyReactComponent.jsx';
import MySvelteComponent from '../components/MySvelteComponent.svelte';
import MyVueComponent from '../components/MyVueComponent.vue';
---
<div>
  <MySvelteComponent />
  <MyReactComponent />
  <MyVueComponent />
</div>
```

## Imbriquer des composants de Framework

Un **composant Astro** peut aussi imbriquer des composants de plusieurs frameworks.

⚠️ *Notez que les composants de framework eux-mêmes (par exemple `.jsx`, `.svelte`) ne peuvent pas mélanger de frameworks.*

```astro
// src/pages/MyAstroPage.astro
---
import MySidebar from '../components/MySidebar.jsx';
import MyButton from '../components/MyButton.svelte';
---
<MySidebar>
  <p>Voici une sidebar avec du texte et un bouton.</p>
  <MyButton client:load />
</MySidebar>
```

Les composants de framework peuvent contenir uniquement des composants de framework. Par exemple, un composant React peut avoir un arbre de composants React enfants, mais ne peut contenir de composants Astro ou de composants Vue. Seuls les composants Astro peuvent contenir des composants enfants de framework.

Cela vous permet de construire des applications entières dans votre framework JavaScript préféré et de les afficher, via un composant parent, à une page Astro. C'est un modèle de conception pratique pour permettre aux composants liés de partager leur état ou leur contexte.

## Puis-je hydrater des composants Astro ?

Si vous essayez d'hydrater un composant Astro avec un modificateur `client:`, vous obtiendrez une erreur.

Les composants Astro sont des composants de template uniquement en HTML sans éxécution côté client. Mais, vous pouvez utiliser une balise `<script>` dans votre template de composant Astro pour envoyer du JavaScript au navigateur qui s'exécute dans le contexte global

📚 Apprenez-en plus sur [les `<scripts>` client-side dans les composants Astro](/fr/core-concepts/astro-components#scripts-côté-client)

[mdn-io]: https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API
[mdn-ric]: https://developer.mozilla.org/fr/docs/Web/API/Window/requestIdleCallback
[mdn-mm]: https://developer.mozilla.org/fr/docs/Web/API/Window/matchMedia


