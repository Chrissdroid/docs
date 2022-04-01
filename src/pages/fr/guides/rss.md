---
layout: ~/layouts/MainLayout.astro
title: Flux RSS
description: Une introduction aux flux RSS avec Astro.
---

Astro supporte la génération rapide et automatique de flux RSS pour tout blogs et autres contenus. Pour plus d'informations sur les flux RSS, voir [aboutfeeds.com](https://aboutfeeds.com/).

Vous pouvez créer un flux RSS depuis n'importe quelle page Astro qui utilise une fonction `getStaticPaths()` pour le routage. Seuls les routes dynamiques peuvent utiliser `getStaticPaths()` actuellement (voir le [Routage](/fr/core-concepts/routing)).

> Nous espérons que cette fonctionnalité sera disponible pour toutes les autres pages avant la version 1.0. Afin de contourner cela, pour l'instant, vous pouvez convertir une route statique en route dynamique qui génère un seul fichier. Voir le [Routage](/fr/core-concepts/routing) pour plus d'informations sur les routes dynamiques.

Créez un flux RSS en appelant la fonction `rss()` qui est passée en argument à `getStaticPaths()`. Cela créera un fichier `rss.xml` dans votre finalisation, en se basant sur les données que vous fournissez en utilisant le tableau `items`.

```js
// Example: /src/pages/posts/[...page].astro
// Placez cette fonction dans le script de votre composant Astro.
export async function getStaticPaths({rss}) {
  const allPosts = Astro.fetchContent('../post/*.md');
  const sortedPosts = allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  // Générer un flux RSS à partir de cette collection
  rss({
    // Le titre, la description et les métadonnées personnalisées du flux RSS.
    title: 'Don’s Blog',
    // Voir la section "Stylisation" ci-dessous
    stylesheet: true,
    description: 'An example blog on Astro',
    customData: `<language>en-us</language>`,
    // La liste des éléments pour votre flux RSS, triés par ordre aphabétique.
    items: sortedPosts.map(item => ({
      title: item.title,
      description: item.description,
      link: item.url,
      pubDate: item.date,
    })),
    // Optionnel: Personnaliser l'emplacement du fichier.
    // Sinon, par défaut, il est nommé à cet emplacement "/rss.xml"
    dest: "/my/custom/feed.xml",
  });
  // Retourner vos chemins
  return [...];
}
```

Note: Les flux RSS ne seront **pas** générés durant le développement. Actuellement, les flux RSS ne sont générés que lors de votre finalisation.

### Stylisation

Les flux RSS peuvent être stylisés avec un feuille de style XSL pour une expérience utilisateur plus agréable lorsqu'ils sont ouverts directement dans un navigateur. Par défaut, Astro n'a pas défini de feuille de style pour les flux RSS, mais il peut l'activer en définissant l'option `stylesheet`.

Astro peut utiliser automatiquement [Pretty Feed](https://github.com/genmon/aboutfeeds/blob/main/tools/pretty-feed-v3.xsl), une feuille de style XSL open-source populaire. Pour l'activer, changez la valeur `stylesheet: true`.

Si vous souhaitez utiliser une feuille de style XSL personnalisée, vous pouvez passer une chaîne de caractères comme `stylesheet: '/my-custom-stylesheet.xsl'`. Ce fichier doit être dans le répertoire `public/` (dans ce cas, `public/my-custom-stylesheet.xsl`).
