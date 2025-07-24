import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    FiHome,
    FiUsers,
    FiClock,
    FiSettings,
    FiBarChart,
    FiLogOut,
    FiMenu,
    FiX,
    FiBell,
    FiUser,
    FiShield,
    FiActivity,
    FiFileText,
    FiTool,
} from "react-icons/fi";

export default function UnifiedLayout({ user, children, title = "SysBanque" }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Navigation basée sur le rôle
    const getNavigation = () => {
        if (user.role === "admin") {
            return [
                {
                    name: "Dashboard",
                    href: "/admin",
                    icon: FiHome,
                    current: true,
                },
                {
                    name: "File d'attente",
                    href: "/admin/queue",
                    icon: FiUsers,
                    current: false,
                    badge: "12",
                },
                {
                    name: "Tickets",
                    href: "/admin/tickets",
                    icon: FiFileText,
                    current: false,
                },
                {
                    name: "Guichets",
                    href: "/admin/guichets",
                    icon: FiTool,
                    current: false,
                },
                {
                    name: "Utilisateurs",
                    href: "/admin/users",
                    icon: FiUsers,
                    current: false,
                },
                {
                    name: "Statistiques",
                    href: "/admin/stats",
                    icon: FiBarChart,
                    current: false,
                },
                {
                    name: "Paramètres",
                    href: "/admin/settings",
                    icon: FiSettings,
                    current: false,
                },
            ];
        } else {
            return [
                {
                    name: "Dashboard",
                    href: "/guichet",
                    icon: FiHome,
                    current: true,
                },
                {
                    name: "File d'attente",
                    href: "/guichet/queue",
                    icon: FiUsers,
                    current: false,
                },
                {
                    name: "Historique",
                    href: "/guichet/history",
                    icon: FiClock,
                    current: false,
                },
                {
                    name: "Paramètres",
                    href: "/guichet/settings",
                    icon: FiSettings,
                    current: false,
                },
            ];
        }
    };

    const navigation = getNavigation();

    const handleLogout = () => {
        router.post(route("logout"));
    };

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
            <Head title={title} />

            {/* Sidebar mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 flex z-40 lg:hidden">
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                type="button"
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <FiX className="h-6 w-6 text-white" />
                            </button>
                        </div>
                        <SidebarContent
                            navigation={navigation}
                            user={user}
                            onLogout={handleLogout}
                        />
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <SidebarContent
                        navigation={navigation}
                        user={user}
                        onLogout={handleLogout}
                    />
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                {/* Top bar */}
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
                    <button
                        type="button"
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <FiMenu className="h-6 w-6" />
                    </button>

                    <div className="flex-1 px-4 flex justify-between items-center">
                        {/* Horloge et date */}
                        <div className="flex items-center">
                            <div className="text-right">
                                <div className="text-xl font-bold text-gray-900">
                                    {new Date().toLocaleTimeString("fr-FR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {new Date().toLocaleDateString("fr-FR", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="ml-4 flex items-center space-x-4">
                            {/* Notifications */}
                            <button
                                type="button"
                                className="relative p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FiBell className="h-6 w-6" />
                                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-400 ring-2 ring-white"></span>
                            </button>

                            {/* Settings */}
                            <button
                                type="button"
                                className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FiSettings className="h-6 w-6" />
                            </button>

                            {/* User info */}
                            <div className="flex items-center space-x-3">
                                <div className="text-right">
                                    <div className="font-medium text-gray-900">
                                        {user.name}
                                    </div>
                                    <div className="text-sm text-gray-500 capitalize">
                                        {user.role}
                                    </div>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-blue-600 font-bold">
                                        {user.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function SidebarContent({ navigation, user, onLogout }) {
    const currentTime = new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-200">
            {/* Logo */}
            <div className="flex items-center h-16 flex-shrink-0 px-6 bg-blue-600">
                <div className="flex items-center">
                    <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-bold text-lg">
                            QF
                        </span>
                    </div>
                    <div>
                        <h2 className="text-white text-lg font-bold">
                            QueueFlow
                        </h2>
                        <p className="text-blue-100 text-xs">
                            Système de gestion
                        </p>
                    </div>
                </div>
            </div>

            {/* User info card */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            {user.role === "admin" ? (
                                <FiShield className="h-6 w-6 text-blue-600" />
                            ) : (
                                <FiUser className="h-6 w-6 text-blue-600" />
                            )}
                        </div>
                    </div>
                    <div className="ml-3">
                        <div className="text-gray-900 font-medium">
                            {user.name}
                        </div>
                        <div className="text-gray-500 text-sm capitalize">
                            {user.role}
                        </div>
                        {user.matricule && (
                            <div className="text-gray-400 text-xs">
                                {user.matricule}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-6 py-4 space-y-1">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                item.current
                                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <div className="flex items-center">
                                <Icon
                                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                                        item.current
                                            ? "text-blue-500"
                                            : "text-gray-400"
                                    }`}
                                />
                                {item.name}
                            </div>
                            {item.badge && (
                                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Test Système (pour admin seulement) */}
            {user.role === "admin" && (
                <div className="px-6 py-4 border-t border-gray-200">
                    <Link
                        href="/admin/test"
                        className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
                    >
                        <FiTool className="mr-3 h-5 w-5 text-gray-400" />
                        Test Système
                    </Link>
                </div>
            )}

            {/* Logout button */}
            <div className="flex-shrink-0 p-6 border-t border-gray-200">
                <button
                    onClick={onLogout}
                    className="group flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                >
                    <FiLogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
                    Déconnexion
                </button>
            </div>
        </div>
    );
}
