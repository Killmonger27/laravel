import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";

export default function GuichetInterface({
    agent,
    guichet,
    service,
    ticketEnCours: initialTicketEnCours,
    ticketsEnAttente: initialTicketsEnAttente,
    ticketsAppeles: initialTicketsAppeles,
    statistiques,
}) {
    const [ticketEnCours, setTicketEnCours] = useState(initialTicketEnCours);
    const [ticketsEnAttente, setTicketsEnAttente] = useState(
        initialTicketsEnAttente
    );
    const [ticketsAppeles, setTicketsAppeles] = useState(initialTicketsAppeles);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        // Actualiser les données toutes les 10 secondes
        const interval = setInterval(rafraichirDonnees, 10000);
        return () => clearInterval(interval);
    }, []);

    const rafraichirDonnees = async () => {
        try {
            const response = await axios.get(route("guichet.index"));
            const data = response.data.props;

            setTicketEnCours(data.ticketEnCours);
            setTicketsEnAttente(data.ticketsEnAttente);
            setTicketsAppeles(data.ticketsAppeles);
        } catch (error) {
            console.error("Erreur lors du rafraîchissement:", error);
        }
    };

    const appellerProchain = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await axios.post(route("guichet.appeler"));

            if (response.data.success) {
                setTicketsAppeles((prev) => [...prev, response.data.ticket]);
                setTicketsEnAttente((prev) =>
                    prev.filter((t) => t.id !== response.data.ticket.id)
                );
                afficherNotification("Ticket appelé avec succès", "success");

                // Rafraîchir après un court délai
                setTimeout(rafraichirDonnees, 1000);
            }
        } catch (error) {
            afficherNotification(
                error.response?.data?.error || "Erreur lors de l'appel",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const commencerTicket = async (ticketId) => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await axios.post(
                route("guichet.commencer", ticketId)
            );

            if (response.data.success) {
                setTicketEnCours(response.data.ticket);
                setTicketsAppeles((prev) =>
                    prev.filter((t) => t.id !== ticketId)
                );
                afficherNotification("Traitement commencé", "success");
            }
        } catch (error) {
            afficherNotification(
                error.response?.data?.error || "Erreur lors du démarrage",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const terminerTicket = async (ticketId) => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await axios.post(
                route("guichet.terminer", ticketId)
            );

            if (response.data.success) {
                setTicketEnCours(null);
                afficherNotification("Ticket terminé avec succès", "success");

                // Rafraîchir après un court délai
                setTimeout(rafraichirDonnees, 1000);
            }
        } catch (error) {
            afficherNotification(
                error.response?.data?.error || "Erreur lors de la finalisation",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const afficherNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    const formatHeure = (dateString) => {
        return new Date(dateString).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={`Guichet ${guichet.numero} - ${service.nom}`} />

            {/* Header */}
            <div className="bg-blue-600 text-white p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold">
                                Guichet {guichet.numero}
                            </h1>
                            <p className="text-blue-100">
                                Service: {service.nom}
                            </p>
                            <p className="text-blue-100">
                                Agent: {agent.name} ({agent.matricule})
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-blue-100">
                                Statut du guichet
                            </div>
                            <div
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    guichet.statut === "libre"
                                        ? "bg-green-500"
                                        : "bg-orange-500"
                                }`}
                            >
                                {guichet.statut === "libre"
                                    ? "Libre"
                                    : "Occupé"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification */}
            {notification && (
                <div
                    className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
                        notification.type === "success"
                            ? "bg-green-500"
                            : "bg-red-500"
                    } text-white`}
                >
                    {notification.message}
                </div>
            )}

            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Colonne principale - Ticket en cours */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Ticket en cours
                            </h2>

                            {ticketEnCours ? (
                                <div className="border-l-4 border-blue-500 pl-4 py-4 bg-blue-50 rounded">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-2xl font-bold text-blue-600">
                                                {ticketEnCours.numero}
                                            </h3>
                                            <p className="text-gray-600">
                                                Client:{" "}
                                                {ticketEnCours.nom_client}
                                            </p>
                                            {ticketEnCours.telephone_client && (
                                                <p className="text-gray-600">
                                                    Tél:{" "}
                                                    {
                                                        ticketEnCours.telephone_client
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-right text-sm text-gray-500">
                                            <p>
                                                Appelé:{" "}
                                                {formatHeure(
                                                    ticketEnCours.heure_appel
                                                )}
                                            </p>
                                            {ticketEnCours.heure_debut && (
                                                <p>
                                                    Commencé:{" "}
                                                    {formatHeure(
                                                        ticketEnCours.heure_debut
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() =>
                                                terminerTicket(ticketEnCours.id)
                                            }
                                            disabled={loading}
                                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
                                        >
                                            Terminer le service
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <div className="text-4xl mb-2">📋</div>
                                    <p>Aucun ticket en cours</p>
                                    <p className="text-sm">
                                        Appelez le prochain client pour
                                        commencer
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Tickets appelés */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">
                                    Tickets appelés
                                </h2>
                                <button
                                    onClick={appellerProchain}
                                    disabled={
                                        loading || ticketsEnAttente.length === 0
                                    }
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Appel..." : "Appeler suivant"}
                                </button>
                            </div>

                            {ticketsAppeles.length > 0 ? (
                                <div className="space-y-3">
                                    {ticketsAppeles.map((ticket) => (
                                        <div
                                            key={ticket.id}
                                            className="border border-orange-200 rounded-lg p-4 bg-orange-50"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-semibold text-orange-600">
                                                        {ticket.numero}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        {ticket.nom_client}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Appelé:{" "}
                                                        {formatHeure(
                                                            ticket.heure_appel
                                                        )}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        commencerTicket(
                                                            ticket.id
                                                        )
                                                    }
                                                    disabled={
                                                        loading || ticketEnCours
                                                    }
                                                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
                                                >
                                                    Commencer
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">
                                    Aucun ticket appelé
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Statistiques */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                Statistiques du jour
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Tickets traités:</span>
                                    <span className="font-semibold">
                                        {
                                            statistiques.tickets_traites_aujourdhui
                                        }
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Temps moyen:</span>
                                    <span className="font-semibold">
                                        {statistiques.temps_moyen_traitement}{" "}
                                        min
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* File d'attente */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                File d'attente ({ticketsEnAttente.length})
                            </h3>

                            {ticketsEnAttente.length > 0 ? (
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {ticketsEnAttente
                                        .slice(0, 10)
                                        .map((ticket, index) => (
                                            <div
                                                key={ticket.id}
                                                className={`p-3 rounded border ${
                                                    index === 0
                                                        ? "bg-blue-50 border-blue-200"
                                                        : "bg-gray-50 border-gray-200"
                                                }`}
                                            >
                                                <div className="text-sm font-medium">
                                                    {ticket.numero}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {ticket.nom_client}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {formatHeure(
                                                        ticket.created_at
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    {ticketsEnAttente.length > 10 && (
                                        <div className="text-center text-sm text-gray-500 pt-2">
                                            ... et{" "}
                                            {ticketsEnAttente.length - 10}{" "}
                                            autres
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">
                                    Aucun ticket en attente
                                </p>
                            )}
                        </div>

                        {/* Actions rapides */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                Actions
                            </h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium"
                                >
                                    Actualiser
                                </button>
                                <button
                                    onClick={() =>
                                        (window.location.href =
                                            route("dashboard"))
                                    }
                                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium"
                                >
                                    Tableau de bord
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
