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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
            <Head title="Affichage Public" />

            {/* En-tête */}
            <div className="bg-black bg-opacity-20 p-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">
                        🏦 Banque - File d'Attente
                    </h1>
                    <div className="text-xl font-mono">
                        {currentTime.toLocaleTimeString("fr-FR")}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Tickets appelés */}
                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-300">
                            🔔 Tickets Appelés
                        </h2>

                        {ticketsAppeles.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">😴</div>
                                <p className="text-xl opacity-70">
                                    Aucun ticket appelé
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {ticketsAppeles.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="bg-yellow-500 bg-opacity-20 rounded-xl p-4 border-2 border-yellow-300 animate-pulse"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-3xl font-bold text-yellow-300">
                                                    {ticket.numero}
                                                </div>
                                                <div className="text-lg">
                                                    {ticket.nom_client}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-yellow-300">
                                                    {ticket.guichet?.numero}
                                                </div>
                                                <div className="text-sm opacity-70">
                                                    {ticket.service?.nom}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tickets en cours */}
                    <div className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold mb-6 text-center text-green-300">
                            ⚡ En Cours de Traitement
                        </h2>

                        {ticketsEnCours.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">⏰</div>
                                <p className="text-xl opacity-70">
                                    Aucun traitement en cours
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {ticketsEnCours.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="bg-green-500 bg-opacity-20 rounded-xl p-4 border-2 border-green-300"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-3xl font-bold text-green-300">
                                                    {ticket.numero}
                                                </div>
                                                <div className="text-lg">
                                                    {ticket.nom_client}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-green-300">
                                                    {ticket.guichet?.numero}
                                                </div>
                                                <div className="text-sm opacity-70">
                                                    {ticket.agent?.nom_complet}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* État des guichets */}
                <div className="mt-8 bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        📊 État des Guichets
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {guichets.map((guichet) => (
                            <div key={guichet.id} className="text-center">
                                <div className="bg-white bg-opacity-20 rounded-xl p-4">
                                    <div className="text-2xl font-bold mb-2">
                                        {guichet.numero}
                                    </div>
                                    <div className="text-sm mb-2">
                                        {guichet.service?.nom}
                                    </div>
                                    <div
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                            guichet.statut === "libre"
                                                ? "bg-green-500 text-white"
                                                : guichet.statut === "occupe"
                                                ? "bg-orange-500 text-white"
                                                : "bg-gray-500 text-white"
                                        }`}
                                    >
                                        {guichet.statut === "libre"
                                            ? "🟢 Libre"
                                            : guichet.statut === "occupe"
                                            ? "🟠 Occupé"
                                            : "🔴 Fermé"}
                                    </div>
                                    {guichet.agent && (
                                        <div className="text-xs mt-2 opacity-70">
                                            {guichet.agent.nom_complet}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pied de page */}
                <div className="mt-8 text-center">
                    <p className="text-lg opacity-70">
                        🕐 Mise à jour automatique toutes les 5 secondes
                    </p>
                    {loading && (
                        <div className="inline-flex items-center mt-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Chargement...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
