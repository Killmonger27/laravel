import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

const { width } = Dimensions.get("window");

export default function TicketGeneratedScreen({ navigation, route }) {
  // Vérification de sécurité pour les paramètres
  const params = route?.params || {};
  const { ticket, service, clientInfo } = params;

  // Rendu conditionnel immédiat si les données manquent
  if (!ticket || !service || !clientInfo) {
    // Redirection vers l'accueil
    React.useEffect(() => {
      const timer = setTimeout(() => {
        Alert.alert(
          "Données manquantes",
          "Impossible d'afficher le ticket. Retour à l'accueil.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Home"),
            },
          ]
        );
      }, 100);

      return () => clearTimeout(timer);
    }, [navigation]);

    // Affichage d'un écran de chargement en attendant
    return (
      <View style={styles.container}>
        <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.gradient}>
          <View style={styles.loadingContainer}>
            <MaterialIcons name="hourglass-empty" size={50} color="#fff" />
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const qrCodeData = JSON.stringify({
    ticketId: ticket?.id || "unknown",
    numero: ticket?.numero || "N/A",
    serviceId: ticket?.service_id || service?.id || "unknown",
    clientNom: ticket?.nom_client || clientInfo?.nom || "Unknown",
    timestamp: ticket?.created_at || new Date().toISOString(),
    position: ticket?.position || 0,
    statut: ticket?.statut || "en_attente",
  });

  // Affichage de loading si les données manquent
  if (!ticket || !service || !clientInfo) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement du ticket...</Text>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      const serviceName =
        ticket.service?.nom || service?.nom || "Service inconnu";
      const clientName = ticket.nom_client || clientInfo?.nom || "Client";

      const message =
        `🎫 Mon ticket QueueFlow\n\n` +
        `Numéro: ${ticket.numero}\n` +
        `Service: ${serviceName}\n` +
        `Nom: ${clientName}\n` +
        `Position: ${ticket.position || "N/A"}\n` +
        `Statut: ${ticket.statut || "en_attente"}\n` +
        `Date: ${formatDate(new Date(ticket.created_at))}\n` +
        `Heure: ${new Date(ticket.created_at).toLocaleTimeString(
          "fr-FR"
        )}\n\n` +
        `Suivez votre ticket en temps réel !`;

      await Share.share({
        message,
        title: "Mon ticket QueueFlow",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleTrackTicket = () => {
    navigation.navigate("TicketStatus", {
      ticketId: ticket.id,
      ticketNumber: ticket.numero,
      initialTicket: ticket, // Passer le ticket complet pour éviter un appel API inutile
    });
  };

  const handleNewTicket = () => {
    navigation.navigate("Home");
  };

  const getStatusLabel = (statut) => {
    const statuses = {
      en_attente: "En attente",
      en_cours: "En cours",
      termine: "Terminé",
      annule: "Annulé",
      appele: "Appelé",
    };
    return statuses[statut] || "En attente";
  };

  const getStatusColor = (statut) => {
    const colors = {
      en_attente: "#10b981",
      en_cours: "#f59e0b",
      termine: "#64748b",
      annule: "#ef4444",
      appele: "#1E40AF",
    };
    return colors[statut] || "#10b981";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#3B82F6", "#1E40AF"]} style={styles.header}>
          <MaterialIcons name="check-circle" size={80} color="white" />
          <Text style={styles.headerTitle}>Ticket généré !</Text>
          <Text style={styles.headerSubtitle}>
            Votre ticket a été créé avec succès
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.ticketCard}>
            <View style={styles.ticketHeader}>
              <Text style={styles.ticketNumber}>{ticket.numero}</Text>
            </View>

            <View style={styles.ticketInfo}>
              <View style={styles.infoRow}>
                <MaterialIcons name="business" size={20} color="#3B82F6" />
                <Text style={styles.infoLabel}>Service</Text>
                <Text style={styles.infoValue}>
                  {ticket.service?.nom || service?.nom || "Service inconnu"}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialIcons name="person" size={20} color="#3B82F6" />
                <Text style={styles.infoLabel}>Client</Text>
                <Text style={styles.infoValue}>
                  {ticket.nom_client || clientInfo?.nom || "Client"}
                </Text>
              </View>

              {(ticket.telephone_client || clientInfo?.telephone) && (
                <View style={styles.infoRow}>
                  <MaterialIcons name="phone" size={20} color="#3B82F6" />
                  <Text style={styles.infoLabel}>Téléphone</Text>
                  <Text style={styles.infoValue}>
                    {ticket.telephone_client || clientInfo.telephone}
                  </Text>
                </View>
              )}

              <View style={styles.infoRow}>
                <MaterialIcons name="schedule" size={20} color="#3B82F6" />
                <Text style={styles.infoLabel}>Créé le</Text>
                <Text style={styles.infoValue}>
                  {formatDate(new Date(ticket.created_at))} à{" "}
                  {new Date(ticket.created_at).toLocaleTimeString("fr-FR")}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialIcons name="queue" size={20} color="#3B82F6" />
                <Text style={styles.infoLabel}>Position</Text>
                <Text style={styles.infoValue}>{ticket.position || "N/A"}</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialIcons name="flag" size={20} color="#3B82F6" />
                <Text style={styles.infoLabel}>Statut</Text>
                <Text
                  style={[
                    styles.infoValue,
                    styles.statusText,
                    { color: getStatusColor(ticket.statut) },
                  ]}
                >
                  {getStatusLabel(ticket.statut)}
                </Text>
              </View>
            </View>

            <View style={styles.qrContainer}>
              <Text style={styles.qrTitle}>Code QR</Text>
              <Text style={styles.qrSubtitle}>
                Scannez ce code pour un accès rapide à votre ticket
              </Text>
              <View style={styles.qrCodeWrapper}>
                <QRCode
                  value={qrCodeData}
                  size={150}
                  color="#1e293b"
                  backgroundColor="white"
                />
              </View>
            </View>
          </View>

          <View style={styles.statusCard}>
            <MaterialIcons name="access-time" size={30} color="#1E40AF" />
            <Text style={styles.statusTitle}>Temps réel</Text>
            <Text style={styles.currentTime}>{formatTime(currentTime)}</Text>
            <Text style={styles.statusDescription}>
              Votre position sera mise à jour automatiquement
            </Text>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.primaryAction}
              onPress={handleTrackTicket}
            >
              <LinearGradient
                colors={["#3B82F6", "#1E40AF"]}
                style={styles.actionGradient}
              >
                <MaterialIcons name="visibility" size={24} color="white" />
                <Text style={styles.actionText}>Suivre mon ticket</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.secondaryActions}>
              <TouchableOpacity
                style={styles.secondaryAction}
                onPress={handleShare}
              >
                <MaterialIcons name="share" size={24} color="#3B82F6" />
                <Text style={styles.secondaryActionText}>Partager</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryAction}
                onPress={handleNewTicket}
              >
                <MaterialIcons name="add" size={24} color="#3B82F6" />
                <Text style={styles.secondaryActionText}>Nouveau ticket</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginTop: 15,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 5,
    textAlign: "center",
  },
  content: {
    padding: 20,
    paddingBottom: 40, // Marge supplémentaire pour éviter la zone système
  },
  ticketCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  ticketHeader: {
    alignItems: "center",
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  ticketNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  ticketInfo: {
    marginBottom: 25,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoLabel: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#64748b",
  },
  infoValue: {
    flex: 2,
    fontSize: 14,
    color: "#1e293b",
    fontWeight: "500",
    textAlign: "right",
  },
  statusText: {
    color: "#10b981",
    fontWeight: "bold",
  },
  qrContainer: {
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 5,
  },
  qrSubtitle: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 20,
  },
  qrCodeWrapper: {
    padding: 20,
    backgroundColor: "#f8fafc",
    borderRadius: 15,
  },
  statusCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 10,
  },
  currentTime: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E40AF",
    marginVertical: 5,
  },
  statusDescription: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
  },
  actionsContainer: {
    marginBottom: 20,
  },
  primaryAction: {
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
  },
  actionGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  actionText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  secondaryActions: {
    flexDirection: "row",
    gap: 15,
  },
  secondaryAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  secondaryActionText: {
    color: "#3B82F6",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#f0f4ff",
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#1E40AF",
  },
  infoBoxText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#4c1d95",
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
  },
});
