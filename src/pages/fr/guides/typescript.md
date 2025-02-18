---
layout: ~/layouts/MainLayout.astro
title: TypeScript
description: Apprennez à utiliser le support TypeScript inclus dans Astro.
---

Astro contient un support pour [TypeScript](https://www.typescriptlang.org/) sans configuration au préalable. Vous pouvez importer des fichiers `.ts` et `.tsx` dans votre projet Astro, et même écrire du code TypeScript directement dans votre [composant Astro](/fr/core-concepts/astro-components/#le-script-du-composant).

Astro n'effectue aucune vérification de type. La vérification de type devrait être prise en charge à l'extérieur de Astro, soit par votre IDE, soit par un script séparé. L'extension [VS Code d'Astro](/fr/editor-setup/) fournit automatiquement des conseils et des erreurs de type dans vos fichiers ouverts.

## Mise en place

Il vous est **fortement recommandé** de créer un fichier `tsconfig.json` dans votre projet, afin que les outils comme Astro et VSCode comprennent votre projet. Certaines fonctionnalités (comme les imports de Package NPM) ne sont pas complètement supportées sans un fichier `tsconfig.json`.

Certaines options de configuration de TypeScript nécessitent une attention particulière avec Astro. Voici notre syntaxe recommandé pour un fichier `tsconfig.json` que vous pouvez copier-coller dans votre projet. Chaques [modèles utilisant astro.new](https://astro.new/) incluent ce fichier par défaut.

```json
// Exemple: tsconfig.json initial pour les projets Astro
{
  "compilerOptions": {
    // Active await au niveau de la racine, et d'autres fonctionnalités ESM modernes.
    "target": "ESNext",
    "module": "ESNext",
    // Active la résolution de module en mode node, pour des importations de paquets npm.
    "moduleResolution": "node",
    // Active les importations de fichiers JSON.
    "resolveJsonModule": true,
    // Active une transpilation plus stricte pour une meilleure sortie finale.
    "isolatedModules": true,
    // Ajoute des définitions de type utilisé par notre intégration de Vite.
    "types": ["vite/client"]
  }
}
```
## Imports de type

Utilisez les imports et exports de type autant que possible. Cela vous aidera à éviter les cas où le compilateur d'Astro pourrait essayer d'inclure vos types importés incorrectement comme s'ils étaient du JavaScript.

```diff
- import { SomeType } from './script';
+ import type { SomeType } from './script';
```

## Alias d'importation

Astro supporte des [alias d'importation](/fr/guides/aliases/) que vous les définissez dans votre configuration `tsconfig.json` et `jsconfig.json` `paths`. [Lisez notre guide](/fr/guides/aliases/) pour en savoir plus.


```ts
import HelloWorld from '@components/HelloWorld.astro';
import Layout from '@layouts/Layout.astro';
```

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"]
    }
  }
}
```

## Propriétés de composant

Astro supporte le typage de vos propriétés de composant via TypeScript. Pour l'activer, exportez une interface `Props` dans votre composant Astro. L'extension [VS Code d'Astro](/fr/editor-setup/) recherchera automatiquement l'exportation `Props` et vous fournira un support TS approprié quand vous utiliserez ce composant dans un autre Template.

```astro
---
// Exemple: HelloWorld.astro
export interface Props {
  name: string;
  greeting?: string;
}
const { greeting = 'Hello', name } = Astro.props
---
<h2>{greeting}, {name}!</h2>
```


📚 Lire plus sur les [importations de fichiers `.ts`](/fr/guides/imports/#typescript) dans Astro.
📚 Lire plus sur la [configuration de TypeScript](https://www.typescriptlang.org/tsconfig).
