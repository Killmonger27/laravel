import axios from "axios";

// Configuration de base de l'API
const API_BASE_URL = "http://172.20.10.11:8000/api/v1"; // IP de votre serveur Laravel

// Instance axios avec configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Intercepteur pour les réponses d'erreur
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

class ApiService {
  // Récupérer tous les services disponibles
  static async getServices() {
    try {
      const response = await api.get("/services");
      return response.data;
    } catch (error) {
      throw new Error("Impossible de charger les services");
    }
  }

  // Récupérer tous les tickets (pour administration)
  static async getAllTickets() {
    try {
      const response = await api.get("/tickets");
      return response.data;
    } catch (error) {
      throw new Error("Impossible de charger les tickets");
    }
  }

  // Créer un nouveau ticket
  static async createTicket(ticketData) {
    try {
      const response = await api.post("/tickets", ticketData);
      return response.data;
    } catch (error) {
      throw new Error("Impossible de créer le ticket");
    }
  }

  // Mettre à jour le statut d'un ticket (PATCH /tickets/{ticket}/statut)
  static async updateTicketStatus(ticketId, statusData) {
    try {
      const response = await api.patch(
        `/tickets/${ticketId}/statut`,
        statusData
      );
      return response.data;
    } catch (error) {
      console.error("Erreur mise à jour statut:", error.response?.data || error.message);
      throw new Error("Impossible de mettre à jour le statut du ticket");
    }
  }

  // Récupérer un ticket par son numéro
  static async getTicketByNumber(numero) {
    try {
      const response = await api.get(`/tickets/numero/${numero}`);
      return response.data;
    } catch (error) {
      throw new Error("Ticket non trouvé");
    }
  }

  // Récupérer la file d'attente pour un service
  static async getQueueByService(serviceId) {
    try {
      const response = await api.get(`/services/${serviceId}/queue`);
      return response.data;
    } catch (error) {
      throw new Error("Impossible de charger la file d'attente");
    }
  }

  // Récupérer les statistiques globales
  static async getStatistics() {
    try {
      const response = await api.get("/statistics");
      return response.data;
    } catch (error) {
      throw new Error("Impossible de charger les statistiques");
    }
  }

  // Récupérer tous les guichets
  static async getGuichets() {
    try {
      const response = await api.get("/guichets");
      return response.data;
    } catch (error) {
      throw new Error("Impossible de charger les guichets");
    }
  }

  // Vérifier la connectivité avec le serveur
  static async checkConnection() {
    try {
      const response = await api.get("/health");
      return response.data;
    } catch (error) {
      throw new Error("Impossible de se connecter au serveur");
    }
  }

  // Récupérer les tickets en attente pour l'affichage public
  static async getPublicQueue() {
    try {
      const response = await api.get("/public/queue");
      return response.data;
    } catch (error) {
      throw new Error("Impossible de charger la file d'attente publique");
    }
  }

  // Récupérer les notifications pour un ticket
  static async getTicketNotifications(ticketId) {
    try {
      const response = await api.get(`/tickets/${ticketId}/notifications`);
      return response.data;
    } catch (error) {
      throw new Error("Impossible de charger les notifications");
    }
  }

  // Récupérer un ticket par son ID (route à confirmer)
  static async getTicketById(ticketId) {
    try {
      const response = await api.get(`/tickets/${ticketId}`);
      return response.data;
    } catch (error) {
      throw new Error("Ticket non trouvé");
    }
  }
}

// Utilitaires pour gérer les erreurs réseau
export const NetworkUtils = {
  isNetworkError: (error) => {
    return (
      error.code === "NETWORK_ERROR" ||
      error.message === "Network Error" ||
      error.code === "ECONNREFUSED"
    );
  },

  isTimeoutError: (error) => {
    return error.code === "ECONNABORTED" || error.message.includes("timeout");
  },

  getErrorMessage: (error) => {
    if (NetworkUtils.isNetworkError(error)) {
      return "Vérifiez votre connexion internet";
    }
    if (NetworkUtils.isTimeoutError(error)) {
      return "La requête a pris trop de temps";
    }
    return (
      error.response?.data?.message ||
      error.message ||
      "Une erreur est survenue"
    );
  },
};

export default ApiService;
