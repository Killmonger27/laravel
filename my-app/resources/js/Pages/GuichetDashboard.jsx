import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AgentLayout from '@/Layouts/AgentLayout';
import {
    FiUsers,
    FiClock,
    FiCheckCircle,
    FiPlay,
    FiPause,
    FiSkipForward,
    FiUser,
    FiPhone,
    FiCalendar,
    FiTrendingUp,
    FiActivity
} from 'react-icons/fi';

export default function GuichetDashboard({ auth, guichet, ticketsEnAttente, ticketEnCours, statistiques }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const stats = [
        {
            name: 'Tickets en attente',
            value: ticketsEnAttente?.length || 0,
            icon: FiUsers,
            color: 'text-blue-600',
            bg: 'bg-blue-100'
        },
        {
            name: 'Temps moyen',
            value: statistiques?.tempsmoyen || '0min',
            icon: FiClock,
            color: 'text-green-600',
            bg: 'bg-green-100'
        },
        {
            name: 'Tickets traités',
            value: statistiques?.tickets_traites || 0,
            icon: FiCheckCircle,
            color: 'text-purple-600',
            bg: 'bg-purple-100'
        },
        {
            name: 'Performance',
            value: statistiques?.performance || '100%',
            icon: FiTrendingUp,
            color: 'text-orange-600',
            bg: 'bg-orange-100'
        }
    ];

    const appellerProchainTicket = () => {
        // Logique pour appeler le prochain ticket
        window.location.reload();
    };

    const terminerTicket = () => {
        // Logique pour terminer le ticket en cours
        window.location.reload();
    };

    const mettrEnPause = () => {
        // Logique pour mettre en pause
        window.location.reload();
    };

    return (
        <AgentLayout
            user={auth.user}
            guichet={guichet}
            title="Interface Guichet"
        >
            <Head title="Interface Guichet" />

            {/* Header avec horloge */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Interface de Guichet</h1>
                        <p className="text-gray-600">Service: {guichet?.service?.nom}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-mono font-bold text-gray-800">
                            {currentTime.toLocaleTimeString()}
                        </div>
                        <div className="text-sm text-gray-600">
                            {currentTime.toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 ${stat.bg} rounded-md p-3`}>
                                    <Icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-500">{stat.name}</div>
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Ticket en cours */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                <FiActivity className="h-5 w-5 mr-2" />
                                Ticket en cours
                            </h3>
                        </div>
                        <div className="p-6">
                            {ticketEnCours ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-green-100 rounded-full p-3">
                                                <FiUser className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-gray-900">
                                                    {ticketEnCours.numero}
                                                </h4>
                                                <p className="text-gray-600">{ticketEnCours.nom_client}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-500">Service</div>
                                            <div className="font-medium">{ticketEnCours.service?.nom}</div>
                                        </div>
                                    </div>

                                    {ticketEnCours.telephone_client && (
                                        <div className="flex items-center text-gray-600">
                                            <FiPhone className="h-4 w-4 mr-2" />
                                            {ticketEnCours.telephone_client}
                                        </div>
                                    )}

                                    <div className="flex items-center text-gray-600">
                                        <FiCalendar className="h-4 w-4 mr-2" />
                                        Appelé à {new Date(ticketEnCours.heure_appel).toLocaleTimeString()}
                                    </div>

                                    <div className="flex space-x-3 pt-4">
                                        <button
                                            onClick={terminerTicket}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center"
                                        >
                                            <FiCheckCircle className="h-4 w-4 mr-2" />
                                            Terminer
                                        </button>
                                        <button
                                            onClick={mettrEnPause}
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center"
                                        >
                                            <FiPause className="h-4 w-4 mr-2" />
                                            Pause
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <FiUser className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500 mb-4">Aucun ticket en cours</p>
                                    <button
                                        onClick={appellerProchainTicket}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 flex items-center mx-auto"
                                        disabled={!ticketsEnAttente?.length}
                                    >
                                        <FiPlay className="h-4 w-4 mr-2" />
                                        Appeler le prochain
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* File d'attente */}
                <div>
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 flex items-center">
                                <FiUsers className="h-5 w-5 mr-2" />
                                File d'attente ({ticketsEnAttente?.length || 0})
                            </h3>
                        </div>
                        <div className="p-6">
                            {ticketsEnAttente?.length > 0 ? (
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {ticketsEnAttente.slice(0, 10).map((ticket, index) => (
                                        <div
                                            key={ticket.id}
                                            className={`p-3 rounded-lg border ${
                                                index === 0 
                                                    ? 'border-indigo-200 bg-indigo-50' 
                                                    : 'border-gray-200 bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {ticket.numero}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {ticket.nom_client}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs text-gray-500">
                                                        {new Date(ticket.created_at).toLocaleTimeString()}
                                                    </div>
                                                    {index === 0 && (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
                                                            Suivant
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <FiUsers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">Aucun ticket en attente</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions rapides */}
            <div className="mt-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center">
                            <FiSkipForward className="h-4 w-4 mr-2" />
                            Appeler suivant
                        </button>
                        <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center">
                            <FiPause className="h-4 w-4 mr-2" />
                            Prendre une pause
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center">
                            <FiCheckCircle className="h-4 w-4 mr-2" />
                            Terminer service
                        </button>
                        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center">
                            <FiActivity className="h-4 w-4 mr-2" />
                            Historique
                        </button>
                    </div>
                </div>
            </div>
        </AgentLayout>
    );
}
