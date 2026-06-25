# TéléSport - Audit de la codebase

Ce projet fonctionne, mais il reste très concentré autour d’un seul gros composant et d’une architecture encore peu découpée.

## Problèmes principaux

- le fichier app.tsx contient toute la logique: données, préparation des graphiques, routing et rendu UI. Cela rend le code difficile à tester et à faire évoluer.

- Les données sont mockées en dur dans le composant, avec un faux chargement avec le `setTimeout`., il manque des états `loading`, `error` pour la gestion du chargement.

- L'utilisation abusif de `any`, qui annule une bonne partie de l’intérêt de TypeScript et masque les erreurs de structure de données.

- On y trouve également des `console.log` et du code pas utilisé , notamment le composant `Country` non utilisé et un `eslint-disable` qui cache un problème plutôt que de le régler.

- L’UI répète plusieurs blocs presque identiques au lieu d’utiliser des composants réutilisables .

- La documentation ne correspond pas totalement avec le projet réel: le README mentionne une architecture et des fichiers de config qui ne correspondent pas exactement à ce qui est présent.

## Nouvelle structure front-end proposée

L’objectif est de séparer l’affichage, la logique métier et l’accès aux données pour rendre l’application plus claire et plus évolutive.

```text
src/app/
├── components/
├── pages/
├── hooks/
├── models/
├── data/
└── app.tsx
```

- `pages/` contient les écrans complets de l’application, par exemple la page d’accueil et la page détail d’un pays.
- `components/` contient les composants réutilisables, surtout les composants “dumb” qui affichent uniquement l’interface à partir de props.
- `hooks/` contient la logique de récupération et de transformation des données. Aujourd’hui, ces hooks liront les JSON mockés; plus tard, ils deviendront les points de contact avec une API REST.
- `models/` contient les types TypeScript et les modèles métier pour éviter `any` et sécuriser les échanges de données.
- `data/` contient les fichiers JSON mockés utilisés pendant la phase actuelle du projet.
- `app.tsx` garde seulement le routing et l’assemblage global de l’application.

## Déplacement logique des fichiers

- `App.tsx` vers `src/app/app.tsx` pour conserver le shell de l’application.
- Tout les écrans de l'app seront dans `src/app/pages/`.
- Les cartes, indicateurs et graphiques réutilisables vers `src/app/components/`.
- La récupération et la transformation des données vers `src/app/hooks/`.
- Les types `Country`, `Participation`, `OlympicsData`, etc. vers `src/app/models/`.

```
src/
├── App.tsx                 # Point d'entrée et routeur global (React Router)
└── app/
    ├── components/         # Composants d'interface réutilisables
    │   ├── CountryCard.tsx
    │   ├── Indicator.tsx
    │   └── MedalChart.tsx
    ├── data/               # Données statiques
    │   └── data.ts     
    ├── hooks/              # Logique métier et appels de données
    │   └── useData.ts      
    ├── models/             # Interfaces et typages stricts TypeScript
    │   └── olympics.ts     
    └── pages/              # Vues principales de l'application
        ├── Country.tsx
        └── Home.tsx
```

## Pourquoi cette organisation

- Elle réduit la taille des composants, facilite les tests et l'évolution du code dans le futur.
- Elle clarifie la séparation entre composants smart et dumb.
- Elle prépare à recevoir l’intégration du back-end .
- Elle améliore la lisibilité du projet pour les prochaines implémentations.





