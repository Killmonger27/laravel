import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import UnifiedLayout from "@/Layouts/UnifiedLayout";
import {
    FiBarChart,
    FiDownload,
    FiCalendar,
    FiUsers,
    FiClock,
    FiCheckCircle,
    FiTrendingUp,
    FiTrendingDown,
    FiActivity,
    FiRefreshCw,
    FiFilter,
    FiPieChart,
} from "react-icons/fi";

export default function Stats({ auth }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [periode, setPeriode] = useState("today");

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Données factices pour les statistiques
    const statsGenerales = [
        {
            name: "Tickets traités",
            value: 247,
            evolution: +12,
            subtitle: "Cette période",
            icon: FiCheckCircle,
            color: "text-emerald-500",
            bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
            iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
        },
        {
            name: "Temps moyen",
            value: "18 min",
            evolution: -5,
            subtitle: "Attente moyenne",
            icon: FiClock,
            color: "text-blue-500",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
        {
            name: "Clients servis",
            value: 189,
            evolution: +8,
            subtitle: "Clients uniques",
            icon: FiUsers,
            color: "text-indigo-600",
            bg: "bg-gradient-to-br from-indigo-50 to-blue-50",
            iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
        },
        {
            name: "Taux satisfaction",
            value: "94%",
            evolution: +2,
            subtitle: "Score global",
            icon: FiTrendingUp,
            color: "text-blue-600",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
    ];

    const statsParService = [
        {
            service: "Compte Courant",
            tickets: 120,
            temps_moyen: "15 min",
            satisfaction: "96%",
            couleur: "bg-blue-500",
        },
        {
            service: "Crédit",
            tickets: 45,
            temps_moyen: "25 min",
            satisfaction: "92%",
            couleur: "bg-indigo-500",
        },
        {
            service: "Épargne",
            tickets: 82,
            temps_moyen: "12 min",
            satisfaction: "95%",
            couleur: "bg-emerald-500",
        },
    ];

    const statsParGuichet = [
        {
            guichet: "Guichet 1",
            agent: "Marie Dubois",
            tickets: 89,
            temps_moyen: "16 min",
            performance: "98%",
        },
        {
            guichet: "Guichet 2",
            agent: "Jean Martin",
            tickets: 73,
            temps_moyen: "20 min",
            performance: "95%",
        },
        {
            guichet: "Guichet 3",
            agent: "Sophie Laurent",
            tickets: 85,
            temps_moyen: "14 min",
            performance: "97%",
        },
    ];

    const donneesTendances = [
        { heure: "09:00", tickets: 12 },
        { heure: "10:00", tickets: 25 },
        { heure: "11:00", tickets: 35 },
        { heure: "12:00", tickets: 18 },
        { heure: "13:00", tickets: 8 },
        { heure: "14:00", tickets: 28 },
        { heure: "15:00", tickets: 42 },
        { heure: "16:00", tickets: 38 },
        { heure: "17:00", tickets: 22 },
    ];

    return (
        <UnifiedLayout user={auth.user} title="Statistiques">
            <Head title="Statistiques" />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Statistiques & Rapports
                        </h1>
                        <p className="text-gray-600">
                            Analyse des performances et tendances
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            <FiFilter className="text-gray-400 h-4 w-4" />
                            <select
                                value={periode}
                                onChange={(e) => setPeriode(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="today">Aujourd'hui</option>
                                <option value="week">Cette semaine</option>
                                <option value="month">Ce mois</option>
                                <option value="quarter">Ce trimestre</option>
                            </select>
                        </div>
                        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center">
                            <FiDownload className="w-4 h-4 mr-2" />
                            Exporter
                        </button>
                        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center">
                            <FiRefreshCw className="w-4 h-4 mr-2" />
                            Actualiser
                        </button>
                    </div>
                </div>
            </div>

            {/* Statistiques générales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {statsGenerales.map((stat) => {
                    const Icon = stat.icon;
                    const isPositive = stat.evolution > 0;
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
                                    <div className="flex items-center">
                                        <span
                                            className={`text-xs font-medium ${
                                                isPositive
                                                    ? "text-emerald-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {isPositive ? "+" : ""}
                                            {stat.evolution}%
                                        </span>
                                        <span className="text-xs text-gray-500 ml-1">
                                            vs période précédente
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Graphique des tendances */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <FiBarChart className="w-5 h-5 mr-2 text-blue-600" />
                            Tendances horaires
                        </h3>
                        <FiTrendingUp className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="space-y-4">
                        {donneesTendances.map((data, index) => (
                            <div key={data.heure} className="flex items-center">
                                <div className="w-16 text-sm text-gray-600">
                                    {data.heure}
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${
                                                    (data.tickets / 50) * 100
                                                }%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="w-12 text-sm font-medium text-gray-900 text-right">
                                    {data.tickets}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Répartition par service */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <FiPieChart className="w-5 h-5 mr-2 text-blue-600" />
                            Répartition par service
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {statsParService.map((service) => (
                            <div
                                key={service.service}
                                className="border border-gray-100 rounded-lg p-4"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-gray-900">
                                        {service.service}
                                    </h4>
                                    <span
                                        className={`w-3 h-3 rounded-full ${service.couleur}`}
                                    ></span>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">
                                            Tickets
                                        </span>
                                        <div className="font-semibold text-gray-900">
                                            {service.tickets}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            Temps moyen
                                        </span>
                                        <div className="font-semibold text-gray-900">
                                            {service.temps_moyen}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">
                                            Satisfaction
                                        </span>
                                        <div className="font-semibold text-emerald-600">
                                            {service.satisfaction}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance par guichet */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <FiActivity className="w-5 h-5 mr-2 text-blue-600" />
                        Performance par guichet
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Guichet
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Agent
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tickets traités
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Temps moyen
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Performance
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {statsParGuichet.map((guichet, index) => (
                                <tr
                                    key={guichet.guichet}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {guichet.guichet}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {guichet.agent}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900">
                                            {guichet.tickets}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {guichet.temps_moyen}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                                                <div
                                                    className="h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                                                    style={{
                                                        width: guichet.performance,
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">
                                                {guichet.performance}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </UnifiedLayout>
    );
}
