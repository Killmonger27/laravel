import { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import UnifiedLayout from "@/Layouts/UnifiedLayout";
import {
    FiUsers,
    FiClock,
    FiCheckCircle,
    FiPlay,
    FiPause,
    FiUser,
    FiPhone,
    FiCalendar,
    FiTrendingUp,
    FiActivity,
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
            name: "Files actives",
            value: statistiques?.services_actifs || 2,
            subtitle: "Services disponibles",
            icon: FiUsers,
            color: "text-blue-600",
            bg: "bg-blue-50",
            iconBg: "bg-blue-100",
        },
        {
            name: "En attente",
            value: ticketsEnAttente?.length || 0,
            subtitle: "Clients en file",
            icon: FiClock,
            color: "text-orange-600",
            bg: "bg-orange-50",
            iconBg: "bg-orange-100",
        },
        {
            name: "Temps moyen",
            value: statistiques?.temps_moyen || "0 min",
            subtitle: "Traitement moyen",
            icon: FiTrendingUp,
            color: "text-purple-600",
            bg: "bg-purple-50",
            iconBg: "bg-purple-100",
        },
        {
            name: "Traités aujourd'hui",
            value: statistiques?.tickets_traites || 0,
            subtitle: "Tickets complétés",
            icon: FiCheckCircle,
            color: "text-green-600",
            bg: "bg-green-50",
            iconBg: "bg-green-100",
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
        <UnifiedLayout user={auth.user} title="Interface Guichet">
            <Head title="Interface Guichet" />

            {/* Header du tableau de bord */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Tableau de bord
                </h1>
                <p className="text-gray-600">
                    Vue d'ensemble de l'activité bancaire en temps réel
                </p>
            </div>

            {/* Indicateur de chargement */}
            {isLoading && (
                <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                    <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Traitement en cours...
                    </div>
                </div>
            )}

            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.name}
                            className={`${stat.bg} rounded-xl p-6 border border-gray-100`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div
                                        className={`${stat.iconBg} rounded-lg p-2 mb-3 inline-block`}
                                    >
                                        <Icon
                                            className={`h-5 w-5 ${stat.color}`}
                                        />
                                    </div>
                                    <div className="text-sm font-medium text-gray-600">
                                        {stat.name}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {stat.subtitle}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Section État des files d'attente */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">
                            État des files d'attente
                        </h3>
                    </div>
                    <div className="p-6">
                        {/* Service actuel */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">
                                    {guichet?.service?.nom}
                                </span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                    Normale
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                    4 en attente
                                </span>
                                <span className="text-xs text-gray-500">
                                    temps d'attente
                                </span>
                            </div>
                            <div className="text-xl font-bold text-gray-900">
                                12 min
                            </div>
                        </div>

                        {/* Ticket en cours */}
                        {ticketEnCours ? (
                            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="font-medium text-gray-900">
                                        {ticketEnCours.numero}
                                    </div>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                        {ticketEnCours.statut === "appele"
                                            ? "En cours"
                                            : "Terminé"}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    {ticketEnCours.nom_client}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    {new Date(
                                        ticketEnCours.heure_appel ||
                                            ticketEnCours.heure_debut
                                    ).toLocaleTimeString()}
                                </div>

                                <div className="flex space-x-2 mt-3">
                                    {ticketEnCours.statut === "appele" ? (
                                        <button
                                            onClick={() =>
                                                executeAction(
                                                    "commencer",
                                                    ticketEnCours.id
                                                )
                                            }
                                            disabled={isLoading}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                        >
                                            Commencer
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
                                            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                        >
                                            Terminer
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-6">
                                <button
                                    onClick={() => executeAction("appeler")}
                                    disabled={
                                        isLoading || !ticketsEnAttente?.length
                                    }
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center mx-auto"
                                >
                                    <FiPlay className="h-4 w-4 mr-2" />
                                    Appeler le prochain
                                </button>
                                {!ticketsEnAttente?.length && (
                                    <p className="text-sm text-gray-400 mt-2">
                                        Aucun ticket en attente
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Liste d'attente */}
                        {ticketsEnAttente?.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                    Prochains clients
                                </h4>
                                {ticketsEnAttente
                                    .slice(0, 3)
                                    .map((ticket, index) => (
                                        <div
                                            key={ticket.id}
                                            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                                        >
                                            <div>
                                                <div className="font-medium text-sm text-gray-900">
                                                    {ticket.numero}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {ticket.nom_client}
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(
                                                    ticket.created_at
                                                ).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Section Tickets récents */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Tickets récents
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-3">
                            {/* Ticket exemple */}
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-medium text-sm text-gray-900">
                                        A002
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {guichet?.service?.nom}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                        En cours
                                    </span>
                                    <div className="text-xs text-gray-500 mt-1">
                                        09:30
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-medium text-sm text-gray-900">
                                        A001
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {guichet?.service?.nom}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                        Terminé
                                    </span>
                                    <div className="text-xs text-gray-500 mt-1">
                                        09:15
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions rapides en bas */}
            <div className="mt-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Actions rapides
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button
                            onClick={() => executeAction("appeler")}
                            disabled={isLoading || !ticketsEnAttente?.length}
                            className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 disabled:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                            <FiPlay className="h-6 w-6 text-blue-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">
                                Appeler suivant
                            </span>
                        </button>

                        <button
                            onClick={() =>
                                alert("Fonction pause en développement")
                            }
                            disabled={isLoading}
                            className="flex flex-col items-center p-4 bg-yellow-50 hover:bg-yellow-100 disabled:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                            <FiPause className="h-6 w-6 text-yellow-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">
                                Prendre une pause
                            </span>
                        </button>

                        <button
                            onClick={() =>
                                ticketEnCours &&
                                executeAction("terminer", ticketEnCours.id)
                            }
                            disabled={isLoading || !ticketEnCours}
                            className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 disabled:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                            <FiCheckCircle className="h-6 w-6 text-green-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">
                                Terminer service
                            </span>
                        </button>

                        <button
                            onClick={() => (window.location.href = "/guichet")}
                            disabled={isLoading}
                            className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                            <FiRefreshCw className="h-6 w-6 text-gray-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">
                                Actualiser
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </UnifiedLayout>
    );
}
