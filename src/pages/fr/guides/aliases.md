---
layout: ~/layouts/MainLayout.astro
title: Alias
description: Une introduction aux alias avec Astro.
---

Un **alias** est une façon de créer des raccourcis pour vos imports.

Les alias peuvent aider à améliorer l'expérience de développement dans les codebases avec de nombreux dossiers ou des imports relatifs.

```astro
---
// my-project/src/pages/about/company.astro

import Button from '../../components/controls/Button.astro';
import logoUrl from '../../assets/logo.png?url';
---
```

Dans cet exemple, un développeur devrait connaitre la relation d'arbre entre `src/pages/about/company.astro`, `src/components/controls/Button.astro`, et `src/assets/logo.png`. Et puis, si le fichier `company.astro` était déplacé, ces imports étaient aussi nécessaires à être mis à jour.

Vous pouvez ajouter des alias d'imports depuis `tsconfig.json` ou `jsconfig.json`.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"]
    }
  }
}
```

Avec cette modification, vous pouvez maintenant importer à partir des alias n'importe où dans votre projet :

```astro
---
// my-project/src/pages/about/company.astro

import Button from '@components/Button';
import logoUrl from '@assets/logo.png';
---
```

Ces alias sont également intégrés automatiquement dans [VSCode](https://code.visualstudio.com/docs/languages/jsconfig) et d'autres éditeurs.
