import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Sélection d'Interface
                </h2>
            }
        >
            <Head title="Sélection Interface" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Interface Administrateur */}
                        <div className="bg-white overflow-hidden shadow-lg rounded-2xl">
                            <div className="p-8 text-center">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg
                                        className="w-10 h-10 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Administration
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Supervision générale, gestion des guichets,
                                    statistiques et monitoring en temps réel
                                </p>
                                <a
                                    href="/admin"
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    🏛️ Accéder à l'Administration
                                </a>
                            </div>
                        </div>

                        {/* Interface Agent */}
                        <div className="bg-white overflow-hidden shadow-lg rounded-2xl">
                            <div className="p-8 text-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg
                                        className="w-10 h-10 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Agent de Guichet
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Interface simplifiée pour la gestion
                                    quotidienne des tickets et le service client
                                </p>
                                <a
                                    href="/agent"
                                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    👤 Interface Agent
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Liens rapides */}
                    <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                        <h4 className="text-lg font-semibold mb-4 text-center">
                            🔗 Accès Rapide
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <a
                                href="/mobile"
                                className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <span className="mr-2">📱</span>
                                Interface Mobile
                            </a>
                            <a
                                href="/affichage"
                                className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <span className="mr-2">📺</span>
                                Affichage Public
                            </a>
                            <a
                                href="/api/v1/services"
                                target="_blank"
                                className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <span className="mr-2">🔧</span>
                                API Documentation
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
