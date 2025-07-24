import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    FiUsers,
    FiClock,
    FiCheckCircle,
    FiActivity,
    FiTrendingUp,
    FiUserCheck,
    FiSettings,
    FiBarChart,
    FiCalendar,
    FiPhone,
    FiUser,
} from "react-icons/fi";

export default function AdminDashboard({
    auth,
    statistiques,
    statistiques_services,
    agents_statistiques,
    activite_recente,
    tickets_par_heure,
}) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const statsCards = [
        {
            name: "Agents connectés",
            value: `${statistiques.agents_connectes}/${statistiques.agents_total}`,
            icon: FiUserCheck,
            color: "text-green-600",
            bg: "bg-green-100",
            description: "Agents actifs",
        },
        {
            name: "Guichets actifs",
            value: `${statistiques.guichets_actifs}/${statistiques.guichets_total}`,
            icon: FiSettings,
            color: "text-blue-600",
            bg: "bg-blue-100",
            description: "Guichets en service",
        },
        {
            name: "Tickets aujourd'hui",
            value: statistiques.tickets_aujourdhui,
            icon: FiActivity,
            color: "text-purple-600",
            bg: "bg-purple-100",
            description: `${statistiques.tickets_termines} terminés`,
        },
        {
            name: "Performance",
            value: `${statistiques.taux_satisfaction}%`,
            icon: FiTrendingUp,
            color: "text-orange-600",
            bg: "bg-orange-100",
            description: "Taux de satisfaction",
        },
    ];

    const statusCards = [
        {
            name: "En attente",
            value: statistiques.tickets_en_attente,
            icon: FiClock,
            color: "text-yellow-600",
            bg: "bg-yellow-100",
        },
        {
            name: "En cours",
            value: statistiques.tickets_en_cours,
            icon: FiActivity,
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            name: "Terminés",
            value: statistiques.tickets_termines,
            icon: FiCheckCircle,
            color: "text-green-600",
            bg: "bg-green-100",
        },
        {
            name: "Temps moyen",
            value: statistiques.temps_moyen,
            icon: FiClock,
            color: "text-purple-600",
            bg: "bg-purple-100",
        },
    ];

    return (
        <AdminLayout user={auth.user} title="Tableau de bord administrateur">
            <Head title="Administration" />

            {/* Header avec horloge */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Tableau de bord
                        </h1>
                        <p className="text-gray-600">
                            Vue d'ensemble du système bancaire
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-mono font-bold text-gray-800">
                            {currentTime.toLocaleTimeString()}
                        </div>
                        <div className="text-sm text-gray-600">
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

            {/* Statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {statsCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.name}
                            className="bg-white rounded-lg shadow p-6"
                        >
                            <div className="flex items-center">
                                <div
                                    className={`flex-shrink-0 ${stat.bg} rounded-md p-3`}
                                >
                                    <Icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-500">
                                        {stat.name}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {stat.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Statuts des tickets */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {statusCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.name}
                            className="bg-white rounded-lg shadow p-4"
                        >
                            <div className="flex items-center">
                                <div
                                    className={`flex-shrink-0 ${stat.bg} rounded-md p-2`}
                                >
                                    <Icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                                <div className="ml-3">
                                    <div className="text-sm font-medium text-gray-500">
                                        {stat.name}
                                    </div>
                                    <div className="text-xl font-bold text-gray-900">
                                        {stat.value}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Statistiques par service */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                <FiBarChart className="h-5 w-5 mr-2" />
                                Statistiques par service
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {statistiques_services?.map((service) => (
                                    <div
                                        key={service.id}
                                        className="border rounded-lg p-4"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-medium text-gray-900">
                                                {service.nom}
                                            </h4>
                                            <span className="text-sm text-gray-500">
                                                Code: {service.code}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <div className="text-gray-500">
                                                    Aujourd'hui
                                                </div>
                                                <div className="font-semibold">
                                                    {service.tickets_aujourdhui}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500">
                                                    Terminés
                                                </div>
                                                <div className="font-semibold text-green-600">
                                                    {service.tickets_termines}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500">
                                                    En attente
                                                </div>
                                                <div className="font-semibold text-yellow-600">
                                                    {service.tickets_en_attente}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Agents en ligne */}
                <div>
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                <FiUsers className="h-5 w-5 mr-2" />
                                Agents ({agents_statistiques?.length || 0})
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {agents_statistiques?.map((agent) => (
                                    <div
                                        key={agent.id}
                                        className="flex items-center justify-between p-3 border rounded-lg"
                                    >
                                        <div className="flex items-center">
                                            <div
                                                className={`w-3 h-3 rounded-full mr-3 ${
                                                    agent.statut === "connecte"
                                                        ? "bg-green-400"
                                                        : agent.statut ===
                                                          "en_pause"
                                                        ? "bg-yellow-400"
                                                        : "bg-red-400"
                                                }`}
                                            ></div>
                                            <div>
                                                <div className="font-medium text-sm">
                                                    {agent.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {agent.guichet?.numero} -{" "}
                                                    {
                                                        agent.guichet?.service
                                                            ?.nom
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            {agent.tickets_traites || 0}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activité récente */}
            <div className="mt-6">
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            <FiActivity className="h-5 w-5 mr-2" />
                            Activité récente
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-3">
                            {activite_recente?.length > 0 ? (
                                activite_recente.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="flex items-center justify-between p-3 border rounded-lg"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div
                                                className={`p-2 rounded-full ${
                                                    ticket.statut === "termine"
                                                        ? "bg-green-100"
                                                        : ticket.statut ===
                                                          "en_cours"
                                                        ? "bg-blue-100"
                                                        : ticket.statut ===
                                                          "appele"
                                                        ? "bg-yellow-100"
                                                        : "bg-gray-100"
                                                }`}
                                            >
                                                <FiUser
                                                    className={`h-4 w-4 ${
                                                        ticket.statut ===
                                                        "termine"
                                                            ? "text-green-600"
                                                            : ticket.statut ===
                                                              "en_cours"
                                                            ? "text-blue-600"
                                                            : ticket.statut ===
                                                              "appele"
                                                            ? "text-yellow-600"
                                                            : "text-gray-600"
                                                    }`}
                                                />
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    {ticket.numero}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {ticket.nom_client}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium capitalize">
                                                {ticket.statut.replace(
                                                    "_",
                                                    " "
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {ticket.service?.nom} -{" "}
                                                {ticket.guichet?.numero}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <FiActivity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">
                                        Aucune activité récente
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
