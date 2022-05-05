---
layout: ~/layouts/MainLayout.astro
title: Astro vs. X
description: Comparaison entre Astro et d'autres générateurs de sites statiques comme Gatsby, Next.js, Nuxt, Hugo, Eleventy, et plus.
---
Nous avons souvent la question, "Quels sont les avantages d'Astro par rapport à mon projet préféré, **\_\_\_\_**?"

Ce guide a été écrit pour répondre à cette question pour plusieurs générateurs de sites et alternatives à Astro.

Les deux principales caractéristiques de Astro par rapport aux autres alternatives sont :

- [L'Hydratation Partielle](/fr/core-concepts/partial-hydration)
- [L'utilisation de vos framework(s) favoris](/fr/core-concepts/framework-components)

Pour plus de détails, vous pouvez consulter nos comparaisons en profondeur sur cette page.

Si vous ne trouvez pas votre générateur de site préféré, [demandez-nous sur discord](https://astro.build/chat).

## Docusaurus vs. Astro

[Docusaurus](https://docusaurus.io/) est un générateur de sites de documentation très populaire. Docusaurus utilise React pour générer l'interface utilisateur de votre site web, mais Astro supporte React, Preact, Vue.js, Svelte, SolidJS, AlpineJS, Lit et modèle HTML brut.

Docusaurus à été conçu pour créer des sites de documentation et possède quelques fonctionnalités spécifiques aux sites de documentation que ne possède pas Astro. A contrario, Astro propose des fonctionnalités spécifiques à la documentation via un thème officiel [`docs`](https://github.com/withastro/astro/tree/main/examples/docs) que vous pouvez utiliser pour votre site. Ce site a été construit avec ce thème !

#### Comparons les performances de Docusaurus vs. Astro

Dans la plupars des cas, Astro charge plus rapidement que les sites sous Docusaurus. Cela est dû à la manière dont Astro retire automatiquement tout le JavaScript inutile de la page, hydratant seulement les composants individuels qui en ont besoin. Cette fonctionnalité est appelée "[hydratation partielle](/fr/core-concepts/partial-hydration)".

Docusaurus ne supporte pas l'hydratation partielle, et à la place, il fait le chargement et la rehydratation de la page entière dans le navigateur, même si la plupart du contenu de la page est statique. Cela crée un chargement de page plus lent et une performance négative pour votre site web. Il n'y a pas de moyen de désactiver cette fonctionnalité dans Docusaurus.

#### Étude de cas : Construction d'un site de documentation

[docusaurus.io/docs](https://docusaurus.io/docs) est la documentation officielle de Docusaurus, construit avec Docusaurus. Le site web offre une conception et des fonctionnalités similaires à celles de la documentation officielle d'Astro. Cela nous donne une **_comparaison réaliste_** entre les deux générateurs de sites.

- **Score de performance de Docusaurus**: 61 points sur 100 [(audit complet)](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fdocusaurus.io%2Fdocs)
- **Score de performance d'Astro**: 99 points sur 100 [(audit complet)](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fdocs.astro.build%2Fgetting-started)

Une des plus grosses raisons pour cette différence de performance est que Astro charge moins de JavaScript que Docusaurus. [docusaurus.io/docs](https://docusaurus.io/docs) charge **238kb** de JavaScript au premier chargement de la page, mais [docs.astro.build](https://docs.astro.build) charge **78.7kb** (67% moins de JavaScript, en tout) _après_ le premier chargement.

## Elder.js vs. Astro

[Elder.js](https://elderguide.com/tech/elderjs/) est un générateur de site statique restreint fait pour Svelte.

Elder.js utilise Svelte pour afficher votre site web. Cepedant, Astro est plus flexible : vous êtes libre de construire l'interface utilisateur avec n'importe quel composant de librairie (React, Preact, Vue, Svelte, Solid et d'autres) ou une syntaxe de composant Astro similaire à du code HTML + JSX.

Elder.js est l'unique, sur cette liste, générateur de site statique qui supporte l'[hydratation partielle](/fr/core-concepts/partial-hydration). Astro et Elder.js sont tous deux capables de retirer du code JavaScript inutile de la page, hydratant seulement les composants individuels qui en ont besoin. Elder.js a une API d'hydratation partielle différente et Astro supporte quelques fonctionnalités qu'Elder.js ne possède pas (comme `client:media`). Cependant, côté performances, les deux générateurs produiront des sites très similaires.

Elder.js utilises une façon de gérer les routes qui peut sembler étrange pour les nouveaux développeurs. Astro utilise [un routage par fichier](/fr/core-concepts/routing) qui devrait sembler familier pour tout ceux qui utilisent de Next.js, SvelteKit, ou même d'autres générateurs de sites statiques comme Eleventy.

Elder.js à été conçu pour être utilisé sur des sites très larges, et est capable de compiler un seul site de ~20 000 pages en moins de 10 minutes (sur une machine virtuelle modeste). Au moment de la rédaction, Astro a construit ~1 000 pages en 66 secondes, mais il n'a pas encore été testé sur des projets de plus de 20 000 pages. Astro est toujours en bêta, et atteindre la vitesse de construction Elder.js est un objectif pour la version 1.0 de Astro.

Elder.js supporte la génération de page statique (SSG) et le rendu du site (SSG). À ce jour, Astro ne supporte que la génération de page statique (SSG).

## Eleventy vs. Astro

<!-- TODO [i18n-FR] Eleventy vs. Astro -->

[Eleventy](https://www.11ty.dev/) is a popular static site builder, powered by Node.js.

Eleventy uses several [older HTML templating languages](https://www.11ty.dev/docs/languages/) to render your website: Nunjucks, Liquid, Pug, EJS, and others. Astro lets you create pages using your favorite UI component libraries (React, Preact, Vue, Svelte, and others) or a built-in component syntax which is similar to HTML + JSX. Eleventy does not support using modern UI components for HTML templating.

#### Comparing Eleventy vs. Astro Performance

Conceptually, Eleventy is aligned with Astro’s "minimal client-side JavaScript" approach to web development. Eleventy and Astro both offer similar, zero-JavaScript-by-default performance baselines.

Eleventy achieves this by pushing you to avoid JavaScript entirely. Eleventy sites are often written with little to no JavaScript at all. This becomes an issue when you do need client-side JavaScript. It is up to you to create your own asset build pipeline for Eleventy. This can be time consuming and forces you to set up bundling, minification, and other complex optimizations yourself.

By contrast, Astro automatically builds your client-side JavaScript & CSS for you. Astro automatically strips unnecessary JavaScript from the page, hydrating only the individual components that need it. This feature is called [partial hydration](/en/core-concepts/partial-hydration). While it is possible to achieve this yourself in Eleventy, Astro offers it built in by default.

## Gatsby vs. Astro

<!-- TODO [i18n-FR] Gatsby vs. Astro -->

[Gatsby](https://www.gatsbyjs.com/) is a popular website & application framework for React.

Gatsby uses React to render your website. Astro is more flexible: you are free to build UI with any popular component library (React, Preact, Vue, Svelte, Solid and others) or Astro’s HTML-like component syntax which is similar to HTML + JSX.

Gatsby v4 supports both Static Site Generation (SSG) with incremental rebuilds, Deferred Static Generation (DSG), and Server-Side Rendering (SSR). Today, Astro only supports Static Site Generation (SSG).

Gatsby requires a custom GraphQL API for working with all of your site content. While some developers enjoy this model, a common criticism of Gatsby is that this model becomes too complex and difficult to maintain over time, especially as sites grow. Astro has no GraphQL requirement, and instead provides familiar APIs (like `fetch()` and top-level `await`) for data loading close to where the data is needed.

#### Comparing Gatsby vs. Astro Performance

In most cases, Astro websites will load significantly faster than Gatsby websites. This is because Astro automatically strips unnecessary JavaScript from the page, hydrating only the individual components that need it. This feature is called [partial hydration](/en/core-concepts/partial-hydration).

Gatsby doesn't support partial hydration, and instead makes the user load and rehydrate the entire page in the browser, even if most of the page content is static. This creates a slower page load and worse performance for your website. Gatsby has [a community plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-no-javascript/) for removing all JavaScript from the page, but this would break many websites. This leaves you with an all-or-nothing decision for interactivity on each page.

Gatsby has a great plugin ecosystem, which could make Gatsby a better choice for your project depending on your needs. [gatsby-plugin-image](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/) is a popular plugin for image optimizations, which could make Gatsby a better choice for some image-heavy websites.

#### Case Study: Building a Documentation Website

[gatsbyjs.com/docs](https://www.gatsbyjs.com/docs/quick-start/) is the official Gatsby documentation website, built with Gatsby. The website offers a similar enough design and feature-set to compare against the official Astro documentation website. This gives us a **_rough, real-world_** comparison between the two site builders for this common use-case.

- **Gatsby performance score**: 64 out of 100 [(full audit)](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fwww.gatsbyjs.com%2Fdocs%2Fquick-start%2F)
- **Astro performance score**: 99 out of 100 [(full audit)](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fdocs.astro.build%2Fgetting-started)

One big reason behind this performance difference is Astro’s smaller JavaScript payload: [gatsbyjs.com/docs](https://www.gatsbyjs.com/docs/quick-start/) loads **417kb** of JavaScript on first page load while [docs.astro.build](https://docs.astro.build) loads **78.7kb** (81% less JavaScript, overall) _after_ first load.

## Hugo vs. Astro

<!-- TODO [i18n-FR] Hugo vs. Astro -->

[Hugo](https://gohugo.io/) is a popular static site generator, powered by Go.

Hugo uses a custom [templating language](https://gohugo.io/templates/introduction/) to render your website. Astro lets you create pages using your favorite UI component libraries (React, Preact, Vue, Svelte, and others) or a built-in component syntax which is similar to HTML + JSX. Hugo does not support using modern UI components for HTML templating.

#### Comparing Hugo vs. Astro Performance

Conceptually, Hugo is aligned with Astro’s "minimal client-side JavaScript" approach to web development. Hugo and Astro both offer similar, zero-JavaScript-by-default performance baselines.

Both Hugo and Astro offers built-in support for building, bundling and minifying JavaScript. Astro automatically strips unnecessary JavaScript from the page, hydrating only the individual components that need it. This feature is called [partial hydration](/en/core-concepts/partial-hydration). While it is possible to achieve this yourself in Hugo, Astro offers it built in by default.

## Jekyll vs. Astro

<!-- TODO [i18n-FR] Jekyll vs. Astro -->

[Jekyll](https://jekyllrb.com/) is a popular static site generator, powered by Ruby.

Jekyll uses an older [templating language](https://jekyllrb.com/docs/liquid/) to render your website called Liquid. Astro lets you create pages using your favorite UI component libraries (React, Preact, Vue, Svelte, and others) or a built-in component syntax which is similar to HTML + JSX. Jekyll does not support using modern UI components for HTML templating.

#### Comparing Jekyll vs. Astro Performance

Conceptually, Jekyll is aligned with Astro’s "minimal client-side JavaScript" approach to web development. Jekyll and Astro both offer similar, zero-JavaScript-by-default performance baselines.

Jekyll achieves this by pushing you to avoid JavaScript entirely. Jekyll sites are often written with little to no JavaScript at all, and instead promote server-side HTML rendering. This becomes an issue when you do need client-side JavaScript. It is up to you to create your own build pipeline for Jekyll. This can be time-consuming and forces you to set up bundling, minification, and other optimizations yourself.

By contrast, Astro automatically builds your client-side JavaScript for you. Astro only sends the bare minimum amount of JavaScript to the browser, minified, bundled and optimized for production. While it is possible to achieve this yourself in Jekyll, with Astro this is built in by default.

## SvelteKit vs. Astro

<!-- TODO [i18n-FR] SvelteKit vs. Astro -->

[SvelteKit](https://kit.svelte.dev/) is a popular website & application framework for Svelte.

SvelteKit uses Svelte to render your website. Astro is more flexible: you are free to build UI with any popular component library (React, Preact, Vue, Svelte, Solid and others) or Astro’s HTML-like component syntax which is similar to HTML + JSX.

Both SvelteKit and Astro are frameworks for building websites. SvelteKit does best with highly dynamic websites (like dashboards and inboxes) while Astro does best with highly static websites (like content and eCommerce websites).

SvelteKit supports both Static Site Generation (SSG) and Server-Side Rendering (SSR). Today, Astro only supports Static Site Generation (SSG).

#### Comparing SvelteKit vs. Astro Performance

In most cases, Astro websites will load faster than SvelteKit websites. This is because Astro automatically strips unnecessary JavaScript from the page, hydrating only the individual components that need it. This feature is called [partial hydration](/en/core-concepts/partial-hydration).

SvelteKit doesn't support partial hydration, and instead makes the user load and rehydrate the entire page in the browser, even if most of the page content is static. This creates a slower page load and worse performance for your website. SvelteKit does offer support for [page-level static, zero-JavaScript pages](https://kit.svelte.dev/docs#ssr-and-javascript-hydrate). However, there is no planned support for hydrating individual components on the page. This leaves you with an all-or-nothing decision for interactivity on each page.

#### Case Study: Building a Documentation Website

[kit.svelte.dev](https://kit.svelte.dev/docs#ssr-and-javascript-hydrate) is the official SvelteKit documentation website, built with SvelteKit. The website offers a similar enough design and feature set to compare against the official Astro documentation website. This gives us a **_rough, real-world_** comparison between the two site builders for this common use-case.

One notable difference between the two sites being tested: SvelteKit’s documentation is served as a single page while Astro’s is broken up into multiple pages. This larger content payload should have a slight negative impact on performance that is not related to the tool itself.

- **SvelteKit performance score**: 92 out of 100 [(full audit)](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fkit.svelte.dev%2Fdocs)
- **Astro performance score**: 99 out of 100 [(full audit)](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fdocs.astro.build%2Fgetting-started)

SvelteKit performed comparably to Astro in this test.

## Next.js vs. Astro

<!-- TODO [i18n-FR] Next.js vs. Astro -->

[Next.js](https://nextjs.org/) is a popular website & application framework for React.

Next.js uses React to render your website. Astro is more flexible: you are free to build UI with any popular component library (React, Preact, Vue, Svelte, Solid and others) or Astro’s HTML-like component syntax which is similar to HTML + JSX.

Both Next.js and Astro are frameworks for building websites. Next.js does best with highly dynamic websites (like dashboards and inboxes) while Astro does best with highly static websites (like content and eCommerce websites).

Next.js supports both Static Site Generation (SSG) and Server-Side Rendering (SSR). Today, Astro only supports Static Site Generation (SSG).

#### Comparing Next.js vs. Astro Performance

In most cases, Astro websites will load significantly faster than Next.js websites. This is because Astro automatically strips unnecessary JavaScript from the page, hydrating only the individual components that need it. This feature is called [partial hydration](/en/core-concepts/partial-hydration).

Next.js doesn't support partial hydration, and instead makes the user load and rehydrate the entire page in the browser, even if most of the page content is static. This creates a slower page load and worse performance for your website. Next.js has [experimental support](https://piccalil.li/blog/new-year-new-website/#heading-no-client-side-react-code) for fully-static, zero-JavaScript pages. However, there is no planned support for hydrating individual components on the page. This leaves you with an all-or-nothing decision for interactivity on each page.

Next.js has great built-in image optimizations, which could make Next.js a better choice for some image-heavy websites.

#### Case Study: Building a Documentation Website

[nextjs.org/docs](https://nextjs.org/docs/getting-started) is the official Next.js documentation website, built with Next.js. The website offers a similar enough design and feature set to compare against the official Astro documentation website. This gives us a **_rough, real-world_** comparison between the two site builders for this common use-case.

- **Next.js performance score**: 59 out of 100 [(full audit)](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fnextjs.org%2Fdocs%2Fgetting-started)
- **Astro performance score**: 99 out of 100 [(full audit)](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fdocs.astro.build%2Fgetting-started)

One big reason behind this performance difference is Astro’s smaller JavaScript payload: [nextjs.org/docs](https://nextjs.org/docs/getting-started) loads **463kb** of JavaScript on first page load while [docs.astro.build](https://docs.astro.build) loads **78.7kb** (83% less JavaScript, overall) _after_ first load.

## Nuxt vs. Astro

<!-- TODO [i18n-FR] Nuxt vs. Astro -->

[Nuxt](https://nuxtjs.org/) is a popular website & application framework for Vue. It is similar to Next.js.

Nuxt uses Vue to render your website. Astro is more flexible: you are free to build UI with any popular component library (React, Preact, Vue, Svelte, Solid and others) or Astro’s HTML-like component syntax which is similar to HTML + JSX.

Both Nuxt and Astro are frameworks for building websites. Nuxt does best with highly dynamic websites (like dashboards and inboxes) while Astro does best with highly static websites (like content and eCommerce websites).

Nuxt supports both Static Site Generation (SSG) and Server-Side Rendering (SSR). Today, Astro only supports Static Site Generation (SSG).

#### Comparing Nuxt vs. Astro Performance

In most cases, Astro websites will load significantly faster than Nuxt websites. This is because Astro automatically strips unnecessary JavaScript from the page, hydrating only the individual components that need it. This feature is called [partial hydration](/en/core-concepts/partial-hydration).

Nuxt doesn't support partial hydration, and instead makes the user load and rehydrate the entire page in the browser, even if most of the page content is static. This creates a slower page load and worse performance for your website. There is no way to disable this behavior in Nuxt.

Nuxt has great built-in image optimizations, which could make Nuxt a better choice for some image-heavy websites.

#### Case Study: Building a Documentation Website

[nuxtjs.org/docs](https://nuxtjs.org/docs/2.x/get-started/installation) is the official Nuxt documentation website, built with Nuxt. The website offers a similar enough design and feature set to compare against the official Astro documentation website. This gives us a **_rough, real-world_** comparison between the two site builders for this common use-case.

- **Nuxt performance score**: 48 out of 100 [(full audit)](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fnuxtjs.org%2Fdocs%2F2.x%2Fget-started%2Finstallation)
- **Astro performance score**: 99 out of 100 [(full audit)](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fdocs.astro.build%2Fgetting-started)

One big reason behind this performance difference is Astro’s smaller JavaScript payload: [nuxtjs.org/docs](https://nuxtjs.org/docs/2.x/get-started/installation) loads **469kb** of JavaScript on first page load while [docs.astro.build](https://docs.astro.build) loads **78.7kb** (83% less JavaScript), _after_ first load.

## VuePress vs. Astro

<!-- TODO [i18n-FR] VuePress vs. Astro -->

[VuePress](https://vuepress.vuejs.org/guide/) is a popular documentation website builder from the creators of Vue.js. VuePress uses Vue.js to generate your website UI while Astro supports React, Vue.js, Svelte, and raw HTML templating.

VuePress was designed for documentation websites and has some built-in, documentation-specific website features that Astro does not support out of the box. Instead, Astro offers documentation-specific features through an official [`docs`](https://github.com/withastro/astro/tree/main/examples/docs) theme that you can use for your site. This website was built using that template!

Evan You (creator of Vue.js) is currently working on a new version of Vuepress called [VitePress](https://vitepress.vuejs.org/). If you want a modern alternative to VuePress, [check out Evan’s post](https://github.com/withastro/astro/issues/1159#issue-974035962) on why VitePress may be a better option.

#### Comparing VuePress vs. Astro Performance

In most cases, Astro websites will load significantly faster than VuePress websites. This is because Astro automatically strips unnecessary JavaScript from the page, hydrating only the individual components that need it. This feature is called [partial hydration](/en/core-concepts/partial-hydration).

VuePress doesn't support partial hydration, and instead makes the user load and rehydrate the entire page in the browser, even if most of the page content is static. This creates a slower page load and worse performance for your website. There is no way to disable this behavior in VuePress.

#### Case Study: Building a Documentation Website

[vuepress.vuejs.org](https://vuepress.vuejs.org/guide/) is the official VuePress documentation website, built with VuePress. The website offers a similar enough design and feature set to compare against the official Astro documentation website. This gives us a **_rough, real-world_** comparison between the two site builders for this common use-case.

- **Vuepress performance score**: 63 out of 100 [(full audit)](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fvuepress.vuejs.org%2Fguide%2F)
- **Astro performance score**: 99 out of 100 [(full audit)](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fdocs.astro.build%2Fgetting-started)

One big reason behind this performance difference is Astro’s smaller JavaScript payload: [vuepress.vuejs.org](https://vuepress.vuejs.org/guide/) loads **166kb** of JavaScript on first page load while [docs.astro.build](https://docs.astro.build) loads **78.7kb** (53% less JavaScript, overall) _after_ first load.

## Zola vs. Astro

<!-- TODO [i18n-FR] Zola vs. Astro -->

[Zola](https://www.getzola.org/) is a popular and fast static site generator, powered by Rust.

Zola uses [Tera](https://tera.netlify.app/) to render your website. Astro lets you create pages using your favorite UI component libraries (React, Preact, Vue, Svelte, and others) or a built-in component syntax which is similar to HTML + JSX. Zola does not support using modern UI components for HTML templating.

#### Comparing Zola vs. Astro Performance

Conceptually, Zola is aligned with Astro’s "minimal client-side JavaScript" approach to web development. Zola and Astro both offer similar, zero-JavaScript-by-default performance baselines.

Astro offers built-in support for building, bundling and minifying JavaScript. Zola requires using another build tool like Webpack to bundle and process JavaScript. Astro automatically strips unnecessary JavaScript from the page, hydrating only the individual components that need it. This feature is called [partial hydration](/en/core-concepts/partial-hydration). While it is possible to achieve this yourself in Zola, Astro offers it built in by default.


## `.astro` vs `.jsx`

La syntaxe de composant Astro est une surcouche de l'HTML. Elle a été conçue pour ressembler à ce que l’on retrouve dans les langages de programmation comme HTML ou une experience JSX.

**Si vous connaissez l'HTML, vous en connaissez suffisament pour écrire votre premier composant Astro.**

| Fonctionnalité                       | Astro | JSX  |
| ------------------------------------ | ----- | --------- |
| Extension de fichiers                | `.astro` | `.jsx` or `.tsx` |
| Composants définis par l'utilisateur | `<Capitalized>` | `<Capitalized>`  |
| Syntaxe d'expression                 | `{}` | `{}` |
| Attributs étendus                    | `{...props}` | `{...props}` |
| Attributs conditionnels              | `autocomplete` === `autocomplete={true}` | `autocomplete` === `autocomplete={true}` |
| Fonctions inter-lignes               | `{items.map(item => <li>{item}</li>)}`  | `{items.map(item => <li>{item}</li>)}` |
| Affichage conditionnel               | `{condition && <p>texte<p>}`  | `{condition && <p>texte<p>}` |
| Supports d'éditeur de code           | [VS Code (Open VSX inclus), Nova](/fr/editor-setup) | Phénoménal |
| Demande une importation JS           | Non | Oui, `jsxPragma` (`React` ou `h`) doit être dans la portée du code |
| Fragments                            | Niveau global automatique, `<Fragment>` ou `<>` dans les fonctions | Entourer d'un `<Fragment>` ou d'un `<>` |
| Frameworks multiples par page        | Oui | Non |
| Modification de la balise `<head>`   | Utilise juste `<head>` dans les composants de pages | Par Framework (`<Head>`, `<svelte:head>`, etc) |
| Style des commentaires               | `<!-- HTML -->` | `{/_ JavaScript _/}`  |
| Caractères spéciaux                  | `&nbsp;`  | `&nbsp;`  |
| Attributs                            | `dash-case` | `camelCase`|
