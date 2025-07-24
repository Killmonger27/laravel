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
                                Solution bancaire moderne pour la gestion des tickets et des guichets
                            </p>
                        </header>

                        <main className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                            {/* Interface Mobile */}
                            <Link
                                href={route("mobile")}
                                className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">Interface Mobile</h2>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    Créez votre ticket et rejoignez la file d'attente
                                </p>
                            </Link>

                            {/* Affichage Public */}
                            <Link
                                href={route("affichage")}
                                className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">Affichage Public</h2>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    Suivez l'état de la file d'attente en temps réel
                                </p>
                            </Link>
                        </main>

                        {/* Section de connexion simplifiée */}
                        <div className="mt-16 text-center">
                            {auth.user ? (
                                <div>
                                    <p className="text-lg text-gray-700 mb-6">
                                        Connecté en tant que <strong>{auth.user.name}</strong> ({auth.user.role})
                                    </p>
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Accéder au Tableau de Bord
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-8">Personnel Bancaire</h3>
                                    <div className="flex gap-4 justify-center">
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Se Connecter
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            S'Inscrire
                                        </Link>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-4">
                                        Utilisez votre matricule pour vous connecter en tant qu'agent
                                    </p>
                                </div>
                            )}
                        </div>

                        <footer className="mt-20 text-center text-gray-500 text-sm">
                            <p>Système de Gestion de File d'Attente v{laravelVersion} - PHP {phpVersion}</p>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
