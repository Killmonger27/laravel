import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    FiHome,
    FiUsers,
    FiClock,
    FiCheckSquare,
    FiPause,
    FiSettings,
    FiLogOut,
    FiMenu,
    FiX,
    FiBell,
    FiUser,
} from "react-icons/fi";

export default function AgentLayout({
    user,
    guichet,
    children,
    title = "Interface Agent",
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        {
            name: "Tableau de bord",
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

    const handleLogout = () => {
        router.post(route("logout"));
    };

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden">
            <Head title={title} />

            {/* Sidebar mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 flex z-40 md:hidden">
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
                            guichet={guichet}
                            user={user}
                            onLogout={handleLogout}
                        />
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <SidebarContent
                        navigation={navigation}
                        guichet={guichet}
                        user={user}
                        onLogout={handleLogout}
                    />
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                {/* Top bar */}
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button
                        type="button"
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <FiMenu className="h-6 w-6" />
                    </button>

                    <div className="flex-1 px-4 flex justify-between">
                        <div className="flex-1 flex">
                            <div className="w-full flex md:ml-0">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <h1 className="text-xl font-semibold text-gray-900">
                                        {guichet?.numero} - {guichet?.nom}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="ml-4 flex items-center md:ml-6">
                            {/* Notifications */}
                            <button
                                type="button"
                                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <FiBell className="h-6 w-6" />
                            </button>

                            {/* User info */}
                            <div className="ml-3 relative flex items-center">
                                <div className="flex items-center">
                                    <FiUser className="h-8 w-8 text-gray-400" />
                                    <div className="ml-3 text-sm">
                                        <div className="font-medium text-gray-900">
                                            {user.name}
                                        </div>
                                        <div className="text-gray-500">
                                            {user.matricule}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function SidebarContent({ navigation, guichet, user, onLogout }) {
    const getStatusColor = (statut) => {
        switch (statut) {
            case "connecte":
                return "bg-green-100 text-green-800";
            case "en_pause":
                return "bg-yellow-100 text-yellow-800";
            case "deconnecte":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (statut) => {
        switch (statut) {
            case "connecte":
                return <FiCheckSquare className="h-4 w-4" />;
            case "en_pause":
                return <FiPause className="h-4 w-4" />;
            case "deconnecte":
                return <FiX className="h-4 w-4" />;
            default:
                return <FiClock className="h-4 w-4" />;
        }
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-indigo-800 to-indigo-900">
            {/* Logo */}
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-indigo-900">
                <h2 className="text-white text-xl font-bold">SysBanque</h2>
            </div>

            {/* Agent info card */}
            <div className="px-4 py-4">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                                <FiUser className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="ml-3">
                            <div className="text-white font-medium">
                                {user.name}
                            </div>
                            <div className="text-indigo-200 text-sm">
                                {user.matricule}
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="mt-3">
                        <div
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                user.statut
                            )}`}
                        >
                            {getStatusIcon(user.statut)}
                            <span className="ml-1 capitalize">
                                {user.statut.replace("_", " ")}
                            </span>
                        </div>
                    </div>

                    {/* Guichet info */}
                    {guichet && (
                        <div className="mt-3 text-sm text-indigo-200">
                            <div>Guichet: {guichet.numero}</div>
                            <div>Service: {guichet.service?.nom}</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1">
                {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                                item.current
                                    ? "bg-indigo-700 text-white"
                                    : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
                            }`}
                        >
                            <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout button */}
            <div className="flex-shrink-0 p-4">
                <button
                    onClick={onLogout}
                    className="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-700 hover:text-white transition-colors duration-200"
                >
                    <FiLogOut className="mr-3 h-5 w-5" />
                    Déconnexion
                </button>
            </div>
        </div>
    );
}
