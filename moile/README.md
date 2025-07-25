# QueueFlow Mobile - Application Mobile de Gestion de Tickets

## 📱 Description
Application mobile React Native avec Expo pour la gestion de tickets de file d'attente bancaire. Cette application permet aux clients de :
- Tirer un ticket pour un service bancaire
- Suivre le statut de leur ticket en temps réel
- Recevoir des notifications lors de leur tour

## 🚀 Technologies
- **React Native** avec Expo
- **React Navigation** pour la navigation
- **React Native Paper** pour l'interface utilisateur
- **Axios** pour les appels API
- **QR Code** pour la génération de codes QR
- **Linear Gradient** pour les effets visuels

## 📦 Installation et Configuration

### Prérequis
- Node.js (v16+)
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation
```bash
cd /path/to/mobile/project
npm install
```

### Configuration API
1. Ouvrez `src/config/constants.js`
2. Modifiez `API_CONFIG.BASE_URL` avec l'URL de votre serveur Laravel :
```javascript
export const API_CONFIG = {
  BASE_URL: 'http://VOTRE_IP:8000/api', // Remplacez par votre IP
  // ...
};
```

### Démarrage
```bash
npm start
```

## 📱 Screens (Écrans)

### 1. HomeScreen
- Écran d'accueil avec branding QueueFlow
- Boutons pour obtenir un ticket ou vérifier un ticket existant

### 2. ServiceSelectionScreen
- Liste des services bancaires disponibles
- Sélection du service désiré
- Estimation du temps d'attente

### 3. ClientInfoScreen
- Saisie des informations client (nom, téléphone)
- Sélection de la priorité (normale, senior, handicapé, urgent)
- Validation des données

### 4. TicketGeneratedScreen
- Affichage du ticket généré avec QR code
- Informations détaillées du ticket
- Actions : suivre, partager, nouveau ticket

### 5. TicketStatusScreen
- Recherche de ticket par numéro
- Affichage du statut en temps réel
- Informations de position dans la file
- Estimation du temps d'attente

## 🎨 Design System QueueFlow

### Couleurs
- **Primary**: #6366f1 (Indigo)
- **Secondary**: #8b5cf6 (Purple)
- **Background**: #f8fafc
- **Surface**: #ffffff
- **Text**: #1e293b

### Composants
- **Cards** avec ombres et coins arrondis
- **Gradients** pour les boutons principaux
- **Icons** Material Design
- **Status badges** avec couleurs contextuelles

## 🔗 API Integration

L'application communique avec le backend Laravel via les endpoints suivants :

### Services
- `GET /api/services` - Liste des services
- `GET /api/services/{id}/queue` - File d'attente d'un service

### Tickets
- `POST /api/tickets` - Créer un ticket
- `GET /api/tickets/{id}` - Détails d'un ticket
- `GET /api/tickets/by-number/{numero}` - Ticket par numéro
- `PUT /api/tickets/{id}/status` - Mettre à jour le statut

### Public
- `GET /api/public/queue` - File d'attente publique
- `GET /api/health` - Vérification de santé

## 📋 Structure du Projet

```
src/
├── components/
│   └── CommonComponents.js     # Composants réutilisables
├── config/
│   └── constants.js           # Configuration et constantes
├── screens/
│   ├── HomeScreen.js          # Écran d'accueil
│   ├── ServiceSelectionScreen.js  # Sélection de service
│   ├── ClientInfoScreen.js    # Informations client
│   ├── TicketGeneratedScreen.js   # Ticket généré
│   └── TicketStatusScreen.js  # Statut du ticket
└── services/
    └── ApiService.js          # Service de communication API
```

## 🔧 Configuration Backend Laravel Requise

### Routes API à ajouter (routes/api.php)
```php
Route::prefix('v1')->group(function () {
    // Services
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{id}/queue', [ServiceController::class, 'getQueue']);
    
    // Tickets
    Route::post('/tickets', [TicketController::class, 'store']);
    Route::get('/tickets/{id}', [TicketController::class, 'show']);
    Route::get('/tickets/by-number/{numero}', [TicketController::class, 'showByNumber']);
    Route::put('/tickets/{id}/status', [TicketController::class, 'updateStatus']);
    
    // Public
    Route::get('/public/queue', [PublicController::class, 'getQueue']);
    Route::get('/health', function () {
        return response()->json(['status' => 'ok']);
    });
});
```

### Headers CORS
Assurez-vous que les headers CORS sont configurés pour accepter les requêtes depuis l'application mobile.

## 🚀 Prochaines Étapes

1. **Backend Laravel** :
   - Ajouter les routes API manquantes
   - Configurer CORS pour les requêtes mobiles
   - Implémenter les contrôleurs API

2. **Notifications** :
   - Intégrer Expo Notifications
   - Système de push notifications
   - Notifications en temps réel

3. **Améliorations** :
   - Mode hors ligne avec cache local
   - Animations et transitions
   - Support multilingue
   - Tests unitaires

4. **Déploiement** :
   - Build APK/IPA
   - Publication sur stores
   - Configuration de production

## 🐛 Dépannage

### Problèmes courants

1. **Erreur de connexion API** :
   - Vérifiez l'URL dans `constants.js`
   - Assurez-vous que le serveur Laravel est démarré
   - Vérifiez la connectivité réseau

2. **Problèmes d'affichage** :
   - Redémarrez le serveur Expo
   - Effacez le cache : `expo start --clear`

3. **Erreurs de build** :
   - Vérifiez que toutes les dépendances sont installées
   - Mettez à jour Expo CLI : `npm install -g @expo/cli@latest`

## 📞 Support

Pour toute question ou problème :
- Email : support@queueflow.cm
- Téléphone : +237 123 456 789

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.
