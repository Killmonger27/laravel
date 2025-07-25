# API Mobile - Récupération de Tickets

## Endpoints de Récupération

### GET `/api/v1/tickets/numero/{numero}`

Cet endpoint permet à l'application mobile de récupérer les informations complètes d'un ticket en utilisant son numéro unique.

### GET `/api/v1/tickets/{id}`

Cet endpoint permet de récupérer les informations complètes d'un ticket en utilisant son ID numérique unique.

## URL Complètes

```
GET http://votre-domaine.com/api/v1/tickets/numero/{numero}
GET http://votre-domaine.com/api/v1/tickets/{id}
```

## Paramètres

### Pour `/tickets/numero/{numero}`:

| Paramètre | Type   | Requis | Description                                     |
| --------- | ------ | ------ | ----------------------------------------------- |
| `numero`  | string | Oui    | Le numéro unique du ticket (ex: "A001", "B012") |

### Pour `/tickets/{id}`:

| Paramètre | Type    | Requis | Description                                    |
| --------- | ------- | ------ | ---------------------------------------------- |
| `id`      | integer | Oui    | L'ID numérique unique du ticket (ex: 1, 2, 15) |

## Exemples d'Utilisation

### 1. Requête HTTP (par numéro)

```http
GET /api/v1/tickets/numero/A001 HTTP/1.1
Host: votre-domaine.com
Content-Type: application/json
Accept: application/json
```

### 2. Requête HTTP (par ID)

```http
GET /api/v1/tickets/1 HTTP/1.1
Host: votre-domaine.com
Content-Type: application/json
Accept: application/json
```

### 3. JavaScript/React Native (fetch) - Par numéro

```javascript
const getTicketByNumber = async (ticketNumber) => {
    try {
        const response = await fetch(
            `http://votre-domaine.com/api/v1/tickets/numero/${ticketNumber}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const ticket = await response.json();
        return ticket;
    } catch (error) {
        console.error("Erreur lors de la récupération du ticket:", error);
        throw error;
    }
};

// Utilisation
getTicketByNumber("A001")
    .then((ticket) => {
        console.log("Ticket trouvé:", ticket);
        // Afficher les informations du ticket dans l'interface
    })
    .catch((error) => {
        console.error("Ticket non trouvé ou erreur:", error);
        // Afficher un message d'erreur à l'utilisateur
    });
```

### 4. JavaScript/React Native (fetch) - Par ID

```javascript
const getTicketById = async (ticketId) => {
    try {
        const response = await fetch(
            `http://votre-domaine.com/api/v1/tickets/${ticketId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const ticket = await response.json();
        return ticket;
    } catch (error) {
        console.error("Erreur lors de la récupération du ticket:", error);
        throw error;
    }
};

// Utilisation
getTicketByNumber("A001")
    .then((ticket) => {
        console.log("Ticket trouvé:", ticket);
        // Afficher les informations du ticket dans l'interface
    })
    .catch((error) => {
        console.error("Ticket non trouvé ou erreur:", error);
        // Afficher un message d'erreur à l'utilisateur
    });

// Ou par ID
getTicketById(1)
    .then((ticket) => {
        console.log("Ticket trouvé:", ticket);
    })
    .catch((error) => {
        console.error("Ticket non trouvé ou erreur:", error);
    });
```

### 5. React Native avec Axios

```javascript
import axios from "axios";

const getTicketByNumber = async (ticketNumber) => {
    try {
        const response = await axios.get(
            `http://votre-domaine.com/api/v1/tickets/numero/${ticketNumber}`
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error("Ticket non trouvé");
        }
        throw new Error("Erreur de connexion");
    }
};

const getTicketById = async (ticketId) => {
    try {
        const response = await axios.get(
            `http://votre-domaine.com/api/v1/tickets/${ticketId}`
        );
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error("Ticket non trouvé");
        }
        throw new Error("Erreur de connexion");
    }
};
```

## Réponses de l'API

### Succès (200 OK)

```json
{
    "id": 1,
    "numero": "A001",
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
    "created_at": "2024-01-15T10:30:00.000000Z",
    "updated_at": "2024-01-15T10:30:00.000000Z",
    "service": {
        "id": 1,
        "nom": "Compte Courant",
        "code": "A",
        "description": "Ouverture et gestion de compte courant",
        "duree_estimee": 15,
        "actif": true,
        "created_at": "2024-01-15T09:00:00.000000Z",
        "updated_at": "2024-01-15T09:00:00.000000Z"
    },
    "guichet": null,
    "agent": null
}
```

### Ticket En Cours de Traitement

```json
{
    "id": 1,
    "numero": "A001",
    "service_id": 1,
    "nom_client": "Jean Dupont",
    "telephone_client": "0123456789",
    "statut": "en_cours",
    "position": 0,
    "guichet_id": 2,
    "agent_id": 5,
    "appele_a": "2024-01-15T10:45:00.000000Z",
    "commence_a": "2024-01-15T10:47:00.000000Z",
    "termine_a": null,
    "created_at": "2024-01-15T10:30:00.000000Z",
    "updated_at": "2024-01-15T10:47:00.000000Z",
    "service": {
        "id": 1,
        "nom": "Compte Courant",
        "code": "A",
        "description": "Ouverture et gestion de compte courant",
        "duree_estimee": 15,
        "actif": true
    },
    "guichet": {
        "id": 2,
        "numero": "02",
        "nom": "Guichet 2",
        "statut": "occupe"
    },
    "agent": {
        "id": 5,
        "nom": "Marie Martin",
        "email": "marie.martin@banque.com",
        "statut_agent": "connecte"
    }
}
```

### Erreur - Ticket Non Trouvé (404)

```json
{
    "message": "No query results for model [App\\Models\\Ticket]."
}
```

## Statuts Possibles d'un Ticket

| Statut       | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `en_attente` | Le ticket est en attente dans la file                         |
| `appele`     | Le client a été appelé mais n'a pas encore rejoint le guichet |
| `en_cours`   | Le service est en cours de traitement                         |
| `termine`    | Le service a été terminé                                      |
| `annule`     | Le ticket a été annulé                                        |

## Gestion des Erreurs

L'application mobile doit gérer les cas suivants :

### 1. Ticket Non Trouvé (404)

```javascript
if (error.response && error.response.status === 404) {
    // Afficher : "Aucun ticket trouvé avec ce numéro"
}
```

### 2. Erreur Serveur (500)

```javascript
if (error.response && error.response.status === 500) {
    // Afficher : "Erreur du serveur, veuillez réessayer"
}
```

### 3. Pas de Connexion Internet

```javascript
if (!error.response) {
    // Afficher : "Vérifiez votre connexion internet"
}
```

## Exemple d'Interface Mobile

```jsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

const TicketLookup = () => {
    const [ticketNumber, setTicketNumber] = useState("");
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(false);

    const searchTicket = async () => {
        if (!ticketNumber.trim()) {
            Alert.alert("Erreur", "Veuillez saisir un numéro de ticket");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `http://votre-domaine.com/api/v1/tickets/numero/${ticketNumber}`
            );

            if (response.status === 404) {
                Alert.alert(
                    "Ticket non trouvé",
                    "Aucun ticket ne correspond à ce numéro"
                );
                setTicket(null);
                return;
            }

            if (!response.ok) {
                throw new Error("Erreur réseau");
            }

            const ticketData = await response.json();
            setTicket(ticketData);
        } catch (error) {
            Alert.alert(
                "Erreur",
                "Impossible de récupérer les informations du ticket"
            );
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "en_attente":
                return "#FFA500";
            case "appele":
                return "#FF6B6B";
            case "en_cours":
                return "#4ECDC4";
            case "termine":
                return "#45B7D1";
            case "annule":
                return "#95A5A6";
            default:
                return "#BDC3C7";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "en_attente":
                return "En attente";
            case "appele":
                return "Appelé";
            case "en_cours":
                return "En cours";
            case "termine":
                return "Terminé";
            case "annule":
                return "Annulé";
            default:
                return status;
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}
            >
                Rechercher un Ticket
            </Text>

            <TextInput
                style={{
                    borderWidth: 1,
                    borderColor: "#ddd",
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 15,
                }}
                placeholder="Numéro du ticket (ex: A001)"
                value={ticketNumber}
                onChangeText={setTicketNumber}
                autoCapitalize="characters"
            />

            <TouchableOpacity
                style={{
                    backgroundColor: "#4ECDC4",
                    padding: 15,
                    borderRadius: 8,
                    alignItems: "center",
                    marginBottom: 20,
                }}
                onPress={searchTicket}
                disabled={loading}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                    {loading ? "Recherche..." : "Rechercher"}
                </Text>
            </TouchableOpacity>

            {ticket && (
                <View
                    style={{
                        backgroundColor: "#f8f9fa",
                        padding: 20,
                        borderRadius: 10,
                        borderLeft: `4px solid ${getStatusColor(
                            ticket.statut
                        )}`,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            marginBottom: 10,
                        }}
                    >
                        Ticket {ticket.numero}
                    </Text>

                    <Text style={{ marginBottom: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Client:</Text>{" "}
                        {ticket.nom_client}
                    </Text>

                    <Text style={{ marginBottom: 5 }}>
                        <Text style={{ fontWeight: "bold" }}>Service:</Text>{" "}
                        {ticket.service.nom}
                    </Text>

                    <Text
                        style={{
                            marginBottom: 5,
                            color: getStatusColor(ticket.statut),
                            fontWeight: "bold",
                        }}
                    >
                        Statut: {getStatusText(ticket.statut)}
                    </Text>

                    {ticket.statut === "en_attente" && ticket.position > 0 && (
                        <Text style={{ marginBottom: 5 }}>
                            <Text style={{ fontWeight: "bold" }}>
                                Position:
                            </Text>{" "}
                            {ticket.position}
                        </Text>
                    )}

                    {ticket.guichet && (
                        <Text style={{ marginBottom: 5 }}>
                            <Text style={{ fontWeight: "bold" }}>Guichet:</Text>{" "}
                            {ticket.guichet.nom}
                        </Text>
                    )}

                    {ticket.agent && (
                        <Text style={{ marginBottom: 5 }}>
                            <Text style={{ fontWeight: "bold" }}>Agent:</Text>{" "}
                            {ticket.agent.nom}
                        </Text>
                    )}
                </View>
            )}
        </View>
    );
};

export default TicketLookup;
```

## Notes d'Implémentation

1. **Cache Local**: Considérez la mise en cache des résultats pour améliorer les performances
2. **Rafraîchissement**: Implémentez un système de rafraîchissement automatique pour les tickets en cours
3. **Notifications**: Utilisez les push notifications pour alerter les clients quand leur ticket est appelé
4. **Offline**: Gérez le mode hors ligne en stockant les dernières informations connues
5. **Sécurité**: L'endpoint est public mais ne révèle que les informations nécessaires

Cette API permet une intégration fluide de la recherche de tickets dans votre application mobile, offrant une expérience utilisateur optimale pour le suivi en temps réel.
