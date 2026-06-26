# Documentation de l'Architecture Front-End - TéléSport

Bienvenue sur le projet historique des Jeux Olympiques de TéléSport. 
Cette documentation a pour but de présenter la structure modulaire de l'application React afin de faciliter la maintenance et l'intégration de nouveaux développeurs.

## Arborescence des dossiers

L'application suit une architecture qui sépare les responsabilités. Le code source se trouve dans le dossier `src/app/`

src/
├── App.tsx                 # Déclaration des routes (React Router) et assemblage global
├── main.tsx                # Point d'entrée de l'application
├── index.css               # Directives de styles globaux et Tailwind CSS
└── app/
    ├── components/         # Composants UI réutilisables ("Dumb Components")
    │   ├── HeaderComponent.tsx # En-tête dynamique recevant un titre et des indicateurs
    │   ├── Indicator.tsx       # Carte KPI affichant un titre et une valeur numérique
    │   └── MedalChart.tsx      # Composant graphique pour le diagramme circulaire des médailles
    ├── data/               # Données statiques
    │   └── data.ts         # Données historiques simulées des Jeux Olympiques
    ├── hooks/              # Logique métier et requêtes de données
    │   └── UseData.ts      # Custom hook simulant le chargement asynchrone des données
    ├── models/             # Modèles et interfaces TypeScript
    │   └── olympics.ts     # Typages stricts (Country, Participation)
    └── pages/              # Vues principales de l'application ("Smart Components")
        ├── home.tsx        # Page d'accueil avec indicateurs généraux et graphique circulaire
        ├── country.tsx     # Page de détails d'un pays avec indicateurs spécifiques et graphique linéaire
        └── NotFound.tsx    # Page d'erreur 404 affichée pour les URL inconnues

## Composants ("Smart" et "Dumb")

- **Composants "Smart"**
  Ce sont les composants du dossier Pages (Home.tsx, Country.tsx, NotFound.tsx).
  
  **Rôle** : Ils sont responsables de la logique métier. Ils sont connectés aux données via les Custom Hooks, gèrent les états de chargement, et distribuent les informations aux composants enfants.
  
  **Caractéristique** : Ils n'ont pas ou peu de code de design complexe, ils se contentent d'assembler les éléments.

- **Composants "Dumb"**
  Ce sont les composants du dossier Components (Indicator.tsx, MedalChart.tsx, HeaderComponent.tsx).
  
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
    