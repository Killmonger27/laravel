import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import UnifiedLayout from "@/Layouts/UnifiedLayout";
import {
    FiClock,
    FiSearch,
    FiFilter,
    FiCalendar,
    FiUser,
    FiCheckCircle,
    FiEye,
    FiDownload,
    FiRefreshCw,
    FiBarChart,
    FiTrendingUp,
    FiActivity,
} from "react-icons/fi";

export default function History({ auth }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [dateFilter, setDateFilter] = useState("today");
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Données factices pour l'historique
    const historique = [
        {
            id: 1,
            numero: "A001",
            nom_client: "Jean Dupont",
            service: "Compte Courant",
            heure_creation: "2025-01-25 09:30:00",
            heure_appel: "2025-01-25 09:45:00",
            heure_debut: "2025-01-25 09:46:00",
            heure_fin: "2025-01-25 10:02:00",
            duree_attente: "15 min",
            duree_service: "16 min",
            statut: "termine",
        },
        {
            id: 2,
            numero: "A002",
            nom_client: "Marie Martin",
            service: "Crédit",
            heure_creation: "2025-01-25 08:15:00",
            heure_appel: "2025-01-25 08:30:00",
            heure_debut: "2025-01-25 08:32:00",
            heure_fin: "2025-01-25 09:10:00",
            duree_attente: "15 min",
            duree_service: "38 min",
            statut: "termine",
        },
        {
            id: 3,
            numero: "A003",
            nom_client: "Pierre Lambert",
            service: "Épargne",
            heure_creation: "2025-01-25 10:00:00",
            heure_appel: "2025-01-25 10:15:00",
            heure_debut: "2025-01-25 10:16:00",
            heure_fin: "2025-01-25 10:25:00",
            duree_attente: "15 min",
            duree_service: "9 min",
            statut: "termine",
        },
        {
            id: 4,
            numero: "A004",
            nom_client: "Sophie Moreau",
            service: "Compte Courant",
            heure_creation: "2025-01-25 11:20:00",
            heure_appel: "2025-01-25 11:35:00",
            heure_debut: "2025-01-25 11:37:00",
            heure_fin: null,
            duree_attente: "15 min",
            duree_service: "En cours",
            statut: "en_cours",
        },
    ];

    const statsJournee = [
        {
            name: "Tickets traités",
            value: historique.filter((h) => h.statut === "termine").length,
            subtitle: "Complétés",
            icon: FiCheckCircle,
            color: "text-emerald-500",
            bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
            iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
        },
        {
            name: "Temps moyen",
            value: "21 min",
            subtitle: "Durée service",
            icon: FiClock,
            color: "text-blue-500",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
        {
            name: "Clients servis",
            value: historique.length,
            subtitle: "Total journée",
            icon: FiUser,
            color: "text-indigo-600",
            bg: "bg-gradient-to-br from-indigo-50 to-blue-50",
            iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
        },
        {
            name: "Efficacité",
            value: "96%",
            subtitle: "Performance",
            icon: FiTrendingUp,
            color: "text-blue-600",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
    ];

    const getStatusColor = (statut) => {
        switch (statut) {
            case "termine":
                return "bg-green-100 text-green-800";
            case "en_cours":
                return "bg-blue-100 text-blue-800";
            case "annule":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const filteredHistorique = historique.filter((ticket) => {
        const matchesSearch =
            ticket.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.nom_client.toLowerCase().includes(searchTerm.toLowerCase());

        if (dateFilter === "today") {
            const today = new Date().toDateString();
            return (
                matchesSearch &&
                new Date(ticket.heure_creation).toDateString() === today
            );
        }

        return matchesSearch;
    });

    return (
        <UnifiedLayout user={auth.user} title="Historique">
            <Head title="Historique" />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Historique des Tickets
                        </h1>
                        <p className="text-gray-600">
                            Historique de vos interventions et performances
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
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

            {/* Statistiques de performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {statsJournee.map((stat) => {
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

            {/* Filtres et recherche */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Rechercher par numéro ou nom..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <FiFilter className="text-gray-400 h-4 w-4" />
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="today">Aujourd'hui</option>
                                <option value="week">Cette semaine</option>
                                <option value="month">Ce mois</option>
                                <option value="all">Tout l'historique</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Graphique des performances */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <FiBarChart className="w-5 h-5 mr-2 text-blue-600" />
                            Temps de traitement
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {historique
                            .filter((h) => h.statut === "termine")
                            .slice(0, 5)
                            .map((ticket, index) => (
                                <div
                                    key={ticket.id}
                                    className="flex items-center"
                                >
                                    <div className="w-16 text-sm text-gray-600">
                                        {ticket.numero}
                                    </div>
                                    <div className="flex-1 mx-4">
                                        <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${Math.min(
                                                        (parseInt(
                                                            ticket.duree_service
                                                        ) /
                                                            60) *
                                                            100,
                                                        100
                                                    )}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="w-16 text-sm font-medium text-gray-900 text-right">
                                        {ticket.duree_service}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <FiActivity className="w-5 h-5 mr-2 text-blue-600" />
                            Répartition par service
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {["Compte Courant", "Crédit", "Épargne"].map(
                            (service, index) => {
                                const count = historique.filter(
                                    (h) => h.service === service
                                ).length;
                                const percentage =
                                    historique.length > 0
                                        ? (count / historique.length) * 100
                                        : 0;

                                return (
                                    <div
                                        key={service}
                                        className="flex items-center"
                                    >
                                        <div className="w-32 text-sm text-gray-600">
                                            {service}
                                        </div>
                                        <div className="flex-1 mx-4">
                                            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${
                                                        index === 0
                                                            ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                                                            : index === 1
                                                            ? "bg-gradient-to-r from-indigo-500 to-blue-600"
                                                            : "bg-gradient-to-r from-emerald-500 to-teal-600"
                                                    }`}
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="w-12 text-sm font-medium text-gray-900 text-right">
                                            {count}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>

            {/* Tableau de l'historique */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Historique détaillé ({filteredHistorique.length})
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ticket
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Client
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Service
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Horaires
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Durées
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Statut
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredHistorique.map((ticket) => (
                                <tr
                                    key={ticket.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {ticket.numero}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <FiCalendar className="inline w-3 h-3 mr-1" />
                                            {new Date(
                                                ticket.heure_creation
                                            ).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {ticket.nom_client}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {ticket.service}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <div>
                                                Appelé:{" "}
                                                {new Date(
                                                    ticket.heure_appel
                                                ).toLocaleTimeString()}
                                            </div>
                                            <div>
                                                Début:{" "}
                                                {new Date(
                                                    ticket.heure_debut
                                                ).toLocaleTimeString()}
                                            </div>
                                            {ticket.heure_fin && (
                                                <div>
                                                    Fin:{" "}
                                                    {new Date(
                                                        ticket.heure_fin
                                                    ).toLocaleTimeString()}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <div>
                                                Attente: {ticket.duree_attente}
                                            </div>
                                            <div>
                                                Service: {ticket.duree_service}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                                ticket.statut
                                            )}`}
                                        >
                                            {ticket.statut === "termine"
                                                ? "Terminé"
                                                : ticket.statut === "en_cours"
                                                ? "En cours"
                                                : ticket.statut}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                                            <FiEye className="w-4 h-4" />
                                        </button>
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
