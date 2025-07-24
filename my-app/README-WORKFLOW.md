# Système de Gestion de File d'Attente - Workflow Simplifié

## 🚀 Démarrage Rapide

### 1. Connexion Unifiée
- **Page unique de connexion** : `/login`
- **Champ unique** : Email ou Matricule
- **Redirection automatique** selon le rôle (admin → `/admin`, agent → `/agent`)

### 2. Inscription Unifiée
- **Page unique d'inscription** : `/register`
- **Sélection du rôle** : Admin ou Agent
- **Matricule automatique** si rôle Agent

### 3. Comptes par Défaut

```bash
# Administrateur
Email: admin@banque.com
Mot de passe: admin123

# Agent de test
Matricule: AGT001
Mot de passe: agent123
```

## 📋 Workflow Simplifié

### Utilisateur Public
1. Visite `/` → Page d'accueil
2. Clique "Interface Mobile" → `/mobile` (création tickets)
3. Clique "Affichage Public" → `/affichage` (suivi temps réel)

### Personnel Bancaire
1. Visite `/` → Page d'accueil
2. Clique "Se Connecter" → `/login`
3. Saisit **email** (admin) ou **matricule** (agent)
4. Redirection automatique vers l'interface appropriée

### Nouvel Employé
1. Visite `/register`
2. Choisit son rôle (Admin/Agent)
3. Saisit son matricule si Agent
4. Création du compte et connexion automatique

## 🔐 Système d'Authentification

- **Un seul guard** : `web` (Laravel par défaut)
- **Une seule table** : `users`
- **Différenciation par rôles** : `admin` / `agent`
- **Identification flexible** : Email OU Matricule

## 🎯 Fonctionnalités

### Interface Mobile (`/mobile`)
- Sélection du service
- Création de ticket
- Affichage du numéro de ticket

### Affichage Public (`/affichage`)
- Liste des tickets en attente
- Ticket en cours de traitement
- Mise à jour temps réel

### Interface Agent (`/agent`)
- Gestion de son guichet
- Traitement des tickets
- Statut connecté/déconnecté

### Interface Admin (`/admin`)
- Gestion complète des services
- Gestion des guichets
- Gestion des agents
- Statistiques globales

## 🛠 Installation

```bash
# 1. Installation des dépendances
composer install
npm install

# 2. Configuration
cp .env.example .env
php artisan key:generate

# 3. Base de données
php artisan migrate --seed

# 4. Compilation des assets
npm run build

# 5. Lancement du serveur
php artisan serve
```

## 📱 URLs Principales

- **Accueil** : `/`
- **Connexion** : `/login`
- **Inscription** : `/register`
- **Mobile** : `/mobile`
- **Affichage** : `/affichage`
- **Agent** : `/agent` (protégé)
- **Admin** : `/admin` (protégé)

---

*Système optimisé pour la simplicité et l'efficacité*
