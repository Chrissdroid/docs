---
layout: ~/layouts/MainLayout.astro
title: Récupération de Données
description: Apprennez comment récupérer des données distantes avec Astro en utilisant l'API fetch.
---

Les fichiers `.astro` peuvent récupérer des données distantes à la compilation pour aider à la génération de vos pages.

## `fetch()` dans Astro

Tous les [composants Astro](/fr/core-concepts/astro-components) ont accès à la fonction [globale `fetch()`](https://developer.mozilla.org/fr/docs/Web/API/fetch) dans leur script de composant pour faire des requêtes HTTP vers des APIs. Cette appel de fonction sera exécuté à la compilation, et les données seront disponibles pour le modèle de composant afin de générer le HTML dynamique.

💡 Prenez profit de la fonctionnalité "[**top-level await (EN)**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await)" à l'intérieur de votre script de composant Astro.

💡 Passez les données récupérées à Astro et aux composants de framework, comme des propriétés.

```astro
// src/components/User.astro
---
import Contact from '../components/Contact.jsx';
import Location from '../components/Location.astro';

const response = await fetch('https://randomuser.me/api/');
const data = await response.json();
const randomUser = data.results[0]
---
<!-- Données récupérées à la compilation peuvent être affichées dans le HTML -->
<h1>Utilisateur</h1>
<h2>{randomUser.name.first} {randomUser.name.last}</h2>

<!-- Données récupérées à la compilation peuvent être transmises aux composants comme des propriétés -->
<Contact client:load email={randomUser.email} />
<Location city={randomUser.location.city} />
```

### Requêtes GraphQL

Astro peut aussi utiliser `fetch()` pour interroger un serveur GraphQL avec n'importe quelle requête GraphQL valide.

```astro
---
const response = await fetch("https://graphql-weather-api.herokuapp.com",
  {
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
        query getWeather($name:String!) {
            getCityByName(name: $name){
              name
              country
              weather {
                summary {
                    description
                }
              }
            }
          }
        `,
      variables: {
          name: "Paris",
      },
    }),
  })

const json = await response.json();
const weather = json.data
---
  <h1>Récupération des données météo à la compilation</h2>
  <h2>{weather.getCityByName.name}, {weather.getCityByName.country}</h3>
  <p>Météo Actuelle : {weather.getCityByName.weather.summary.description}</p>
```
> 💡 Souvenez-vous, toutes les données dans les composants Astro sont récupérées lorsqu'un composant est rendu.

Votre site Astro déployé récupère les données **une fois, à la compilation**. Dans un environement de développement, vous verrez des appels de fonction de récupération de données sur les actualisations de composants. Si vous avez besoin de récupérer des données plusieurs fois client-side, utilisez un [composant de framework](/fr/core-concepts/framework-components) ou un [script client-side](/fr/core-concepts/astro-components/#scripts-côté-client) dans un composant Astro.

## `fetch()` dans les Composants de Framework

La fonction `fetch()` est également disponible dans tous les [composants de framework](/fr/core-concepts/framework-components) :

```tsx
// Movies.tsx
import type { FunctionalComponent } from 'preact';
import { h } from 'preact';

const data = await fetch('https://example.com/movies.json').then((response) =>
  response.json()
);

// Les composants qui sont rendus à la compilation écrivent également dans la console.
// Les composants qui sont rendus avec une directive client:* écrivent également dans la console du navigateur.
console.log(data);

const Movies: FunctionalComponent = () => {
  // Affiche le résultat sur la page
  return <div>{JSON.stringify(data)}</div>;
};

export default Movies;
```
