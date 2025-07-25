import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import UnifiedLayout from "@/Layouts/UnifiedLayout";
import {
    FiUsers,
    FiSearch,
    FiFilter,
    FiEdit,
    FiTrash2,
    FiPlus,
    FiShield,
    FiUser,
    FiMail,
    FiPhone,
    FiCalendar,
    FiSettings,
    FiRefreshCw,
    FiEye,
    FiLock,
} from "react-icons/fi";

export default function Users({ auth }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Données factices
    const users = [
        {
            id: 1,
            name: "Admin Principal",
            email: "admin@sysbanque.fr",
            role: "admin",
            statut: "actif",
            telephone: "0123456789",
            matricule: null,
            guichet: null,
            derniere_connexion: "2025-01-25 10:00:00",
            created_at: "2024-01-15",
        },
        {
            id: 2,
            name: "Marie Dubois",
            email: "marie.dubois@sysbanque.fr",
            role: "agent",
            statut: "actif",
            telephone: "0123456790",
            matricule: "A001",
            guichet: { numero: "1", service: "Compte Courant" },
            derniere_connexion: "2025-01-25 09:45:00",
            created_at: "2024-01-20",
        },
        {
            id: 3,
            name: "Jean Martin",
            email: "jean.martin@sysbanque.fr",
            role: "agent",
            statut: "actif",
            telephone: "0123456791",
            matricule: "A002",
            guichet: { numero: "2", service: "Crédit" },
            derniere_connexion: "2025-01-25 08:30:00",
            created_at: "2024-01-22",
        },
        {
            id: 4,
            name: "Sophie Laurent",
            email: "sophie.laurent@sysbanque.fr",
            role: "agent",
            statut: "inactif",
            telephone: "0123456792",
            matricule: "A003",
            guichet: null,
            derniere_connexion: "2025-01-20 17:00:00",
            created_at: "2024-02-01",
        },
    ];

    const stats = [
        {
            name: "Total utilisateurs",
            value: users.length,
            subtitle: "Comptes créés",
            icon: FiUsers,
            color: "text-blue-500",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
        {
            name: "Administrateurs",
            value: users.filter((u) => u.role === "admin").length,
            subtitle: "Accès privilégié",
            icon: FiShield,
            color: "text-indigo-600",
            bg: "bg-gradient-to-br from-indigo-50 to-blue-50",
            iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
        },
        {
            name: "Agents",
            value: users.filter((u) => u.role === "agent").length,
            subtitle: "Personnel guichet",
            icon: FiUser,
            color: "text-emerald-500",
            bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
            iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
        },
        {
            name: "Actifs",
            value: users.filter((u) => u.statut === "actif").length,
            subtitle: "Connectés récemment",
            icon: FiSettings,
            color: "text-blue-600",
            bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
    ];

    const getRoleColor = (role) => {
        switch (role) {
            case "admin":
                return "bg-purple-100 text-purple-800";
            case "agent":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusColor = (statut) => {
        switch (statut) {
            case "actif":
                return "bg-green-100 text-green-800";
            case "inactif":
                return "bg-red-100 text-red-800";
            case "suspendu":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getRoleIcon = (role) => {
        switch (role) {
            case "admin":
                return FiShield;
            case "agent":
                return FiUser;
            default:
                return FiUser;
        }
    };

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.matricule &&
                user.matricule
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()));
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        const matchesStatus =
            statusFilter === "all" || user.statut === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    return (
        <UnifiedLayout user={auth.user} title="Gestion des Utilisateurs">
            <Head title="Gestion des Utilisateurs" />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Gestion des Utilisateurs
                        </h1>
                        <p className="text-gray-600">
                            Administration des comptes et permissions
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center">
                            <FiPlus className="w-4 h-4 mr-2" />
                            Nouvel utilisateur
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
                                placeholder="Rechercher par nom, email ou matricule..."
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
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">Tous les rôles</option>
                                <option value="admin">Administrateur</option>
                                <option value="agent">Agent</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-2">
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
                                <option value="suspendu">Suspendu</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Liste des utilisateurs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Utilisateurs ({filteredUsers.length})
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Utilisateur
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rôle
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Guichet
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Statut
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Dernière connexion
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user) => {
                                const RoleIcon = getRoleIcon(user.role);
                                return (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                                    <span className="text-white font-bold text-sm">
                                                        {user.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")
                                                            .slice(0, 2)}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.name}
                                                    </div>
                                                    {user.matricule && (
                                                        <div className="text-sm text-gray-500">
                                                            Matricule:{" "}
                                                            {user.matricule}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm text-gray-900 flex items-center">
                                                    <FiMail className="w-3 h-3 mr-1" />
                                                    {user.email}
                                                </div>
                                                {user.telephone && (
                                                    <div className="text-sm text-gray-500 flex items-center">
                                                        <FiPhone className="w-3 h-3 mr-1" />
                                                        {user.telephone}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                                                    user.role
                                                )}`}
                                            >
                                                <RoleIcon className="w-3 h-3 mr-1" />
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.guichet ? (
                                                <div>
                                                    <div>
                                                        Guichet{" "}
                                                        {user.guichet.numero}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {user.guichet.service}
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">
                                                    Non assigné
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                                    user.statut
                                                )}`}
                                            >
                                                {user.statut}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(
                                                    user.derniere_connexion
                                                ).toLocaleDateString("fr-FR")}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(
                                                    user.derniere_connexion
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
                                                <button className="text-yellow-600 hover:text-yellow-900 p-1 rounded">
                                                    <FiLock className="w-4 h-4" />
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
