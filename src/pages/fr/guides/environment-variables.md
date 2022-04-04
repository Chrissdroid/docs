---
layout: ~/layouts/MainLayout.astro
title: Utiliser des variables d'environnement
description: Apprenez comment utiliser les variables d'environnement dans un projet Astro.
---

Astro utilise Vite pour les variables d'environnement, et permet d'utiliser n'importe quelle de ses méthodes pour obtenir et définir des variables d'environnement.

Notez que toutes les variables d'environnement sont disponibles dans le code coté serveur, mais seulement les variables préfixées avec `PUBLIC_` sont disponibles dans le code client.

Jetez un oeil à l'exemple officiel des [variables d'environnement](https://github.com/withastro/astro/tree/main/examples/env-vars) pour connaître des meilleures pratiques.

Pour des raisons de sécurité, seules les variables préfixées avec `PUBLIC_` sont accessibles par le code client.

```ini
SECRET_PASSWORD=motdepasse123
PUBLIC_ANYBODY=juste là
```

Dans cet exemple, `PUBLIC_ANYBODY` sera disponible en tant que `import.meta.env.PUBLIC_ANYBODY` dans le code coté serveur ou client, alors que `SECRET_PASSWORD` ne sera pas.

## Définir des variables d'environnement

Dans Astro les versions 0.21 et supérieures, les variables d'environnement peuvent être chargées depuis les fichiers `.env` dans le répertoire de votre projet.

Vous pouvez aussi attacher un mode (soit `production` ou `development`) au nom du fichier, comme `.env.production` ou `.env.development`, qui font que les variables d'environnement n'ont d'effet que dans ce mode.

Créez un fichier `.env` dans le répertoire de votre projet et ajoutez quelques variables à ce fichier.

```bash
# .env
# Ceci ne sera disponible que lorsque vous lancerez le serveur !
DB_PASSWORD="foobar"
# Ceci sera disponible partout !
PUBLIC_POKEAPI="https://pokeapi.co/api/v2"
```

```ini
.env                # Chargé dans tous les cas
.env.local          # Chargé dans tous les cas, ignoré par git
.env.[mode]         # Chargé uniquement dans le mode spécifié
.env.[mode].local   # Chargé uniquement dans le mode spécifié, ignoré par git
```

## Obtenir des variables d'environnement

> Dans cette section, nous utilisons `[dot]` pour dire `.`. Cela est dû à une erreur dans notre moteur de compilation qui remplace `import[dot]meta[dot]env` si nous utilisons `.` au lieu de `[dot]`.

Au lieu d'utiliser `process.env`, avec Vite, vous utilisez `import[dot]meta[dot]env`, qui utilise la fonctionnalité `import.meta` ajoutée dans ES2020 (vous ne devriez pas vous inquiéter de la compatibilité avec les navigateurs, Vite remplace toutes les mentions `import[dot]meta[dot]env` par des valeurs statiques). Par exemple, pour obtenir la variable d'environnement `PUBLIC_POKEAPI`, vous pouvez utiliser `import.meta.env.PUBLIC_POKEAPI`.

```js
// Quand import.meta.env.SSR === true
const data = await db(import.meta.env.DB_PASSWORD);

// Quand import.meta.env.SSR === false
const data = fetch(`${import.meta.env.PUBLIC_POKEAPI}/pokemon/squirtle`);
```

> ⚠️ATTENTION⚠️:
> Parce que Vite remplace statiquement `import[dot]meta[dot]env`, vous ne pouvez pas l'accéder avec des clés dynamiques comme `import.meta.env[key]`.

## Autocomplétion pour TypeScript

Par défaut, Vite fournit des définitions de type pour `import[dot]meta[dot]env` dans `vite/client.d.ts`. Vous pouvez aussi définir d'autres variables d'environnement dans les fichiers `.env.[mode]`, mais vous voulez surement obtenir l'autocomplétion pour les variables d'environnement définies par l'utilisateur qui préfixent `PUBLIC_`.

Pour faire cela, vous pouvez créer un fichier `env.d.ts` dans le répertoire `src`, puis étendre `ImportMetaEnv` comme ceci :

```ts
interface ImportMetaEnv {
  readonly DB_PASSWORD: string;
  readonly PUBLIC_POKEAPI: string;
  // plus de variables d'environnement...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```
