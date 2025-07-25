import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import UnifiedLayout from "@/Layouts/UnifiedLayout";
import {
    FiTool,
    FiSearch,
    FiFilter,
    FiEdit,
    FiTrash2,
    FiPlus,
    FiActivity,
    FiUser,
    FiCheckCircle,
    FiClock,
    FiSettings,
    FiRefreshCw,
    FiMonitor,
} from "react-icons/fi";

export default function Guichets({ auth }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Données factices
    const guichets = [
        {
            id: 1,
            numero: "1",
            nom: "Guichet Principal",
            service: { nom: "Compte Courant" },
            agent: { name: "Marie Dubois", matricule: "A001" },
            statut: "occupe",
            ticket_actuel: "A002",
            derniere_activite: "2025-01-25 10:15:00",
            tickets_traites: 12,
        },
        {
            id: 2,
            numero: "2",
            nom: "Guichet Crédit",
            service: { nom: "Crédit" },
            agent: { name: "Jean Martin", matricule: "A002" },
            statut: "libre",
            ticket_actuel: null,
            derniere_activite: "2025-01-25 09:45:00",
            tickets_traites: 8,
        },
        {
            id: 3,
            numero: "3",
            nom: "Guichet Épargne",
            service: { nom: "Épargne" },
            agent: null,
            statut: "ferme",
            ticket_actuel: null,
            derniere_activite: "2025-01-24 17:30:00",
            tickets_traites: 0,
        },
    ];

    const stats = [
        {
            name: "Total guichets",
            value: guichets.length,
            subtitle: "Configurés",
            icon: FiTool,
            color: "text-blue-500",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
        {
            name: "Actifs",
            value: guichets.filter(
                (g) => g.statut === "occupe" || g.statut === "libre"
            ).length,
            subtitle: "En service",
            icon: FiActivity,
            color: "text-emerald-500",
            bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
            iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
        },
        {
            name: "Occupés",
            value: guichets.filter((g) => g.statut === "occupe").length,
            subtitle: "Avec client",
            icon: FiUser,
            color: "text-indigo-600",
            bg: "bg-gradient-to-br from-indigo-50 to-blue-50",
            iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
        },
        {
            name: "Libres",
            value: guichets.filter((g) => g.statut === "libre").length,
            subtitle: "Disponibles",
            icon: FiCheckCircle,
            color: "text-blue-600",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
    ];

    const getStatusColor = (statut) => {
        switch (statut) {
            case "libre":
                return "bg-green-100 text-green-800";
            case "occupe":
                return "bg-blue-100 text-blue-800";
            case "ferme":
                return "bg-red-100 text-red-800";
            case "pause":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (statut) => {
        switch (statut) {
            case "libre":
                return FiCheckCircle;
            case "occupe":
                return FiUser;
            case "ferme":
                return FiClock;
            case "pause":
                return FiClock;
            default:
                return FiMonitor;
        }
    };

    const filteredGuichets = guichets.filter((guichet) => {
        const matchesSearch =
            guichet.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guichet.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guichet.agent?.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || guichet.statut === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <UnifiedLayout user={auth.user} title="Gestion des Guichets">
            <Head title="Gestion des Guichets" />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Gestion des Guichets
                        </h1>
                        <p className="text-gray-600">
                            Configuration et monitoring des guichets
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center">
                            <FiPlus className="w-4 h-4 mr-2" />
                            Nouveau guichet
                        </button>
                        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center">
                            <FiRefreshCw className="w-4 h-4 mr-2" />
                            Actualiser
                        </button>
                    </div>
                </div>
            </div>

            {/* Statistiques */}
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
                                placeholder="Rechercher par numéro, nom ou agent..."
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
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="libre">Libre</option>
                                <option value="occupe">Occupé</option>
                                <option value="ferme">Fermé</option>
                                <option value="pause">En pause</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grille des guichets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGuichets.map((guichet) => {
                    const StatusIcon = getStatusIcon(guichet.statut);
                    return (
                        <div
                            key={guichet.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <FiMonitor className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Guichet {guichet.numero}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {guichet.nom}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                        guichet.statut
                                    )}`}
                                >
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {guichet.statut}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        Service:
                                    </span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {guichet.service.nom}
                                    </span>
                                </div>

                                {guichet.agent && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Agent:
                                        </span>
                                        <span className="text-sm font-medium text-gray-900">
                                            {guichet.agent.name}
                                        </span>
                                    </div>
                                )}

                                {guichet.ticket_actuel && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">
                                            Ticket actuel:
                                        </span>
                                        <span className="text-sm font-medium text-blue-600">
                                            {guichet.ticket_actuel}
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        Tickets traités:
                                    </span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {guichet.tickets_traites}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        Dernière activité:
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {new Date(
                                            guichet.derniere_activite
                                        ).toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                                <button className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50">
                                    <FiSettings className="w-4 h-4" />
                                </button>
                                <button className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50">
                                    <FiEdit className="w-4 h-4" />
                                </button>
                                <button className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50">
                                    <FiTrash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </UnifiedLayout>
    );
}
