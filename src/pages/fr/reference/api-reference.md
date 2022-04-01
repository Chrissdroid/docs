---
layout: ~/layouts/MainLayout.astro
title: Référence de l'API
---

## La globale `Astro`

La globale `Astro` est disponible dans tous les contextes à l'intérieur fichiers `.astro`. Elle a les fonctions suivantes :

### `Astro.glob()`

`Astro.glob()` est une façon de charger de nombreux fichiers locaux dans votre configuration de site statique.

```astro
---
// ./src/components/my-component.astro
const posts = await Astro.glob('../pages/post/*.md'); // retourne un tableau de posts qui vivent de ./src/pages/post/*.md
---

<div>
{posts.slice(0, 3).map((post) => (
  <article>
    <h1>{post.frontmatter.title}</h1>
    <p>{post.frontmatter.description}</p>
    <a href={post.frontmatter.url}>Read more</a>
  </article>
))}
</div>
```

`.glob()` prend un seul paramètre : une URL glob relative desquels vous souhaitez importer des fichiers locaux. Il est asynchrone et retourne un tableau d'exports des fichiers correspondants.

#### Fichiers Markdown

Les fichiers Markdown ont l'interface suivante :

```ts
export interface MarkdownInstance<T extends Record<string, any>> {
  /* Toutes les données spécifiées dans le frontmatter YAML de ce fichier */
	frontmatter: T;
  /* Le chemin d'accès "path" à ce fichier */
	file: string;
  /* Le chemin "path" de rendu de ce fichier */
	url: string | undefined;
  /* Composant Astro qui affiche le contenu de ce fichier */
	Content: AstroComponent;
  /* Fonction qui retourne un tableau d'éléments h1...h6 dans ce fichier */
	getHeaders(): Promise<{ depth: number; slug: string; text: string }[]>;
}
```

Vous pouvez également fournir un type pour la variable `frontmatter` en utilisant un type générique TypeScript.

```astro
---
interface Frontmatter {
  title: string;
  description?: string;
}
const posts = await Astro.glob<Frontmatter>('../pages/post/*.md');
---

<ul>
  {posts.map(post => <li>{post.title}</li>)}
</ul>
```

#### Fichiers Astro

Les fichiers Astro ont l'interface suivante :

```ts
export interface AstroInstance {
	default: AstroComponent;
}
```

#### Autres fichiers

Autres fichiers peuvent avoir une multitude interfaces différentes, mais `Astro.glob()` accepte un type générique TypeScript si vous savez exactement ce qu'un type de fichier non-reconnu contient.

```ts
---
interface CustomDataFile {
  default: Record<string, any>;
}
const data = await Astro.glob<CustomFile>('../data/**/*.js');
---
```

### `Astro.request`

`Astro.request` est un objet [Request](https://developer.mozilla.org/fr/docs/Web/API/Request) standard. Il peut être utilisé pour obtenir l'URL, les en-têtes, le mode de la requête et même le corps de la requête. Utilisez `new URL(Astro.request.url)` pour obtenir un objet URL.

```astro
---
const url = new URL(Astro.request.url);
---
<h1>Origine {url.origin}</h1>
```

### `Astro.canonicalURL`

L'[URL canonique][canonical] de la page actuelle. Si l'option `site` est définie, l'origine du site sera l'origine de cette URL.

### `Astro.site`

`Astro.site` retourne une `URL` créée à partir de `buildOptions.site` dans votre configuration Astro. Si égal à `undefined`, il retournera une URL générée à partir de `localhost`.

```astro
---
const path = Astro.site.pathname;
---

<h1>Bienvenue sur {path}</h1>
```

### `Astro.slots`

`Astro.slots` contient des fonctions d'aide pour modifier les enfants slottés d'un composant Astro.

| Nom            | Type                                              | Description                                        |
| :------------- | :------------------------------------------------ | :------------------------------------------------- |
| `has`          | `(name: string) => boolean`                       | Si le contenu pour ce nom de slot existe           |
| `render`       | `(name: string, args?: any[]) => Promise<string>` | Affiche en asynchrone ce slot et retourne l'HTML   |

```astro
---
let html: string = '';
if (Astro.slots.has('default')) {
  html = await Astro.slots.render('default')
}
---
<Fragment set:html={html} />
```

`Astro.slots.render` accepte également un second argument, un tableau de paramètres qui sera transmis à toutes les fonctions enfants. Cela est très utile pour les composants utilitaires.

Avec le composant `Message.astro` suivant...

```astro
---
let html: string = '';
if (Astro.slots.has('default')) {
  html = await Astro.slots.render('default', Astro.props.messages)
}
---
<Fragment set:html={html} />
```

Vous pouvez passer une fonction de rappel qui affiche le message :

```astro
<div><Message messages={['Hello', 'world!']}>{(messages) => messages.join(' ')}</Message></div>
<!-- S'affichera comme suit -->
<div>Hello world!</div>
```


## `getStaticPaths()`

Si une page utilise des paramètres dynamiques dans le nom du fichier, ce composant devra exporter une fonction `getStaticPaths()`.

Cette fonction est requise car Astro est un générateur de sites statiques. Cela signifie que votre site est construit à l'avance. S'il n'est pas spécifié à Astro de générer une page à la compilation, vos utilisateurs ne verront pas la page quand ils visiteront votre site.

```astro
---
export async function getStaticPaths() {
  return [
    { params: { /* obligatoire */ }, props: { /* optionel */ } },
    { params: { ... } },
    { params: { ... } },
    // ...
  ];
}
---
<!-- Votre template HTML ici. -->
```

La fonction `getStaticPaths()` doit retourner un tableau d'objets pour déterminer les chemins qui seront pré-rendus par Astro.

⚠️ La fonction `getStaticPaths()` s'exécute dans un contexte isolé une seule fois, juste avant que n'importe quelle autre page ne charge. C'est pourquoi vous ne pouvez pas référencer n'importe quel élément de son contexte parent, autre que les imports de fichiers. Le compilateur avertira si vous ne respectez pas cette exigence.

### `params`

La clé `params` de chaque objet retourné dit à Astro quels chemins construire. Les paramètres retournés doivent correspondre aux paramètres dynamiques et les paramètres REST définis dans le chemin du fichier du composant.

Les `params` sont encodés dans l'URL, donc seuls les chaînes de caractères sont supportés comme valeurs. La valeur de chaque objet `params` doit correspondre aux paramètres utilisés dans le nom de la page.

Par exemple, supposons que vous avez une page à l'URL `src/pages/posts/[id].astro`. Si vous exportez `getStaticPaths` de cette page et retournez les chemins suivants :

```astro
---
export async function getStaticPaths() {
  return [
    { params: { id: '1' } },
    { params: { id: '2' } },
  ];
}

const { id } = Astro.params;
---
<h1>{id}</h1>
```

Alors Astro générera de façon statique `posts/1` et `posts/2` à la compilation.

### Passer des données avec `props`

Pour passer des données supplémentaires à chaque page générée, vous pouvez également définir une valeur `props` sur chaque objet de chemin retourné. Contrairement aux `params`, les `props` ne sont pas encodés dans l'URL et ne sont donc limités à des chaînes de caractères.

Par exemple, supposons que vous générez des pages basées sur les données téléchargées depuis une API distante. Vous pouvez passer l'objet complet des données à la page du composant dans `getStaticPaths` :

```astro
---
export async function getStaticPaths() {
  const data = await fetch('...').then(response => response.json());

  return data.map((post) => {
    return {
      params: { id: post.id },
      props: { post },
    };
  });
}

const { id } = Astro.params;
const { post } = Astro.props;
---
<h1>{id}: {post.name}</h1>
```

Vous pouvez aussi passer un tableau classique, ce qui peut être utile lorsque vous générez ou remplissez un liste de chemins connu.

```astro
---
export async function getStaticPaths() {
  const posts = [
    {id: '1', category: "astro", title: "Référence API"},
    {id: '2', category: "react", title: "Créer un compte à rebours en React !"}
  ];
  return posts.map((post) => {
    return {
      params: { id: post.id },
      props: { post };
  });
}
const {id} = Astro.params;
const {post} = Astro.props;
---
<body>
  <h1>{id}: {post.title}</h1>
  <h2>Catégorie : {post.category}</h2>
</body>
```

Alors Astro générera de façon statique `posts/1` et `posts/2` à la compilation en utilisant le composant dans `pages/posts/[id].astro`. La page peut référencer ces données en utilisant `Astro.props` :

### `paginate()`

La pagination est un cas de façonnement commun pour les sites Web que Astro supporte nativement via la fonction `paginate()`. `paginate()` générera automatiquement le tableau à retourner de `getStaticPaths()` qui crée une URL pour chaque page de la collection à paginer. Le numéro de page sera passé en paramètre et les données de la page seront passées avec la propriété `page`.

```js
export async function getStaticPaths({ paginate }) {
  // Chargez vos données avec fetch(), Astro.fetchContent(), etc.
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
  const result = await response.json();
  const allPokemon = result.results;

  // Retournez une collection de chemins paginés pour tous les posts
  return paginate(allPokemon, { pageSize: 10 });
}

// Si configuré correctement, la propriété de page a maintenant tout ce qui
// peux vous demander pour afficher une seule page (voir la section suivante).
const { page } = Astro.props;
```

`paginate()` suppose que le nom de fichier est `[page].astro` ou `[...page].astro`. Le paramètre `page` devient le numéro de page dans votre URL:

- `/posts/[page].astro` générera les URLs `/posts/1`, `/posts/2`, `/posts/3`, etc.
- `/posts/[...page].astro` générera les URLs `/posts`, `/posts/2`, `/posts/3`, etc.

#### La propriété de pagination `page`

La pagination passera une propriété `page` à chaque page affichés qui représente une seule page de données dans la collection à paginer. Cela inclut les données que vous avez paginer (`page.data`) ainsi que des métadonnées pour la page (`page.url`, `page.start`, `page.end`, `page.total`, etc). Ces métadonnées sont utiles pour des choses comme un bouton "Page suivante" ou un message "Affichage de 1-10 sur 100 éléments".

| Nom                |         Type          | Description                                                                                                                       |
| :----------------- | :-------------------: | :-------------------------------------------------------------------------------------------------------------------------------- |
| `page.data`        |        `Array`        | Liste des données retournées par `data()` pour la page actuelle.                                                                 |
| `page.start`       |       `number`        | Index du premier élément sur la page actuelle, à partir de `0` (par exemple, si `pageSize: 25`, cela serait `0` sur la page 1, `25` sur la page 2, etc.). |
| `page.end`         |       `number`        | Index du dernier élément sur la page actuelle.                                                                                     |
| `page.size`        |       `number`        | Combiens d'éléments comporte une page.                                                                                                                |
| `page.total`       |       `number`        | Le nombre total d'éléments sur toutes les pages.                                                                                                                 |
| `page.currentPage` |       `number`        | Le numéro de la page actuelle, à partir de `1`.                                                                                                                 |
| `page.lastPage`    |       `number`        | Le nombre total de pages.                                                                                                                                 |
| `page.url.current` |       `string`        | Obtenez l'URL de la page actuelle (utile pour les URLs canoniques)                                                                                                                 |
| `page.url.prev`    | `string \| undefined` | Obtenez l'URL de la page précédente (sera `undefined` si sur la page 1).                                                                                                                 |
| `page.url.next`    | `string \| undefined` | Obtenez l'URL de la page suivante (sera `undefined` si aucune page suivante).                                                                                                                 |

### `rss()`

Les flux RSS sont aussi un cas d'utilisation commun que Astro supporte nativement. Appelez la fonction `rss()` pour générer un flux RSS `/rss.xml` pour votre projet en utilisant les mêmes données que vous avez chargées pour cette page. Cet emplacement de fichier peut être personnalisé (voir ci-dessous).

```js
// Example: /src/pages/posts/[...page].astro
// Placez cette fonction à l'intérieur du script de votre composant Astro.
export async function getStaticPaths({rss}) {
  const allPosts = Astro.fetchContent('../post/*.md');
  const sortedPosts = allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Génére un flux RSS à partir de cette collection
  rss({
	// Le titre, la description et les métadonnées personnalisées du flux RSS.
    title: 'Blog de Don',
    description: 'Un exemple de blog avec Astro',
    customData: `<language>fr-FR</language>`,
	// La liste des éléments pour votre flux RSS, triés.
    items: sortedPosts.map(item => ({
      title: item.title,
      description: item.description,
      link: item.url,
      pubDate: item.date,
    })),
	// Optionnel: Personnalisez où le fichier est écrit.
	// Par défaut à la valeur : "/rss.xml"
    dest: "/my/custom/feed.xml",
  });

  // Retourne une collection de chemins de pages pour tous les articles
  return [ ... ];
}
```

```ts
// La définition complète de type pour l'argument de la fonction rss() :
interface RSSArgument {
  /** (requis) Titre du flux RSS */
  title: string;
  /** (requis) Description du flux RSS */
  description: string;
  /** Personnalisez des métadonnées sur l'ouverture de la balise <xml> */
  xmlns?: Record<string, string>;
  /** Personnalisez des données dans l'ouverture du fichier */
  customData?: string;
  /**
   * Personnalisez où le fichier RSS xml doit être écrit.
   * Relatif au répertoire de construction final. Exemple : '/foo/bar.xml'
   * Par défaut à la valeur '/rss.xml'.
   */
  dest?: string;
  /** Retourne les données à propos de chaque élément */
  items: {
	/** (requis) Titre de l'élément */
    title: string;
	/** (requis) Lien vers l'élément */
    link: string;
	/** Date de publication de l'élément */
    pubDate?: Date;
	/** Description de l'élément */
    description?: string;
	/** Ajoutez d'autres données XML valides à cet élément */
    customData?: string;
  }[];
}
```

## `import.meta`

> Dans cette section, nous utilisons `[dot]` pour dire `.`. Cela est dû à une erreur dans notre moteur de compilation qui remplace `import[dot]meta[dot]env` si nous utilisons `.` au lieu de `[dot]`.

Tout les modules ESM incluent une propriété `import.meta`. Astro ajoute `import[dot]meta[dot]env` via [Vite](https://vitejs.dev/guide/env-and-mode.html).

**`import[dot]meta[dot]env[dot]SSR`** peut être utilisé pour savoir quand l'élément est affiché sur le serveur. Il arrive parfois que vous vouliez une logique différente, par exemple un composant qui ne devrait être rendu que dans le client.

```jsx
import { h } from 'preact';

export default function () {
  // Note : remplacez "[dot]" par "." pour que cela fonctionne dans votre projet.
  return import[dot]meta[dot]env[dot]SSR ? <div class="spinner"></div> : <FancyComponent />;
}
```

## Composants intégrés

Astro inclut des composants intégrés pour vous utiliser dans vos projets. Tous les composants intégrés sont disponibles dans les fichiers `.astro` via `import {} from 'astro/components';`.

### `<Markdown />`

```astro
---
import { Markdown } from 'astro/components';
---
<Markdown>
  # La syntaxe Markdown est maintenant supportée ! **Yay !**
</Markdown>
```

Voir notre [Guide Markdown](/fr/guides/markdown-content) pour plus d'infos.

### `<Code />`

```astro
---
import { Code } from 'astro/components';
---
<!-- Colorez des bouts code JavaScript. -->
<Code code={`const foo = 'bar';`} lang="js" />
<!-- Optionnel : personnalisez votre thème. -->
<Code code={`const foo = 'bar';`} lang="js" theme="dark-plus" />
<!-- Optionnel : activez le retour à la ligne. -->
<Code code={`const foo = 'bar';`} lang="js" wrap />
```

Ce composant fournit la coloration syntaxique à la compilation (pas de JavaScript client-side inclus). Ce composant est controllé en interne par Shiki et il supporte tous les [thèmes](https://github.com/shikijs/shiki/blob/main/docs/themes.md) et [langages](https://github.com/shikijs/shiki/blob/main/docs/languages.md) populaires. De plus, vous pouvez ajouter vos thèmes et langages personnalisés en les passant à `theme` et `lang` respectivement.

### `<Prism />`

```astro
---
import { Prism } from '@astrojs/prism';
---
<Prism lang="js" code={`const foo = 'bar';`} />
```

> **`@astrojs/prism`** est intégré à l'intérieur d'`astro`. Il n'est pas nécessaire de l'installer séparément comme dépendance. Cependant, notez que nous nous efforçons d'extraire `@astrojs/prism` dans un paquet installable dans le futur.

Ce composant fournit la coloration syntaxique pour les blocs de code en appliquant les classes CSS de Prism. Notez que **vous devez fournir un fichier CSS de Prism** (ou prendre en charge vous-même) pour que la coloration syntaxique apparaisse ! Voir la section [Configuration de Prism](/fr/guides/markdown-content#prism-configuration) pour plus d'infos.

Voir la [liste des langages supportés par Prism](https://prismjs.com/#supported-languages) où vous pouvez trouver les alias chaques langages. Et, vous pouvez aussi afficher vos blocs de code Astro avec `lang="astro"` !

### `<Debug />`

```astro
---
import { Debug } from 'astro/components';
const serverObject = {
  a: 0,
  b: "string",
  c: {
    nested: "object"
  }
}
---
<Debug {serverObject} />
```

Ce composant fournit une façon de visualiser les valeurs sur le client sans JavaScript.


[canonical]: https://fr.wikipedia.org/wiki/Élément_de_lien_canonique
