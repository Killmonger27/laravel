import React, { useState, useEffect } from "react";
import axios from "axios";

const GestionFileAttente = () => {
    const [tickets, setTickets] = useState([]);
    const [guichets, setGuichets] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        chargerDonnees();
        const interval = setInterval(chargerDonnees, 15000);
        return () => clearInterval(interval);
    }, []);

    const chargerDonnees = async () => {
        try {
            const [ticketsRes, guichetsRes, servicesRes] = await Promise.all([
                axios.get("/api/v1/tickets"),
                axios.get("/api/v1/guichets"),
                axios.get("/api/v1/services"),
            ]);

            setTickets(ticketsRes.data);
            setGuichets(guichetsRes.data);
            setServices(servicesRes.data);
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const appellerTicket = async (guichetId) => {
        setLoading(true);
        try {
            await axios.post(`/api/v1/guichets/${guichetId}/appeler-prochain`);
            chargerDonnees();
        } catch (error) {
            console.error("Erreur:", error);
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
            console.error("Erreur:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatutColor = (statut) => {
        const couleurs = {
            libre: "bg-green-500",
            occupe: "bg-orange-500",
            ferme: "bg-gray-400",
        };
        return couleurs[statut] || "bg-gray-400";
    };

    const getTicketStatutColor = (statut) => {
        const couleurs = {
            en_attente: "bg-yellow-50 border-yellow-200 text-yellow-800",
            appele: "bg-blue-50 border-blue-200 text-blue-800",
            en_cours: "bg-green-50 border-green-200 text-green-800",
        };
        return couleurs[statut] || "bg-gray-50 border-gray-200 text-gray-800";
    };

    const ticketsParStatut = {
        en_attente: tickets.filter((t) => t.statut === "en_attente"),
        appele: tickets.filter((t) => t.statut === "appele"),
        en_cours: tickets.filter((t) => t.statut === "en_cours"),
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* En-tête */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        File d'Attente Bancaire
                    </h1>
                    <p className="text-gray-600">
                        Système de gestion en temps réel
                    </p>
                </div>

                {/* Statistiques rapides */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-lg shadow-sm p-6 text-center"
                        >
                            <div className="text-2xl font-bold text-blue-600">
                                {service.tickets_en_attente_count || 0}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                {service.nom}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Vue des guichets */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Guichets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {guichets.map((guichet) => (
                            <div
                                key={guichet.id}
                                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-semibold text-lg">
                                        {guichet.numero}
                                    </span>
                                    <div
                                        className={`w-4 h-4 rounded-full ${getStatutColor(
                                            guichet.statut
                                        )}`}
                                    ></div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="text-gray-600">
                                        {guichet.service?.nom}
                                    </div>
                                    {guichet.agent && (
                                        <div className="text-blue-600 font-medium">
                                            {guichet.agent.nom_complet}
                                        </div>
                                    )}
                                </div>

                                {guichet.statut === "libre" &&
                                    guichet.agent && (
                                        <button
                                            onClick={() =>
                                                appellerTicket(guichet.id)
                                            }
                                            disabled={loading}
                                            className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                        >
                                            Appeler suivant
                                        </button>
                                    )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Files d'attente */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* En attente */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-4 border-b">
                            <h3 className="font-semibold text-yellow-800">
                                En Attente ({ticketsParStatut.en_attente.length}
                                )
                            </h3>
                        </div>
                        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                            {ticketsParStatut.en_attente.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className={`p-3 rounded-lg border ${getTicketStatutColor(
                                        ticket.statut
                                    )}`}
                                >
                                    <div className="font-medium">
                                        {ticket.numero}
                                    </div>
                                    <div className="text-sm">
                                        {ticket.nom_client}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {ticket.service?.nom}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Appelés */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-4 border-b">
                            <h3 className="font-semibold text-blue-800">
                                Appelés ({ticketsParStatut.appele.length})
                            </h3>
                        </div>
                        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                            {ticketsParStatut.appele.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className={`p-3 rounded-lg border ${getTicketStatutColor(
                                        ticket.statut
                                    )}`}
                                >
                                    <div className="font-medium">
                                        {ticket.numero}
                                    </div>
                                    <div className="text-sm">
                                        {ticket.nom_client}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {ticket.guichet?.numero} -{" "}
                                        {ticket.service?.nom}
                                    </div>
                                    <button
                                        onClick={() =>
                                            changerStatutTicket(
                                                ticket.id,
                                                "en_cours"
                                            )
                                        }
                                        className="mt-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                                        disabled={loading}
                                    >
                                        Commencer
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* En cours */}
                    <div className="bg-white rounded-lg shadow-sm">
                        <div className="p-4 border-b">
                            <h3 className="font-semibold text-green-800">
                                En Cours ({ticketsParStatut.en_cours.length})
                            </h3>
                        </div>
                        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                            {ticketsParStatut.en_cours.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className={`p-3 rounded-lg border ${getTicketStatutColor(
                                        ticket.statut
                                    )}`}
                                >
                                    <div className="font-medium">
                                        {ticket.numero}
                                    </div>
                                    <div className="text-sm">
                                        {ticket.nom_client}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {ticket.guichet?.numero} -{" "}
                                        {ticket.agent?.nom_complet}
                                    </div>
                                    <div className="mt-2 flex space-x-2">
                                        <button
                                            onClick={() =>
                                                changerStatutTicket(
                                                    ticket.id,
                                                    "termine"
                                                )
                                            }
                                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                            disabled={loading}
                                        >
                                            Terminer
                                        </button>
                                        <button
                                            onClick={() =>
                                                changerStatutTicket(
                                                    ticket.id,
                                                    "annule"
                                                )
                                            }
                                            className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                                            disabled={loading}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bouton d'actualisation */}
                <div className="text-center">
                    <button
                        onClick={chargerDonnees}
                        className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Chargement..." : "Actualiser"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GestionFileAttente;
