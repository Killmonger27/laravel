import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="QueueFlow - Système de Gestion de File d'Attente" />
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-blue-600 selection:text-white">
                    <div className="relative w-full max-w-5xl px-6">
                        <header className="text-center mb-16">
                            {/* Logo QueueFlow */}
                            <div className="flex items-center justify-center mb-8">
                                <img
                                    src="/logo-qf.svg"
                                    alt="QueueFlow"
                                    className="h-20 w-20 drop-shadow-lg mr-4"
                                />
                                <div className="text-left">
                                    <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        QueueFlow
                                    </h1>
                                    <p className="text-xl text-gray-600 font-medium">
                                        Gestion intelligente des files d'attente
                                    </p>
                                </div>
                            </div>
                        </header>

                        <main className="grid gap-8 lg:grid-cols-2 lg:gap-12 mb-16">
                            {/* Interface Mobile */}
                            <Link
                                href={route("mobile")}
                                className="group flex flex-col items-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/50"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-green-200 group-hover:to-emerald-200 transition-all shadow-lg">
                                    <svg
                                        className="w-10 h-10 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                    Interface Mobile
                                </h2>
                                <p className="text-gray-600 text-center leading-relaxed mb-4">
                                    Prenez votre ticket directement depuis votre
                                    téléphone en quelques clics.
                                </p>
                            </Link>

                            {/* Affichage Public */}
                            <Link
                                href={route("affichage")}
                                className="group flex flex-col items-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/50"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all shadow-lg">
                                    <svg
                                        className="w-10 h-10 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                    Affichage Public
                                </h2>
                                <p className="text-gray-600 text-center leading-relaxed mb-4">
                                    Suivez l'état de la file d'attente en temps
                                    réel avec un affichage moderne et lisible.
                                </p>
                            </Link>
                        </main>

                        {/* Section de connexion professionnelle */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                            {auth.user ? (
                                <div className="text-center">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">
                                                {auth.user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-lg text-gray-700 mb-2">
                                        Bienvenue,{" "}
                                        <strong>{auth.user.name}</strong>
                                    </p>
                                    <p className="text-gray-600 mb-6">
                                        Connecté en tant que{" "}
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                                            {auth.user.role}
                                        </span>
                                    </p>
                                    <Link
                                        href={route("dashboard")}
                                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                                    >
                                        <svg
                                            className="w-5 h-5 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                            />
                                        </svg>
                                        Accéder au Tableau de Bord
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                            Personnel
                                        </h3>
                                        <p className="text-gray-600">
                                            Connectez-vous pour accéder aux
                                            outils d'administration et de
                                            gestion des guichets
                                        </p>
                                    </div>
                                    <div className="flex gap-4 justify-center mb-4">
                                        <Link
                                            href={route("login")}
                                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
                                        >
                                            <svg
                                                className="w-5 h-5 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            Se Connecter
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <footer className="mt-12 text-center">
                            <div className="flex items-center justify-center text-gray-500 text-sm mb-4">
                                <span>
                                    QueueFlow v{laravelVersion} - Système de
                                    Gestion de File d'Attente - PHP {phpVersion}
                                </span>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
