---
layout: ~/layouts/MainLayout.astro
title: API d'intégration Astro
---

Les **intégrations Astro** ajoutent de nouvelles fonctionnalités et comportements à votre projet en utilisant un seul morceau de code.

Cette page de référence est destinée à tout ceux qui écrivent leur propre intégration. Pour en savoir plus sur l'utilisation d'une intégration dans votre projet, consultez notre [Guide d'Utilisation des Intégrations](/fr/guides/integrations-guide)

## Examples

Les intégrations Astro officielles peuvent servir de référence pour vous pendant la construction de vos propres intégrations.

- **Moteurs de rendu:** [`lit`](https://github.com/withastro/astro/blob/main/packages/integrations/lit/src/index.ts), [`svelte`](https://github.com/withastro/astro/blob/main/packages/integrations/svelte/src/index.ts), [`react`](https://github.com/withastro/astro/blob/main/packages/integrations/react/src/index.ts), [`preact`](https://github.com/withastro/astro/blob/main/packages/integrations/preact/src/index.ts), [`vue`](https://github.com/withastro/astro/blob/main/packages/integrations/vue/src/index.ts), [`solid`](https://github.com/withastro/astro/blob/main/packages/integrations/solid/src/index.ts)
- **Bibliothèques:** [`tailwind`](https://github.com/withastro/astro/blob/main/packages/integrations/tailwind/src/index.ts), [`partytown`](https://github.com/withastro/astro/blob/main/packages/integrations/partytown/src/index.ts), [`turbolinks`](https://github.com/withastro/astro/blob/main/packages/integrations/turbolinks/src/index.ts)
- **Fonctionnalités:** [`sitemap`](https://github.com/withastro/astro/blob/main/packages/integrations/sitemap/src/index.ts)

## Référence rapide de l'API

```ts
interface AstroIntegration {
    name: string;
    hooks: {
        'astro:config:setup'?: (options: {
            config: AstroConfig;
            command: 'dev' | 'build';
            updateConfig: (newConfig: Record<string, any>) => void;
            addRenderer: (renderer: AstroRenderer) => void;
            injectScript: (stage: InjectedScriptStage, content: string) => void;
            injectElement: (stage: vite.HtmlTagDescriptor, element: string) => void;
        }) => void;
        'astro:config:done'?: (options: { config: AstroConfig }) => void | Promise<void>;
        'astro:server:setup'?: (options: { server: vite.ViteDevServer }) => void | Promise<void>;
        'astro:server:start'?: (options: { address: AddressInfo }) => void | Promise<void>;
        'astro:server:done'?: () => void | Promise<void>;
        'astro:build:start'?: () => void | Promise<void>;
        'astro:build:done'?: (options: { pages: { pathname: string }[]; dir: URL }) => void | Promise<void>;
    };
}
```

## Ordre d'intégration

Tout les Hooks d'intégrations sont appelés dans l'ordre dans lequel ils sont fournis. Il est toujours possible de définir l'ordre dans lequel les intégrations doivent être exécutées. Cependant, dans certains cas, il peut être nécessaire de documenter qu'une intégration doit être exécutée en premier ou en dernier dans la configuration `integrations` de l'utilisateur.

## Combiner des plugins

Une intégration peut également être écrite sous la forme d'une collection de plusieurs intégrations plus petites. Nous appelons ces collections des **Presets**. Au lieu de créer une fonction de fabrique qui retourne une seule intégration, un Preset retourne un *tableau* d'intégrations. Cela est utile pour la construction de fonctionnalités complexes à partir de plusieurs intégrations.

```js
integrations: [
  // Example où examplePreset() retourne: [integrationUn, integrationDeux, ...etc]
  examplePreset()
]
```
