---
layout: ~/layouts/MainLayout.astro
title: Référence des Modèles de Directives
---

Les **modèles de directives** sont des attributs HTML spéciaux disponibles dans les Templates de tous les composants Astro (fichiers `.astro`).

Les modèles de directives sont utilisés pour contrôler un élément ou un composant dans un certain sens. Un modèle de directive peut activer une fonctionnalité du compilateur qui facilite votre vie (par exemple, utiliser `class:list` au lieu de `class`). Ou, un modèle de directive peut demander au complilateur d'Astro de faire quelque chose de spécial avec ce composant (par exemple, l'hydrater avec `client:load`).

Cette page décrit tous les modèles de directives disponibles pour vous dans Astro, et comment ils fonctionnent.
## Règles

Pour qu'un modèle de directive soit valide, il doit :

- Inclure deux point `:` dans son nom, utilisant la forme `X:Y` (ex: `client:load`).
- Dois être visible au compilateur (par exemple, `<X {...attr}>` ne fonctionnerait pas si `attr` contenait une directive).

Certains modèles de directives, mais pas tous, peuvent prendre une valeur personnalisée :
- `<X client:load />` (ne prend aucune valeur)
- `<X class:list={['some-css-class']} />` (prend un tableau)

Un modèle de directive n'est jamais inclus directement dans la sortie HTML finale d'un composant.

## Modèles de Directives Communs
### class:list

`class:list={...}` prend un tableau de valeurs de classe et les convertit en une chaîne de classes. Ceci est directement inspiré la librarie populaire par @lukeed [clsx](https://github.com/lukeed/clsx), mais construit directement dans Astro.

`class:list` prend un tableau contennant différents types de valeurs possibles :
- `string` : Ajouté à l'élément `class`
- `Object` : Toutes les clés évaluées à `true` sont ajoutées à l'élément `class`
- `Array` : Aplati en une chaine de charactères
- `Set` : Aplati en une chaine de charactères

```astro
<!-- Ceci -->
<span class:list={[ 'hello goodbye', { hello: true, world: true }, new Set([ 'hello', 'friend' ]) ]} />
<!-- Deviens -->
<span class="hello goodbye world friend"></span>
```

Les valeurs dupliquées sont automatiquement supprimées.

### `set:html`

`set:html={string}` injecte une chaîne HTML dans un élément, similaire à l'écriture `el.innerHTML`.

**La valeur n'est pas automatiquement échappée par Astro !** Assurez-vous que vous faites confiance à celle-ci, ou que vous l'avez échappée manuellement avant de l'envoyer au Template. Oublier cette étape vous rendra sensible à des attaques [Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/).

```astro
---
const rawHTMLString = "Hello <strong>World</strong>"
---
<h1>{rawHTMLString}</h1>
  <!-- Affiche : <h1>Hello &lt;strong&gt;World&lt;/strong&gt;</h1> -->
<h1 set:html={rawHTMLString} />
  <!-- Affiche : <h1>Hello <strong>World</strong></h1> -->
```

Vous pouvez aussi utiliser `set:html` sur un `<Fragment>` pour éviter d'ajouter un élément superflu. Cela peut être particulièrement utile lorsque vous récupérez de l'HTML depuis un CMS.

```astro
---
const cmsContent = await fetchHTMLFromMyCMS();
---
<Fragment set:html={cmsContent}>
```

### `set:text`

`set:text={string}` injecte une chaîne de texte dans un élément, similaire à l'écriture `el.innerText`. À la différence de `set:html`, la valeur `string` passée est échappée automatiquement par Astro.

C'est équivalent à juste passer une variable directement dans une expression de Template (par exemple : `<div>{someText}</div>`) et donc cette directive n'est pas souvent utilisée.
## Directives Client

Ces directives contrôlent la façon dont les composants de [Framework côté-client](/fr/core-concepts/framework-components) sont hydratés sur la page.

Par défaut, un composant de Framework UI n'est pas hydraté par le navigateur. Si aucune directive `client:*` n'est fournie, son HTML est rendu sur la page sans JavaScript.

### `client:load`

- **Priorité :** Haute
- **Utile pour :** Éléments UI qui doivent être interactifs dès leur apparition.

Charge et hydratte le JavaScript du composant immédiatement à l'ouverture de la page.

```astro
<BuyButton client:load />
```
### `client:idle`

- **Priorité :** Moyenne
- **Utile pour :** Éléments UI de basse priorité qui ne doivent pas être immédiatement interactifs.

Charge et hydratte le JavaScript du composant une fois que la page a terminée son chargement initial et que l'événement `requestIdleCallback` a été déclenché. Si vous êtes dans un navigateur qui ne supporte pas [`requestIdleCallback`](https://developer.mozilla.org/fr/docs/Web/API/Window/requestIdleCallback), alors l'événement [`load`](https://developer.mozilla.org/fr/docs/Web/API/Window/load_event) de la page est utilisé.

```astro
<ShowHideButton client:idle />
```
### `client:visible`

- **Priorité :** Basse
- **Utile pour :** Éléments UI de basse priorité qui sont soit loin dans la page ("sous le pli"), soit très côuteuses en ressources à charger que vous ne préférerez pas charger si l'utilisateur n'a jamais vu l'élément.

Charge et hydratte le JavaScript du composant une fois que le composant a entré dans la vue de l'utilisateur. Cela utilise un `IntersectionObserver` en interne pour suivre la visibilité.

```astro
<HeavyImageCarousel client:visible />
```

### `client:media`

- **Priorité :** Basse
- **Utile pour :** Éléments UI de basse priorité qui sont affichés uniquement sur certaines tailles d'écran.

`client:media={string}` charge et hydrate le JavaScript du composant une fois que la requête CSS média correspondante est mise en place.

Note : Si le composant est déjà caché et affiché par une requête CSS média dans votre CSS, alors il peut être plus facile d'utiliser `client:visible` et non de passer la même requête CSS média dans la directive.

```astro
<SidebarToggle client:media="(max-width: 50em)" />
```
### `client:only`

`client:only={string}` **ignore** sa génération HTML sur le serveur, et rend le composant uniquement côté client. Cela agit similairement à `client:load` dans laquelle le composant est chargé, rendu et hydraté immédiatement à l'ouverture de la page.

**Vous devez passer le framework correct du composant en tant que valeur !** Parce qu'Astro n'éxécute pas le composant pendant votre build / sur le serveur, Astro ne sait pas quel framework utilise votre composant, à moins que vous lui indiquiez explicitement.

```astro
<SomeReactComponent client:only="react" />
<SomePreactComponent client:only="preact" />
<SomeSvelteComponent client:only="svelte" />
<SomeVueComponent client:only="vue" />
<SomeSolidComponent client:only="solid-js" />
```

## Directives de Script & Style

Ces directives ne peuvent être utilisées qu'à des balises `<script>` et `<style>`, pour contrôler la façon dont votre JavaScript et votre CSS sont traités sur la page.

### `is:global`

Par défaut, Astro englobe automatiquement les règles CSS `<style>` à l'intérieur du composant. Vous pouvez sortir de ce comportement avec la directive `is:global`.

`is:global` fait que le contenu de la balise `<style>` s'applique globalement sur la page lorsque le composant est inclus. Ceci désactive le système d'isolation du CSS d'Astro. C'est équivalent à mettre tous les sélecteurs dans une balise `<style>` avec `:global()`.

Vous pouvez combiner `<style>` et `<style is:global>` dans le même composant, pour créer des règles de style globales tandis que vous scopez la plus partie de votre CSS du composant.

📚 Voir la page [CSS et Stylisation](/fr/guides/styling/#styles-globaux) pour plus de détails sur la façon dont les styles globaux fonctionnent.

```astro
<style is:global>
  body a { color: red; }
</style>
```

### `is:inline`

Par défaut, Astro traite, optimise et compresse toutes les balises `<script>` et `<style>` qu'il voit sur la page. Vous pouvez sortir de ce comportement avec la directive `is:inline`.

`is:inline` dit à Astro de laisser la balise `<script>` ou `<style>` tel quel dans la sortie HTML finale. Le contenu ne sera pas traité, optimisé ou compressé. Cela limite certaines fonctionnalités d'Astro, comme l'importation d'un package npm ou l'utilisation d'un language en plus du CSS comme Sass.

La directive `is:inline` signifie que les balises `<style>` et `<script>` :

- Ne seront pas compressées dans un fichier externe.
- Ne seront pas dédoublées lorsque l'élément apparaîtra plusieurs fois sur la page.
- N'aura pas ses références `import`/`@import`/`url()` résolues relativement au fichier `.astro`.
- Sera pré-traité, par exemple `<style lang="sass">` va toujours générer son CSS.
- Sera rendu dans la sortie HTML finale exactement où elle est écrite.
- Les styles seront globaux et non englobés au composant.

> ⚠️ La directive `is:inline` est implicite lorsque n'importe quelle autre attribut que `src` est utilisé sur une balise `<script>` ou `<style>`.

```astro
<style is:inline>
  /* inline: les références relatives à un package npm ne sont pas supportées. */
  @import '/assets/some-public-styles.css';
  span { color: green; }
</style>

<script is:inline>
  /* inline: les références relatives à un package npm ne sont pas supportées. */
  console.log('I am inlined right here in the final output HTML.');
</script>
```

### `define:vars`

`define:vars={...}` peut envoyer des variables côté serveur depuis le Front-matter dans votre composant dans le `<script>` ou `<style>` côté client. Toute variable Front-matter *sérialisable* est supportée, y compris les propriétés passées à votre composant via `Astro.props`.

```astro
---
const foregroundColor = "rgb(221 243 228)";
const backgroundColor = "rgb(24 121 78)";
const message = "Astro est génial !";
---
<style define:vars={{ textColor: foregroundColor, backgroundColor }}>
  h1 {
    background-color: var(--backgroundColor);
    color: var(--textColor);
  }
</style>

<script define:vars={{ message }}>
  alert(message);
</script>
```

>⚠️ L'utilisation de `define:vars` sur une balise `<script>` ou `<style>` implique la directive `is:inline`, ce qui signifie que vos scripts ou styles ne seront pas fusionnés et seront inclus directement dans la HTML. Voir la [section dédiée](#isinline) sur `is:inline` pour plus de détails.

## Directives Avancées
### `is:raw`

`is:raw` instruis le compilateur d'Astro de traiter tous les enfants de cet élément comme du texte. Cela signifie que toute syntaxe spéciale d'un Template Astro sera ignorée à l'intérieur de ce composant.

Utilisé en interne par le composant `<Markdown>`.

Par exemple, si vous aviez un composant Katex personnalisé qui convertit certains textes en HTML, vous pourriez faire cela :

```astro
---
import Katex from '../components/Katex.astro';
---
<Katex is:raw>Some conflicting {syntax} here</Katex>
```
