---
layout: ~/layouts/MainLayout.astro
title: Routage
description: Une introduction à l'utilisation du routage avec Astro.
---

Astro utilises un **routage basé sur les fichiers** pour générer les URLs de votre dossier de compilation en fonction des dossier de votre projet `src/pages/`. Lorsqu'un fichier est ajouté au dossier `src/pages/` de votre projet, il est automatiquement disponible comme une route basée sur son nom de fichier.

## Routes statiques

Les composants `.astro` et les fichiers Markdown (`.md`) dans le dossier `src/pages/` **deviennent des pages de votre site web**. Chaque page correspond à son chemin et son nom de fichier dans le dossier `src/pages/`.

```bash
# Exemple: Routes statiques
src/pages/index.astro        -> mysite.com/
src/pages/about.astro        -> mysite.com/about
src/pages/about/index.astro  -> mysite.com/about
src/pages/about/me.astro     -> mysite.com/about/me
src/pages/posts/1.md         -> mysite.com/posts/1
```

> 💡 Il n'y a pas de "configuration de routage" à maintenir dans un projet Astro. Les pages statiques sont créées en plaçant des fichiers dans le dossier `/src/pages/`.

## Routes dynamiques

Une seule page Astro peut également spécifier des paramètres de route dynamiques dans son nom de fichier pour générer plusieurs routes qui correspondent à un critère donné. Vous pouvez créer plusieurs pages liées en même temps, comme des pages d'auteurs ou une page pour chaque tags d'un article de blog. Les paramètres nommés permettent de spécifier des valeurs pour les niveaux "nommés" de ces chemins de route, et les paramètres d'URL permettent de plus en plus de chemins de route "attrape-tout".

> 💡 Même les pages et routes créées dynamiquement sont générées à la compilation.

Les pages Astro qui créent des routes dynamiques doivent :

1. utiliser la notation `[entre-crochets]` pour identifier les paramètres dynamiques

2. exporter une fonction `getStaticPaths()` pour spécifier précisément quelles chemins seront pré-générés par Astro.


### Paramètres nommés

Vous pouvez générer des routes avec un paramètre `[nommé]` en fournissant votre fonction `getStaticPaths()` les valeurs suivantes :

```astro
---
// src/pages/dogs/[dog].astro

export function getStaticPaths() {
  return [
    // Génère : /dogs/clifford
    {params: {dog: 'clifford'}},
    // Génère : /dogs/rover
    {params: {dog: 'rover'}},
    // Génère : /dogs/spot
    {params: {dog: 'spot'}},
  ];
}
---
```

📚 Apprenez-en plus sur [`getStaticPaths()`](/fr/reference/api-reference#getstaticpaths).

Les routes peuvent être générées à partir de plusieurs paramètres nommés, à n'importe quel niveau du chemin du fichier :

- `pages/blog/[slug].astro` → (`/blog/hello-world`, `/blog/post-2`, etc.)
- `pages/[username]/settings.astro` → (`/fred/settings`, `/drew/settings`, etc.)
- `pages/[lang]-[version]/info.astro` → (`/en-v1/info`, `/fr-v2/info`, etc.)

#### L'objet `Astro.request.params`

Les composants Astro qui génèrent des routes dynamiques ont accès à un objet `Astro.request.params` pour chaque route. Cela permet d'utiliser ces parties de l'URL générée dans votre script et le template.

```astro
---
// Example: src/pages/posts/[id].astro
const { id } = Astro.request.params;
---
<p>Article : { id }</p>


// L'objet Astro.request.params passé par la route `/post/abc`
{ "id": "abc" }
```

Des multiples segments de route dynamiques peuvent être combinés pour fonctionner de la même manière.

```astro
---
// Example: src/pages/post/[id]/[comment].astro
const { id, comment } = Astro.request.params;
---

// L'objet Astro.request.params passé par la route `/post/abc/a-comment`
{ "id": "abc", "comment": "a-comment" }
```

### Paramètres REST

Si vous avez besoin de plus de flexibilité dans votre routage d'URL, vous pouvez utiliser un paramètre rest dans votre nom de fichier `.astro` comme un "attrape-tout" universel pour les chemins de n'importe quelle profondeur en ajoutant trois points (`...`) à l'intérieur de vos crochets.

Par exemple :

- `pages/post/[...slug].astro` → (`/post/a`, `/post/a/b`, `/post/a/b/c`, etc.)

Les paramètres correspondants seront passés en tant que paramètre de requête (`slug` dans cet exemple) à la page.

```json
// L'objet Astro.request.params passé pour la route `/post/a/b/c`
{ "slug": "a/b/c" }
```

> Les paramètres rest sont optionnels par défaut, donc `pages/post/[...slug].astro` peut aussi correspondre à `/post/`.

#### Exemple : paramètres REST

Dans un exemple réel, vous pouvez implémenter le visualiseur de fichiers de GitHub avec les paramètres nommés et rest suivants :

```
/[org]/[repo]/tree/[branch]/[...file]
```

Dans cet exemple, une requête pour `/withastro/astro/tree/main/docs/public/favicon.svg` résulterait avec les paramètres suivants, disponibles dans la page :

```js
{
	org: 'withastro',
	repo: 'astro',
	branch: 'main',
	file: 'docs/public/favicon.svg'
}
```

### Remarques

Les requêtes pour les paramètres ne correspondent pas nécessairement à chaque route existante dans votre projet.

Les routes statiques sans paramètres de chemin ne prendront pas la priorité sur toutes les autres routes, et ne correspondent pas aux requêtes pour les paramètres de chemin dynamiques. De même, les chemin de routes nommées prennent la priorité sur les routes "attrape-tout", et ne correspondent pas aux requêtes pour les paramètres de chemin "attrape-tout".

Considérez le projet suivant :

```
└── pages/
│       ├── posts/
│       │   ├── create.astro
│       │   ├── [pid].astro
│       │   └── [...slug].astro

```

- `pages/post/create.astro` - Correspondra au chemin `/post/create`
- `pages/post/[pid].astro` - Correspondra au chemin `/post/1`, `/post/abc`, etc. Mais pas à `/post/create`
- `pages/post/[...slug].astro` - Correspondra au chemin `/post/1/2`, `/post/a/b/c`, etc. Mais pas à `/post/create`, `/post/1`, `/post/abc`

## Pagination

Astro supporte la pagination automatique pour les grandes collections de données qui doivent être divisées en plusieurs pages. Astro inclut automatiquement les métadonnées de pagination pour les choses comme l'URL de la page précédente / suivante, le nombre total de pages, etc.

```astro
---
// Example: Utilisation de la fonction paginate() dans une route dynamique
export async function getStaticPaths({ paginate }) {
  // Chargez vos données :
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
  const result = await response.json();
  const allPokemon = result.results;
  // Retourne une collection de routes paginées :
  return paginate(allPokemon, { pageSize: 10 });
}
// Les données paginées sont passées en tant que propriété à chaque page.
const { page } = Astro.props;
---
<!-- ... -->
```

La pagination est utile lorsque vous avez besoin de générer plusieurs pages numérotées d'un ensemble de données plus important :

- `/posts/1` (Page 1: Affiche les articles 1-10)
- `/posts/2` (Page 2: Affiche les articles 11-20)
- `/posts/3` (Page 3: Affiche les articles 21-30)

### La propriété `page`

Lorsque vous utilisez la fonction `paginate()`, chaque page de la collection est transmets ses données via une propriété `page`. La propriété `page` a quelques propriétés utiles, mais la plus importante est `page.data`. Cette propriété contient le tableau contenant la partie de données de la page qui a été passée à la fonction `paginate()`.

```astro
---
// Exemple : Utilisation de la propriété `page` paginée
export async function getStaticPaths() { /* ... */ }
const { page } = Astro.props;
---
<h1>Page {page.currentPage}</h1>
<ul>
  {page.data.map(item => <li>{item.title}</li>)}
</ul>
```

La propriété `page` contient aussi d'autres métadonnées utiles, comme `page.url.next`, `page.url.prev`, `page.total`, etc.

```ts
interface Page<T = any> {
	/** résultat */
	data: T[];
	/** métadonnées */
	/** le nombre du premier élément de la page, à partir de 0 */
	start: number;
	/** le nombre du dernier élément de la page, à partir de 0 */
	end: number;
	/** le nombre total de résultats */
	total: number;
	/** le numéro de la page actuelle, à partir de 1 */
	currentPage: number;
	/** le nombre d'éléments par page (par défaut : 25) */
	size: number;
	/** le nombre de la dernière page */
	lastPage: number;
	url: {
		/** l'URL de la page actuelle */
		current: string;
		/** l'URL de la page précédente (si il y en a une) */
		prev: string | undefined;
		/** l'URL de la page suivante (si il y en a une) */
		next: string | undefined;
	};
}
```

## Pagination imbriquée

Une utilisation plus avancée pour la pagination est la **pagination imbriquée.** C'est lorsque la pagination est combinée avec d'autres paramètres de route dynamique. Vous pouvez utiliser la pagination imbriquée pour grouper votre collection paginée par une propriété ou un tag.

Par exemple, si vous voulez grouper vos articles de markdown par un tag, vous pouvez utiliser la pagination imbriquée en créant une page `/src/pages/[tag]/[page].astro` qui correspond aux URL suivantes :

- `/red/1` (tag=red)
- `/red/2` (tag=red)
- `/blue/1` (tag=blue)
- `/green/1` (tag=green)

La pagination imbriquée fonctionne en retournant une collection de résultats `paginate()` depuis `getStaticPaths()`, une pour chaque groupe.

Dans l'exemple suivant, nous allons implémenter la pagination imbriquée pour construire les URL listées ci-dessus :

```astro
---
// Example: /src/pages/[tag]/[page].astro
export function getStaticPaths({paginate}) {
  const allTags = ['red', 'blue', 'green'];
  const allPosts = Astro.fetchContent('../../posts/*.md');
  // Pour chaque tag, retourne un résultat paginate().
  // Assurez-vous que vous passez `{params: {tag}}` à `paginate()`
  // Assurez-vous que Astro connaisse le groupe de tag du résultat.
  return allTags.map((tag) => {
    const filteredPosts = allPosts.filter((post) => post.tag === tag);
    return paginate(filteredPosts, {
      params: { tag },
      pageSize: 10
    });
  });
}
const { page } = Astro.props;
const { params } = Astro.request;
```
