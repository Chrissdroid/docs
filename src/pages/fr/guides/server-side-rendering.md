---
layout: ~/layouts/MainLayout.astro
title: Affichage côté serveur
---

L'affichage côté serveur, aka SSR (De l'anglais, "Server-Side Rendering"), peut-être activé dans Astro. Lorsque vous l'activez, vous pouvez :

- Implémenter des sessions pour l'état de connexion des utilisateurs dans votre application.
- Afficher des données d'une API appelée dynamiquement avec `fetch`.
- Déployer votre site sur un hôte en utilisant un *adaptateur*.

> L'SSR est nouveau dans Astro et sera sujet à de nombreux changements avant que la version 1.0 ne sorte. Gardez votre code à jour avec les derniers changements d'API ici.

## Activation de l'SSR dans votre projet

Pour activer l'SSR, vous devez utiliser un adaptateur. Les adaptateurs suivants sont disponibles aujourd'hui avec d'autres à venir dans le futur :

- [Deno](https://github.com/withastro/astro/tree/main/packages/integrations/deno)
- [Netlify](https://github.com/withastro/astro/tree/main/packages/integrations/netlify)
- [Node.js](https://github.com/withastro/astro/tree/main/packages/integrations/node)
- [Vercel](https://github.com/withastro/astro/tree/main/packages/integrations/vercel)

Dans cet exemple, nous allons utiliser `@astrojs/netlify` pour construire avec Netlify. Pour cela, installez l'adaptateur :

```bash
npm install --save-dev @astrojs/netlify
```

Une fois que vos packages ont été installés, ajoutez ces deux lignes à votre fichier de configuration `astro.config.mjs` du projet.

```diff
  // astro.config.mjs
  import { defineConfig } from 'astro/config';
+ import netlify from '@astrojs/netlify/functions';

  export default defineConfig({
+   adapter: netlify(),
  });
```

Avec Netlify, vous pouvez déployer depuis git, leur interface web, ou depuis leur ILC (ou CLI en anglais). Ici, nous allons utiliser l'[ILC de Netlify](https://docs.netlify.com/cli/get-started/) pour le déployer.

D'abord, construisez votre site comme d'habitude :

```bash
npm run build
```

Ceci crée `netlify/functions/` qui contient le code pour votre SSR. Le déploiement de votre site le déploiera ces fonctions qui contiennent toutes vos composants de Pages Astro prêtes à être rendues.

```bash
netlify deploy
```

Après le déploiement, vous devriez obtenir une URL pour prévisualiser votre site.

## Fonctionnalités

Astro restera un générateur de sites statiques par défaut, mais une fois que vous activez un adaptateur d'affichage côté serveur, quelques nouvelles fonctionnalités deviennent disponibles pour vous.

### Astro.request.headers

Les en-têtes de la requête sont disponibles dans `Astro.request.headers`. C'est un objet [Headers](https://developer.mozilla.org/fr/docs/Web/API/Headers) où vous pouvez récupérer les en-têtes tels que les cookies.

```astro
---
const cookie = Astro.request.headers.get('cookie');
// ...
---
<html>
  <!-- Contenu de votre page ici... -->
</html>
```

### Astro.redirect

Sur la variable globale `Astro`, cette méthode vous permet de rediriger vers une autre page. Vous pourriez le faire après avoir vérifié si l'utilisateur est connecté en récupérant sa session depuis un cookie.

```astro
---
import { isLoggedIn } from '../utils';

const cookie = Astro.request.headers.get('cookie');

// Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion.
if(!isLoggedIn(cookie)) {
  return Astro.redirect('/login');
}
---
<html>
  <!-- Contenu de votre page ici... -->
</html>
```

### Réponse

Vous pouvez aussi retourner une [Réponse](https://developer.mozilla.org/fr/docs/Web/API/Response) depuis n'importe quelle page. Vous pourriez le faire pour retourner une erreur 404 sur une page dynamique après avoir vérifié un identifiant dans la base de données.

__[id].astro__

```astro
---
import { getProduct } from '../api';

const product = await getProduct(Astro.params.id);

// Aucun produit trouvé
if(!product) {
  return new Response(null, {
    status: 404,
    statusText: 'Not found'
  });
}
---
<html>
  <!-- Contenu de votre page ici... -->
</html>
```

#### Routes API

Une route API est un fichier `.js` ou `.ts` dans le dossier `src/pages/` qui prend une [Requête](https://developer.mozilla.org/fr/docs/Web/API/Request) et retourne une [Réponse](https://developer.mozilla.org/fr/docs/Web/API/Response).

__[id].js__
```js
import { getProduct } from '../db';

export async function get({ params }) {
  const { id } = params;
  const product = await getProduct(id);

  if(!product) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found'
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200
  });
}
```
