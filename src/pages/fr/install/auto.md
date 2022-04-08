---
title: Installation d'Astro avec l'ILC automatique
description: Comment installer Astro avec NPM, PNPM, ou Yarn via l'outil de création create-astro inclus dans l'ILC.
layout: ~/layouts/InstallLayout.astro
---

`create-astro` est la meilleure et la plus simple manière de commencer un nouveau projet Astro.

## 1. Utiliser l'<abbr title="Interface en ligne de commande">ILC</abbr>

Lancez la commande suivante dans votre terminal pour commencer notre assistant d'installation, `create-astro`. Cela vous guidera à la création de votre premier projet Astro dans le répertoire où vous l'avez lancé.

```shell
# Lancer le processus d'installation de create-astro depuis npm :
npm init astro
```

Si `create-astro` démarre avec succès, vous apercevrez une liste courte de templates de démarrage à choisir :
- `starter`: Un excellent modèle de démarrage pour tous ceux qui veulent explorer Astro.
- `minimal`: Un modèle minimal qui ne contient que les éléments essentiels pour commencer.
- `blog, portfolio, docs, etc`: thèmes prédéfinis pour des cas d'utilisation spécifiques.

Si vous choisissez le modèle `starter`, vous devrez également choisir quels [frameworks additionnels](/fr/core-concepts/framework-components) (React, Svelte, Vue, Solid, Preact) vous voulez, et si vous souhaitez en inclure dans votre projet. Les frameworks additionnels peuvent également être ajoutés plus tard.

## 2. Installer les dépendances

Quand le processus d'installation de `create-astro` est terminé, vous devriez voir quelques instructions recommandées sur votre écran. Elles vous aideront à terminer la configuration et à démarrer votre nouveau projet.

La dernière étape requise reste à installer les dépendances de votre projet en utilisant un gestionnaire de paquets comme npm :

```bash
# npm
npm install

# yarn
yarn

# pnpm
pnpm install

```

Vous pouvez aussi en profiter pour lancer la commande `git init` dans votre nouveau répertoire, si vous souhaitez utiliser l'outil [Git](https://git-scm.com/) dans votre projet.

## 3. Lancer Astro ✨

Vous pouvez vous attendre à utiliser le serveur de développement intégré d'Astro pour la plupart de votre projet. C'est la façon dont vous lancerez votre projet localement pendant le développement.

Pour commencer, utilisez votre gestionnaire de paquets pour lancer votre script de démarrage pré-configuré :

```bash
# npm
npm start

# yarn
yarn start

# pnpm
pnpm run start
```

Si tout se passe comme prévu, Astro devrait maintenant être en train de vous servir votre projet sur l'addresse [http://localhost:3000](http://localhost:3000) !

Astro va également suivre les modifications de fichiers dans votre répertoire `src/`, vous n'aurez donc pas besoin de redémarrer le serveur a chaque fois que vous apporterez des modifications au cours du développement.

Si vous n'arrivez pas à ouvrir votre projet dans le navigateur, revenez au terminal où vous avez lancé le script `start` pour voir ce qui a mal tourné.

## 4. Déployer vers la toile

Il est temps de déployer votre projet sur le web ! Lancez la commande `build` dans votre projet pour construire votre site web statique dans un nouveau répertoire `dist/` dans votre projet.

```bash
# npm
npm run build

# yarn
yarn build

# pnpm
pnpm run build
```

Quand la commande finit, vous devriez avoir un nouveau répertoire `dist/` dans votre projet que vous pouvez déployer directement sur votre hébergeur web favori.

Pour commencer à déployer votre site web gratuitement, allez jeter un oeil à notre fier partenaire d'hébergement, [Netlify](https://www.netlify.com/). Pour obtenir des instructions sur la mise en place d'un déploiement, lisez notre [guide de déploiement](/fr/guides/deploy).

## Étapes suivantes

Bravo ! Vous êtes maintenant prêt à développer avec Astro !

📚 Apprendre plus à propos de la structure de votre projet Astro dans notre [Guide de structure de projet](/fr/core-concepts/project-structure).

📚 Apprendre plus à propos de la structure des composants d'Astro dans notre [Guide de structure des composants](/fr/core-concepts/component-structure).

📚 Apprendre plus à propos de la structure de routage par pages d'Astro dans notre [Guide de routage](/fr/core-concepts/astro-pages).
