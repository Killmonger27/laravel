import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Système de Gestion de File d'Attente" />
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-blue-600 selection:text-white">
                    <div className="relative w-full max-w-4xl px-6">
                        <header className="text-center mb-12">
                            <h1 className="text-5xl font-bold text-gray-800 mb-4">
                                Système de Gestion de File d'Attente
                            </h1>
                            <p className="text-xl text-gray-600">
                                Solution bancaire moderne pour la gestion des
                                tickets et des guichets
                            </p>
                        </header>

                        <main className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                            {/* Interface Mobile */}
                            <Link
                                href={route("mobile")}
                                className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                                    <svg
                                        className="w-8 h-8 text-green-600"
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
                                <p className="text-gray-600 text-center leading-relaxed">
                                    Créez votre ticket et rejoignez la file
                                    d'attente directement depuis votre mobile
                                </p>
                            </Link>

                            {/* Affichage Public */}
                            <Link
                                href={route("affichage")}
                                className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                                    <svg
                                        className="w-8 h-8 text-blue-600"
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
                                <p className="text-gray-600 text-center leading-relaxed">
                                    Suivez l'état de la file d'attente en temps
                                    réel sur l'écran d'affichage
                                </p>
                            </Link>
                        </main>

                        {/* Section de connexion */}
                        <div className="mt-16 text-center">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-8">
                                Accès Personnel
                            </h3>

                            <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
                                {/* Connexion Agent */}
                                <Link
                                    href={route("agent.login")}
                                    className="group flex flex-col items-center p-6 bg-orange-50 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                                        <svg
                                            className="w-6 h-6 text-orange-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                        Espace Agent
                                    </h4>
                                    <p className="text-sm text-gray-600 text-center">
                                        Connexion avec matricule
                                    </p>
                                </Link>

                                {/* Connexion Admin */}
                                <Link
                                    href={route("login")}
                                    className="group flex flex-col items-center p-6 bg-purple-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                                        <svg
                                            className="w-6 h-6 text-purple-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                        Administration
                                    </h4>
                                    <p className="text-sm text-gray-600 text-center">
                                        Gestion complète du système
                                    </p>
                                </Link>
                            </div>

                            {auth.user && (
                                <div className="mt-8">
                                    <Link
                                        href={route("dashboard")}
                                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Accéder au Tableau de Bord
                                    </Link>
                                </div>
                            )}
                        </div>

                        <footer className="mt-20 text-center text-gray-500 text-sm">
                            <p>
                                Système de Gestion de File d'Attente v
                                {laravelVersion} - PHP {phpVersion}
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
