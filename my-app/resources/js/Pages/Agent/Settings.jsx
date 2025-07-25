import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import UnifiedLayout from "@/Layouts/UnifiedLayout";
import {
    FiSettings,
    FiSave,
    FiRefreshCw,
    FiUser,
    FiMail,
    FiPhone,
    FiLock,
    FiBell,
    FiMonitor,
    FiEye,
    FiEyeOff,
    FiEdit,
} from "react-icons/fi";

export default function Settings({ auth }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeTab, setActiveTab] = useState("profile");
    const [showPassword, setShowPassword] = useState(false);
    const [settings, setSettings] = useState({
        // Profil
        name: auth.user.name || "",
        email: auth.user.email || "",
        telephone: auth.user.telephone || "",
        matricule: auth.user.matricule || "",

        // Mot de passe
        current_password: "",
        new_password: "",
        confirm_password: "",

        // Notifications
        notification_nouveau_ticket: true,
        notification_ticket_prioritaire: true,
        notification_pause_longue: true,
        son_notification: true,

        // Affichage
        theme_sombre: false,
        affichage_compact: false,
        auto_refresh: true,
        refresh_interval: 30,

        // Préférences
        langue: "fr",
        format_heure: "24h",
        affichage_client_info: true,
        raccourcis_clavier: true,
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
        { id: "profile", name: "Profil", icon: FiUser },
        { id: "password", name: "Mot de passe", icon: FiLock },
        { id: "notifications", name: "Notifications", icon: FiBell },
        { id: "display", name: "Affichage", icon: FiMonitor },
    ];

    const renderProfileSettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Informations personnelles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom complet
                        </label>
                        <input
                            type="text"
                            value={settings.name}
                            onChange={(e) =>
                                handleSettingChange("name", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Matricule
                        </label>
                        <input
                            type="text"
                            value={settings.matricule}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Le matricule ne peut pas être modifié
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Adresse email
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
                </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">
                    Informations de poste
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Guichet assigné
                        </label>
                        <input
                            type="text"
                            value={
                                auth.user.guichet?.numero
                                    ? `Guichet ${auth.user.guichet.numero}`
                                    : "Non assigné"
                            }
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service principal
                        </label>
                        <input
                            type="text"
                            value={
                                auth.user.guichet?.service?.nom || "Non défini"
                            }
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPasswordSettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Changer le mot de passe
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mot de passe actuel
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={settings.current_password}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "current_password",
                                        e.target.value
                                    )
                                }
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FiEyeOff className="h-4 w-4 text-gray-400" />
                                ) : (
                                    <FiEye className="h-4 w-4 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            value={settings.new_password}
                            onChange={(e) =>
                                handleSettingChange(
                                    "new_password",
                                    e.target.value
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmer le nouveau mot de passe
                        </label>
                        <input
                            type="password"
                            value={settings.confirm_password}
                            onChange={(e) =>
                                handleSettingChange(
                                    "confirm_password",
                                    e.target.value
                                )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">
                        Critères de sécurité :
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Minimum 8 caractères</li>
                        <li>• Au moins une majuscule et une minuscule</li>
                        <li>• Au moins un chiffre</li>
                        <li>• Au moins un caractère spécial (!@#$%^&*)</li>
                    </ul>
                </div>
            </div>
        </div>
    );

    const renderNotificationSettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Préférences de notifications
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <div className="font-medium text-gray-900">
                                Nouveau ticket en file
                            </div>
                            <div className="text-sm text-gray-500">
                                Être notifié quand un nouveau ticket arrive
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.notification_nouveau_ticket}
                            onChange={(e) =>
                                handleSettingChange(
                                    "notification_nouveau_ticket",
                                    e.target.checked
                                )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <div className="font-medium text-gray-900">
                                Ticket prioritaire
                            </div>
                            <div className="text-sm text-gray-500">
                                Alertes spéciales pour les tickets urgents
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.notification_ticket_prioritaire}
                            onChange={(e) =>
                                handleSettingChange(
                                    "notification_ticket_prioritaire",
                                    e.target.checked
                                )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <div className="font-medium text-gray-900">
                                Pause prolongée
                            </div>
                            <div className="text-sm text-gray-500">
                                Rappel après 15 minutes de pause
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.notification_pause_longue}
                            onChange={(e) =>
                                handleSettingChange(
                                    "notification_pause_longue",
                                    e.target.checked
                                )
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                            <div className="font-medium text-gray-900">
                                Son des notifications
                            </div>
                            <div className="text-sm text-gray-500">
                                Jouer un son pour les alertes
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={settings.son_notification}
                            onChange={(e) =>
                                handleSettingChange(
                                    "son_notification",
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

    const renderDisplaySettings = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Préférences d'affichage
                </h3>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Langue
                            </label>
                            <select
                                value={settings.langue}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "langue",
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Format d'heure
                            </label>
                            <select
                                value={settings.format_heure}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "format_heure",
                                        e.target.value
                                    )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="24h">24 heures</option>
                                <option value="12h">12 heures (AM/PM)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Intervalle d'actualisation (secondes)
                            </label>
                            <input
                                type="number"
                                min="10"
                                max="300"
                                value={settings.refresh_interval}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "refresh_interval",
                                        parseInt(e.target.value)
                                    )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <div className="font-medium text-gray-900">
                                    Thème sombre
                                </div>
                                <div className="text-sm text-gray-500">
                                    Interface en mode sombre
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.theme_sombre}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "theme_sombre",
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <div className="font-medium text-gray-900">
                                    Affichage compact
                                </div>
                                <div className="text-sm text-gray-500">
                                    Réduire l'espacement entre les éléments
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.affichage_compact}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "affichage_compact",
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <div className="font-medium text-gray-900">
                                    Actualisation automatique
                                </div>
                                <div className="text-sm text-gray-500">
                                    Rafraîchir les données automatiquement
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.auto_refresh}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "auto_refresh",
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <div className="font-medium text-gray-900">
                                    Informations client détaillées
                                </div>
                                <div className="text-sm text-gray-500">
                                    Afficher plus d'infos sur les clients
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.affichage_client_info}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "affichage_client_info",
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                                <div className="font-medium text-gray-900">
                                    Raccourcis clavier
                                </div>
                                <div className="text-sm text-gray-500">
                                    Activer les raccourcis clavier
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.raccourcis_clavier}
                                onChange={(e) =>
                                    handleSettingChange(
                                        "raccourcis_clavier",
                                        e.target.checked
                                    )
                                }
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case "profile":
                return renderProfileSettings();
            case "password":
                return renderPasswordSettings();
            case "notifications":
                return renderNotificationSettings();
            case "display":
                return renderDisplaySettings();
            default:
                return renderProfileSettings();
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
                            Paramètres Personnels
                        </h1>
                        <p className="text-gray-600">
                            Gérez vos préférences et paramètres de compte
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
