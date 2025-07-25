import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";

export default function TicketMobileModerne() {
    const [services, setServices] = useState([]);
    const [serviceSelectionne, setServiceSelectionne] = useState("");
    const [nomClient, setNomClient] = useState("");
    const [telephoneClient, setTelephoneClient] = useState("");
    const [ticketCree, setTicketCree] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        chargerServices();
    }, []);

    const chargerServices = async () => {
        try {
            const response = await axios.get("/api/v1/services");
            setServices(response.data);
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const creerTicket = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("/api/v1/tickets", {
                service_id: serviceSelectionne,
                nom_client: nomClient,
                telephone_client: telephoneClient,
            });

            setTicketCree(response.data);
            setNomClient("");
            setTelephoneClient("");
            setServiceSelectionne("");
        } catch (error) {
            console.error("Erreur:", error);
            alert("Erreur lors de la création du ticket");
        } finally {
            setLoading(false);
        }
    };

    const nouveauTicket = () => {
        setTicketCree(null);
    };

    if (ticketCree) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
                <Head title="Ticket Créé - QueueFlow" />

                <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
                    {/* Header avec Logo QueueFlow */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 text-center">
                        <div className="flex items-center justify-center mb-3">
                            <img
                                src="/logo-qf.svg"
                                alt="QueueFlow"
                                className="w-10 h-10 mr-3"
                            />
                            <h1 className="text-2xl font-bold">QueueFlow</h1>
                        </div>
                        <div className="w-16 h-0.5 bg-white/30 mx-auto mb-3"></div>
                        <h2 className="text-xl font-semibold">Ticket Créé</h2>
                        <p className="text-blue-100 text-sm">
                            Votre ticket a été généré avec succès
                        </p>
                    </div>

                    {/* Ticket Details */}
                    <div className="p-6">
                        {/* Ticket Number Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 text-center shadow-sm">
                            <div className="text-green-600 text-6xl mb-4">
                                ✓
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Ticket #{ticketCree.numero}
                            </h2>
                            <p className="text-gray-600">
                                Votre numéro de file d'attente
                            </p>
                        </div>

                        {/* Information Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Détails du ticket
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="font-medium text-gray-600">
                                        Service:
                                    </span>
                                    <span className="text-gray-900 font-semibold">
                                        {ticketCree.service?.nom}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="font-medium text-gray-600">
                                        Client:
                                    </span>
                                    <span className="text-gray-900 font-semibold">
                                        {ticketCree.nom_client}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="font-medium text-gray-600">
                                        Téléphone:
                                    </span>
                                    <span className="text-gray-900 font-semibold">
                                        {ticketCree.telephone_client ||
                                            "Non renseigné"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="font-medium text-gray-600">
                                        Heure:
                                    </span>
                                    <span className="text-gray-900 font-semibold">
                                        {new Date(
                                            ticketCree.created_at
                                        ).toLocaleTimeString("fr-FR")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Instructions Card */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
                            <h3 className="font-semibold text-blue-800 mb-3">
                                Instructions importantes
                            </h3>
                            <ul className="text-sm text-blue-700 space-y-2">
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2 mt-0.5">
                                        •
                                    </span>
                                    Conservez précieusement votre numéro de
                                    ticket
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2 mt-0.5">
                                        •
                                    </span>
                                    Surveillez l'affichage public pour votre
                                    appel
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-500 mr-2 mt-0.5">
                                        •
                                    </span>
                                    Présentez-vous au guichet indiqué dès
                                    l'appel
                                </li>
                            </ul>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={nouveauTicket}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                        >
                            Créer un nouveau ticket
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <Head title="Prendre un ticket - QueueFlow" />

            <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
                {/* Header avec Logo QueueFlow */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 text-center">
                    <div className="flex items-center justify-center mb-3">
                        <img
                            src="/logo-qf.svg"
                            alt="QueueFlow"
                            className="w-10 h-10 mr-3"
                        />
                        <h1 className="text-2xl font-bold">QueueFlow</h1>
                    </div>
                    <div className="w-16 h-0.5 bg-white/30 mx-auto mb-3"></div>
                    <h2 className="text-xl font-semibold">
                        Système de File d'Attente
                    </h2>
                    <p className="text-blue-100 text-sm">
                        Prenez votre ticket en ligne
                    </p>
                </div>

                {/* Form */}
                <div className="p-6">
                    <div className="mb-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Créer votre ticket
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Remplissez le formulaire ci-dessous pour obtenir
                            votre numéro
                        </p>
                    </div>

                    <form onSubmit={creerTicket} className="space-y-6">
                        {/* Service Selection */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Service demandé
                            </label>
                            <select
                                value={serviceSelectionne}
                                onChange={(e) =>
                                    setServiceSelectionne(e.target.value)
                                }
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 bg-white text-gray-900"
                            >
                                <option value="">
                                    Sélectionnez un service
                                </option>
                                {services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.nom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Client Name */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Nom complet
                            </label>
                            <input
                                type="text"
                                value={nomClient}
                                onChange={(e) => setNomClient(e.target.value)}
                                required
                                placeholder="Entrez votre nom"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Numéro de téléphone
                                <span className="text-gray-500 font-normal">
                                    {" "}
                                    (optionnel)
                                </span>
                            </label>
                            <input
                                type="tel"
                                value={telephoneClient}
                                onChange={(e) =>
                                    setTelephoneClient(e.target.value)
                                }
                                placeholder="Ex: +33 6 12 34 56 78"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={
                                loading || !serviceSelectionne || !nomClient
                            }
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Création du ticket...
                                </span>
                            ) : (
                                "Créer mon ticket"
                            )}
                        </button>
                    </form>

                    {/* Footer Info */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="text-center">
                            <p className="text-xs text-gray-500 mb-2">
                                Système de gestion de file d'attente
                            </p>
                            <div className="flex items-center justify-center text-xs text-gray-400">
                                <img
                                    src="/logo-qf.svg"
                                    alt="QueueFlow"
                                    className="w-4 h-4 mr-1 opacity-60"
                                />
                                QueueFlow Pro
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
