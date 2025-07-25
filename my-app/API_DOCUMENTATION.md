# API Documentation - Système de Gestion de File d'Attente

## Vue d'ensemble

Cette API REST permet de gérer un système de file d'attente bancaire avec les fonctionnalités suivantes :

-   Gestion des services
-   Gestion des guichets et agents
-   Création et suivi de tickets
-   Intégration mobile pour les clients

## Base URL

```
http://votre-domaine.com/api/v1
```

## Authentification

Actuellement, l'API est accessible sans authentification pour faciliter l'intégration mobile.

---

## Endpoints

### Services

#### GET `/services`

Récupère la liste de tous les services disponibles.

**Réponse :**

```json
[
    {
        "id": 1,
        "nom": "Compte Courant",
        "code": "A",
        "description": "Ouverture et gestion de compte courant",
        "duree_estimee": 15,
        "actif": true,
        "created_at": "2024-01-15T09:00:00.000000Z",
        "updated_at": "2024-01-15T09:00:00.000000Z"
    }
]
```

#### GET `/services/{id}`

Récupère les détails d'un service spécifique.

---

### Guichets

#### GET `/guichets`

Récupère la liste de tous les guichets.

**Réponse :**

```json
[
    {
        "id": 1,
        "numero": "01",
        "nom": "Guichet 1",
        "statut": "libre",
        "created_at": "2024-01-15T09:00:00.000000Z",
        "updated_at": "2024-01-15T09:00:00.000000Z"
    }
]
```

#### POST `/guichets/{id}/appeler-prochain`

Appelle le prochain client dans la file d'attente pour ce guichet.

#### PATCH `/guichets/{id}/statut`

Met à jour le statut d'un guichet.

**Body :**

```json
{
    "statut": "libre|occupe|hors_service"
}
```

---

### Agents

#### GET `/agents`

Récupère la liste de tous les agents.

**Réponse :**

```json
[
    {
        "id": 1,
        "nom": "Jean Dupont",
        "email": "jean.dupont@banque.com",
        "role": "agent",
        "statut_agent": "connecte",
        "guichet_id": 1,
        "derniere_activite": "2024-01-15T10:30:00.000000Z",
        "guichet": {
            "id": 1,
            "numero": "01",
            "nom": "Guichet 1"
        }
    }
]
```

#### POST `/agents/{id}/connecter`

Connecte un agent à son guichet.

#### POST `/agents/{id}/deconnecter`

Déconnecte un agent de son guichet.

---

### Tickets

#### GET `/tickets`

Récupère la liste des tickets actifs (en_attente, appele, en_cours).

**Réponse :**

```json
[
    {
        "id": 1,
        "numero": "A001",
        "service_id": 1,
        "nom_client": "Marie Martin",
        "telephone_client": "0123456789",
        "statut": "en_attente",
        "position": 2,
        "guichet_id": null,
        "agent_id": null,
        "appele_a": null,
        "commence_a": null,
        "termine_a": null,
        "created_at": "2024-01-15T10:30:00.000000Z",
        "updated_at": "2024-01-15T10:30:00.000000Z",
        "service": {
            "id": 1,
            "nom": "Compte Courant",
            "code": "A"
        },
        "guichet": null,
        "agent": null
    }
]
```

#### POST `/tickets`

Crée un nouveau ticket.

**Body :**

```json
{
    "service_id": 1,
    "nom_client": "Jean Dupont",
    "telephone_client": "0123456789"
}
```

**Réponse :**

```json
{
    "id": 15,
    "numero": "A015",
    "service_id": 1,
    "nom_client": "Jean Dupont",
    "telephone_client": "0123456789",
    "statut": "en_attente",
    "position": 3,
    "guichet_id": null,
    "agent_id": null,
    "appele_a": null,
    "commence_a": null,
    "termine_a": null,
    "created_at": "2024-01-15T11:00:00.000000Z",
    "updated_at": "2024-01-15T11:00:00.000000Z",
    "service": {
        "id": 1,
        "nom": "Compte Courant",
        "code": "A",
        "description": "Ouverture et gestion de compte courant",
        "duree_estimee": 15,
        "actif": true
    }
}
```

#### GET `/tickets/{id}`

Récupère un ticket par son ID numérique.

**Réponse :** Même format que l'endpoint `/tickets` mais pour un seul ticket.

#### GET `/tickets/numero/{numero}`

Récupère un ticket par son numéro (ex: "A001").

**Réponse :** Même format que l'endpoint `/tickets/{id}`.

#### PATCH `/tickets/{id}/statut`

Met à jour le statut d'un ticket.

**Body :**

```json
{
    "statut": "en_attente|appele|en_cours|termine|annule"
}
```

---

## Modèles de Données

### Service

```json
{
    "id": "integer",
    "nom": "string",
    "code": "string (1 caractère)",
    "description": "string|null",
    "duree_estimee": "integer (minutes)",
    "actif": "boolean",
    "created_at": "datetime",
    "updated_at": "datetime"
}
```

### Guichet

```json
{
    "id": "integer",
    "numero": "string",
    "nom": "string",
    "statut": "enum: libre|occupe|hors_service",
    "created_at": "datetime",
    "updated_at": "datetime"
}
```

### User/Agent

```json
{
    "id": "integer",
    "nom": "string",
    "email": "string",
    "role": "enum: admin|agent",
    "statut_agent": "enum: connecte|deconnecte|null",
    "guichet_id": "integer|null",
    "derniere_activite": "datetime|null",
    "created_at": "datetime",
    "updated_at": "datetime",
    "guichet": "Guichet|null"
}
```

### Ticket

```json
{
    "id": "integer",
    "numero": "string (ex: A001)",
    "service_id": "integer",
    "nom_client": "string",
    "telephone_client": "string|null",
    "statut": "enum: en_attente|appele|en_cours|termine|annule",
    "position": "integer",
    "guichet_id": "integer|null",
    "agent_id": "integer|null",
    "appele_a": "datetime|null",
    "commence_a": "datetime|null",
    "termine_a": "datetime|null",
    "created_at": "datetime",
    "updated_at": "datetime",
    "service": "Service",
    "guichet": "Guichet|null",
    "agent": "User|null"
}
```

---

## Statuts

### Statuts des Tickets

-   **en_attente** : Le ticket est en file d'attente
-   **appele** : Le client a été appelé au guichet
-   **en_cours** : Le service est en cours de traitement
-   **termine** : Le service a été terminé avec succès
-   **annule** : Le ticket a été annulé

### Statuts des Guichets

-   **libre** : Le guichet est disponible
-   **occupe** : Le guichet traite actuellement un client
-   **hors_service** : Le guichet n'est pas disponible

### Statuts des Agents

-   **connecte** : L'agent est connecté et disponible
-   **deconnecte** : L'agent n'est pas disponible
-   **null** : Utilisateur admin (pas un agent)

---

## Codes de Réponse HTTP

-   **200 OK** : Requête réussie
-   **201 Created** : Ressource créée avec succès
-   **404 Not Found** : Ressource non trouvée
-   **422 Unprocessable Entity** : Erreur de validation
-   **500 Internal Server Error** : Erreur serveur

---

## Exemples d'Intégration Mobile

### Création d'un Ticket (React Native)

```javascript
const createTicket = async (serviceId, nomClient, telephoneClient) => {
    try {
        const response = await fetch(
            "http://votre-domaine.com/api/v1/tickets",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    service_id: serviceId,
                    nom_client: nomClient,
                    telephone_client: telephoneClient,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const ticket = await response.json();
        return ticket;
    } catch (error) {
        console.error("Erreur lors de la création du ticket:", error);
        throw error;
    }
};
```

### Récupération d'un Ticket par Numéro

```javascript
const getTicketByNumber = async (ticketNumber) => {
    try {
        const response = await fetch(
            `http://votre-domaine.com/api/v1/tickets/numero/${ticketNumber}`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Ticket non trouvé");
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const ticket = await response.json();
        return ticket;
    } catch (error) {
        console.error("Erreur lors de la récupération du ticket:", error);
        throw error;
    }
};
```

### Récupération de la Liste des Services

```javascript
const getServices = async () => {
    try {
        const response = await fetch(
            "http://votre-domaine.com/api/v1/services"
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const services = await response.json();
        return services;
    } catch (error) {
        console.error("Erreur lors de la récupération des services:", error);
        throw error;
    }
};
```

---

## Notes d'Implémentation

1. **Numérotation des Tickets** : Les numéros de tickets sont générés automatiquement selon le format `{code_service}{numéro_séquentiel}` (ex: A001, B012)

2. **Position dans la File** : La position est calculée automatiquement en fonction des tickets en attente pour le même service

3. **Timestamps** : Tous les timestamps sont en format ISO 8601 (UTC)

4. **Relations** : Les objets liés (service, guichet, agent) sont automatiquement inclus dans les réponses via Eloquent

5. **Performance** : L'API utilise les relations Eloquent pour optimiser les requêtes et éviter le problème N+1

Cette documentation fournit tous les éléments nécessaires pour intégrer l'API dans une application mobile ou tout autre système externe.
