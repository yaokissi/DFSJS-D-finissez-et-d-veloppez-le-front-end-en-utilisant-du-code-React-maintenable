# TéléSport - Historique des Jeux Olympiques

Application web interactive permettant de visualiser et d'analyser l'historique des performances des pays aux Jeux Olympiques. Ce projet a été développé en **React** et **TypeScript** avec une architecture modulaire propre et évolutive.

---

## Fonctionnalités

- **Tableau de Bord Interactif (Dashboard)** : Visualisation du nombre total de médailles par pays sous forme de graphique circulaire interactif (Pie chart).
- **Détails par Pays** : Graphique d'évolution temporelle (Line chart) présentant le nombre de médailles remportées lors des 5 dernières éditions des JO.
- **Indicateurs Clés de Performance (KPIs)** :
  - **Dashboard** : Nombre total de pays participants, nombre d'éditions des JO.
  - **Page Détails** : Nombre de participations, total de médailles remportées, total d'athlètes envoyés.
- **Navigation Fluide** : Routage dynamique et gestion des erreurs d'URL (redirection vers une page 404 personnalisée).
- **Design Adaptatif (Responsive)** : Interface optimisée pour l'ensemble des écrans (desktop, tablettes et mobiles).

---

##  Stack Technique & Prérequis

### Prérequis
- **Node.js** : Version 22 LTS ou supérieure
- **npm** : Installé automatiquement avec Node.js

### Stack Technique
- **React 19** : Bibliothèque UI pour la gestion des composants et du state.
- **TypeScript 5.9** : Typage statique fort pour sécuriser les données et le code.
- **Vite 7** : Serveur de développement ultra-rapide et bundler de production.
- **Tailwind CSS 4** : Framework CSS utilitaire pour un design moderne et responsive.
- **React Router 6** : Gestion du routage et de la navigation SPA.
- **Chart.js 4** & **React Chartjs 2** : Création de graphiques interactifs (Pie & Line).
- **ESLint** : Validation de la qualité du code et respect des normes.

---

##  Installation et Utilisation

### 1. Cloner le projet
```bash
git clone https://github.com/yaokissi/DFSJS-D-finissez-et-d-veloppez-le-front-end-en-utilisant-du-code-React-maintenable.git
cd DFSJS-D-finissez-et-d-veloppez-le-front-end-en-utilisant-du-code-React-maintenable
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera accessible localement à l'adresse : [http://localhost:5173](http://localhost:5173)

### 4. Générer le build de production
Pour compiler et optimiser l'application pour la production :
```bash
npm run build
```

### 5. Lancer le Linter
Pour vérifier le respect des standards et la propreté du code :
```bash
npm run lint
```

---

## Structure du Projet

L'application respecte les principes d'une architecture modulaire qui sépare la logique métier, la gestion des données et l'affichage. Le code source est structuré dans `src/app/` :

```text
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
```

---

## Choix Techniques & Architecture

1. **Composants Smart & Dumb** :
   - Les **Pages** (Smart) gèrent la logique d'état, récupèrent les données à l'aide de hooks et effectuent les calculs métiers.
   - Les **Composants** (Dumb) se contentent de recevoir des données via leurs `props` et de les afficher. Cela garantit une forte réutilisabilité et facilite les tests.
2. **Custom Hooks pour les Données** :
   - L'accès aux données est encapsulé dans le hook `useData`. Actuellement branché sur des données mockées avec un délai de chargement simulé (`setTimeout`), il permettra d'intégrer une API REST à l'avenir en modifiant uniquement ce hook.
3. **Respect des règles de Hooks** :
   - L'ordre des hooks dans chaque composant (notamment dans `country.tsx`) est rigoureusement structuré pour éviter les appels conditionnels ou après des retours anticipés (`early returns`).
4. **Typage strict TypeScript** :
   - Aucun type `any` n'est utilisé dans le code source de l'application afin de garantir une fiabilité maximale au build et d'éviter les erreurs de structure de données en production.
5. **Gestion d'Erreur & Redirection 404** :
   - Si un utilisateur tente d'accéder à un pays avec un ID inexistant, le composant `Country` effectue une redirection automatique vers la route `/404` grâce à `useNavigate` et un effet contrôlé, évitant tout écran blanc ou erreur de rendu.
