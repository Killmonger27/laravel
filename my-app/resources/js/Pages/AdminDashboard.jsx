import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";

export default function AdminDashboard() {
    const [tickets, setTickets] = useState([]);
    const [guichets, setGuichets] = useState([]);
    const [services, setServices] = useState([]);
    const [agents, setAgents] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        chargerDonnees();
        const interval = setInterval(chargerDonnees, 15000);
        return () => clearInterval(interval);
    }, []);

    const chargerDonnees = async () => {
        try {
            const [ticketsRes, guichetsRes, servicesRes, agentsRes] =
                await Promise.all([
                    axios.get("/api/v1/tickets"),
                    axios.get("/api/v1/guichets"),
                    axios.get("/api/v1/services"),
                    axios.get("/api/v1/agents"),
                ]);

            setTickets(ticketsRes.data);
            setGuichets(guichetsRes.data);
            setServices(servicesRes.data);
            setAgents(agentsRes.data);

            // Calculer les statistiques
            const ticketsParStatut = ticketsRes.data.reduce((acc, ticket) => {
                acc[ticket.statut] = (acc[ticket.statut] || 0) + 1;
                return acc;
            }, {});

            setStats({
                totalTickets: ticketsRes.data.length,
                enAttente: ticketsParStatut.en_attente || 0,
                enCours: ticketsParStatut.en_cours || 0,
                termines: ticketsParStatut.termine || 0,
                agentsConnectes: agentsRes.data.filter(
                    (a) => a.statut === "connecte"
                ).length,
                guichetsOuverts: guichetsRes.data.filter(
                    (g) => g.statut !== "ferme"
                ).length,
            });
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const changerStatutGuichet = async (guichetId, nouveauStatut) => {
        setLoading(true);
        try {
            await axios.patch(`/api/v1/guichets/${guichetId}/statut`, {
                statut: nouveauStatut,
            });
            chargerDonnees();
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setLoading(false);
        }
    };

    const forceTerminerTicket = async (ticketId) => {
        setLoading(true);
        try {
            await axios.patch(`/api/v1/tickets/${ticketId}/statut`, {
                statut: "annule",
            });
            chargerDonnees();
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatutColor = (statut) => {
        const couleurs = {
            en_attente: "bg-yellow-100 text-yellow-800",
            appele: "bg-blue-100 text-blue-800",
            en_cours: "bg-green-100 text-green-800",
            termine: "bg-gray-100 text-gray-800",
            annule: "bg-red-100 text-red-800",
        };
        return couleurs[statut] || "bg-gray-100 text-gray-800";
    };

    const getGuichetStatutColor = (statut) => {
        const couleurs = {
            libre: "text-green-600",
            occupe: "text-orange-600",
            ferme: "text-red-600",
        };
        return couleurs[statut] || "text-gray-600";
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        🏛️ Administration - Tableau de Bord
                    </h2>
                    <button
                        onClick={chargerDonnees}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Chargement..." : "🔄 Actualiser"}
                    </button>
                </div>
            }
        >
            <Head title="Administration" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Statistiques générales */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {stats.totalTickets}
                            </div>
                            <div className="text-sm text-gray-600">
                                Total Tickets
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                                {stats.enAttente}
                            </div>
                            <div className="text-sm text-gray-600">
                                En Attente
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {stats.enCours}
                            </div>
                            <div className="text-sm text-gray-600">
                                En Cours
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                            <div className="text-2xl font-bold text-gray-600">
                                {stats.termines}
                            </div>
                            <div className="text-sm text-gray-600">
                                Terminés
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {stats.agentsConnectes}
                            </div>
                            <div className="text-sm text-gray-600">
                                Agents Actifs
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {stats.guichetsOuverts}
                            </div>
                            <div className="text-sm text-gray-600">
                                Guichets Ouverts
                            </div>
                        </div>
                    </div>

                    {/* Gestion des guichets */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            🏢 Gestion des Guichets
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {guichets.map((guichet) => (
                                <div
                                    key={guichet.id}
                                    className="border rounded-lg p-4"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-semibold text-lg">
                                            {guichet.numero}
                                        </h4>
                                        <span
                                            className={`text-sm font-medium ${getGuichetStatutColor(
                                                guichet.statut
                                            )}`}
                                        >
                                            {guichet.statut}
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-sm mb-4">
                                        <div className="text-gray-600">
                                            {guichet.service?.nom}
                                        </div>
                                        {guichet.agent ? (
                                            <div className="text-blue-600 font-medium">
                                                👤 {guichet.agent.nom_complet}
                                            </div>
                                        ) : (
                                            <div className="text-gray-400">
                                                Aucun agent connecté
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex space-x-2">
                                        {guichet.statut === "ferme" && (
                                            <button
                                                onClick={() =>
                                                    changerStatutGuichet(
                                                        guichet.id,
                                                        "libre"
                                                    )
                                                }
                                                disabled={
                                                    loading || !guichet.agent
                                                }
                                                className="flex-1 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:opacity-50"
                                            >
                                                Ouvrir
                                            </button>
                                        )}
                                        {guichet.statut !== "ferme" && (
                                            <button
                                                onClick={() =>
                                                    changerStatutGuichet(
                                                        guichet.id,
                                                        "ferme"
                                                    )
                                                }
                                                disabled={loading}
                                                className="flex-1 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 disabled:opacity-50"
                                            >
                                                Fermer
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Supervision des agents */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            👥 Agents en Service
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {agents
                                .filter((agent) => agent.statut === "connecte")
                                .map((agent) => (
                                    <div
                                        key={agent.id}
                                        className="border rounded-lg p-4"
                                    >
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <div className="font-medium">
                                                {agent.nom_complet}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            📍 {agent.guichet?.numero} -{" "}
                                            {agent.guichet?.service?.nom}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            🕐 Connecté depuis{" "}
                                            {new Date(
                                                agent.derniere_activite
                                            ).toLocaleTimeString("fr-FR")}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Supervision des tickets */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            🎫 Supervision des Tickets
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Ticket
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Client
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Service
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Guichet
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Agent
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Statut
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tickets
                                        .filter((t) =>
                                            [
                                                "en_attente",
                                                "appele",
                                                "en_cours",
                                            ].includes(t.statut)
                                        )
                                        .map((ticket) => (
                                            <tr key={ticket.id}>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                    {ticket.numero}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                    {ticket.nom_client}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                    {ticket.service?.nom}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                    {ticket.guichet?.numero ||
                                                        "-"}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                    {ticket.agent
                                                        ?.nom_complet || "-"}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatutColor(
                                                            ticket.statut
                                                        )}`}
                                                    >
                                                        {ticket.statut}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <button
                                                        onClick={() =>
                                                            forceTerminerTicket(
                                                                ticket.id
                                                            )
                                                        }
                                                        disabled={loading}
                                                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                    >
                                                        ❌ Forcer annulation
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Statistiques par service */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            📊 Statistiques par Service
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {services.map((service) => {
                                const ticketsService = tickets.filter(
                                    (t) => t.service_id === service.id
                                );
                                const enAttente = ticketsService.filter(
                                    (t) => t.statut === "en_attente"
                                ).length;
                                const enCours = ticketsService.filter(
                                    (t) => t.statut === "en_cours"
                                ).length;
                                const terminesAujourdhui =
                                    ticketsService.filter(
                                        (t) =>
                                            t.statut === "termine" &&
                                            new Date(
                                                t.updated_at
                                            ).toDateString() ===
                                                new Date().toDateString()
                                    ).length;

                                return (
                                    <div
                                        key={service.id}
                                        className="border rounded-lg p-4"
                                    >
                                        <h4 className="font-semibold text-lg mb-3">
                                            {service.nom}
                                        </h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>En attente:</span>
                                                <span className="font-medium text-yellow-600">
                                                    {enAttente}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>En cours:</span>
                                                <span className="font-medium text-green-600">
                                                    {enCours}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>
                                                    Terminés aujourd'hui:
                                                </span>
                                                <span className="font-medium text-blue-600">
                                                    {terminesAujourdhui}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span>Durée moyenne:</span>
                                                <span>
                                                    {service.duree_estimee} min
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
