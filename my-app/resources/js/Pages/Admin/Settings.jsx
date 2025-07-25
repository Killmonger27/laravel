import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import UnifiedLayout from "@/Layouts/UnifiedLayout";
import {
    FiSettings,
    FiSave,
    FiRefreshCw,
    FiShield,
    FiMail,
    FiDatabase,
    FiMonitor,
    FiClock,
    FiUsers,
    FiAlertTriangle,
    FiCheckCircle,
    FiEdit,
    FiEye,
    EyeOff,
    FiLock,
} from "react-icons/fi";

export default function Settings({ auth }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeTab, setActiveTab] = useState("general");
    const [settings, setSettings] = useState({
        // Paramètres généraux
        nom_etablissement: "SysBanque",
        adresse: "123 Rue de la Banque, 75001 Paris",
        telephone: "01 23 45 67 89",
        email: "contact@sysbanque.fr",

        // Paramètres de file d'attente
        temps_max_attente: 30,
        notification_attente: true,
        auto_refresh_affichage: 5,
        max_tickets_par_jour: 500,

        // Paramètres de sécurité
        session_timeout: 60,
        password_min_length: 8,
        require_special_chars: true,
        two_factor_auth: false,

        // Paramètres d'affichage
        theme_couleur: "blue",
        affichage_logo: true,
        affichage_meteo: false,
        langue_defaut: "fr",

        // Notifications
        email_notifications: true,
        sms_notifications: false,
        notification_admin: true,
        notification_stats: true,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSettingChange = (key, value) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const tabs = [
        { id: "general", name: "Général", icon: FiSettings },
        { id: "queue", name: "File d'attente", icon: FiUsers },
        { id: "security", name: "Sécurité", icon: FiShield },
        { id: "display", name: "Affichage", icon: FiMonitor },
        { id: "notifications", name: "Notifications", icon: FiMail },
    ];

    const renderGeneralSettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Informations générales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom de l'établissement
                        </label>
                        <input
                            type="text"
                            value={settings.nom_etablissement}
                            onChange={(e) =>
                                handleSettingChange(
                                    "nom_etablissement",
                                    e.target.value
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Téléphone
                        </label>
                        <input
                            type="tel"
                            value={settings.telephone}
                            onChange={(e) =>
                                handleSettingChange("telephone", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Adresse
                        </label>
                        <input
                            type="text"
                            value={settings.adresse}
                            onChange={(e) =>
                                handleSettingChange("adresse", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email de contact
                        </label>
                        <input
                            type="email"
                            value={settings.email}
                            onChange={(e) =>
                                handleSettingChange("email", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderQueueSettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Configuration de la file d'attente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Temps maximum d'attente (minutes)
                        </label>
                        <input
                            type="number"
                            value={settings.temps_max_attente}
                            onChange={(e) =>
                                handleSettingChange(
                                    "temps_max_attente",
                                    parseInt(e.target.value)
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Maximum de tickets par jour
                        </label>
                        <input
                            type="number"
                            value={settings.max_tickets_par_jour}
                            onChange={(e) =>
                                handleSettingChange(
                                    "max_tickets_par_jour",
                                    parseInt(e.target.value)
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Actualisation affichage public (secondes)
                        </label>
                        <input
                            type="number"
                            value={settings.auto_refresh_affichage}
                            onChange={(e) =>
                                handleSettingChange(
                                    "auto_refresh_affichage",
                                    parseInt(e.target.value)
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="notification_attente"
                            checked={settings.notification_attente}
                            onChange={(e) =>
                                handleSettingChange(
                                    "notification_attente",
                                    e.target.checked
                                )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="notification_attente"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Notifications automatiques d'attente
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSecuritySettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Paramètres de sécurité
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiration de session (minutes)
                        </label>
                        <input
                            type="number"
                            value={settings.session_timeout}
                            onChange={(e) =>
                                handleSettingChange(
                                    "session_timeout",
                                    parseInt(e.target.value)
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Longueur minimum du mot de passe
                        </label>
                        <input
                            type="number"
                            value={settings.password_min_length}
                            onChange={(e) =>
                                handleSettingChange(
                                    "password_min_length",
                                    parseInt(e.target.value)
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="require_special_chars"
                            checked={settings.require_special_chars}
                            onChange={(e) =>
                                handleSettingChange(
                                    "require_special_chars",
                                    e.target.checked
                                )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="require_special_chars"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Exiger des caractères spéciaux
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="two_factor_auth"
                            checked={settings.two_factor_auth}
                            onChange={(e) =>
                                handleSettingChange(
                                    "two_factor_auth",
                                    e.target.checked
                                )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="two_factor_auth"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Authentification à deux facteurs
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDisplaySettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Paramètres d'affichage
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thème de couleur
                        </label>
                        <select
                            value={settings.theme_couleur}
                            onChange={(e) =>
                                handleSettingChange(
                                    "theme_couleur",
                                    e.target.value
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="blue">Bleu</option>
                            <option value="indigo">Indigo</option>
                            <option value="green">Vert</option>
                            <option value="purple">Violet</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Langue par défaut
                        </label>
                        <select
                            value={settings.langue_defaut}
                            onChange={(e) =>
                                handleSettingChange(
                                    "langue_defaut",
                                    e.target.value
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="fr">Français</option>
                            <option value="en">Anglais</option>
                            <option value="es">Espagnol</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="affichage_logo"
                            checked={settings.affichage_logo}
                            onChange={(e) =>
                                handleSettingChange(
                                    "affichage_logo",
                                    e.target.checked
                                )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="affichage_logo"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Afficher le logo sur l'écran public
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="affichage_meteo"
                            checked={settings.affichage_meteo}
                            onChange={(e) =>
                                handleSettingChange(
                                    "affichage_meteo",
                                    e.target.checked
                                )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="affichage_meteo"
                            className="ml-2 block text-sm text-gray-900"
                        >
                            Afficher la météo
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotificationSettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Paramètres de notifications
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <div className="font-medium text-gray-900">
                                Notifications par email
                            </div>
                            <div className="text-sm text-gray-500">
                                Recevoir les alertes par email
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.email_notifications}
                            onChange={(e) =>
                                handleSettingChange(
                                    "email_notifications",
                                    e.target.checked
                                )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <div className="font-medium text-gray-900">
                                Notifications SMS
                            </div>
                            <div className="text-sm text-gray-500">
                                Recevoir les alertes par SMS
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.sms_notifications}
                            onChange={(e) =>
                                handleSettingChange(
                                    "sms_notifications",
                                    e.target.checked
                                )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <div className="font-medium text-gray-900">
                                Alertes administrateur
                            </div>
                            <div className="text-sm text-gray-500">
                                Notifications pour les événements critiques
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.notification_admin}
                            onChange={(e) =>
                                handleSettingChange(
                                    "notification_admin",
                                    e.target.checked
                                )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <div className="font-medium text-gray-900">
                                Rapports statistiques
                            </div>
                            <div className="text-sm text-gray-500">
                                Rapports quotidiens et hebdomadaires
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.notification_stats}
                            onChange={(e) =>
                                handleSettingChange(
                                    "notification_stats",
                                    e.target.checked
                                )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case "general":
                return renderGeneralSettings();
            case "queue":
                return renderQueueSettings();
            case "security":
                return renderSecuritySettings();
            case "display":
                return renderDisplaySettings();
            case "notifications":
                return renderNotificationSettings();
            default:
                return renderGeneralSettings();
        }
    };

    return (
        <UnifiedLayout user={auth.user} title="Paramètres">
            <Head title="Paramètres" />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Paramètres Système
                        </h1>
                        <p className="text-gray-600">
                            Configuration et préférences de l'application
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center">
                            <FiSave className="w-4 h-4 mr-2" />
                            Sauvegarder
                        </button>
                        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center">
                            <FiRefreshCw className="w-4 h-4 mr-2" />
                            Réinitialiser
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Navigation des onglets */}
                <div className="lg:col-span-1">
                    <nav className="space-y-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                        activeTab === tab.id
                                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {tab.name}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Contenu des paramètres */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </UnifiedLayout>
    );
}
