import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";

export default function AffichagePublic() {
    const [tickets, setTickets] = useState([]);
    const [guichets, setGuichets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        chargerDonnees();

        // Actualiser toutes les 5 secondes
        const dataInterval = setInterval(chargerDonnees, 5000);

        // Mettre à jour l'heure chaque seconde
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(dataInterval);
            clearInterval(timeInterval);
        };
    }, []);

    const chargerDonnees = async () => {
        try {
            const [ticketsRes, guichetsRes] = await Promise.all([
                axios.get("/api/v1/tickets"),
                axios.get("/api/v1/guichets"),
            ]);

            setTickets(ticketsRes.data);
            setGuichets(guichetsRes.data);
            setLoading(false);
        } catch (error) {
            console.error("Erreur:", error);
            setLoading(false);
        }
    };

    const ticketsAppeles = tickets.filter((t) => t.statut === "appele");
    const ticketsEnCours = tickets.filter((t) => t.statut === "en_cours");
    const ticketsEnAttente = tickets.filter((t) => t.statut === "en_attente");

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Head title="Queue Flow - Affichage Public" />

            {/* En-tête fixe avec logo */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
                <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
                    <div className="flex items-center space-x-4">
                        <img
                            src="/logo-qf.svg"
                            alt="Queue Flow"
                            className="h-14 w-14 drop-shadow-sm"
                        />
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Queue Flow
                            </h1>
                            <p className="text-gray-600 font-medium">
                                Gestion intelligente des files d'attente
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-mono font-bold text-gray-900">
                            {currentTime.toLocaleTimeString("fr-FR")}
                        </div>
                        <div className="text-sm text-gray-500">
                            {currentTime.toLocaleDateString("fr-FR", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenu principal avec padding-top pour compenser la navbar fixe */}
            <div className="pt-28 max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Tickets appelés */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">
                                        📢
                                    </span>
                                </div>
                                Tickets Appelés
                                <span className="ml-2 bg-amber-100 text-amber-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                    {ticketsAppeles.length}
                                </span>
                            </h2>
                        </div>

                        {ticketsAppeles.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">😴</span>
                                </div>
                                <p className="text-gray-500 text-lg font-medium">
                                    Aucun ticket appelé
                                </p>
                                <p className="text-gray-400 text-sm mt-1">
                                    En attente du prochain appel
                                </p>
                            </div>
                        ) : (
                            <div className="p-6 space-y-4">
                                {ticketsAppeles.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-5 shadow-md"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold text-lg">
                                                        {ticket.numero}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="text-gray-900 font-semibold text-lg">
                                                        {ticket.nom_client}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        Service:{" "}
                                                        {ticket.service?.nom}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-4xl font-bold text-amber-600">
                                                    {ticket.guichet?.numero}
                                                </div>
                                                <div className="text-sm text-gray-600 font-medium">
                                                    Guichet{" "}
                                                    {ticket.guichet?.numero}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tickets en cours */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">
                                        ⚡
                                    </span>
                                </div>
                                En Cours de Traitement
                                <span className="ml-2 bg-emerald-100 text-emerald-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                    {ticketsEnCours.length}
                                </span>
                            </h2>
                        </div>

                        {ticketsEnCours.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">⏰</span>
                                </div>
                                <p className="text-gray-500 text-lg font-medium">
                                    Aucun traitement en cours
                                </p>
                                <p className="text-gray-400 text-sm mt-1">
                                    Tous les guichets sont libres
                                </p>
                            </div>
                        ) : (
                            <div className="p-6 space-y-4">
                                {ticketsEnCours.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-5 shadow-md"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold text-lg">
                                                        {ticket.numero}
                                                    </span>
                                                </div>
                                                <div>
                                                    <div className="text-gray-900 font-semibold text-lg">
                                                        {ticket.nom_client}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        Agent:{" "}
                                                        {
                                                            ticket.agent
                                                                ?.nom_complet
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-4xl font-bold text-emerald-600">
                                                    {ticket.guichet?.numero}
                                                </div>
                                                <div className="text-sm text-gray-600 font-medium">
                                                    Guichet{" "}
                                                    {ticket.guichet?.numero}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Tickets en attente */}
                <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white font-bold">⏳</span>
                            </div>
                            File d'Attente
                            <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                {ticketsEnAttente.length}
                            </span>
                        </h2>
                    </div>

                    {ticketsEnAttente.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">✅</span>
                            </div>
                            <p className="text-gray-500 text-lg font-medium">
                                Aucun ticket en attente
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                Parfait ! Pas d'attente aujourd'hui
                            </p>
                        </div>
                    ) : (
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                                {ticketsEnAttente
                                    .slice(0, 15)
                                    .map((ticket, index) => (
                                        <div
                                            key={ticket.id}
                                            className={`rounded-xl p-4 border-2 shadow-sm ${
                                                index < 3
                                                    ? "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50"
                                                    : "border-gray-200 bg-white/60"
                                            }`}
                                        >
                                            <div className="text-center">
                                                <div
                                                    className={`text-2xl font-bold mb-2 ${
                                                        index < 3
                                                            ? "text-blue-700"
                                                            : "text-gray-900"
                                                    }`}
                                                >
                                                    {ticket.numero}
                                                </div>
                                                <div className="text-sm text-gray-700 font-semibold mb-1">
                                                    {ticket.nom_client}
                                                </div>
                                                <div className="text-xs text-gray-500 mb-2">
                                                    {ticket.service?.nom}
                                                </div>
                                                <div className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                                                    Position {index + 1}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {ticketsEnAttente.length > 15 && (
                                <div className="text-center mt-4 text-gray-600">
                                    ... et {ticketsEnAttente.length - 15} autres
                                    tickets en attente
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* État des guichets */}
                <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white font-bold">📊</span>
                            </div>
                            État des Guichets
                        </h2>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {guichets.map((guichet) => (
                                <div key={guichet.id} className="text-center">
                                    <div
                                        className={`rounded-xl p-4 border-2 ${
                                            guichet.statut === "occupe"
                                                ? "bg-gradient-to-br from-red-50 to-pink-50 border-red-200"
                                                : "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200"
                                        }`}
                                    >
                                        <div
                                            className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                                                guichet.statut === "occupe"
                                                    ? "bg-gradient-to-br from-red-400 to-pink-500"
                                                    : "bg-gradient-to-br from-emerald-500 to-teal-600"
                                            }`}
                                        >
                                            <span className="text-white font-bold text-lg">
                                                {guichet.numero}
                                            </span>
                                        </div>
                                        <div className="text-gray-900 font-bold text-lg mb-1">
                                            Guichet {guichet.numero}
                                        </div>
                                        <div className="text-sm text-gray-600 font-medium mb-2">
                                            {guichet.service?.nom}
                                        </div>
                                        <div className="mt-3">
                                            <span
                                                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${
                                                    guichet.statut === "occupe"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-emerald-100 text-emerald-700"
                                                }`}
                                            >
                                                {guichet.statut === "occupe" ? (
                                                    <>
                                                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                                        Occupé
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                                                        Libre
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                        {guichet.agent && (
                                            <div className="text-xs mt-2 text-gray-500">
                                                {guichet.agent.nom_complet}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pied de page */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center space-x-3 text-gray-600 text-sm bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/50 shadow-md">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>🕐</span>
                        <span className="font-medium">
                            Mise à jour automatique toutes les 5 secondes
                        </span>
                    </div>
                    {loading && (
                        <div className="inline-flex items-center mt-4 text-gray-600">
                            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
                            Chargement...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
