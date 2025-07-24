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

export default function UnifiedAdminDashboard({ auth, statistiques }) {
    const [currentTime, setCurrentTime] = useState(new Date());

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
            value: statistiques?.tickets_en_attente || 6,
            subtitle: "Clients en file",
            icon: FiClock,
            color: "text-orange-600",
            bg: "bg-orange-50",
            iconBg: "bg-orange-100",
        },
        {
            name: "Temps moyen",
            value: statistiques?.temps_moyen_global || "0 min",
            subtitle: "Attente moyenne",
            icon: FiTrendingUp,
            color: "text-purple-600",
            bg: "bg-purple-50",
            iconBg: "bg-purple-100",
        },
        {
            name: "Traités aujourd'hui",
            value: statistiques?.tickets_traites_aujourdhui || 38,
            subtitle: "Tickets complétés",
            icon: FiCheckCircle,
            color: "text-green-600",
            bg: "bg-green-50",
            iconBg: "bg-green-100",
        },
    ];

    return (
        <UnifiedLayout user={auth.user} title="Administration">
            <Head title="Administration" />

            {/* Header du tableau de bord */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Tableau de bord
                </h1>
                <p className="text-gray-600">
                    Vue d'ensemble de l'activité bancaire en temps réel
                </p>
            </div>

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
                        <div className="space-y-4">
                            {/* Service 1 */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">
                                        Ouverture de compte
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

                            {/* Service 2 */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">
                                        Service client
                                    </span>
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                        Faible
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                        2 en attente
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        temps d'attente
                                    </span>
                                </div>
                                <div className="text-xl font-bold text-gray-900">
                                    5 min
                                </div>
                            </div>
                        </div>
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
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-medium text-sm text-gray-900">
                                        A002
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Ouverture de compte
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
                                        Ouverture de compte
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

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div className="font-medium text-sm text-gray-900">
                                        B003
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Service client
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                        Terminé
                                    </span>
                                    <div className="text-xs text-gray-500 mt-1">
                                        09:10
                                    </div>
                                </div>
                            </div>
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
