import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import {
    FiUsers,
    FiClock,
    FiCheckCircle,
    FiPlay,
    FiUser,
    FiCalendar,
    FiActivity,
    FiMonitor,
    FiEye,
    FiRefreshCw,
} from "react-icons/fi";

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

    const ticketsEnAttente = tickets.filter((t) => t.statut === "en_attente");
    const ticketsAppeles = tickets.filter((t) => t.statut === "appele");
    const ticketsEnCours = tickets.filter((t) => t.statut === "en_cours");

    const statistiques = [
        {
            name: "En attente",
            value: ticketsEnAttente.length,
            icon: FiUsers,
            color: "text-blue-600",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
        {
            name: "Appelés",
            value: ticketsAppeles.length,
            icon: FiPlay,
            color: "text-indigo-600",
            bg: "bg-gradient-to-br from-indigo-50 to-blue-50",
            iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
        },
        {
            name: "En cours",
            value: ticketsEnCours.length,
            icon: FiActivity,
            color: "text-emerald-600",
            bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
            iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
        },
        {
            name: "Guichets actifs",
            value: guichets.filter((g) => g.statut === "occupe").length,
            icon: FiMonitor,
            color: "text-blue-600",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <FiRefreshCw className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-xl text-gray-700 font-medium">
                        Chargement...
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Connexion au système Queue Flow
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Head title="Queue Flow - Affichage Public" />

            {/* Header moderne fixe avec logo */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img
                                    src="/logo-qf.svg"
                                    alt="Queue Flow"
                                    className="h-14 w-14 drop-shadow-sm"
                                />
                            </div>
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
                                {currentTime.toLocaleTimeString()}
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
            </div>

            {/* Contenu principal avec marge pour header fixe */}
            <div className="pt-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Statistiques en temps réel */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statistiques.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={stat.name}
                                    className={`${stat.bg} rounded-xl p-6 border border-white/50 shadow-sm`}
                                >
                                    <div className="flex items-center">
                                        <div
                                            className={`flex-shrink-0 ${stat.iconBg} rounded-lg p-3 shadow-md`}
                                        >
                                            <Icon className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-600">
                                                {stat.name}
                                            </div>
                                            <div className="text-3xl font-bold text-gray-900">
                                                {stat.value}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Tickets appelés maintenant */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center mr-3">
                                        <FiPlay className="h-5 w-5 text-white" />
                                    </div>
                                    Tickets Appelés
                                    <span className="ml-2 bg-amber-100 text-amber-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                        {ticketsAppeles.length}
                                    </span>
                                </h2>
                            </div>
                            <div className="p-6">
                                {ticketsAppeles.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FiPlay className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500 text-lg font-medium">
                                            Aucun ticket appelé
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            En attente du prochain appel
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {ticketsAppeles.map((ticket) => (
                                            <div
                                                key={ticket.id}
                                                className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-5 shadow-sm"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
                                                            <FiUser className="h-6 w-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <div className="text-2xl font-bold text-amber-700">
                                                                {ticket.numero}
                                                            </div>
                                                            <div className="text-gray-900 font-semibold">
                                                                {
                                                                    ticket.nom_client
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                Service:{" "}
                                                                {
                                                                    ticket
                                                                        .service
                                                                        ?.nom
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-4xl font-bold text-amber-600">
                                                            {
                                                                ticket.guichet
                                                                    ?.numero
                                                            }
                                                        </div>
                                                        <div className="text-sm text-gray-600 font-medium">
                                                            {
                                                                ticket.guichet
                                                                    ?.nom
                                                            }
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1 bg-white/60 px-2 py-1 rounded">
                                                            {new Date(
                                                                ticket.heure_appel
                                                            ).toLocaleTimeString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tickets en cours de traitement */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-3">
                                        <FiActivity className="h-5 w-5 text-white" />
                                    </div>
                                    En Traitement
                                    <span className="ml-2 bg-emerald-100 text-emerald-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                        {ticketsEnCours.length}
                                    </span>
                                </h2>
                            </div>
                            <div className="p-6">
                                {ticketsEnCours.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FiActivity className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500 text-lg font-medium">
                                            Aucun traitement en cours
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            Tous les guichets sont libres
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {ticketsEnCours.map((ticket) => (
                                            <div
                                                key={ticket.id}
                                                className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-5 shadow-sm"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                                                            <FiCheckCircle className="h-6 w-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <div className="text-2xl font-bold text-emerald-700">
                                                                {ticket.numero}
                                                            </div>
                                                            <div className="text-gray-900 font-semibold">
                                                                {
                                                                    ticket.nom_client
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                Service:{" "}
                                                                {
                                                                    ticket
                                                                        .service
                                                                        ?.nom
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-4xl font-bold text-emerald-600">
                                                            {
                                                                ticket.guichet
                                                                    ?.numero
                                                            }
                                                        </div>
                                                        <div className="text-sm text-gray-600 font-medium">
                                                            {
                                                                ticket.guichet
                                                                    ?.nom
                                                            }
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1 bg-white/60 px-2 py-1 rounded">
                                                            {new Date(
                                                                ticket.heure_debut
                                                            ).toLocaleTimeString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Section des tickets en attente */}
                    <div className="mt-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                        <FiUsers className="h-5 w-5 text-white" />
                                    </div>
                                    File d'Attente
                                    <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                        {ticketsEnAttente.length}
                                    </span>
                                </h2>
                            </div>
                            <div className="p-6">
                                {ticketsEnAttente.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FiUsers className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500 text-lg font-medium">
                                            Aucun ticket en attente
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            Parfait ! Pas d'attente aujourd'hui
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                                        {ticketsEnAttente
                                            .slice(0, 15)
                                            .map((ticket, index) => (
                                                <div
                                                    key={ticket.id}
                                                    className={`rounded-xl p-4 border-2 shadow-sm ${
                                                        index < 3
                                                            ? "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md"
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
                                                            {
                                                                ticket.service
                                                                    ?.nom
                                                            }
                                                        </div>
                                                        <div className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                                                            {new Date(
                                                                ticket.created_at
                                                            ).toLocaleTimeString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* État des guichets */}
                    <div className="mt-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                        <FiMonitor className="h-5 w-5 text-white" />
                                    </div>
                                    État des Guichets
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {guichets.map((guichet) => (
                                        <div
                                            key={guichet.id}
                                            className={`rounded-xl p-6 border-2 shadow-sm ${
                                                guichet.statut === "occupe"
                                                    ? "bg-gradient-to-br from-red-50 to-pink-50 border-red-200"
                                                    : "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200"
                                            }`}
                                        >
                                            <div className="text-center">
                                                <div
                                                    className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                                                        guichet.statut ===
                                                        "occupe"
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
                                                            guichet.statut ===
                                                            "occupe"
                                                                ? "bg-red-100 text-red-700"
                                                                : "bg-emerald-100 text-emerald-700"
                                                        }`}
                                                    >
                                                        {guichet.statut ===
                                                        "occupe" ? (
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
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer avec mise à jour automatique */}
                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center space-x-3 text-gray-600 text-sm bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/50 shadow-md">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <FiRefreshCw className="h-4 w-4" />
                            <span className="font-medium">
                                Mise à jour automatique toutes les 5 secondes
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
