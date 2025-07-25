import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import UnifiedLayout from "@/Layouts/UnifiedLayout";
import {
    FiUsers,
    FiClock,
    FiCheckCircle,
    FiTrendingUp,
    FiActivity,
    FiBarChart,
} from "react-icons/fi";

export default function UnifiedAdminDashboard({
    auth,
    statistiques,
    statistiques_services = [],
    activite_recente = [],
}) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const stats = [
        {
            name: "Guichets",
            value: statistiques?.guichets_total ?? "-",
            subtitle: "Total guichets",
            icon: FiBarChart,
            color: "text-indigo-600",
            bg: "bg-gradient-to-br from-indigo-50 to-blue-50",
            iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
        },

        {
            name: "Tickets aujourd'hui",
            value: statistiques?.tickets_aujourdhui ?? "-",
            subtitle: "Émis aujourd'hui",
            icon: FiClock,
            color: "text-indigo-600",
            bg: "bg-gradient-to-br from-indigo-50 to-blue-50",
            iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
        },
        {
            name: "Tickets terminés",
            value: statistiques?.tickets_termines ?? "-",
            subtitle: "Complétés aujourd'hui",
            icon: FiCheckCircle,
            color: "text-emerald-500",
            bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
            iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
        },
        {
            name: "En attente",
            value: statistiques?.tickets_en_attente ?? "-",
            subtitle: "Clients en file",
            icon: FiClock,
            color: "text-yellow-600",
            bg: "bg-gradient-to-br from-yellow-50 to-orange-50",
            iconBg: "bg-gradient-to-br from-yellow-400 to-orange-500",
        },
        {
            name: "En cours",
            value: statistiques?.tickets_en_cours ?? "-",
            subtitle: "Traitement en cours",
            icon: FiActivity,
            color: "text-blue-600",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
        {
            name: "Temps moyen",
            value: statistiques?.temps_moyen_global ?? "-",
            subtitle: "Attente moyenne",
            icon: FiTrendingUp,
            color: "text-blue-600",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
    ];

    return (
        <UnifiedLayout user={auth.user} title="Administration">
            <Head title="Administration" />

            {/* Header du tableau de bord */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Tableau d bord
                </h1>
                <p className="text-gray-600">
                    Vue d'ensemble de l'activité bancaire en temps réel
                </p>
            </div>

            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-6">
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
                                        <Icon className="h-5 w-5 text-white" />
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
                {/* Section État des files d'attente dynamique */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">
                            État des files d'attente
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {statistiques_services.length === 0 && (
                                <div className="text-gray-400 text-center">
                                    Aucun service trouvé.
                                </div>
                            )}
                            {statistiques_services.map((service) => (
                                <div
                                    key={service.id}
                                    className="border border-gray-200 rounded-lg p-4"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            {service.nom}
                                        </span>
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                service.statut === "actif"
                                                    ? "bg-green-100 text-green-800"
                                                    : service.statut ===
                                                      "maintenance"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {service.statut}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">
                                            {service.tickets_en_attente} en
                                            attente
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {service.tickets_aujourdhui}{" "}
                                            aujourd'hui
                                        </span>
                                    </div>
                                    <div className="text-xl font-bold text-gray-900">
                                        {service.tickets_termines} traités
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Section Tickets récents dynamique */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Tickets récents
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-3">
                            {activite_recente.length === 0 && (
                                <div className="text-gray-400 text-center">
                                    Aucune activité récente.
                                </div>
                            )}
                            {activite_recente.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div>
                                        <div className="font-medium text-sm text-gray-900">
                                            {ticket.numero}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {ticket.service?.nom || "-"}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                ticket.statut === "termine"
                                                    ? "bg-green-100 text-green-800"
                                                    : ticket.statut ===
                                                      "en_cours"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : ticket.statut ===
                                                      "en_attente"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {ticket.statut.replace("_", " ")}
                                        </span>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {ticket.created_at
                                                ? new Date(
                                                      ticket.created_at
                                                  ).toLocaleTimeString(
                                                      "fr-FR",
                                                      {
                                                          hour: "2-digit",
                                                          minute: "2-digit",
                                                      }
                                                  )
                                                : ""}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Graphiques et métriques avancées */}
            <div className="mt-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Performance système
                        </h3>
                        <FiBarChart className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {statistiques?.efficacite || "95%"}
                            </div>
                            <div className="text-sm text-gray-500">
                                Efficacité générale
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {statistiques?.agents_actifs ||
                                    statistiques?.total_agents ||
                                    "4"}
                            </div>
                            <div className="text-sm text-gray-500">
                                Agents actifs
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">
                                {statistiques?.satisfaction || "4.8/5"}
                            </div>
                            <div className="text-sm text-gray-500">
                                Satisfaction client
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions administrateur */}
            <div className="mt-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Actions rapides
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                            <FiUsers className="h-6 w-6 text-blue-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">
                                Gérer agents
                            </span>
                        </button>

                        <button className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
                            <FiActivity className="h-6 w-6 text-green-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">
                                Voir guichets
                            </span>
                        </button>

                        <button className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                            <FiBarChart className="h-6 w-6 text-purple-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">
                                Statistiques
                            </span>
                        </button>

                        <button className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <FiClock className="h-6 w-6 text-gray-600 mb-2" />
                            <span className="text-sm font-medium text-gray-900">
                                Historique
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </UnifiedLayout>
    );
}
