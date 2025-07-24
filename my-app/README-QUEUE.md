# 🏦 Système de Gestion de File d'Attente Bancaire

Un système complet de gestion de file d'attente bancaire avec interface web et mobile.

## 🚀 Fonctionnalités

### 📱 Interface Mobile (`/mobile`)

-   Création de tickets depuis un mobile
-   Sélection du service bancaire
-   Génération automatique du numéro de ticket
-   Interface simple et épurée

### 💻 Dashboard Administrateur (`/admin`)

-   Supervision générale du système
-   Gestion des guichets et agents
-   Statistiques avancées et monitoring
-   Contrôle des flux de tickets
-   Interface de supervision complète

### 👤 Interface Agent (`/agent`)

-   Interface simplifiée pour les agents
-   Connexion/déconnexion aux guichets
-   Gestion directe des tickets assignés
-   Vue de la file d'attente personnelle
-   Actions rapides de traitement

### 📺 Affichage Public (`/affichage`)

-   Écran d'affichage pour la clientèle
-   Tickets appelés et en cours de traitement
-   État des guichets en temps réel
-   Mise à jour automatique toutes les 5 secondes

## 🛠️ Installation

### Prérequis

-   PHP 8.1+
-   Composer
-   Node.js 18+
-   SQLite (ou MySQL/PostgreSQL)

### Étapes d'installation

1. **Cloner et installer les dépendances**

```bash
git clone <votre-repo>
cd my-app
composer install
npm install
```

2. **Configuration de l'environnement**

```bash
cp .env.example .env
php artisan key:generate
```

3. **Base de données**

```bash
# Créer la base SQLite
touch database/database.sqlite

# Configurer .env
DB_CONNECTION=sqlite
DB_DATABASE=/chemin/absolu/vers/database/database.sqlite

# Migrer et seeder
php artisan migrate:fresh --seed
```

4. **Données de test (optionnel)**

```bash
php artisan db:seed --class=TicketTestSeeder
```

5. **Compiler les assets**

```bash
npm run build
```

6. **Démarrer le serveur**

```bash
php artisan serve
```

## 📋 Utilisation

### 1. Accès aux interfaces

-   **Page d'accueil** : `http://localhost:8000`
-   **Sélection Interface** : `http://localhost:8000/dashboard` (connexion requise)
-   **Dashboard Admin** : `http://localhost:8000/admin` (connexion requise)
-   **Interface Agent** : `http://localhost:8000/agent`
-   **Mobile** : `http://localhost:8000/mobile`
-   **Affichage Public** : `http://localhost:8000/affichage`

### 2. Compte administrateur par défaut

-   **Email** : `test@example.com`
-   **Mot de passe** : `password`

### 3. Workflow typique

1. **Client** : Utilise `/mobile` pour créer un ticket
2. **Agent** : Accède à `/agent` pour se connecter et gérer sa file
3. **Administrateur** : Supervise via `/admin`
4. **Public** : Consulte `/affichage` pour voir les appels

## 🔧 API Endpoints

### Services

-   `GET /api/v1/services` - Liste des services
-   `GET /api/v1/services/{id}` - Détails d'un service

### Guichets

-   `GET /api/v1/guichets` - Liste des guichets
-   `POST /api/v1/guichets/{id}/appeler-prochain` - Appeler le prochain ticket

### Tickets

-   `GET /api/v1/tickets` - Liste des tickets actifs
-   `POST /api/v1/tickets` - Créer un nouveau ticket
-   `PATCH /api/v1/tickets/{id}/statut` - Changer le statut
-   `GET /api/v1/tickets/numero/{numero}` - Rechercher par numéro

### Agents

-   `GET /api/v1/agents` - Liste des agents
-   `POST /api/v1/agents/{id}/connecter` - Connecter un agent à un guichet
-   `POST /api/v1/agents/{id}/deconnecter` - Déconnecter un agent

## 📊 Structure de la Base de Données

### Tables principales

-   **services** : Services bancaires (Dépôt, Retrait, etc.)
-   **guichets** : Postes de service
-   **agents** : Employés de la banque
-   **tickets** : Tickets de file d'attente

### Relations

-   Un guichet appartient à un service
-   Un agent peut être connecté à un guichet
-   Un ticket est assigné à un guichet et un agent

## 🎨 Technologies Utilisées

### Backend

-   **Laravel 11** - Framework PHP
-   **Inertia.js** - SPA avec rendu côté serveur
-   **SQLite** - Base de données

### Frontend

-   **React 18** - Interface utilisateur
-   **Tailwind CSS** - Styles
-   **Axios** - Requêtes HTTP

## 🔄 Statuts des Tickets

1. **en_attente** - Ticket créé, en attente d'appel
2. **appele** - Ticket appelé à un guichet
3. **en_cours** - Traitement en cours
4. **termine** - Service terminé
5. **annule** - Ticket annulé

## 🎯 Fonctionnalités Avancées

-   **Actualisation automatique** des données
-   **Génération automatique** des numéros de ticket
-   **Gestion des positions** dans la file
-   **Interface responsive** pour tous les appareils
-   **Affichage public** temps réel
-   **API REST** complète

## 🚀 Déploiement

### Production

```bash
# Optimisation
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Assets
npm run build

# Base de données
php artisan migrate --force
```

### Variables d'environnement importantes

```env
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=mysql  # ou postgresql
```

## 📝 Personnalisation

### Ajouter un nouveau service

1. Modifier le `ServiceSeeder`
2. Créer les guichets correspondants
3. Redémarrer la migration

### Modifier l'interface

-   Composants React dans `resources/js/Components/`
-   Pages dans `resources/js/Pages/`
-   Styles Tailwind personnalisés dans `resources/css/app.css`

## 🐛 Dépannage

### Problèmes courants

-   **Erreur 500** : Vérifier les logs dans `storage/logs/`
-   **Assets non trouvés** : Relancer `npm run build`
-   **Base de données** : Vérifier les permissions SQLite

### Logs

```bash
# Logs Laravel
tail -f storage/logs/laravel.log

# Logs du serveur
php artisan serve --verbose
```

## 📞 Support

Pour toute question ou problème, consulter :

-   Les logs de l'application
-   La documentation Laravel
-   La documentation Inertia.js

---

🎉 **Système prêt à l'emploi !** Le système de gestion de file d'attente bancaire est maintenant opérationnel.
