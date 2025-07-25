import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Connexion - QueueFlow" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    {/* Logo et Header */}
                    <div className="text-center mb-8">
                        <Link href={route("welcome")} className="inline-block">
                            <div className="flex items-center justify-center mb-6">
                                <img
                                    src="/logo-qf.svg"
                                    alt="QueueFlow"
                                    className="h-16 w-16 drop-shadow-lg mr-3"
                                />
                                <div className="text-center">
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        QueueFlow
                                    </h1>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Card de connexion */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
                        {status && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm font-medium text-green-700">
                                    {status}
                                </p>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="login"
                                    value="Email ou Matricule"
                                    className="text-gray-700 font-semibold"
                                />
                                <TextInput
                                    id="login"
                                    type="text"
                                    name="login"
                                    value={data.login}
                                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("login", e.target.value)
                                    }
                                    placeholder="admin@banque.com ou AGT001"
                                />
                                <InputError
                                    message={errors.login}
                                    className="mt-2"
                                />
                            </div>

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
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="Votre mot de passe"
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Se souvenir de moi
                                </span>
                            </div>

                            <div className="space-y-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
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
                                            Connexion...
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
                                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            Se connecter
                                        </span>
                                    )}
                                </button>

                                <div className="flex items-center justify-center pt-4 border-t border-gray-200">
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-sm text-blue-600 hover:text-blue-800 underline font-medium"
                                        >
                                            Mot de passe oublié ?
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Liens utiles */}
                    <div className="mt-8 text-center">
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
                </div>
            </div>
        </>
    );
}
