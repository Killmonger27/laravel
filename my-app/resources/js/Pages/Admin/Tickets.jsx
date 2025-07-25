import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import UnifiedLayout from "@/Layouts/UnifiedLayout";
import {
    FiFileText,
    FiSearch,
    FiFilter,
    FiEye,
    FiEdit,
    FiTrash2,
    FiUsers,
    FiClock,
    FiCheckCircle,
    FiAlertCircle,
    FiRefreshCw,
    FiDownload,
    FiCalendar,
} from "react-icons/fi";

export default function Tickets({ auth }) {
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
    const tickets = [
        {
            id: 1,
            numero: "A001",
            nom_client: "Jean Dupont",
            telephone: "0123456789",
            service: "Compte Courant",
            guichet: "Guichet 1",
            statut: "en_attente",
            created_at: "2025-01-25 09:30:00",
            heure_appel: null,
            temps_attente: "45 min",
        },
        {
            id: 2,
            numero: "A002",
            nom_client: "Marie Martin",
            telephone: "0987654321",
            service: "Crédit",
            guichet: "Guichet 2",
            statut: "en_cours",
            created_at: "2025-01-25 09:15:00",
            heure_appel: "2025-01-25 10:00:00",
            temps_attente: "30 min",
        },
        {
            id: 3,
            numero: "A003",
            nom_client: "Pierre Lambert",
            telephone: "0147258369",
            service: "Épargne",
            guichet: "Guichet 1",
            statut: "termine",
            created_at: "2025-01-25 08:45:00",
            heure_appel: "2025-01-25 09:30:00",
            temps_attente: "15 min",
        },
    ];

    const stats = [
        {
            name: "Total tickets",
            value: tickets.length,
            subtitle: "Aujourd'hui",
            icon: FiFileText,
            color: "text-blue-500",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
        {
            name: "En attente",
            value: tickets.filter((t) => t.statut === "en_attente").length,
            subtitle: "À traiter",
            icon: FiClock,
            color: "text-indigo-600",
            bg: "bg-gradient-to-br from-indigo-50 to-blue-50",
            iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
        },
        {
            name: "En cours",
            value: tickets.filter((t) => t.statut === "en_cours").length,
            subtitle: "Traitement",
            icon: FiUsers,
            color: "text-blue-600",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
        {
            name: "Terminés",
            value: tickets.filter((t) => t.statut === "termine").length,
            subtitle: "Complétés",
            icon: FiCheckCircle,
            color: "text-emerald-500",
            bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
            iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
        },
    ];

    const getStatusColor = (statut) => {
        switch (statut) {
            case "en_attente":
                return "bg-yellow-100 text-yellow-800";
            case "en_cours":
                return "bg-blue-100 text-blue-800";
            case "termine":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (statut) => {
        switch (statut) {
            case "en_attente":
                return FiClock;
            case "en_cours":
                return FiUsers;
            case "termine":
                return FiCheckCircle;
            default:
                return FiAlertCircle;
        }
    };

    const filteredTickets = tickets.filter((ticket) => {
        const matchesSearch =
            ticket.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.nom_client.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || ticket.statut === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <UnifiedLayout user={auth.user} title="Gestion des Tickets">
            <Head title="Gestion des Tickets" />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Gestion des Tickets
                        </h1>
                        <p className="text-gray-600">
                            Vue d'ensemble et gestion de tous les tickets
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
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="en_attente">En attente</option>
                                <option value="en_cours">En cours</option>
                                <option value="termine">Terminé</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Liste des tickets */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Tickets ({filteredTickets.length})
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
                                    Guichet
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Statut
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Temps
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredTickets.map((ticket) => {
                                const StatusIcon = getStatusIcon(ticket.statut);
                                return (
                                    <tr
                                        key={ticket.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {ticket.numero}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {ticket.nom_client}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {ticket.telephone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {ticket.service}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {ticket.guichet}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                                    ticket.statut
                                                )}`}
                                            >
                                                <StatusIcon className="w-3 h-3 mr-1" />
                                                {ticket.statut.replace(
                                                    "_",
                                                    " "
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {ticket.temps_attente}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                <FiCalendar className="inline w-3 h-3 mr-1" />
                                                {new Date(
                                                    ticket.created_at
                                                ).toLocaleTimeString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                                                    <FiEye className="w-4 h-4" />
                                                </button>
                                                <button className="text-indigo-600 hover:text-indigo-900 p-1 rounded">
                                                    <FiEdit className="w-4 h-4" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900 p-1 rounded">
                                                    <FiTrash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </UnifiedLayout>
    );
}
