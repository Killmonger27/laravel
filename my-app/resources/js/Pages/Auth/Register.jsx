import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Register() {
    const [guichets, setGuichets] = useState([]);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'agent',
        matricule: '',
        guichet_id: '',
    });

    // Charger la liste des guichets pour les agents
    useEffect(() => {
        if (data.role === 'agent') {
            fetch('/api/guichets')
                .then(response => response.json())
                .then(data => setGuichets(data))
                .catch(error => console.error('Erreur:', error));
        }
    }, [data.role]);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Inscription" />

            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Créer un compte</h1>
                <p className="text-gray-600 mt-2">Rejoignez l'équipe bancaire</p>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nom complet" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="Votre nom complet"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder="votre.email@banque.com"
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Rôle" />
                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="agent">Agent</option>
                        <option value="admin">Administrateur</option>
                    </select>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                {data.role === 'agent' && (
                    <>
                        <div className="mt-4">
                            <InputLabel htmlFor="matricule" value="Matricule" />
                            <TextInput
                                id="matricule"
                                type="text"
                                name="matricule"
                                value={data.matricule}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('matricule', e.target.value)}
                                required={data.role === 'agent'}
                                placeholder="AGT001"
                            />
                            <InputError message={errors.matricule} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="guichet_id" value="Guichet assigné *" />
                            <select
                                id="guichet_id"
                                name="guichet_id"
                                value={data.guichet_id}
                                onChange={(e) => setData('guichet_id', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required={data.role === 'agent'}
                            >
                                <option value="">Sélectionner un guichet</option>
                                {guichets.map((guichet) => (
                                    <option key={guichet.id} value={guichet.id}>
                                        {guichet.numero} - {guichet.nom}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.guichet_id} className="mt-2" />
                            <p className="text-sm text-gray-600 mt-1">Chaque agent doit être assigné à un guichet unique</p>
                        </div>
                    </>
                )}

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Mot de passe" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        placeholder="Minimum 8 caractères"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirmer le mot de passe" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        placeholder="Répétez votre mot de passe"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-6">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 hover:text-gray-900 underline"
                    >
                        Déjà inscrit ? Se connecter
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        S'inscrire
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
