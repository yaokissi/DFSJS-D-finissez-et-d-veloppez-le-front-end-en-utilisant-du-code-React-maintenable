# Documentation de l'Architecture Front-End - TéléSport

Bienvenue sur le projet historique des Jeux Olympiques de TéléSport. 
Cette documentation a pour but de présenter la structure modulaire de l'application React afin de faciliter la maintenance et l'intégration de nouveaux développeurs.

## Arborescence des dossiers

L'application suit une architecture qui sépare les responsabilités. Le code source se trouve dans le dossier `src/app/`

```text
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

## Composants ("Smart" et "Dumb")

- **Composants "Smart"**
  Ce sont les composants du dossier Pages (Home.tsx, Country.tsx).
  
  **Rôle** : Ils sont responsables de la logique métier. Ils sont connectés aux données via les Custom Hooks, gèrent les états de chargement, et distribuent les informations aux composants enfants.
  
  **Caractéristique** : Ils n'ont pas ou peu de code de design complexe, ils se contentent d'assembler les éléments.

- **Composants "Dumb"**
  Ce sont les composants du dossier Components (Indicator.tsx, CountryCard.tsx, MedalChart.tsx).
  
  **Rôle** : Leur unique travail est d'afficher de l'UI (Interface Utilisateur) à partir des propriétés (props) qu'on leur donne.
  
  **Caractéristique** : Ils ne sont pas connectés directement aux données externes. Ils reçoivent des données des composants parents (Smart) et les affichent. Cela les rend faciles à tester et à réutiliser n'importe où dans l'application.

- **Gestion des données : Le Custom Hook useData**
  **Rôle** : C'est ce fichier qui permet de récupérer les données et de les distribuer aux composants. Il est composé de deux parties : 
  1. La récupération des données : dans notre cas, c'est un tableau de pays avec leurs participations aux JO. 
  2. La distribution des données : il retourne les données formatées et typées, ainsi qu'un état isLoading pour permettre aux pages d'afficher des écrans de chargement dynamiques. 

- **Préparation à une future connexion Back-end/API**
  
  Grâce à notre découpage, l'intégration du futur back-end sera totalement transparente pour l'interface :

Nous modifierons uniquement le fichier useData.ts pour y inclure un appel API avec fetch (ex: fetch('https://api.telesport.fr/olympics')).

Aucun composant UI (Home, Country, Indicator...) ne devra être modifié. Ils continueront de recevoir les données de la même manière via le Hook.
    