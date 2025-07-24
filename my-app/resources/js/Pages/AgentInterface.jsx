import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";

export default function AgentInterface() {
    const [agentInfo, setAgentInfo] = useState(null);
    const [ticketActuel, setTicketActuel] = useState(null);
    const [ticketsEnAttente, setTicketsEnAttente] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState("");
    const [selectedGuichet, setSelectedGuichet] = useState("");
    const [agents, setAgents] = useState([]);
    const [guichets, setGuichets] = useState([]);

    useEffect(() => {
        chargerDonnees();
        const interval = setInterval(chargerDonnees, 10000);
        return () => clearInterval(interval);
    }, []);

    const chargerDonnees = async () => {
        try {
            const [agentsRes, guichetsRes, ticketsRes] = await Promise.all([
                axios.get("/api/v1/agents"),
                axios.get("/api/v1/guichets"),
                axios.get("/api/v1/tickets"),
            ]);

            setAgents(agentsRes.data);
            setGuichets(guichetsRes.data);

            // Si un agent est sélectionné, charger ses données
            if (selectedAgent) {
                const agent = agentsRes.data.find((a) => a.id == selectedAgent);
                setAgentInfo(agent);

                if (agent && agent.guichet_id) {
                    // Tickets en cours pour cet agent
                    const ticketEnCours = ticketsRes.data.find(
                        (t) => t.agent_id == agent.id && t.statut === "en_cours"
                    );
                    setTicketActuel(ticketEnCours);

                    // Tickets en attente pour ce service
                    const ticketsService = ticketsRes.data.filter(
                        (t) =>
                            t.service_id == agent.guichet.service_id &&
                            t.statut === "en_attente"
                    );
                    setTicketsEnAttente(ticketsService);
                }
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const connecterAgent = async () => {
        if (!selectedAgent || !selectedGuichet) return;

        setLoading(true);
        try {
            await axios.post(`/api/v1/agents/${selectedAgent}/connecter`, {
                guichet_id: selectedGuichet,
            });
            chargerDonnees();
        } catch (error) {
            console.error("Erreur connexion:", error);
        } finally {
            setLoading(false);
        }
    };

    const deconnecterAgent = async () => {
        setLoading(true);
        try {
            await axios.post(`/api/v1/agents/${selectedAgent}/deconnecter`);
            setAgentInfo(null);
            setTicketActuel(null);
            setTicketsEnAttente([]);
            setSelectedAgent("");
            setSelectedGuichet("");
            chargerDonnees();
        } catch (error) {
            console.error("Erreur déconnexion:", error);
        } finally {
            setLoading(false);
        }
    };

    const appellerProchainTicket = async () => {
        if (!agentInfo?.guichet_id) return;

        setLoading(true);
        try {
            await axios.post(
                `/api/v1/guichets/${agentInfo.guichet_id}/appeler-prochain`
            );
            chargerDonnees();
        } catch (error) {
            console.error("Erreur appel ticket:", error);
        } finally {
            setLoading(false);
        }
    };

    const changerStatutTicket = async (ticketId, statut) => {
        setLoading(true);
        try {
            await axios.patch(`/api/v1/tickets/${ticketId}/statut`, { statut });
            chargerDonnees();
        } catch (error) {
            console.error("Erreur changement statut:", error);
        } finally {
            setLoading(false);
        }
    };

    // Interface de connexion
    if (!agentInfo) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <Head title="Interface Agent" />

                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-10 h-10 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                ></path>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Connexion Agent
                        </h1>
                        <p className="text-gray-600">
                            Connectez-vous à votre guichet
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sélectionner un agent
                            </label>
                            <select
                                value={selectedAgent}
                                onChange={(e) =>
                                    setSelectedAgent(e.target.value)
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Choisir un agent</option>
                                {agents
                                    .filter(
                                        (agent) => agent.statut === "deconnecte"
                                    )
                                    .map((agent) => (
                                        <option key={agent.id} value={agent.id}>
                                            {agent.nom_complet} (
                                            {agent.matricule})
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sélectionner un guichet
                            </label>
                            <select
                                value={selectedGuichet}
                                onChange={(e) =>
                                    setSelectedGuichet(e.target.value)
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Choisir un guichet</option>
                                {guichets
                                    .filter((guichet) => !guichet.agent)
                                    .map((guichet) => (
                                        <option
                                            key={guichet.id}
                                            value={guichet.id}
                                        >
                                            {guichet.numero} -{" "}
                                            {guichet.service?.nom}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <button
                            onClick={connecterAgent}
                            disabled={
                                !selectedAgent || !selectedGuichet || loading
                            }
                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            {loading ? "Connexion..." : "Se Connecter"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Interface agent connecté
    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={`Agent ${agentInfo.nom_complet}`} />

            {/* En-tête */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    ></path>
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    {agentInfo.nom_complet}
                                </h1>
                                <p className="text-sm text-gray-600">
                                    {agentInfo.guichet?.numero} -{" "}
                                    {agentInfo.guichet?.service?.nom}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={deconnecterAgent}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Se Déconnecter
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Ticket en cours */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4 text-green-800">
                            🔄 Ticket en Cours
                        </h2>

                        {ticketActuel ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-2xl font-bold text-green-800">
                                            {ticketActuel.numero}
                                        </div>
                                        <div className="text-lg font-medium">
                                            {ticketActuel.nom_client}
                                        </div>
                                        {ticketActuel.telephone_client && (
                                            <div className="text-sm text-gray-600">
                                                📞{" "}
                                                {ticketActuel.telephone_client}
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-600">
                                            Commencé à{" "}
                                            {new Date(
                                                ticketActuel.heure_debut
                                            ).toLocaleTimeString("fr-FR")}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    <button
                                        onClick={() =>
                                            changerStatutTicket(
                                                ticketActuel.id,
                                                "termine"
                                            )
                                        }
                                        disabled={loading}
                                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                                    >
                                        ✅ Terminer
                                    </button>
                                    <button
                                        onClick={() =>
                                            changerStatutTicket(
                                                ticketActuel.id,
                                                "annule"
                                            )
                                        }
                                        disabled={loading}
                                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                                    >
                                        ❌ Annuler
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-2">💤</div>
                                <p className="text-gray-600">
                                    Aucun ticket en cours
                                </p>
                                <button
                                    onClick={appellerProchainTicket}
                                    disabled={
                                        loading || ticketsEnAttente.length === 0
                                    }
                                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    📢 Appeler le Prochain
                                </button>
                            </div>
                        )}
                    </div>

                    {/* File d'attente */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4 text-blue-800">
                            📋 File d'Attente ({ticketsEnAttente.length})
                        </h2>

                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {ticketsEnAttente.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">🎉</div>
                                    <p className="text-gray-600">
                                        Aucun ticket en attente
                                    </p>
                                </div>
                            ) : (
                                ticketsEnAttente.map((ticket, index) => (
                                    <div
                                        key={ticket.id}
                                        className={`p-3 rounded-lg border ${
                                            index === 0
                                                ? "bg-blue-50 border-blue-200"
                                                : "bg-gray-50 border-gray-200"
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="font-semibold text-blue-800">
                                                    {ticket.numero}
                                                </div>
                                                <div className="text-sm">
                                                    {ticket.nom_client}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div
                                                    className={`text-xs px-2 py-1 rounded-full ${
                                                        index === 0
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-gray-100 text-gray-600"
                                                    }`}
                                                >
                                                    {index === 0
                                                        ? "Suivant"
                                                        : `Position ${
                                                              index + 1
                                                          }`}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {new Date(
                                                        ticket.created_at
                                                    ).toLocaleTimeString(
                                                        "fr-FR"
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions rapides */}
                {!ticketActuel && (
                    <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Actions Rapides
                        </h3>
                        <div className="flex space-x-4">
                            <button
                                onClick={appellerProchainTicket}
                                disabled={
                                    loading || ticketsEnAttente.length === 0
                                }
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                                    ></path>
                                </svg>
                                <span>Appeler le Prochain Ticket</span>
                            </button>

                            <button
                                onClick={chargerDonnees}
                                disabled={loading}
                                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
                            >
                                🔄 Actualiser
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
