---
layout: ~/layouts/MainLayout.astro
title: Référence ILC
---

## Commandes

### `astro dev`

Lance le serveur d'Astro en mode `dev`. Cette commande démarre un serveur HTTP qui répond aux requêtes pour les routes ou les pages qui sont spécifiées dans le répertoire `src/pages` (à moins que vous ne remplacez votre option `pages` dans la [configuration du projet](/fr/reference/configuration-reference)).

**Options**

#### `--port`

Spécifie quel port utiliser. Par défaut, `3000`.

#### `--host [addresse d'hôte optionnelle]`

Définit quelles adresses IP le serveur dev doit écouter (par exemple, adresses IP autres que localhost).
- `--host` - écoute sur toutes les adresses, y compris les adresses LAN et les adresses publiques
- `--host [adresse d'hôte personnalisée]` - expose sur une adresse IP du réseau à l'`[adresse d'hôte personnalisée]`

### `astro build`

Construit votre site pour l'environnement de production.

### `astro preview`

Démarre un serveur local de fichiers statiques pour servir le répertoire `dist/` construit. Utile pour prévisualiser votre build statique localement, avant de le déployer.

Cette commande est destinée uniquement à des tests locaux, et n'est pas conçue pour être lancée en production. Pour obtenir de l'aide pour le déploiement en production, consultez notre guide sur le [Déploiement d'un site web d'Astro](/fr/guides/deploy).

### `astro check`

Exécute des diagnostics (par exemple, vérification des types) sur votre projet et rapporte les erreurs à la console. Si des erreurs sont trouvées, le processus s'arrêtera avec un code **1**.

Cette commande est destinée à être utilisée dans des workflows pour les intégrations continues.

## Options Globales

### `--config path`

Spécifie le chemin vers le fichier de configuration. Par défaut, `astro.config.mjs`. Utilisez cette option si vous utilisez un nom différent pour votre fichier de configuration ou que votre fichier de configuration est dans un autre dossier.

```shell
astro --config config/astro.config.mjs dev
```

### `--root path`

Spécifie le chemin vers le répertoire racine du projet. Si non spécifié, le répertoire courant est considéré comme étant le répertoire racine.

Le répertoire racine est utilisé pour trouver le fichier de configuration d'Astro.

```shell
astro --root examples/snowpack dev
```

### `--reload`

Efface le cache (les dépendances sont construites dans les applications d'Astro).

### `--verbose`

Active le journalisation avancée, ce qui est utile lors du débogage d'un problème.

### `--silent`

Active le journalisation silencieuse, ce qui est utile lorsque vous ne souhaitez pas voir les logs d'Astro.

### `--version`

Affiche le numéro de version d'Astro et quitte le processus.

### `--help`

Affiche le message d'aide et quitte le processus.
