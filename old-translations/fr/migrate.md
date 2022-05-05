---
layout: ~/layouts/MainLayout.astro
title: Guide de Migration
description: Comment migrer votre projet vers la dernière version de Astro.
---

Ce guide existe pour vous aider à migrer vers la dernière version de Astro et à garder votre code à jour.

Lisez le guide ci-dessous pour les points importants et les instructions pour gérer les changements de version.

## Beta 1.0 d'Astro

Le 4 avril 2022, nous avons publié la version 1.0 Beta de Astro! 🎉

**Nous ne planifions pas de changements majeurs entre la version Beta 1.0 et la version 1.0 officielle (planifié pour le 8 juin 2022).**

Si des changements majeurs doivent être effectués, nous les indiquerons dans cette section.

## Migrer vers v1.0.0-beta.0

La version `v1.0.0-beta.0` de Astro n'a pas de changements importants.

Si vous migrez de v0.25 ou plus tôt, assurez-vous de lire et de suivre le [guide de migration vers v0.26](#migrer-vers-v026) ci-dessous, qui contient les changements majeurs.

## Migrer vers v0.26
### Nouvelle API de Configuration

Notre API de configuration a été modifiée pour résoudre quelques points de confusion qui se sont accumulés durant les derniers mois. La plupart de la configuration a été déplacé ou renommé, ce qui devrais être, nous l'espérons, une mise à jour rapide pour la plupart des utilisateurs. Quelques options ont été rééditées plus que d'autres, et peuvent nécessiter quelques modifications supplémentaires.

- `.buildOptions.site` à été remplacé par `.site` (votre nom de domaine déployé) et une nouvelle option `.base` (votre sous-chemin de déploiement).
- `.markdownOptions` a été remplacé par `.markdown`, un objet semblable à `.buildOptions` avec quelques petites modifications pour simplifier la configuration du Markdown.
- `.sitemap` a été déplacé dans l'intégration [@astrojs/sitemap](https://www.npmjs.com/package/@astrojs/sitemap).

Si vous rencontrez des problèmes avec l'ancienne configuration, vous aurez surement un avertissement dans votre terminal avec des instructions pour la mettre à jour. Consultez notre [Référence de Configuration](/fr/reference/configuration-reference/) pour plus d'informations sur cette mise à jour.

Lisez l'[RFC0019](https://github.com/withastro/rfcs/blob/main/proposals/0019-config-finalization.md) pour plus d'informations sur ces changements.

### Nouvelle API Markdown

Astro v0.26 a sortie une nouvelle API Markdown pour vos contenus. Cela comprend trois changements majeurs pour l'utilisateur :
- Vous pouvez maintenant `import`/`import()` directement depuis le contenu du Markdown avec l'import ESM.
- Une nouvelle API `Astro.glob()`, pour faciliter les importations globales (notamment pour Markdown).
- **Changement important :** `Astro.fetchContent()` a été supprimé et remplacé par `Astro.glob()`
- **Changement important :** Les objets Markdown ont une interface toute neuve.

```diff
// v0.25
- let allPosts = Astro.fetchContent('./posts/*.md');
// v0.26+
+ let allPosts = await Astro.glob('./posts/*.md');
```

Quand vous migrez, soyez prudent sur l'interface de nouveaux objets Markdown. Le frontmatter, par exemple, a été déplacé vers la propriété `.frontmatter`, donc les références comme `post.title` devraient êtres changés en `post.frontmatter.title`.

Cela devrait résoudre quelques problèmes pour les utilisateurs du Markdown, y compris quelques améliorations de performance pour les sites plus volumineux.

Lisez l'[RFC0017](https://github.com/withastro/rfcs/blob/main/proposals/0017-markdown-content-redesign.md) pour plus d'informations sur ces changements.

### Nouveau comportement par défaut des scripts

Les balises `<script>` dans les composants Astro sont maintenant compilées, assemblées et optimisées par défaut. Cela complète un changement a long terme pour rendre la syntaxe de nos composants Astro plus cohérente, similaire au comportement optimisé par défaut des balises `<style>` actuel.

Cela inclut quelques changements à prendre en compte :

- **Important :** `<script hoist>` est le nouveau comportement par défaut des `<script>`. L'attribut `hoist` a été supprimé.
- Nouvelle directive `<script is:inline>`, pour revenir à l'ancien comportement par défaut d'une balise `<script>` (non compilée, non assemblée, inchangée par Astro).
- Nouvelle directive `<style is:inline>`, pour laisser une balise `<style>` dans le template de la page (comme le comportement par défaut des `<script>`).
- Nouvelle directive `<style is:global>` pour remplacer `<style global>` dans une prochaine version.


```diff
// v0.25
- <script hoist>
// v0.26+
+ <script>
```

Lisez l'[RFC0016](https://github.com/withastro/rfcs/blob/main/proposals/0016-style-script-defaults.md) pour plus d'informations sur ces changements.

### Nouvelle API Astro.request


`Astro.request` a été changé de notre objet personnalisé vers un objet standard `Request`. Cela est une partie d'un projet pour utiliser plus d'APIs web standardisés, notamment lorsque l'SSR est concerné.

Cela inclut quelques changements à prendre en compte :

- Changement d'`Astro.request` pour devenir un objet [Request](https://developer.mozilla.org/fr/docs/Web/API/Request).
- Déplacement de `Astro.request.params` vers `Astro.params`.
- Déplacement de `Astro.request.canonicalURL` vers `Astro.canonicalURL`.

Lisez l'[RFC0018](https://github.com/withastro/rfcs/blob/main/proposals/0018-astro-request.md) pour plus d'informations sur ces changements.


### Autres changements

- Amélioration de l'API `Astro.slots` pour permettre de passer des arguments à des slots basés sur des fonctions. Cela permet de créer des composants plus ergonomiques qui acceptent une fonction callback comme enfant.
- Mise à jour du retour console de l'ILC, surtout autour des messages d'erreurs.
- Mise à jour du package `@astrojs/compiler` pour corriger quelques bugs liés à l'utilisation d'expressions régulières dans le *front-matter*

## Migrer vers v0.25

### Les integrations Astro

La configurations des `renderers` a été remplacée par un nouveau système d'intégrations officielles ! Cela permet de débloquer de nouvelles fonctionnalités intéressantes pour Astro. Vous pouvez lire notre [Guide d'Utilisation des Integrations](/fr/guides/integrations-guide) pour plus d'informations sur comment utiliser ce nouveau système.

Les integrations remplacent notre concept de `renderers`, et viennent aussi avec des changements et des nouvelles options par défaut pour les utilisateurs actuels. Ces changements sont décrits ci-dessous.

#### Suppression : Support intégré des Framework

Précédemment, React, Preact, Svelte, et Vue étaient tous inclus par défaut avec Astro. Depuis la version 0.25.0, Astro n'inclue plus de `renderers` intégrés. Si vous n'avez pas déjà une configuration d'entrée `renderers` définie pour votre projet, vous devrez maintenant installer ces Frameworks par vous-même.

Lisez notre [guide pas à pas](/fr/guides/integrations-guide) pour apprendre comment ajouter une nouvelle integration Astro pour le(s) Framework(s) que vous utilisez actuellement.
#### `renderers` obsolètes

> *Lisez cette section si vous avez des `renderers` personnalisés définis dans votre fichier de configuration.*

Le nouveau système d'intégrations remplace le précédent système de `renderers`, incluant les packages `@astrojs/renderer-*` publiés sur npm. Dans cet optique, `@astrojs/renderer-react` devient `@astrojs/react`, `@astrojs/renderer-vue` devient `@astrojs/vue`, et ainsi de suite.

**Pour effectuer la migration :** mettez à jour Astro à la version `v0.25.0` et ensuite exécutez `astro dev` ou `astro build` avec votre ancien fichier de configuration contenant la configuration obsolète `renderers`. Vous verrez immédiatement une notice indiquant les changements que vous devez faire dans le fichier `astro.config.mjs` en fonction de votre configuration actuelle. Vous pouvez également mettre à jour vos packages vous-même, en utilisant la table ci-dessous.

Pour un guide plus détaillé, lisez notre [guide pas à pas](/fr/guides/integrations-guide) pour apprendre comment remplacer des `renderers` existants avec une nouvelle integration de Framework Astro.

```diff
# Installez vos nouvelles intégrations et Frameworks :
# (Lisez le guide complet : https://docs.astro.build/fr/guides/integrations-guide)
+ npm install @astrojs/lit lit
+ npm install @astrojs/react react react-dom
```
```diff
# Ensuite, mettez à jour votre fichier `astro.config.js` :
# (Lisez le guide complet : https://docs.astro.build/fr/guides/integrations-guide)
+ import lit from '@astrojs/lit';
+ import react from '@astrojs/react';

export default {
-   renderers: ['@astrojs/renderer-lit', '@astrojs/renderer-react'],
+   integrations: [lit(), react()],
}
```


| `renderers` obsolètes sur npm | Integrations `v0.25+` sur npm |
| ----------------------------- | ----------------------------- |
| @astrojs/renderer-react       | @astrojs/react                |
| @astrojs/renderer-preact      | @astrojs/preact               |
| @astrojs/renderer-solid       | @astrojs/solid-js             |
| @astrojs/renderer-vue         | @astrojs/vue                  |
| @astrojs/renderer-svelte      | @astrojs/svelte               |

#### Gestion des dépendances partagées

> *Lisez cette section si : vous êtes sous Node 14 **ou** si vous utilisez un gestionnaire de package autre que npm.*

En opposition aux anciens `renderers`, les intégrations ne contiennent plus les Frameworks lui-mêmes ("react", "svelte", "vue", etc.) comme des dépendances directes. Vous devrez maintenant installer vos packages de Framework *en plus* de vos intégrations.

```diff
# Exemple : Installation des intégrations et des Frameworks ensemble
- npm install @astrojs/react
+ npm install @astrojs/react react react-dom
```

Si vous voyez un message "Cannot find package 'react'" (ou similaire) lorsque vous lancez Astro, cela signifie que vous devez installer ce package dans votre projet. Lisez notre [note sur les dépendances partagées](/fr/guides/integrations-guide#gérer-les-dépendances-dintégration) dans le guide d'intégrations pour plus d'informations.

Si vous utilisez `npm` et Node 16 ou supérieur, cela peut être automatiquement géré par `npm`, car la dernière version de `npm` (version 7 et plus) installe automatiquement les dépendances partagées comme celles-ci. Dans ce cas, installer un Framework comme "react" dans votre projet est une étape optionnelle mais toujours recommandée.

### Mise à jour : Coloration syntaxique

Nous adorons trouver des valeurs par défaut qui "fonctionnent simplement" tout en étant prêtes à l'emploi. En conséquence, nous avons décidé de faire de [Shiki](https://github.com/shikijs/shiki) notre nouveau colorateur syntaxique par défaut. Cela est pré-configuré avec le thème `github-dark`, fournissant une coloration syntaxique sans classes CSS, fiches de styles ou JS coté client.

Jetez un coup d'œil à notre nouvelle [documentation sur la coloration syntaxique](/fr/guides/markdown-content/#coloration-syntaxique) pour plus de détails. **Si vous préférez garder Prism comme votre colorateur syntaxique,** [configurez l'option `syntaxHighlight` à `'prism'`](/fr/guides/markdown-content/#configuration-de-shiki).

#### Le composant `<Prism />` a une nouvelle maison

Dans l'optique de garder le coeur d'Astro aussi minime que possible, nous avons déplacé le composant `Prism` hors de `astro/components` dans le package `@astrojs/prism`. Vous pouvez maintenant importer ce composant de `@astrojs/prism` comme suit :

```astro
---
import { Prism } from '@astrojs/prism';
---
```

Vu que le package `@astrojs/prism` est toujours intégré avec le coeur d'Astro, vous n'aurez pas besoin d'installer quoi que ce soit de nouveau, ni d'ajouter Prism comme une intégration ! Cependant, notez que nous nous engageons à extraire `@astrojs/prism` (et la coloration syntaxique en général) dans un package installable séparément. Voir [l'API de référence du composant `<Prism />`](/fr/reference/api-reference#prism-) pour plus de détails.

### Mise à jour du parser CSS

Notre parser CSS interne a été mis à jour, et contient un meilleur support pour la syntaxe CSS avancée, comme les requêtes `@container`. Cela devrait être un changement invisible pour la plupart des utilisateurs, mais pour les utilisateurs avancés, ils pourraient bénéficier des nouvelles fonctionnalités CSS.
## Migrer vers v0.24

> La nouvelle stratégie de build maintenant utilisée est par défaut dans la version 0.24. Si vous rencontrez un problème, vous pouvez continuer à utiliser la stratégie de build antérieure en utilisant l'option `--legacy-build`. S'il vous plait, [ouvrez une issue GitHub](https://github.com/withastro/astro/issues/new/choose) pour que nous puissions résoudre les problèmes avec la nouvelle stratégie de build.

0.24 ajoute une nouvelle stratégie de build statique qui modifie le comportement de certaines fonctionnalités. Dans les versions précédentes de Astro, cela était possible de l'activer avec l'option `--experimental-static-build`.

Pour migrer vers cette nouvelle méthode de build, vous devez prendre connaissance des changements suivants qui vont être nécessaires pour utiliser ce nouveau moteur de rendu. Vous pouvez faire ces changements à votre code à tout moment pour que vous soyez en avance sur les changements.

### Obsolète : Astro.resolve()

`Astro.resolve()` vous permet de récupérer des URL de ressources qui vous seront utiles dans le navigateur. Cela a été utilisé le plus souvent avec les balises `<link>` et `<img>` pour charger des fichiers CSS et images en fonction des besoin. Malheureusement, cela ne fonctionnera plus car Astro génère maintenant les ressources à *l'heure de build* plutôt qu'à *l'heure de rendu*. Vous aurez besoin de mettre à jour vos références vers l'une des options suivantes qui seront disponibles dans le futur :

#### Comment récupérer des fichiers CSS

**2. Importation ESM (Recommandé)**

**Exemple :** `import './style.css';`
**Quand l'utiliser :** Si votre fichier CSS est situé dans le répertoire `src/`, et que vous souhaitez des fonctions de build et d'optimisation CSS automatiques.

Utilisez une importation ESM pour ajouter du CSS à la page. Astro détecte ces imports CSS et génère, optimise, et ajoute automatiquement les CSS à la page. C'est le moyen le plus facile de se séparer d'`Astro.resolve()` tandis que vous gardez les fonctions de build/bundling qu'Astro fournit.

```astro
---
// Exemple : Astro incluera et optimisera automatiquement ce CSS pour vous
import './style.css';
---
<html><!-- Votre page ici --></html>
```

Importer des fichiers CSS devrait fonctionner n'importe où les importations ESM soient supportées, incluant :
- Fichiers JavaScript
- Fichiers TypeScript
- Le Front-matter d'un composant Astro
- Les composants non-Astro comme React, Svelte, et d'autres

Quand un fichier CSS est importé avec cette méthode, tous les `@import` sont également résolus et inclus dans le fichier CSS importé. Toutes les références `url()` sont également résolues par rapport à la source du fichier, et toutes les ressources référencées par `url()` seront inclus dans le build final.


**2. Chemin d'URL absolu**

**Exemple :** `<link href="/style.css">`
**Quand l'utiliser :** Si votre fichier CSS est situé dans `public/`, et que vous préférez créer votre élément `link` HTML vous-même.

Vous pouvez référencer n'importe quel fichier dans le répertoire `public/` par un chemin d'URL absolu dans votre Template de composant. C'est une bonne option si vous souhaitez contrôler la balise `<link>` de la page par vous-même. Cependant, cette approche évite également le traitement, la compression et l'optimisation des CSS qui sont fournis par Astro lorsque vous utilisez la méthode d'import décrit ci-dessus.

Nous recommandons d'utiliser l'approche d'`import` par rapport à l'approche absolue, car elle fournit les meilleures performances CSS et les meilleures fonctionnalités par défaut.

#### Comment récupérer des fichiers JavaScript


**1. Chemin d'URL absolu**

**Exemple :** `<script src="/some-external-script.js" />`
**Quand l'utiliser :** Si votre fichier JavaScript est situé dans `public/`.

Vous pouvez référencer n'importe quel fichier dans le répertoire `public/` par un chemin d'URL absolu dans votre Template de composant. C'est une bonne option par défaut pour les scripts externes, car elle vous permet de contrôler la balise `<script>` de la page par vous-même.

Notez que cette approche évite le traitement, la compression et l'optimisation du JavaScript qui sont fournis par Astro lorsque vous utilisez la méthode d'import décrit ci-dessous. Cependant, cela peut être préférable pour tous les scripts externes qui ont déjà été traités et minifiés séparément de Astro. Si votre script a été téléchargé depuis une source externe, alors cette méthode est probablement préférable.

**2. Importation ESM via `<script hoist>`**

**Exemple :** `<script hoist>import './some-external-script.js';</script>`
**Quand l'utiliser :** Si votre script externe est situé dans `src/` _et_ il supporte l'importation par module ESM.

Utilisez une importation ESM à l'interieur un élément `<script hoist>` dans votre Template de composant, et Astro incluera le fichier JavaScript dans votre build final. Astro détecte ces imports JavaScript côté client et les ajoute automatiquement à la page dans le build final. C'est la façon la plus facile de se passer de `Astro.resolve()` tout en gardant le build/bundling automatique que Astro fournit.

```astro
<script hoist>
  import './some-external-script.js';
</script>
```

Notez que Astro va bundler ce script externe avec le reste de votre JavaScript côté client, et le charger dans le contexte de script `type="module"`. Certains fichiers JavaScript peuvent ne pas être écrits pour supporter le contexte `module`, dans ce cas ils devrons être mis à jour pour pouvoir utiliser cette méthode.

#### Comment récupérer des images et autres ressources

**1. Chemin d'URL absolu (Recommandé)**

**Exemple :** `<img src="/penguin.png">`
**Quand l'utiliser :** Si votre ressource est située dans `public/`.

Si vous placez vos images dans `public/`, vous pouvez référencer les images par un chemin d'URL absolu directement dans vos Templates de composants. C'est la façon la plus simple de référencer une ressource que vous pouvez utiliser dès aujourd'hui, cette méthode est recommandé pour la plupart des utilisateurs qui sont en train de commencer à utiliser Astro.

**2. Importation ESM**

**Exemple :** `import imgUrl from './penguin.png'`
**Quand l'utiliser :** Si votre ressource est située dans le répertoire `src/` et que vous souhaitez des fonctionnalités d'optimisation automatique comme le hachage des noms de fichiers.

Cette fonctionnalité fonctionne à l'intérieur de n'importe quel JavaScript ou composant Astro, et renvoie une URL résolue vers l'image finale. Une fois que vous avez l'URL résolue, vous pouvez l'utiliser n'importe où dans votre Template de composant.

```astro
---
// Exemple : Astro incluera cette image dans votre build final
import imgUrl from './penguin.png';
---
<img src={imgUrl} />
```

Similaire à la façon dont Astro gère les CSS, l'importation ESM permet à Astro de faire des optimisations simples pour vous automatiquement. Par exemple, n'importe quelle ressource située dans `src/` qui est importée via une importation ESM (ex: `import imgUrl from './penguin.png'`) aura son nom de fichier haché automatiquement. Cela peut vous permettre de mieux mettre en cache le fichier sur le serveur, améliorant la performance de l'utilisateur. Dans le futur, Astro pourra ajouter d'autres optimisations comme cela.

**Astuce :** Si vous n'aimez pas les imports ESM statiques, Astro supporte également des imports ESM dynamiques. Nous recommandons cette option uniquement si vous préférez cette syntaxe : `<img src={(await import('./penguin.png')).default} />`.

### Obsolète : traitement par défaut des balises `<script>`

Précédemment, toutes les balises `<script>` étaient lues, traitées automatiquement et compressées. Cette fonctionnalité n'est plus la valeur par défaut. Depuis la version 0.24, vous devez activer manuellement le traitement des balises `<script>` via l'attribut `hoist`. Le `type="module"` est également requis pour les modules hoistés.

```astro
<script>
  // Sera rendu exactement comme il est écrit !
  // Les imports ESM ne seront pas résolus par rapport au fichier.
</script>
<script type="module" hoist>
  // Traité ! Compressé ! Les importations ESM fonctionnent, même pour les packages npm.
</script>
```


## Migrer vers v0.23

### L'erreur `"sass" not found`

```
Preprocessor dependency "sass" not found. Did you install it?
```

Dans notre quête de réduire la taille d'installation sur npm, nous avons déplacé [Sass](https://sass-lang.com/) hors du projet, dans une dépendance optionnelle. Si vous utilisez Sass dans votre projet, vous devez vérifier que avez bien fait la commande `npm install sass --save-dev` pour la sauvegarder comme une dépendance.

### Obsolète : HTML non échappé

Dans la version 0.23 et plus, le contenu HTML non échappé dans les expressions est maintenant obsolète.
Dans les prochaines versions, le contenu dans les expressions sera échappé afin de protéger contre les injections HTML non désirées.

```diff
- <h1>{title}</h1> <!-- <h1>Hello <strong>World</strong></h1> -->
+ <h1>{title}</h1> <!-- <h1>Hello &lt;strong&gt;World&lt;/strong&gt;</h1> -->
```

Pour continuer à injecter du HTML non échappé, vous pouvez maintenant utiliser `set:html`.

```diff
- <h1>{title}</h1>
+ <h1 set:html={title} />
```

Pour éviter un élément conteneur, `set:html` peut fonctionner avec les balises `<Fragment>`.

```diff
- <h1>{title}!</h1>
+ <h1><Fragment set:html={title}>!</h1>
```

Vous pouvez également protéger contre les injections HTML non désirées avec `set:text`.

```astro
<h1 set:text={title} /> <!-- <h1>Hello &lt;strong&gt;World&lt;/strong&gt;</h1> -->
```

## Migrer vers v0.21

### Vite

À partir de la version 0.21, Astro est maintenant construit avec [Vite].
Par extension, les configurations écrites dans `snowpack.config.mjs` devraient être déplacées dans `astro.config.mjs`.

```js
// @ts-check

/** @type {import('astro').AstroUserConfig} */
export default {
  renderers: [],
  vite: {
    plugins: [],
  },
};
```

Pour en savoir plus sur la configuration de Vite, veuillez visiter leur [guide de configuration](https://vitejs.dev/config/).

#### Plugins Vite

Dans la version 0.21 et plus, les plugins Vite peuvent être configurés dans `astro.config.mjs`.

```js
import { imagetools } from 'vite-imagetools';

export default {
  vite: {
    plugins: [imagetools()],
  },
};
```

Pour en savoir plus sur les plugins Vite, veuillez visiter leur [guide](https://vitejs.dev/guide/using-plugins.html).

#### Changements vers Vite pour les `Renderers`

Dans la version 0.21 et plus, les plugins devraient maintenant utiliser `viteConfig()`.

```diff
// renderer-svelte/index.js
+ import { svelte } from '@sveltejs/vite-plugin-svelte';

export default {
  name: '@astrojs/renderer-svelte',
  client: './client.js',
  server: './server.js',
-  snowpackPlugin: '@snowpack/plugin-svelte',
-  snowpackPluginOptions: { compilerOptions: { hydratable: true } },
+  viteConfig() {
+    return {
+      optimizeDeps: {
+        include: ['@astrojs/renderer-svelte/client.js', 'svelte', 'svelte/internal'],
+        exclude: ['@astrojs/renderer-svelte/server.js'],
+      },
+      plugins: [
+        svelte({
+          emitCss: true,
+          compilerOptions: { hydratable: true },
+        }),
+      ],
+    };
+  },
}
```

Pour en savoir plus sur les plugins Vite, veuillez visiter leur [guide](https://vitejs.dev/guide/using-plugins.html).

> Dans les versions précédentes, ces configurations étaient configurées avec `snowpackPlugin` ou `snowpackPluginOptions`.


### Alias de chemins

Dans la version 0.21 et plus, les alias d'importation peuvent être ajoutés depuis `tsconfig.json` ou `jsconfig.json`.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["src/components/*"]
    }
  }
}
```

_Ces alias sont intégrés automatiquement dans [VSCode](https://code.visualstudio.com/docs/languages/jsconfig) et d'autres éditeurs._

### Extensions de fichiers dans les imports

Dans la version 0.21 et plus, les fichiers doivent être référencés par leur extension exacte, exactement comme ils sonts sur le disque. Dans cet exemple, `Div.tsx` devra être référencé comme `Div.tsx`, pas `Div.jsx`.

```diff
- import Div from './Div.jsx' // Astro v0.20
+ import Div from './Div.tsx' // Astro v0.21
```

Ce même changement s'applique à un fichier compilé en css comme `Div.scss`:

```diff
- <link rel="stylesheet" href={Astro.resolve('./Div.css')}>
+ <link rel="stylesheet" href={Astro.resolve('./Div.scss')}>
```

### Supprimé: Composants dans le Front-matter

Précédemment, vous pouviez créer des mini-Composants Astro dans le Front-matter de Astro, en utilisant la syntaxe JSX au lieu de la syntaxe de composant Astro. C'était toujours un peu comme un hack, mais dans le nouveau compilateur, nous devient impossible de le supporter. Nous espérons réintroduire cette fonctionnalité dans une future version de Astro en utilisant une autre API non-JSX.

Pour migrer vers la version 0.21 et plus, veuillez convertir tous les composants JSX Astro (ce qui signifie tous les composants Astro créés dans le Front-matter d'un autre composant) en des composants dédiés.


### Changements de style

#### Autoprefixer

Autoprefixer n'est plus utilisé par défaut. Pour l'activer:

1. Installer la dernière version (`npm i autoprefixer`)
2. Créez un fichier `postcss.config.cjs` à la racine de votre projet avec :
   ```js
   module.exports = {
     plugins: {
       autoprefixer: {},
     },
   };
   ```

#### Tailwind CSS

Veuillez vous assurer que PostCSS est installé. Cela était optionnel dans les versions précédentes, mais est requis maintenant :

1. Installer la dernière version de postcss (`npm i -D postcss`)
2. Créez un fichier `postcss.config.cjs` à la racine de votre projet avec :
   ```js
   module.exports = {
     plugins: {
       tailwindcss: {},
     },
   };
   ```
   Pour plus d'information, lisez la [documentation de Tailwind CSS](https://tailwindcss.com/docs/installation#add-tailwind-as-a-post-css-plugin)


### Problèmes connus

#### Priorités des imports

Dans la version 0.21 et plus, un bug a été introduit qui exige que les imports dans les composants soient au début de votre Front-matter.

```astro
---
import Component from '../components/Component.astro'
const whereShouldIPutMyImports = "on top!"
---
```


[vite]: https://vitejs.dev
