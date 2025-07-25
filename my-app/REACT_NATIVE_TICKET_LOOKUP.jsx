import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    ActivityIndicator,
    StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // ou react-native-vector-icons

const API_BASE_URL = "http://votre-domaine.com/api/v1";

const TicketLookupScreen = () => {
    const [ticketNumber, setTicketNumber] = useState("");
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(null);

    // Fonction pour récupérer un ticket par son numéro
    const searchTicket = async () => {
        if (!ticketNumber.trim()) {
            Alert.alert("Erreur", "Veuillez saisir un numéro de ticket");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `${API_BASE_URL}/tickets/numero/${ticketNumber}`
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
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const ticketData = await response.json();
            setTicket(ticketData);
            setLastUpdate(new Date());
        } catch (error) {
            Alert.alert(
                "Erreur",
                "Impossible de récupérer les informations du ticket"
            );
            console.error("Erreur lors de la recherche:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour rafraîchir automatiquement si le ticket est en attente ou appelé
    const refreshTicket = async () => {
        if (
            !ticket ||
            !["en_attente", "appele", "en_cours"].includes(ticket.statut)
        ) {
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/tickets/numero/${ticket.numero}`
            );
            if (response.ok) {
                const updatedTicket = await response.json();
                setTicket(updatedTicket);
                setLastUpdate(new Date());
            }
        } catch (error) {
            console.error("Erreur lors du rafraîchissement:", error);
        }
    };

    // Rafraîchissement automatique toutes les 30 secondes
    useEffect(() => {
        if (
            ticket &&
            ["en_attente", "appele", "en_cours"].includes(ticket.statut)
        ) {
            const interval = setInterval(refreshTicket, 30000);
            return () => clearInterval(interval);
        }
    }, [ticket]);

    const getStatusColor = (status) => {
        switch (status) {
            case "en_attente":
                return "#FF9500";
            case "appele":
                return "#FF3B30";
            case "en_cours":
                return "#34C759";
            case "termine":
                return "#007AFF";
            case "annule":
                return "#8E8E93";
            default:
                return "#8E8E93";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "en_attente":
                return "En attente";
            case "appele":
                return "Appelé - Rendez-vous au guichet";
            case "en_cours":
                return "En cours de traitement";
            case "termine":
                return "Service terminé";
            case "annule":
                return "Ticket annulé";
            default:
                return status;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "en_attente":
                return "time-outline";
            case "appele":
                return "notifications-outline";
            case "en_cours":
                return "person-outline";
            case "termine":
                return "checkmark-circle-outline";
            case "annule":
                return "close-circle-outline";
            default:
                return "help-circle-outline";
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getEstimatedWaitTime = () => {
        if (!ticket || ticket.statut !== "en_attente" || !ticket.position) {
            return null;
        }
        const estimatedMinutes =
            ticket.position * (ticket.service?.duree_estimee || 15);
        return Math.max(estimatedMinutes, 5); // Minimum 5 minutes
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2C3E50" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>QueueFlow</Text>
                <Text style={styles.headerSubtitle}>Suivi de Ticket</Text>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Formulaire de recherche */}
                <View style={styles.searchContainer}>
                    <Text style={styles.searchLabel}>Numéro de Ticket</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ex: A001, B012..."
                            value={ticketNumber}
                            onChangeText={setTicketNumber}
                            autoCapitalize="characters"
                            maxLength={10}
                        />
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={searchTicket}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" size="small" />
                            ) : (
                                <Ionicons
                                    name="search"
                                    size={20}
                                    color="white"
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Résultat du ticket */}
                {ticket && (
                    <View style={styles.ticketContainer}>
                        <View
                            style={[
                                styles.ticketHeader,
                                {
                                    borderLeftColor: getStatusColor(
                                        ticket.statut
                                    ),
                                },
                            ]}
                        >
                            <View style={styles.ticketTitleRow}>
                                <Text style={styles.ticketNumber}>
                                    Ticket {ticket.numero}
                                </Text>
                                <TouchableOpacity
                                    onPress={refreshTicket}
                                    style={styles.refreshButton}
                                >
                                    <Ionicons
                                        name="refresh"
                                        size={20}
                                        color="#6B7280"
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.clientName}>
                                {ticket.nom_client}
                            </Text>
                        </View>

                        {/* Statut */}
                        <View style={styles.statusContainer}>
                            <View style={styles.statusRow}>
                                <Ionicons
                                    name={getStatusIcon(ticket.statut)}
                                    size={24}
                                    color={getStatusColor(ticket.statut)}
                                />
                                <Text
                                    style={[
                                        styles.statusText,
                                        {
                                            color: getStatusColor(
                                                ticket.statut
                                            ),
                                        },
                                    ]}
                                >
                                    {getStatusText(ticket.statut)}
                                </Text>
                            </View>

                            {ticket.statut === "en_attente" &&
                                ticket.position > 0 && (
                                    <View style={styles.positionContainer}>
                                        <Text style={styles.positionText}>
                                            Position dans la file:{" "}
                                            <Text style={styles.positionNumber}>
                                                {ticket.position}
                                            </Text>
                                        </Text>
                                        {getEstimatedWaitTime() && (
                                            <Text style={styles.estimatedTime}>
                                                Temps d'attente estimé: ~
                                                {getEstimatedWaitTime()} min
                                            </Text>
                                        )}
                                    </View>
                                )}
                        </View>

                        {/* Informations du service */}
                        <View style={styles.infoSection}>
                            <Text style={styles.sectionTitle}>Service</Text>
                            <View style={styles.infoRow}>
                                <Ionicons
                                    name="business-outline"
                                    size={18}
                                    color="#6B7280"
                                />
                                <Text style={styles.infoText}>
                                    {ticket.service.nom}
                                </Text>
                            </View>
                            {ticket.service.description && (
                                <Text style={styles.serviceDescription}>
                                    {ticket.service.description}
                                </Text>
                            )}
                        </View>

                        {/* Informations du guichet et agent */}
                        {ticket.guichet && (
                            <View style={styles.infoSection}>
                                <Text style={styles.sectionTitle}>Guichet</Text>
                                <View style={styles.infoRow}>
                                    <Ionicons
                                        name="location-outline"
                                        size={18}
                                        color="#6B7280"
                                    />
                                    <Text style={styles.infoText}>
                                        {ticket.guichet.nom}
                                    </Text>
                                </View>
                                {ticket.agent && (
                                    <View style={styles.infoRow}>
                                        <Ionicons
                                            name="person-outline"
                                            size={18}
                                            color="#6B7280"
                                        />
                                        <Text style={styles.infoText}>
                                            Agent: {ticket.agent.nom}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}

                        {/* Timeline */}
                        <View style={styles.infoSection}>
                            <Text style={styles.sectionTitle}>Timeline</Text>
                            <View style={styles.timelineItem}>
                                <Ionicons
                                    name="add-circle-outline"
                                    size={16}
                                    color="#34C759"
                                />
                                <Text style={styles.timelineText}>
                                    Créé à {formatDate(ticket.created_at)}
                                </Text>
                            </View>
                            {ticket.appele_a && (
                                <View style={styles.timelineItem}>
                                    <Ionicons
                                        name="call-outline"
                                        size={16}
                                        color="#FF9500"
                                    />
                                    <Text style={styles.timelineText}>
                                        Appelé à {formatDate(ticket.appele_a)}
                                    </Text>
                                </View>
                            )}
                            {ticket.commence_a && (
                                <View style={styles.timelineItem}>
                                    <Ionicons
                                        name="play-circle-outline"
                                        size={16}
                                        color="#007AFF"
                                    />
                                    <Text style={styles.timelineText}>
                                        Commencé à{" "}
                                        {formatDate(ticket.commence_a)}
                                    </Text>
                                </View>
                            )}
                            {ticket.termine_a && (
                                <View style={styles.timelineItem}>
                                    <Ionicons
                                        name="checkmark-circle-outline"
                                        size={16}
                                        color="#34C759"
                                    />
                                    <Text style={styles.timelineText}>
                                        Terminé à {formatDate(ticket.termine_a)}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Dernière mise à jour */}
                        {lastUpdate && (
                            <Text style={styles.lastUpdate}>
                                Dernière mise à jour:{" "}
                                {lastUpdate.toLocaleTimeString()}
                            </Text>
                        )}
                    </View>
                )}

                {/* Message d'aide si aucun ticket */}
                {!ticket && !loading && (
                    <View style={styles.helpContainer}>
                        <Ionicons
                            name="information-circle-outline"
                            size={48}
                            color="#6B7280"
                        />
                        <Text style={styles.helpTitle}>
                            Comment ça marche ?
                        </Text>
                        <Text style={styles.helpText}>
                            1. Saisissez le numéro de votre ticket{"\n"}
                            2. Consultez votre position dans la file{"\n"}
                            3. Recevez des mises à jour en temps réel{"\n"}
                            4. Rendez-vous au guichet quand vous êtes appelé
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    header: {
        backgroundColor: "#2C3E50",
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#BDC3C7",
        textAlign: "center",
        marginTop: 5,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    searchContainer: {
        marginBottom: 20,
    },
    searchLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: "#3B82F6",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    ticketContainer: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ticketHeader: {
        borderLeftWidth: 4,
        paddingLeft: 15,
        marginBottom: 20,
    },
    ticketTitleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    ticketNumber: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1F2937",
    },
    refreshButton: {
        padding: 5,
    },
    clientName: {
        fontSize: 16,
        color: "#6B7280",
        marginTop: 5,
    },
    statusContainer: {
        marginBottom: 20,
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    statusText: {
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 10,
    },
    positionContainer: {
        backgroundColor: "#FEF3C7",
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    positionText: {
        fontSize: 14,
        color: "#92400E",
    },
    positionNumber: {
        fontWeight: "bold",
        fontSize: 16,
    },
    estimatedTime: {
        fontSize: 12,
        color: "#92400E",
        marginTop: 5,
    },
    infoSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: "#6B7280",
        marginLeft: 10,
    },
    serviceDescription: {
        fontSize: 12,
        color: "#9CA3AF",
        fontStyle: "italic",
        marginTop: 5,
    },
    timelineItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    timelineText: {
        fontSize: 14,
        color: "#6B7280",
        marginLeft: 10,
    },
    lastUpdate: {
        fontSize: 12,
        color: "#9CA3AF",
        textAlign: "center",
        marginTop: 10,
        fontStyle: "italic",
    },
    helpContainer: {
        alignItems: "center",
        padding: 30,
        backgroundColor: "white",
        borderRadius: 15,
        marginTop: 20,
    },
    helpTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#374151",
        marginTop: 15,
        marginBottom: 10,
    },
    helpText: {
        fontSize: 16,
        color: "#6B7280",
        textAlign: "center",
        lineHeight: 24,
    },
});

export default TicketLookupScreen;
