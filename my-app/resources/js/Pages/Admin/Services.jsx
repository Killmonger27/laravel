import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import UnifiedLayout from "@/Layouts/UnifiedLayout";
import {
    FiActivity,
    FiSearch,
    FiFilter,
    FiEdit,
    FiTrash2,
    FiPlus,
    FiUsers,
    FiClock,
    FiSettings,
    FiRefreshCw,
    FiPlay,
    FiPause,
    FiEye,
} from "react-icons/fi";

export default function Services({ auth }) {
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
    const services = [
        {
            id: 1,
            nom: "Compte Courant",
            description: "Ouverture et gestion des comptes courants",
            statut: "actif",
            guichets_assignes: 2,
            tickets_en_attente: 5,
            temps_moyen: "15 min",
            tickets_traites_aujourdhui: 42,
            created_at: "2024-01-15",
        },
        {
            id: 2,
            nom: "Crédit",
            description: "Demandes de crédit et financement",
            statut: "actif",
            guichets_assignes: 1,
            tickets_en_attente: 3,
            temps_moyen: "25 min",
            tickets_traites_aujourdhui: 18,
            created_at: "2024-01-15",
        },
        {
            id: 3,
            nom: "Épargne",
            description: "Produits d'épargne et placement",
            statut: "inactif",
            guichets_assignes: 0,
            tickets_en_attente: 0,
            temps_moyen: "0 min",
            tickets_traites_aujourdhui: 0,
            created_at: "2024-01-15",
        },
        {
            id: 4,
            nom: "Assurance",
            description: "Produits d'assurance et protection",
            statut: "maintenance",
            guichets_assignes: 1,
            tickets_en_attente: 0,
            temps_moyen: "20 min",
            tickets_traites_aujourdhui: 5,
            created_at: "2024-02-01",
        },
    ];

    const stats = [
        {
            name: "Total services",
            value: services.length,
            subtitle: "Configurés",
            icon: FiActivity,
            color: "text-blue-500",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
        {
            name: "Actifs",
            value: services.filter((s) => s.statut === "actif").length,
            subtitle: "En service",
            icon: FiPlay,
            color: "text-emerald-500",
            bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
            iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
        },
        {
            name: "Total tickets",
            value: services.reduce((acc, s) => acc + s.tickets_en_attente, 0),
            subtitle: "En attente",
            icon: FiUsers,
            color: "text-indigo-600",
            bg: "bg-gradient-to-br from-indigo-50 to-blue-50",
            iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
        },
        {
            name: "Traités aujourd'hui",
            value: services.reduce(
                (acc, s) => acc + s.tickets_traites_aujourdhui,
                0
            ),
            subtitle: "Complétés",
            icon: FiSettings,
            color: "text-blue-600",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
    ];

    const getStatusColor = (statut) => {
        switch (statut) {
            case "actif":
                return "bg-green-100 text-green-800";
            case "inactif":
                return "bg-red-100 text-red-800";
            case "maintenance":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (statut) => {
        switch (statut) {
            case "actif":
                return FiPlay;
            case "inactif":
                return FiPause;
            case "maintenance":
                return FiSettings;
            default:
                return FiClock;
        }
    };

    const filteredServices = services.filter((service) => {
        const matchesSearch =
            service.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || service.statut === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <UnifiedLayout user={auth.user} title="Gestion des Services">
            <Head title="Gestion des Services" />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Gestion des Services
                        </h1>
                        <p className="text-gray-600">
                            Configuration et monitoring des services bancaires
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center">
                            <FiPlus className="w-4 h-4 mr-2" />
                            Nouveau service
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
                                placeholder="Rechercher par nom ou description..."
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
                                <option value="actif">Actif</option>
                                <option value="inactif">Inactif</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grille des services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredServices.map((service) => {
                    const StatusIcon = getStatusIcon(service.statut);
                    return (
                        <div
                            key={service.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <FiActivity className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {service.nom}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                        service.statut
                                    )}`}
                                >
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {service.statut}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-sm text-gray-500">
                                            Guichets assignés
                                        </span>
                                        <div className="text-xl font-bold text-gray-900">
                                            {service.guichets_assignes}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">
                                            En attente
                                        </span>
                                        <div className="text-xl font-bold text-indigo-600">
                                            {service.tickets_en_attente}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-sm text-gray-500">
                                            Temps moyen
                                        </span>
                                        <div className="text-lg font-semibold text-gray-900">
                                            {service.temps_moyen}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">
                                            Traités aujourd'hui
                                        </span>
                                        <div className="text-lg font-semibold text-emerald-600">
                                            {service.tickets_traites_aujourdhui}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 border-t border-gray-100">
                                    <span className="text-xs text-gray-500">
                                        Créé le{" "}
                                        {new Date(
                                            service.created_at
                                        ).toLocaleDateString("fr-FR")}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
                                <button className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50">
                                    <FiEye className="w-4 h-4" />
                                </button>
                                <button className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50">
                                    <FiEdit className="w-4 h-4" />
                                </button>
                                <button className="text-emerald-600 hover:text-emerald-900 p-2 rounded-lg hover:bg-emerald-50">
                                    <FiSettings className="w-4 h-4" />
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
