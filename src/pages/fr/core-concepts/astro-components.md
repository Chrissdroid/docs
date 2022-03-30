---
layout: ~/layouts/MainLayout.astro
title: Composants
description: Une introduction à la syntaxe des composants en .astro.
---

**Les composants Astro** sont les blocs de fondation de tout projet Astro. Ce sont des composants contenant seulement le code modèle en HTML sans code rendu à l'utilisateur.

La syntaxe des composants Astro est une surcouche de l'HTML. Elle a été conçue pour ressembler à ceux qui écrivent du HTML ou du JSX, et ajoute la possibilité d'inclure des composants et des expressions JavaScript. Vous pouvez remarquer un composant Astro par son extension de fichier : `.astro`.

Les composants Astro sont extrêmement flexible. Il y a souvent des composants qui contiennent des **UI réutilisables sur la page**, comme un header ou un profil. D'autres composants peuvent contenir un morceau de HTML, comme un ensemble de balises `<meta>` qui rendent le SEO facile à utiliser. Les composants Astro peuvent aussi contenir un layout de page entier.

La chose la plus importante à savoir sur les composants Astro est qu'**ils rendent leurs contenus HTML durant la compilation**. Cela signifie que si vous utilisez du JavaScript dans vos composants, ils seront tous exécutés avant la compilation, et que le résultat sera un site plus rapide, avec aucune charge de JavaScript ajoutée par défaut.

## Vue d'ensemble des composants

Un composant Astro est composé de deux parties principales : le **Script du composant** et le **Template du composant**. Chacune de ces parties s'occupent de faire une tâche différente, mais ensembles, font un cadre qui est facile à utiliser et qui est assez expressive pour gérer ce que vous voulez construire.

```astro
---
// Script du composant (JavaScript)
---
<!-- Template du composant (HTML + Expressions JS) -->
```

Vous pouvez utiliser des composants dans d'autres composants, pour construire des interfaces plus avancées. Par exemple, un composant `Button` peut être utilisé pour créer un composant `ButtonGroup` comme ceci :

```astro
---
// Example: ButtonGroup.astro
import Button from './Button.astro';
---
<div>
  <Button title="Button 1" />
  <Button title="Button 2" />
  <Button title="Button 3" />
</div>
```

### Le script du composant

Astro utilise des barres de code (`---`) pour identifier le script du composant dans votre composant Astro. Si vous avez déjà écrit du Markdown avant, vous pourriez être déjà familiarisé avec un concept similaire appelé *front matter*. L'idée de l'astro est directement inspirée de ce concept.

Vous pouvez utiliser le script du composant pour écrire du code JavaScript qui vous aidera à construire votre template. Cela peut inclure :

- Importer d'autres composants Astro
- Importer des composants de framework, comme React
- Importer des données, comme un fichier JSON
- Récupérer le contenu d'une API ou une base de données
- Créer des variables que vous voulez référencer dans votre template

```astro
---
import SomeAstroComponent from '../components/SomeAstroComponent.astro';
import SomeReactComponent from '../components/SomeReactComponent.jsx';
import someData from '../data/pokemon.json';

// Acceder aux propriétés passées dans le composant, comme `<X title="Hello, World" />`
const {title} = Astro.props;
// Récupérer des données externes, même depuis une API privée ou une base de données
const data = await fetch('SOME_SECRET_API_URL/users').then(r => r.json());
---
<!-- Votre template ici ! -->
```

Les barrières de code sont conçues pour garantir que le code JavaScript que vous écrivez à l'interieur "ne puisse pas s'échapper". Elles ne sortiront pas de votre application frontend, ou tomberont pas dans les mains de l'utilisateur. Vous pouvez écrire du code JavaScript qui peux être coûteux ou sensible (comme un appel à votre base de données privée) sans vous inquiéter de ce qui finis dans le navigateur de l'utilisateur.

>💡 *Vous pouvez également écrire du TypeScript dans votre script de composant !*

### Le template du composant

En dessous du script du composant se trouve le template du composant. Le template du composant détermine le HTML de votre composant.

Si vous écrivez du HTML simple ici, votre composant rendra cet HTML dans n'importe quelle page que vous importiez et utilisez.

Par contre, la syntaxe du template du composant Astro supporte également les **expressions JavaScript**, les **composants importés** et les **directives spéciales Astro**. Les données et les valeurs définies (à la compilation) dans le script du composant peuvent être utilisées dans le template du composant pour produire du HTML dynamique.

```astro
---
// Votre script du composant ici !
import ReactPokemonComponent from '../components/ReactPokemonComponent.jsx';
const myFavoritePokemon = [/* ... */];
---
<!-- les commentaires HTML sont supportés ! -->

<h1>Hello, world!</h1>

<!-- Utilisez les propriétés et autres variables du script du composant : -->
<p>Mon pokemon favoris est : {Astro.props.title}</p>

<!-- Inclure d'autres composants avec une directive `client:` pour l'hydrater : -->
<ReactPokemonComponent client:visible />

<!-- Mixez HTML avec des expressions JavaScript, similaire à JSX : -->
<ul>
  {myFavoritePokemon.map((data) => <li>{data.name}</li>)}
<ul>


```

### Expressions dynamiques JSX

Les composants Astro peuvent également définir des variables locales dans le script du composant. Toutes les variables sont alors automatiquement disponibles dans le template HTML du composant juste en dessous.

#### Valeurs dynamiques

Ces variables locales peuvent être utilisées dans des accolades pour passer des valeurs à utiliser comme texte HTML :

```astro
---
const name = "Astro";
---
<div>
  <h1>Hello {name}!</h1>
</div>
```

#### Attributs dynamiques

Ces variables locales peuvent être utilisées dans des accolades pour passer des valeurs à utiliser comme attributs d'éléments HTML et de composants :

```astro
---
const name = "Astro";
---
<h1 class={name}>Les expressions d'attributs sont supportés</h1>

<MyComponent templateLiteralNameAttribute={`MonNomEst${name}`} />
```

#### HTML dynamique

Ces variables locales peuvent être utilisées dans des fonctions ressemblantes au JSX pour produire des éléments HTML dynamiques :

```astro
---
const items = ["Chien", "Chat", "Ornithorynque"];
---
<ul>
  {items.map((item) => (
    <li>{item}</li>
  ))}
</ul>
```

#### Fragments & valeurs multiples

Souvenez vous : un composant Astro peut rendre plusieurs éléments sans avoir à les entourer d'une balise `<div>` ou `<>`.

Attention, quand vous utilisez une expression JSX pour créer plusieurs éléments dynamiques, vous devez entourer ces éléments à l'intérieur d'un **Fragment** comme vous le feriez dans du JavaScript ou du JSX. Astro supporte l'utilisation de `<Fragment> </Fragment>` ou des `<> </>`.

```astro
---
const items = ["Chien", "Chat", "Ornithorynque"];
---
<ul>
  {items.map((item) => (
    <>
      <li>Red {item}</li>
      <li>Blue {item}</li>
      <li>Green {item}</li>
    </>
  ))}
</ul>
```

### Propriétés de composants

Un composant Astro peut définir et accepter des propriétés. Ces propriétés sont alors disponibles dans le template du composant pour rendre du HTML. Les propriétés sont disponibles sur la variable globale `Astro.props` dans le script de votre frontmatter.

Voici un exemple de composant qui reçoit une propriété `greeting` et une propriété `name`. Notez que les propriétés à recevoir sont déstructurés de l'objet global `Astro.props`

```astro
---
// Example : GreetingHeadline.astro
// Utilisation : <GreetingHeadline greeting="Salutation" name="Partenaire" />
const { greeting, name } = Astro.props
---
<h2>{greeting}, {name} !</h2>
````

Vous pouvez aussi définir vos propres propriétés et leur types avec TypeScript en exposant une interface `Props`. Astro va automatiquement prendre toutes les interfaces `Props` exportées et donner des avertissements/erreurs de type pour votre projet. Ces propriétés peuvent aussi être données des valeurs par défaut lorsqu'elles sont déstructurées de `Astro.props`.

```astro
---
// src/components/GreetingHeadline.astro
export interface Props {
  name: string;
  greeting?: string;
}

const { greeting = "Salut", name } = Astro.props
---
<h2>{greeting}, {name} !</h2>
```

Ce composant, lorsqu'il est importé et rendu dans d'autres composants Astro, layouts ou pages, peut être ajouté de ces propriétés comme attributs :

```astro
---
// src/components/GreetingCard.astro
import GreetingHeadline from './GreetingHeadline.astro';
const name = "Astro"
---
<h1>Carte de bienvenue</h1>
<GreetingHeadline greeting="Hey" name={name} />
<p>J'espère que vous passez une exellente journée !</p>
```

### Emplacements

L'élément `<slot>` est un espace réservé pour HTML qui sera passé en dehors du composant par ses "enfants" (comme ils sont appelés dans React ou Preact). Les emplacements sont une façon de passer des données dans un composant Astro et sont utiles lorsque vous souhaitez réutiliser un composant "extérieur" rendu "autour" des données venant d'une source externe.

Un composant qui utilise l'élément `<slot />` peut être considéré comme un "conteneur" réutilisable autour de d'autres contenus, et ce modèle est le coeur d'un composants [Layout](/fr/core-concepts/layouts).


```astro
// src/components/Wrapper.astro
---
import Header from './Header.astro';
import Logo from './Logo.astro';
import Footer from './Footer.astro';

const { name } = Astro.props
---
<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{name}</h1>
  <slot />  <!-- l'enfant ira ici -->
  <Footer />
</div>

// src/components/Person.astro

<Wrapper name = "Astro">
  <h2>Je suis une personne.</h2>
  <p>Voici quelques truc à propos de moi.</p>
</Wrapper>
```

#### Emplacements nommés

Les emplacements peuvents aussi être **nommés**. En revanche, plutôt qu'un seul élément `<slot>` qui rendra _tous_ les enfants, les emplacements nommés permettent de spécifier plusieurs endroits où les enfants devraient être placés.

```astro
// src/components/Wrapper.astro
---
import Header from './Header.astro';
import Logo from './Logo.astro';
import Footer from './Footer.astro';

const { name } = Astro.props
---
<div id="content-wrapper">
  <Header />
  <slot name="after-header"/>  <!-- l'enfant avec l'attribut `slot="after-header"` ira ici -->
  <Logo />
  <h1>{name}</h1>
  <slot />  <!-- l'enfant sans un `slot`, ou avec l'attribut `slot="default"` ira ici -->
  <Footer />
  <slot name="after-footer"/>  <!-- l'enfant avec l'attribut `slot="after-footer"` ira ici -->
</div>

// src/components/Person.astro

<Wrapper name = "Astro">
  <img src="https://my.photo/astro.jpg" slot="after-header">
  <h2>Je suis une personne.</h2>
  <p slot="after-footer">Voici quelques truc à propos de moi.</p>
</Wrapper>

```

#### Contenu de remplacement pour les emplacements

Les emplacements peuvent aussi afficher des **contenus de remplacement**. Quand il n'y a pas d'enfants correspondants passés à un `<slot>`, un élément `<slot>` affichera ses propres enfants.

```astro
// src/components/Wrapper.astro
---
import Header from './Header.astro';
import Logo from './Logo.astro';
import Footer from './Footer.astro';

const { name } = Astro.props
---
<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{name}</h1>
  <slot>
    <p>Ceci est mon contenu de remplacement, seulement s'il n'y a pas d'enfants passés dans l'emplacement</p>
  </slot>
  <Footer />
</div>
```

### Styles CSS

Les balises `<style>` CSS sont également supportées dans le template du composant.

Elles peuvent être utilisées pour styliser vos composants, et toutes les règles de style sont automatiquement portées à l'intérieur du composant pour éviter les conflits de CSS dans de grosses applications.

```astro
---
// Votre script du composant ici !
---
<style>
  /* restreint au composant, les autres balises H1 sur la page restent les mêmes */
  h1 { color: red }
</style>

<h1>Hello, world!</h1>
```

> ⚠️ Les styles définis ici s'appliquent uniquement au contenu écrit directement dans le template du composant lui-même. Les enfants et tous les composants importés ne seront **pas** stylisés par défaut.

📚 Allez voir notre [Guide de stylisation](/fr/guides/styling) pour plus d'informations sur l'application de styles.

### Scripts côté client

Pour envoyer du JavaScript au navigateur sans utiliser un [composant de framework](/fr/core-concepts/framework-components) (React, Svelte, Vue, Preact, SolidJS, AlpineJS, Lit...) vous pouvez utiliser une balise `<script>` dans votre template du composant Astro et envoyer du JavaScript au navigateur qui s'exécute dans le contexte global.


```astro
<script>
  // Va être affiché dans l'HTML exactement comme écrit !
  // Les imports ESM ne seront pas résolus par rapport au fichier.
</script>

<script hoist type="module">
  // Optimisé ! Groupé ! Les imports ESM fonctionnent, même pour les packages npm.
</script>
```

#### Chargement de scripts externes

**Quand utiliser cette fonctionnalitée :** Si votre fichier JavaScript se trouve dans `public/`.

Notez que cette approche évite le traitement, le bundling et les optimisations JavaScript fournies par Astro lorsque vous utilisez la méthode d'importation décrite ci-dessous.

```astro
// Chemin absolu vers le fichier JavaScript
<script src="/some-external-script.js"></script>
```

#### Utilisation des scripts hoistés

**Quand utiliser cette fonctionnalitée :** Si votre script externe se trouve dans `src/` _et_ supporte l'importation par module ESM.

Astro detecte ces importations JavaScript côté client, les compile, optimise et les ajoute automatiquement le JS au code HTML.

```astro
// importation ESM
<script hoist type="module">
  import './some-external-script.js';
</script>
```

## Étapes suivantes

📚 En savoir plus sur les [composants inclus dans Astro](/fr/reference/api-reference/#built-in-components).

📚 Apprendre à utiliser des [composants de framework JavaScript](/fr/core-concepts/framework-components/) dans votre projet Astro.
