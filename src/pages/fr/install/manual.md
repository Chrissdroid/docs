---
layout: ~/layouts/InstallLayout.astro
---

Si vous préférez ne pas utiliser notre outil en ligne de commande `create-astro`, vous pouvez configurer votre projet vous-même en suivant le guide ci-dessous.

## 1. Créez votre projet

Créez un répertoire vide avec le nom de votre projet, puis naviguez dans celui-ci.

```bash
mkdir my-astro-project
cd my-astro-project
```

Maintenant que vous êtes dans votre nouveau répertoire, créez votre fichier `package.json`. C'est la façon dont vous gérez les dépendances de votre projet, y compris Astro. Si vous n'êtes pas familiers avec ce format de fichier, lancez la commande suivante pour en créer un.

```bash
npm init --yes
```


## 2. Installer Astro

Premièrement, installez les dépendances d'Astro dans votre projet.

```bash
npm install astro
```

Ensuite, remplacez la section "scripts" de votre `package.json` par la section suivante :

```diff
  "scripts": \{
-    "test": "echo \"Error: no test specified\" && exit 1"
+    "dev": "astro dev",
+    "build": "astro build",
+    "preview": "astro preview"
  },
```

Vous aurez besoin de ces scripts plus tard dans le guide pour démarrer Astro et exécuter ses différentes commandes.

## 3. Créez votre première page

Dans votre éditeur de texte, créez un nouveau fichier dans votre répertoire à l'emplacement `src/pages/index.astro`. Cela sera votre première page Astro dans le projet.

Pour ce guide, copiez-collez le code suivant (y compris les tirets `---`) dans votre tout nouveau fichier :

```astro
---
// Bienvenue dans Astro ! Tout ce qui est entre les "---" barres de code
// est votre "front matter" de composant. Il n'est jamais exécuté dans le navigateur.
console.log('Ceci ce lance dans votre terminal, pas le navigateur !');
---
<!-- Tout ce qui se situe en dessous est votre "template" de composant.
     Ce n'est que de l'HTML, mais avec quelques pailettes et un peu de magie
     pour vous aider à construire de grande choses. -->
<html>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
<style>
  h1 {
    color: orange;
  }
</style>
```

## 4. Créez votre premier fichier statique

Vous devriez aussi créer un répertoire `public/` pour stocker vos fichiers statiques. Astro inclura toujours ces fichiers dans votre build final, donc vous pouvez les référencer de manière sûre depuis les templates de composants.

Dans votre éditeur de texte, créez un nouveau fichier dans votre répertoire `public/robots.txt`. `robots.txt` est un fichier simple que la plupart des sites incluent pour dire aux moteurs de recherche comme Google comment traiter votre site.

Pour ce guide, copiez-collez le code suivant dans votre nouveau fichier :

```
# Example: Authoriser tous les robots à parcourir et indexer votre site.
# Syntaxe Complète: https://developers.google.com/search/docs/advanced/robots/create-robots-txt
User-agent: *
Allow: /
```

## 5. Créez votre astro.config.mjs

Astro est configuré pour utiliser `astro.config.mjs` comme fichier de configuration. Ce fichier est optionnel, si vous ne souhaitez pas configurer Astro, mais vous pouvez le créer maintenant.

Créez le fichier `astro.config.mjs` à la racine de votre projet, et copiez le code ci-dessous dans le fichier :

```
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({});
```

Si vous souhaitez inclure un [composant de framework](/fr/core-concepts/framework-components/) comme React, Svelte, etc... ou utiliser d'autres outils comme Tailwind ou Partytown dans votre projet, ici est l'endroit où vous devriez [importer et configurer les intégrations](/fr/guides/integrations-guide).

📚 Lisez l'[API de référence](/fr/reference/configuration-reference/) d'Astro pour plus d'informations.

## 6. Étape suivante

Si vous avez suivi les étapes ci-dessus, votre répertoire de projet devrait maintenant ressembler à ceci :

```
├── node_modules/
├── src/
│   └── pages/
│   │   └── index.astro
├── public/
│   ├── robots.txt
├── astro.config.mjs
├── package.json
└── package-lock.json (ou alors : yarn.lock, pnpm-lock.yaml, etc...)
```

Bien joué, vous êtes prêt à utiliser Astro !

Si vous avez suivi ce guide complètement, vous pouvez aller directement à l'[Étape 3: Lancer Astro ✨](/fr/install/auto#3-lancer-astro-) pour continuer et apprendre comment exécuter Astro pour la première fois.
