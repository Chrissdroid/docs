---
layout: ~/layouts/MainLayout.astro
title: Markdown
description: Utiliser Markdown avec Astro
---

Le Markdown est utilisé généralement pour écrire des articles de blog et de documentation. Astro inclut un support pour Markdown avec quelques fonctionnalités supplémentaires, telles que le support des expressions JavaScript et les composants Astro dans votre Markdown.

## Pages Markdown

Astro traite n'importe quel fichier `.md` à l'intérieur du répertoire `/src/pages` comme une page. Placer un fichier dans ce répertoire ou dans un sous-répertoire, construira automatiquement une route de page en utilisant le nom du fichier.

📚 Lire plus à propos de la [routage basé sur les fichiers](/fr/core-concepts/routing).

### Exemple de Base

La façon la plus simple de commencer à utiliser Markdown dans Astro est de créer une route vers une page d'accueil `src/pages/index.md` dans votre projet. Copiez le modèle de base ci-dessous dans votre projet, puis consultez le HTML généré à la route de page d'accueil de votre projet. Généralement, cela se fait à [http://localhost:3000](http://localhost:3000/).

```markdown
---
# Example: src/pages/index.md
title: Hello, World
---
# Salutation humble voyageur !

Ceci est votre première page Markdown. Il est probablement pas très joli, mais
Markdown does support **bold** and *italics.*
le Markdown supporte le **gras** et l'*italique*.

Pour en savoir plus sur l'ajout d'un Layout à votre page, lisez la section suivante sur **Layouts Markdown**.
```

### Layouts Markdown

Les pages Markdown ont une propriété spéciale `layout` pour définir le chemin relatif vers un composant [layout Astro](/fr/core-concepts/layouts). Ce composant va entourer votre contenu Markdown, fournissant une coquille autour de votre page et tous les autres éléments insérés y compris les Templates de page.

```markdown
---
layout: ../layouts/BaseLayout.astro
---
```

Un Layout typique pour les pages Markdown comprend :

1. la propriété `content` pour accéder aux données de l'en-tête de la page Markdown.
2. un [`<slot />` par défaut](/fr/guides/slots) pour indiquer où le contenu Markdown de la page devrait être affiché.

```astro
---
// src/layouts/BaseLayout.astro
// 1. La propriété `content` donne accès aux données de l'en-tête de la page Markdown
const { content } = Astro.props;
---
<html>
  <head>
    <!-- Ajoutez d'autres éléments Head ici, comme des styles et des balises meta. -->
    <title>{content.title}</title>
  </head>
  <body>
    <!-- Ajoutez d'autres composants UI ici, comme des navigations et pieds de page communs. -->
    <h1>{content.title} par {content.author}</h1>
    <!-- 2. Le HTML généré sera passé dans le slot par défaut. -->
    <slot />
    <p>Écris le : {content.date}</p>
  </body>
</html>
```

La propriété `content` contient également une propriété `astro` avec des métadonnées supplémentaires sur la page tels que le Markdown complet `source` et un objet `headers`.

Un exemple d'`content` d'article de blog pourrait ressembler à ça :

```json
{
  /** En-tête d'un article de blog
  "title": "Version 0.18 d'Astro",
  "date": "Mardi 27 Juillet 2021",
  "author": "Matthew Phillips",
  "description": "Astro 0.18 est notre plus grosse version depuis son lancement.",
  "draft": false,
  "keywords": ["astro", "release", "announcement"]
  **/
  "astro": {
    "headers": [
      {
        "depth": 1,
        "text": "Version 0.18 d'Astro",
        "slug": "version-018-dAstro"
      },
      {
        "depth": 2,
        "text": "Hydratation Partielle Responsive",
        "slug": "hydratation-partielle-responsive"
      }
      /* ... */
    ],
    "source": "# Version 0.18 d'Astro\\nIl y a un peu plus d'un mois, la première bêta publique [...]"
  },
  "url": ""
}
```

> 💡 `astro` et `url` sont les seules propriétés garanties par Astro dans la propriété `content`. Le reste de l'objet est défini par vos variables d'en-tête.

### L'en-tête comme propriétés

N'importe quel composant Astro (pas seulement les Layouts!) peut recevoir les valeurs définies dans votre en-tête Markdown comme propriétés. Vous pouvez spécifier plusieurs types de données en utilisant les en-têtes Markdown sous le format YAML, et capturer également des informations plus complètes à partir de chaque article de blog pour l'utiliser sur votre site Astro.

Accédez à ces valeurs dans n'importe quel fichier `.astro` comme vous le feriez dans un layout, comme décrit ci-dessus.

### Brouillons Markdown

`draft: true` est une valeur optionnelle dans l'en-tête Markdown qui indique qu'une page ou un article Markdown est "non publié". Par défaut, cette page sera exclue du site de construction.

Les pages Markdown sans la propriété `draft` ou les pages avec `draft: false` ne sont pas affectées et seront incluses dans la construction finale.

```markdown
src/pages/post/blog-post.md
---
layout: ../../layouts/BaseLayout.astro
title: Mon article de blog
draft: true
---

Ceci est mon article en cours.

Cette page ne sera pas construite pour cet article.

Pour construire et publier cet article :
- mettez à jour l'en-tête Markdown en `draft: false`
- supprimez complètement la propriété `draft`.
```

> ⚠️ Bien que `draft: true` empêche la construction d'une page sur votre site à cette adresse de page, `Astro.fetchContent()` actuellement retourne **tous vos fichiers Markdown**.

Pour exclure les données (par exemple, le titre, le lien, la description) d'un brouillon de post de ne pas être inclus dans l'archive de post ou la liste des post les plus récents, assurez-vous que votre fonction `Astro.fetchContent()` a possède également un **filtre pour exclure tous les brouillons**.

⚙️ Pour activer la compilation de pages brouillons :

Ajoutez `drafts: true` à `buildOptions` dans `astro.config.mjs`

```js
//astro.config.mjs

export default /** @type {import('astro').AstroUserConfig} */ ({
  < ... >
  buildOptions: {
    site: 'https://example.com/',
    drafts: true,
  },

});
```

💡 Vous pouvez aussi passer le flag `--drafts` lors de l'exécution de `astro build` pour construire les pages brouillons !

## Créez avec Markdown

En plus de supporter la syntaxe Markdown standard, Astro également étend celle-ci pour rendre votre contenu encore plus expressif. Voici quelques fonctionnalités Markdown qui n'existent que dans Astro.

### Utilisez des variables dans Markdown

Les variables d'en-tête peuvent être utilisées directement dans votre Markdown comme propriétés de l'objet `frontmatter`.

```markdown
---
author: Léon
age: 42
---
# À propos de l'auteur

{frontmatter.author} à {frontmatter.age}ans et vit au Canada à Toronto.
```

### Utilisez des composants dans Markdown

Vous pouvez importer des composants dans votre fichier Markdown avec `setup` et utiliser les uns avec le reste du contenu. L'objet `frontmatter` est également disponible pour les composants importés.

```markdown
---
layout: ../layouts/BaseLayout.astro
setup: |
  import Author from '../../components/Author.astro'
  import Biography from '../components/Biography.jsx'
author: Leon
---
<Author name={frontmatter.author}/>
<Biography client:visible>
  {frontmatter.author} vit au Canada à Toronto et aimes la photographie.
</Biography>
```

## Composant Markdown

Astro a un composant dédié pour permettre d'afficher du Markdown complilé dans les fichiers `.astro`.

Vous pouvez importer le [composant Markdown d'Astro](/fr/reference/builtin-components#markdown) dans votre script de composant et l'utiliser avec la balise `<Markdown> </Markdown>`.

````astro
---
import { Markdown } from 'astro/components';
import Layout from '../layouts/Layout.astro';

const expressions = 'Lorem ipsum';
---
<Layout>
  <Markdown>
    # Hello world!

    **Tout** supporté dans un fichier `.md` est aussi supporté ici !

    Il n'y a aucun coût de temps de démarrage.

    En plus, Astro supporte :
    - Les {expressions} Astro
    - L'indentation automatique normalisée
    - L'échappement automatique des expressions dans les blocs de code

    ```js
      // Ce contenu n'est pas transformé !
      const object = { someOtherValue };
    ```

    - Support de composants riches comme tous les fichiers `.astro` !
    - Support de Markdown récursif (les enfants des composants sont également traités comme Markdown)
  </Markdown>
</Layout>
````

### Markdown à distance

Si vous avez du Markdown venant d'une source distante, vous pouvez l'envoyer directement au composant Markdown via l'attribut `content`.

```astro
---
import { Markdown } from 'astro/components';

const content = await fetch('https://raw.githubusercontent.com/withastro/docs/main/README.md').then(res => res.text());
---
<Layout>
  <Markdown content={content} />
</Layout>
```

### Markdown imbriqué

Les composants `<Markdown>` peuvent être imbriqués.

```astro
---
import { Markdown } from 'astro/components';

const content = await fetch('https://raw.githubusercontent.com/withastro/docs/main/README.md').then(res => res.text());
---

<Layout>
  <Markdown>
    ## Exemple Markdown

    Ici, nous avons du __Markdown__. Nous pouvons aussi afficher du contenu distant.

    <Markdown content={content} />
  </Markdown>
</Layout>
```

⚠️ Utilisez le composant `Markdown` pour afficher du Markdown à distance peux vous rendre sensible à une attaque [cross-site scripting (XSS)](https://fr.wikipedia.org/wiki/Cross-site_scripting). Si vous affichez du contenu non sécurisé, assurez-vous de le _sanitizer_ **avant** de l'afficher.

## Analyseurs Markdown

Astro a un support Markdown grâce à [remark](https://remark.js.org/).

Le paquet `@astrojs/markdown-remark` est inclus par défaut avec les plugins suivants activés :

- [GitHub-flavored Markdown](https://github.com/remarkjs/remark-gfm)
- [remark-smartypants](https://github.com/silvenon/remark-smartypants)
- [rehype-slug](https://github.com/rehypejs/rehype-slug)


> ⚙️ Vous pouvez inclure un *parser Markdown* personnalisé dans `astro.config.mjs` en fournissant une fonction qui suit le type `MarkdownParser` déclaré dans [ce fichier](https://github.com/withastro/astro/blob/main/packages/astro/src/@types/astro.ts).

```js
// astro.config.mjs
export default {
  markdownOptions: {
    render: [
      'parser-name', // ou import('parser-name') ou alors (contents) => {...}
      {
        // options
      },
    ],
  },
};
```

### Plugins Remark et Rehype

Astro supporte des plugins Markdown de la part des autres développeurs. Vous pouvez les spécifier dans `astro.config.mjs`.

> **Note:** Activer des plugins customisés pour `remarkPlugins` ou `rehypePlugins` supprime le support des plugins précédemment mentionnés. Vous devez explicitement ajouter ces plugins à votre fichier `astro.config.mjs`, si vous le souhaitez.

### Ajouter un plugin Markdown dans Astro

1. Installez la dépendance npm dans votre projet.

2. Mettez à jour `remarkPlugins` ou `rehypePlugins` dans les options `@astrojs/markdown-remark` :

```js
// astro.config.mjs
export default {
  markdownOptions: {
    render: [
      '@astrojs/markdown-remark',
      {
        remarkPlugins: [
          // Ajoutez un plugin Remark que vous souhaitez activer pour votre projet.
          // Si vous avez besoin d'options pour le plugin, vous pouvez utiliser un tableau et mettre les options en tant que deuxième élément.
          // ['remark-autolink-headings', { behavior: 'prepend'}],
        ],
        rehypePlugins: [
          // Ajoutez un plugin Rehype que vous souhaitez activer pour votre projet.
          // Si vous avez besoin d'options pour le plugin, vous pouvez utiliser un tableau et mettre les options en tant que deuxième élément.
          // 'rehype-slug',
          // ['rehype-autolink-headings', { behavior: 'prepend'}],
        ],
      },
    ],
  },
};
```

Vous pouvez aussi fournir des noms de plugins pour les importer :

```js
// astro.config.mjs
import autolinkHeadings from 'remark-autolink-headings';

export default {
  markdownOptions: {
    render: [
      '@astrojs/markdown-remark',
      {
        remarkPlugins: [[autolinkHeadings, { behavior: 'prepend' }]],
      },
    ],
  },
};
```

### Coloration syntaxique

Astro supporte nativement [Shiki](https://shiki.matsu.io/) et [Prism](https://prismjs.com/). Cela permet de colorier instantanément la syntaxe suivante :
- toutes les fenêtres de code (\`\`\`) utilisées dans un fichier Markdown (`.md`) et le [composant natif `<Markdown />`](#composant-markdown).
- le contenu dans le [composant natif `<Code />`](/fr/reference/builtin-components/#code-) (géré par Shiki) ou le [composant `<Prism />`](/fr/reference/builtin-components/#prism-) (géré par Prism).

Shiki est activé par défaut, préconfiguré avec le thème `github-dark`. Le code compilé sera limité à des `styles` en ligne sans aucune classe CSS supplémentaire, de feuilles de styles, ou de JS client.

Si vous choisissez d'utiliser Prism, nous appliquerons les classes CSS de Prism à la place. Notez que **vous avez besoin de vos propres feuilles de styles CSS** pour que la coloration syntaxique apparaisse ! Consultez la [section de configuration de Prism](#configuration-de-prism) pour plus de détails.

#### Choisissez un colorateur syntaxique

Shiki est notre colorateur syntaxique par défaut. Si vous souhaitez utiliser `'prism'` ou désactiver la coloration syntaxique entièrement, vous pouvez utiliser l'objet de configuration `markdown` :

```js
// astro.config.mjs
export default {
  markdown: {
    // Peux aussi être 'shiki' (par défaut), 'prism' ou false pour désactiver la coloration
    syntaxHighlight: 'prism',
  }
};
```

#### Configuration de Shiki

Lorsque vous utilisez Shiki, vous configurez toutes les options via l'objet de configuration `shikiConfig` comme suit :

```js
// astro.config.mjs
export default {
  markdownOptions: {
    render: [
      '@astrojs/markdown-remark',
      {
        shikiConfig: {
          // Choisir parmi les thèmes de Shiki
          // https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
          theme: 'dracula',
          // Spécifier manuellement les langues
          // Note : Shiki a de nombreuses langues pré-intégrées, y compris .astro !
          langs: ['astro'],
          // Activer le retour à la ligne pour éviter le défilement horizontal
          wrap: true,
        },
      },
    ],
  },
};
```

Nous suggérons jeter un oeil [dans leurs documentation de thème](https://github.com/shikijs/shiki/blob/main/docs/themes.md#loading-theme) pour explorer le chargement de thème personnalisé, les modes « light » et « dark », ou le style via des variables CSS.

#### Configuration de Prism

Lorsque vous utilisez Prism, vous aurez besoin d'ajouter une feuille de styles à votre projet pour la coloration syntaxique. Si vous êtes nouveau et préférez utiliser Prism plutôt que Shiki, nous vous suggérons :
1. [Définir `syntaxHighlight: 'prism'`](#choisissez-un-colorateur-syntaxique) depuis votre configuration `@astrojs/markdown-remark`.
2. Choisir une feuille de styles préfabriquée depuis les [Thèmes Prism](https://github.com/PrismJS/prism-themes).
3. Ajouter cette feuille de styles à [le répertoire `public/` de votre projet](/fr/core-concepts/project-structure/#public).
4. Charger cette feuille de styles dans le [`<head>` de votre page](/fr/core-concepts/astro-pages/#page-html) via une balise `<link>`.

Vous pouvez aussi visiter la [liste des langues supportées par Prism](https://prismjs.com/#supported-languages) pour les options et l'usage.
