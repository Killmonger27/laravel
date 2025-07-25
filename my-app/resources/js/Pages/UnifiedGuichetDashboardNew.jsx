import { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import UnifiedLayout from "@/Layouts/UnifiedLayout";
import {
    FiUsers,
    FiClock,
    FiCheckCircle,
    FiPlay,
    FiPause,
    FiSkipForward,
    FiUser,
    FiPhone,
    FiCalendar,
    FiTrendingUp,
    FiActivity,
    FiSettings,
    FiRefreshCw,
} from "react-icons/fi";

export default function UnifiedGuichetDashboard({
    auth,
    guichet,
    ticketsEnAttente,
    ticketEnCours,
    statistiques,
}) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const stats = [
        {
            name: "En attente",
            value: ticketsEnAttente?.length || 0,
            subtitle: "Tickets à traiter",
            icon: FiUsers,
            color: "text-blue-500",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
        {
            name: "Temps moyen",
            value: statistiques?.temps_moyen || "0 min",
            subtitle: "Durée de service",
            icon: FiClock,
            color: "text-indigo-600",
            bg: "bg-gradient-to-br from-indigo-50 to-blue-50",
            iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
        },
        {
            name: "Traités aujourd'hui",
            value: statistiques?.tickets_traites || 0,
            subtitle: "Tickets terminés",
            icon: FiCheckCircle,
            color: "text-emerald-500",
            bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
            iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
        },
        {
            name: "Performance",
            value: statistiques?.performance || "100%",
            subtitle: "Efficacité du service",
            icon: FiTrendingUp,
            color: "text-blue-600",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
    ];

    const executeAction = async (action, ticketId = null) => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            let url;
            switch (action) {
                case "appeler":
                    url = "/guichet/appeler";
                    break;
                case "commencer":
                    url = `/guichet/commencer/${ticketId}`;
                    break;
                case "terminer":
                    url = `/guichet/terminer/${ticketId}`;
                    break;
                default:
                    return;
            }

            await router.post(
                url,
                {},
                {
                    onSuccess: () => {
                        window.location.href = "/guichet";
                    },
                    onError: (errors) => {
                        console.error(
                            `Erreur lors de l'action ${action}:`,
                            errors
                        );
                        alert(
                            `Erreur: ${
                                errors.error ||
                                `Impossible d'exécuter l'action ${action}`
                            }`
                        );
                        setIsLoading(false);
                    },
                }
            );
        } catch (error) {
            console.error("Erreur:", error);
            setIsLoading(false);
        }
    };

    return (
        <UnifiedLayout
            user={auth.user}
            userType="agent"
            title="Interface Guichet"
        >
            <Head title="Interface Guichet" />

            <div className="space-y-8">
                {/* Header avec horloge et informations guichet */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                <FiActivity className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Guichet {guichet?.numero}
                                </h1>
                                <p className="text-gray-600 flex items-center mt-1">
                                    <FiSettings className="w-4 h-4 mr-2" />
                                    Service: {guichet?.service?.nom}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-mono font-bold text-gray-900">
                                {currentTime.toLocaleTimeString()}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                                {currentTime.toLocaleDateString("fr-FR", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Indicateur de chargement */}
                {isLoading && (
                    <div className="fixed top-4 right-4 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg z-50">
                        <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-3"></div>
                            Traitement en cours...
                        </div>
                    </div>
                )}

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.name}
                                className={`${stat.bg} rounded-xl border border-gray-100 p-6 transition-all duration-200 hover:shadow-md`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-600 mb-1">
                                            {stat.name}
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900 mb-1">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {stat.subtitle}
                                        </p>
                                    </div>
                                    <div
                                        className={`${stat.iconBg} rounded-lg p-2.5`}
                                    >
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Ticket en cours */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <FiActivity className="w-5 h-5 mr-2 text-blue-600" />
                                    Ticket en cours de traitement
                                </h3>
                            </div>
                            <div className="p-6">
                                {ticketEnCours ? (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                                                    <FiUser className="w-8 h-8 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="text-2xl font-bold text-gray-900">
                                                        {ticketEnCours.numero}
                                                    </h4>
                                                    <p className="text-gray-600 text-lg">
                                                        {
                                                            ticketEnCours.nom_client
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-500 mb-1">
                                                    Service
                                                </div>
                                                <div className="font-semibold text-gray-900">
                                                    {ticketEnCours.service?.nom}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {ticketEnCours.telephone_client && (
                                                <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3">
                                                    <FiPhone className="w-4 h-4 mr-3 text-gray-400" />
                                                    <span className="font-medium">
                                                        {
                                                            ticketEnCours.telephone_client
                                                        }
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-3">
                                                <FiCalendar className="w-4 h-4 mr-3 text-gray-400" />
                                                <span className="font-medium">
                                                    {ticketEnCours.statut ===
                                                    "appele"
                                                        ? "Appelé"
                                                        : "En cours"}{" "}
                                                    à{" "}
                                                    {new Date(
                                                        ticketEnCours.heure_appel ||
                                                            ticketEnCours.heure_debut
                                                    ).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex space-x-3">
                                            {ticketEnCours.statut ===
                                            "appele" ? (
                                                <button
                                                    onClick={() =>
                                                        executeAction(
                                                            "commencer",
                                                            ticketEnCours.id
                                                        )
                                                    }
                                                    disabled={isLoading}
                                                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                                                >
                                                    <FiPlay className="w-5 h-5 mr-2" />
                                                    Commencer le service
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        executeAction(
                                                            "terminer",
                                                            ticketEnCours.id
                                                        )
                                                    }
                                                    disabled={isLoading}
                                                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                                                >
                                                    <FiCheckCircle className="w-5 h-5 mr-2" />
                                                    Terminer le service
                                                </button>
                                            )}
                                            <button
                                                onClick={() =>
                                                    alert(
                                                        "Fonction pause en développement"
                                                    )
                                                }
                                                disabled={isLoading}
                                                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
                                            >
                                                <FiPause className="w-5 h-5 mr-2" />
                                                Pause
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FiUser className="w-10 h-10 text-gray-400" />
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                            Aucun ticket en cours
                                        </h4>
                                        <p className="text-gray-500 mb-6">
                                            Prêt à appeler le prochain client
                                        </p>
                                        <button
                                            onClick={() =>
                                                executeAction("appeler")
                                            }
                                            disabled={
                                                isLoading ||
                                                !ticketsEnAttente?.length
                                            }
                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center mx-auto shadow-md hover:shadow-lg"
                                        >
                                            <FiPlay className="w-5 h-5 mr-2" />
                                            Appeler le prochain
                                        </button>
                                        {!ticketsEnAttente?.length && (
                                            <p className="text-sm text-gray-400 mt-3">
                                                Aucun ticket en attente
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* File d'attente */}
                    <div>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <FiUsers className="w-5 h-5 mr-2 text-blue-600" />
                                    File d'attente
                                    <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                        {ticketsEnAttente?.length || 0}
                                    </span>
                                </h3>
                            </div>
                            <div className="p-6">
                                {ticketsEnAttente?.length > 0 ? (
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {ticketsEnAttente
                                            .slice(0, 10)
                                            .map((ticket, index) => (
                                                <div
                                                    key={ticket.id}
                                                    className={`p-4 rounded-lg border transition-all duration-200 ${
                                                        index === 0
                                                            ? "border-indigo-200 bg-indigo-50 shadow-sm"
                                                            : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <div className="font-semibold text-gray-900">
                                                                {ticket.numero}
                                                            </div>
                                                            <div className="text-sm text-gray-600 mt-1">
                                                                {
                                                                    ticket.nom_client
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-xs text-gray-500">
                                                                {new Date(
                                                                    ticket.created_at
                                                                ).toLocaleTimeString()}
                                                            </div>
                                                            {index === 0 && (
                                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
                                                                    <FiClock className="w-3 h-3 mr-1" />
                                                                    Suivant
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FiUsers className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500">
                                            Aucun ticket en attente
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions rapides */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Actions rapides
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <button
                            onClick={() => executeAction("appeler")}
                            disabled={isLoading || !ticketsEnAttente?.length}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
                        >
                            <FiSkipForward className="w-5 h-5 mr-2" />
                            Appeler suivant
                        </button>
                        <button
                            onClick={() =>
                                alert("Fonction pause en développement")
                            }
                            disabled={isLoading}
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
                        >
                            <FiPause className="w-5 h-5 mr-2" />
                            Prendre une pause
                        </button>
                        <button
                            onClick={() =>
                                ticketEnCours &&
                                executeAction("terminer", ticketEnCours.id)
                            }
                            disabled={isLoading || !ticketEnCours}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
                        >
                            <FiCheckCircle className="w-5 h-5 mr-2" />
                            Terminer service
                        </button>
                        <button
                            onClick={() => (window.location.href = "/guichet")}
                            disabled={isLoading}
                            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md"
                        >
                            <FiRefreshCw className="w-5 h-5 mr-2" />
                            Actualiser
                        </button>
                    </div>
                </div>
            </div>
        </UnifiedLayout>
    );
}
