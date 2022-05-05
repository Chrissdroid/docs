---
layout: ~/layouts/MainLayout.astro
title: API des adaptateurs Astro (expérimental)
---

Astro a été conçu pour rendre facile le déploiement sur n'importe quel fournisseur de cloud pour l'SSR (affichage côté serveur, de l'anglais "server-side rendering"). Cette capacité est fournie par des __adaptateurs__, qui sont des [intégrations](/fr/reference/integrations-reference/).

> L'affichage côté serveur dans Astro est __expérimental__. Si vous êtes intéressé par la construction d'un adaptateur pour un hôte de serveurs, c'est le moment idéal pour aider à mettre en forme ces APIs. Si vous êtes inquiet par les changements de fonctionnalités, cela pourrait être un peu trop tôt pour vous.

## Qu'est-ce qu'un adaptateur

Un adaptateur est un type particulier d'[intégration](/fr/reference/integrations-reference/) qui fournit un point d'entrée pour l'affichage côté serveur. Un adaptateur fait deux choses :

- Implémente des APIs spécifiques à l'hôte pour gérer les requêtes.
- Configure la construction en fonction des conventions de l'hôte.

## Construire un adaptateur

Un adaptateur est une [intégration](/fr/reference/integrations-reference/) et peut faire tout ce que l'intégration peut faire.

Un adaptateur __doit__ appeler l'API `setAdapter` dans le `astro:config:done` comme ceci :

```js
export default function createIntegration() {
  return {
    name: '@matthewp/my-adapter',
    hooks: {
      'astro:config:done': ({ setAdapter }) => {
        setAdapter({
          name: '@matthewp/my-adapter',
          serverEntrypoint: '@matthewp/my-adapter/server.js'
        });
      },
    },
  };
}
```

L'objet passé dans `setAdapter` est défini comme ceci :

```ts
interface AstroAdapter {
	name: string;
	serverEntrypoint?: string;
	exports?: string[];
}
```

Ses propriétés sont :

* __name__: Un nom unique pour votre adaptateur, utilisé pour les logs.
* __serverEntrypoint__: Le point d'entrée pour l'affichage côté serveur.
* __exports__: Un tableau de noms d'exportations lorsque utilisé en parallèle avec `createExports` (expliqué plus bas).

### Point d'entrée du serveur

L'API d'adaptateur d'Astro tente de travailler avec n'importe quel type d'hôte, et donne un moyen de se conformer aux APIs de l'hôte.

#### Exportations

Certains hôtes de serveurs demandent un export de fonction, comme par exemple `handler` :

```js
export function handler(event, context) {
  // ...
}
```

Avec l'API d'adaptateur, vous pouvez atteindre cela en implémentant `createExports` dans votre `serverEntrypoint` :

```js
import { App } from 'astro/app';

export function createExports(manifest) {
  const app = new App(manifest);

  const handler = (event, context) => {
    // ...
  };

  return { handler };
}
```

Dans votre intégration, lorsque vous appelez `setAdapter`, fournissez ce nom dans les `exports` :

```diff
export default function createIntegration() {
  return {
    name: '@matthewp/my-adapter',
    hooks: {
      'astro:config:done': ({ setAdapter }) => {
        setAdapter({
          name: '@matthewp/my-adapter',
          serverEntrypoint: '@matthewp/my-adapter/server.js',
+         exports: ['handler'],
        });
      },
    },
  };
}
```

#### Démarrage

Certains hôtes demandent que vous *démarriez* le serveur vous-même, par exemple en écoutant un port. Pour ces types d'hôtes, l'API d'adaptateur vous permet d'exporter une fonction `start` qui sera appelée lorsque le script compilé sera exécuté.

```js
import { App } from 'astro/app';

export function start(manifest) {
  const app = new App(manifest);

  addEventListener('fetch', event => {
    // ...
  });
}
```

#### astro/app

Ce module est utilisé pour afficher les pages qui ont été pré-construites via `astro build`. Astro utilise les types [Request](https://developer.mozilla.org/fr/docs/Web/API/Request) et [Response](https://developer.mozilla.org/fr/docs/Web/API/Response) standards. Les hôtes qui ont une API différente pour la requête/réponse devraient convertir ces types dans leur adaptateur.

```js
import { App } from 'astro/app';
import http from 'http';

export function start(manifest) {
  const app = new App(manifest);

  addEventListener('fetch', event => {
    event.respondWith(
      app.render(event.request)
    );
  });
}
```

Les méthodes suivantes sont fournies :

##### app.render(request)

Cette méthode appelle la page Astro qui correspond à la requête, l'affiche et retourne une Promesse à une [réponse](https://developer.mozilla.org/fr/docs/Web/API/Response) object. Cela fonctionne également pour les routes API, qui n'affichent pas de pages.

```js
const response = await app.render(request);
```

##### app.match(request)

Cette méthode est utilisée pour déterminer si une requête est correspondante aux règles de routage d'Astro.

```js
if(app.match(request)) {
  const response = await app.render(request);
}
```

Vous pouvez généralement appeler `app.render(request)` sans utiliser `.match` car Astro gère les erreurs 404 si vous fournissez un fichier `404.astro`. Utilisez `app.match(request)` si vous voulez gérer les erreurs 404 dans un autre but.
