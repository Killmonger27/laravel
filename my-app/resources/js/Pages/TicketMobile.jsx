import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";

export default function TicketMobile() {
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
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
                <Head title="Ticket Créé" />

                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Ticket Créé !
                        </h2>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-6 mb-6">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                            {ticketCree.numero}
                        </div>
                        <div className="text-gray-600 mb-1">
                            {ticketCree.nom_client}
                        </div>
                        <div className="text-sm text-gray-500">
                            {ticketCree.service.nom}
                        </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-6">
                        Votre position dans la file :{" "}
                        <span className="font-semibold">
                            {ticketCree.position}
                        </span>
                    </div>

                    <button
                        onClick={nouveauTicket}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Créer un nouveau ticket
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
            <Head title="Nouveau Ticket" />

            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Banque Mobile
                    </h1>
                    <p className="text-gray-600">
                        Créez votre ticket de file d'attente
                    </p>
                </div>

                <form onSubmit={creerTicket} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service souhaité
                        </label>
                        <select
                            value={serviceSelectionne}
                            onChange={(e) =>
                                setServiceSelectionne(e.target.value)
                            }
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Sélectionnez un service</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.nom}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom complet
                        </label>
                        <input
                            type="text"
                            value={nomClient}
                            onChange={(e) => setNomClient(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Votre nom complet"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Téléphone (optionnel)
                        </label>
                        <input
                            type="tel"
                            value={telephoneClient}
                            onChange={(e) => setTelephoneClient(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Votre numéro de téléphone"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                        {loading ? "Création..." : "Créer mon ticket"}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-center text-sm text-gray-600">
                        {services.map((service) => (
                            <div key={service.id}>
                                <div className="font-medium">{service.nom}</div>
                                <div className="text-xs">
                                    ~{service.duree_estimee} min
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
