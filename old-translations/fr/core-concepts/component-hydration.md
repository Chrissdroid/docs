---
layout: ~/layouts/MainLayout.astro
title: Hydratation partielle dans Astro
description: Apprend comment l'hydratation partielle fonctionne avec l' "Islands Architecture" dans Astro.
---

**Astro va générer n'importe quel site sans aucun JavaScript côté client par défaut.** Utilisez n'importe quel composant frontend que vous voulez (React, Svelte, Vue, etc.) et Astro va le générer automatiquement en HTML et enlever tout JavaScript. Cela permet de garder chaque site ultra-rapide par défaut.

Mais par moments, du code JavaScript est nécessaire. Cette guide montre comment les composants interactifs fonctionnent dans Astro en utilisant une technique appelée **hydratation partielle**.

```astro
---
// Example : Importation et utilisation d'un composant React.
// Par défaut, Astro affiche ce code en pur HTML et CSS
// lors de la compilation, sans JavaScript côté client.
// (Besoin de JavaScript côté client? Lisez la suite...)
import MyReactComponent from '../components/MyReactComponent.jsx';
---
<!-- 100% HTML, Aucun JavaScript ! -->
<MyReactComponent />
```

## Concept : Hydration Partielle

Il y a de nombreux cas où vous avez besoin d'un composant UI interactif qui s'éxécute dans le navigateur :

- Un slider de présentation d'images
- Une barre de recherche avec autocomplétion
- Un bouton pour afficher/masquer une navigation mobile
- Un bouton "Ajouter au panier"

Dans Astro, c'est votre responsabilité de définir les composants qui doivent être hydratés dans le navigateur. Astro ne va hydrater que ce qui est nécessaire pour le fonctionnement de votre site et laisser le reste de votre site en HTML statique. Cette technique est appelée hydratation partielle (ou partial hydration en anglais).

**L'Hydratation partielle** -- l'action d'hydrater uniquement les composants interactifs qui nécessitent JavaScript et laisser le reste du site en HTML statique -- ça semble être relativement simple. Et ça le devrait ! Les sites ont été construits de cette façon depuis longtemps. Ce n'est que récemment que les applications multi-pages (SPAs) ont introduit l'idée que votre site entier devrait être écrit en JavaScript et compilé/affiché par chaque utilisateur dans le navigateur.

_Note : L'hydratation partielle est souvent appelée "amélioration progressive" ou "hydratation progressive". Malgrés qu'il y a certaines nuances entre ces termes, pour nos besoins, vous pouvez penser que ces deux termes sont synonymes du même concept._

**l'hydratation partielle est le secret pour lequel Astro est connu comme "fast-by-default" en terme de performances.** Next.js, Gatsby, et d'autres frameworks JavaScript ne supportent pas l'hydratation partielle parce qu'ils imaginent votre site/page entière comme une seule et même application JavaScript.

## Concept : Architecture Isolée

**Island architecture (ou Architecture Isolée)** est l'idée d'utiliser l'hydratation partielle pour construire des sites en entier. L'architecture isolée est une alternative à la construction de site sous JavaScript qui doit être envoyé au visiteur de celui-ci.

> Dans un modèle "Isolé", le rendu côté serveur n'est pas une amélioration optimisée visant à améliorer la SEO ou l'UX. Il s'agit plutôt de la partie fondamentale de la façon dont les pages sont envoyées au navigateur. L'HTML renvoyé en réponse à la navigation contient une représentation significative et immédiate du contenu que l'utilisateur a demandé.
> <br/> -- [Jason Miller](https://jasonformat.com/islands-architecture/)

Autre que les avantages évidents de ne pas envoyer de JavaScript au navigateur, il y a deux avantages clés à l'architecture isolée :

- **Les composants sont chargés individuellements.** Les composants plus légers (comme une navigation sur téléphone) ne sont pas bloqués par des composants plus lourds de la page.
- **Les composants sont isolés.** Chaques composants de la page sont isolées, et les performances de la page ne sont pas affectées par les autres.

![diagramme](https://res.cloudinary.com/wedding-website/image/upload/v1596766231/islands-architecture-1.png "Diagramme de l'Architecture Isolée"

## Hydrater des Composants Interactifs

Astro affiche chaque composant sur le serveur **à l'heure du build**, à moins que la directive [client:only](#mycomponent-clientonly-) n'ait pas été utilisé. Pour hydrater des composants sur le client **à l'exécution**, vous pouvez utiliser n'importe quelle des directives `client:*`. Une directive est un attribut de composant (toujours avec un `:`) qui indique à Astro comment votre composant doit être rendu.

```astro
---
// Exemple : hydratation d'un composant React dans le navigateur.
import MyReactComponent from '../components/MyReactComponent.jsx';
---
<!-- "client:visible" signifie que le composant ne chargera pas de
     JavaScript côté client pour le composant jusqu'à ce que celui-ci
     soit visible dans le navigateur de l'utilisateur. -->
<MyReactComponent client:visible />
```

Notez que l'intégration JS (par exemple React) et le CSS du composant sont téléchargés avec la page. Les directives `client:*` ne décident que lorsque le JS du composant est importé et lorsque le composant est hydraté.

### `<MyComponent client:load />`

Commence à importer le JS du composant au chargement de la page. Hydrate le composant lorsque l'importation est terminée.

### `<MyComponent client:idle />`

Commence à importer le JS du composant dès que le thread principal est libre (utilise [requestIdleCallback()][mdn-ric]). Hydrate le composant lorsque l'importation est terminée.

### `<MyComponent client:visible />`

ommence à importer le JS du composant dès que l'élément entre dans la zone de visuelle du navigateur (utilise [IntersectionObserver][mdn-io]). Hydrate le composant lorsque l'importation est terminée. Utile pour le contenu plus bas sur la page.

### `<MyComponent client:media={QUERY} />`

Commence à importer le JS du composant dès que le navigateur correspond à la requête média donnée (utilise [matchMedia][mdn-mm]). Hydrate le composant lorsque l'importation est terminée. Utile pour les interrupteurs de navigation téléphone, ou des éléments qui ne doivent s'afficher qu'à un écran mobile ou un écran de bureau.

### `<MyComponent client:only />`

Commence à importer le JS du composant au chargement de la page et l'hydrate une fois l'importation terminée, similaire a `client:load`. Le composant sera **ignoré** à l'heure du build, utile pour les composants qui sont entièrement dépendants d'APIs côté client. Le mieux est d'éviter son utilisation sauf si nécessaire, dans la plupart des cas, il est mieux d'afficher un contenu de remplacement sur le serveur et d'attendre les appels API du navigateur jusqu'à l'hydratation du composant dans le navigateur.

Si plusieurs intégrateurs sont inclus dans la [configuration](/fr/reference/configuration-reference) d'Astro, `client:only` a besoin d'informations pour savoir quel intégrateur utiliser pour le composant. Par exemple, `client:only="react"` ferrait en sorte que le composant soit hydraté dans le navigateur avec l'intégration React. Pour des intégrations personnalisés non fournis par `@astrojs`, utilisez le nom complet de l'intégration fournie dans votre config Astro, c'est-à-dire `<client:only="my-custom-renderer" />`.

📚 Voir notre [page de référence des directives](/fr/reference/directives-reference#composants-de-frameworks) pour plus d'information sur toutes les directives `client:`.

## Puis-je hydrater les composants Astro ?

Les [composants Astro](/fr/core-concepts/astro-components) (`.astro`) sont des composants de modèle uniquement HTML sans éxécution côté client. Si vous essayez d'hydrater un composant Astro avec un modificateur `client:`, vous obtiendrez une erreur.

Pour rendre votre composant interactif, vous devez le convertir vers le Framework frontend de votre choix: React, Svelte, Vue, etc. Si vous n'avez aucune préférence, nous vous recommandons React ou Preact, car ils sont les plus similaires à la syntaxe utilisée par Astro. L'utilisation d'un Framework fournit une éxécution côté client qui encapsule le JavaScript et permet l'utilisation des modificateurs `client:` par instance de composant.

Ou alors, vous pourriez ajouter une balise `<script>` à votre Template HTML de composant Astro et envoyer du JavaScript vers le navigateur de cette manière, mais ce script sera exécuté dans le contexte global et il n'y aura pas de composant client à attacher à un modificateur `client:`. Cependant, même si pas mal pour les choses simples, nous recommandons un Framework pour les composants plus complexes.

```astro
---
// Exemple : Utilisation d'Astro avec des balises script
---
<h1>Pas encore cliqué</h1>
<button>Cliquez pour changer le titre</button>
<script>
document.querySelector("button").addEventListener("click",() => {
    document.querySelector("h1").innerText = "cliqué !"
})
</script>
```

[mdn-io]: https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API
[mdn-ric]: https://developer.mozilla.org/fr/docs/Web/API/Window/requestIdleCallback
[mdn-mm]: https://developer.mozilla.org/fr/docs/Web/API/Window/matchMedia
