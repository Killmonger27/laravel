import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Register() {
    const [guichets, setGuichets] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "agent",
        matricule: "",
        guichet_id: "",
    });

    // Charger la liste des guichets pour les agents
    useEffect(() => {
        if (data.role === "agent") {
            fetch("/api/guichets")
                .then((response) => response.json())
                .then((data) => setGuichets(data))
                .catch((error) => console.error("Erreur:", error));
        }
    }, [data.role]);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Inscription - QueueFlow" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
                <div className="w-full max-w-lg">
                    {/* Logo et Header */}
                    <div className="text-center mb-8">
                        <Link href={route("welcome")} className="inline-block">
                            <div className="flex items-center justify-center mb-6">
                                <img
                                    src="/logo-qf.svg"
                                    alt="QueueFlow"
                                    className="h-16 w-16 drop-shadow-lg mr-3"
                                />
                                <div className="text-left">
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        QueueFlow
                                    </h1>
                                    <p className="text-gray-600 text-sm font-medium">
                                        Gestion des files d'attente
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Créer un compte
                        </h2>
                        <p className="text-gray-600">
                            Rejoignez l'équipe bancaire QueueFlow
                        </p>
                    </div>

                    {/* Card d'inscription */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Nom complet"
                                    className="text-gray-700 font-semibold"
                                />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    placeholder="Votre nom complet"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="text-gray-700 font-semibold"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                    placeholder="votre.email@banque.com"
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="role"
                                    value="Rôle"
                                    className="text-gray-700 font-semibold"
                                />
                                <select
                                    id="role"
                                    name="role"
                                    value={data.role}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                >
                                    <option value="agent">
                                        Agent de Guichet
                                    </option>
                                    <option value="admin">
                                        Administrateur
                                    </option>
                                </select>
                                <InputError
                                    message={errors.role}
                                    className="mt-2"
                                />
                            </div>

                            {data.role === "agent" && (
                                <>
                                    <div>
                                        <InputLabel
                                            htmlFor="matricule"
                                            value="Matricule"
                                            className="text-gray-700 font-semibold"
                                        />
                                        <TextInput
                                            id="matricule"
                                            type="text"
                                            name="matricule"
                                            value={data.matricule}
                                            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            onChange={(e) =>
                                                setData(
                                                    "matricule",
                                                    e.target.value
                                                )
                                            }
                                            required={data.role === "agent"}
                                            placeholder="AGT001"
                                        />
                                        <InputError
                                            message={errors.matricule}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="guichet_id"
                                            value="Guichet assigné"
                                            className="text-gray-700 font-semibold"
                                        />
                                        <select
                                            id="guichet_id"
                                            name="guichet_id"
                                            value={data.guichet_id}
                                            onChange={(e) =>
                                                setData(
                                                    "guichet_id",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            required={data.role === "agent"}
                                        >
                                            <option value="">
                                                Sélectionner un guichet
                                            </option>
                                            {guichets.map((guichet) => (
                                                <option
                                                    key={guichet.id}
                                                    value={guichet.id}
                                                >
                                                    Guichet {guichet.numero} -{" "}
                                                    {guichet.nom}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.guichet_id}
                                            className="mt-2"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Chaque agent doit être assigné à un
                                            guichet unique
                                        </p>
                                    </div>
                                </>
                            )}

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Mot de passe"
                                    className="text-gray-700 font-semibold"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                    placeholder="Minimum 8 caractères"
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirmer le mot de passe"
                                    className="text-gray-700 font-semibold"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                    placeholder="Répétez votre mot de passe"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="space-y-4 pt-4">
                                <PrimaryButton
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                            Création du compte...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
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
                                                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                                />
                                            </svg>
                                            Créer mon compte
                                        </span>
                                    )}
                                </PrimaryButton>

                                <div className="text-center pt-4 border-t border-gray-200">
                                    <Link
                                        href={route("login")}
                                        className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
                                    >
                                        Déjà inscrit ? Se connecter
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Liens utiles */}
                    <div className="mt-8 text-center">
                        <div className="space-y-2">
                            <Link
                                href={route("welcome")}
                                className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                Retour à l'accueil
                            </Link>
                        </div>
                        <p className="text-xs text-gray-500 mt-4">
                            © 2025 QueueFlow - Solution professionnelle de
                            gestion de files d'attente
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
